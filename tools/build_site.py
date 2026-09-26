#!/usr/bin/env python3
"""Generate the VSCLAB chip-gallery site from the design working directories."""

import json, os, re, glob

FLOW = "/Volumes/joule/OpenROAD-flow-scripts-Darwin/flow"
R    = os.path.join(FLOW, "results")
SITE = "/Volumes/joule/vsclab-chip-gallery"
IMG  = os.path.join(SITE, "assets", "img")

# ------------------------------------------------------------------ helpers
def num(x):
    try: return float(x)
    except (TypeError, ValueError): return None

def ints(x):
    v = num(x)
    return None if v is None else "{:,}".format(int(round(v)))

def si(v, unit):
    if v is None: return None
    for m, p in ((1e9, "G"), (1e6, "M"), (1e3, "k")):
        if abs(v) >= m * 0.9995: return "%.2f %s%s" % (v / m, p, unit)
    return "%.3g %s" % (v, unit)

def area(v):
    v = num(v)
    if v is None: return None
    a = "{:,}".format(int(round(v)))
    return "%.3f mm² (%s µm²)" % (v / 1e6, a) if v >= 1e6 else "%s µm²" % a

def imgset(slug, files):
    """files: list of (basename, caption) -> the records the page renders.

    Only the .webp display copies are emitted. The PNGs beside them are local
    render intermediates and are not in the repository, so linking them as
    "full resolution" would give a clone a dead link. To ship the originals
    again, commit the PNGs and add:
        rec["full"] = "assets/img/%s/%s" % (slug, base)
    for records whose base name ends in .png -- app.js already renders the link
    when the field is there and hides it when it is not."""
    d = os.path.join(IMG, slug)
    have = set(os.listdir(d)) if os.path.isdir(d) else set()
    out = []
    for base, cap in files:
        disp = os.path.splitext(base)[0] + ".webp"
        if disp not in have:
            if base not in have: continue
            disp = base
        out.append(dict(src="assets/img/%s/%s" % (slug, disp), cap=cap))
    return out


def detail_score(path):
    """How much large-scale structure an image shows. A GDS rendering of a very
    dense die packs more geometry than there are pixels and saturates into a flat
    wash; when that happens the OpenROAD layout view makes a better card cover.

    The measurement crops to the die interior first — otherwise the bright die
    against the black border dominates the variance and every image scores high —
    and box-downsamples hard, so per-shape noise averages away and only
    block-level structure survives."""
    try:
        from PIL import Image
        import numpy as np
    except ImportError:
        return None
    try:
        im = Image.open(path).convert("RGB")
        w, h = im.size
        im = im.crop((int(w * .22), int(h * .22), int(w * .78), int(h * .78)))
        a = np.asarray(im.resize((64, 64), Image.BOX), dtype="float32")
        return float(a.reshape(-1, 3).std(axis=0).mean())
    except Exception:
        return None


def order_cover(slug, wanted, threshold=6.5):
    """Keep the GDS rendering first unless it is too flat to read as a thumbnail."""
    if not wanted or wanted[0][0] != "gds.png":
        return wanted
    # Score the committed WebP: the PNG is a local render intermediate and is
    # not in the repository, so it may not be here at all.
    disp = os.path.join(IMG, slug, "gds.webp")
    sc = detail_score(disp if os.path.exists(disp)
                      else os.path.join(IMG, slug, "gds.png"))
    if sc is None or sc >= threshold:
        return wanted
    rest = wanted[1:]
    for i, (f, _) in enumerate(rest):
        if f == "final_all.webp":
            return [rest[i]] + [wanted[0]] + rest[:i] + rest[i + 1:]
    return wanted

# ------------------------------------------------------------------ PDKs
PDK = {
 "asap7": dict(node="7 nm", name="ASAP7 predictive PDK",
    cells="asap7sc7p5t — 7.5-track FinFET", tu=1e-12, tname="ps",
    note="ASAP7 is a predictive 7 nm FinFET PDK from Arizona State University and Arm. "
         "It models a 7 nm process for academic use, and is a standard platform for "
         "research on FinFET-era place-and-route."),
 "gf180": dict(node="180 nm", name="GlobalFoundries GF180MCU (open PDK)",
    cells="gf180mcu_fd_sc_mcu9t5v0 — 9-track, 5.0 V", tu=1e-9, tname="ns",
    note="GF180MCU is GlobalFoundries' open-sourced 180 nm MCU process, a manufacturable "
         "foundry PDK. This platform is configured for 9-track cells, a 5-metal stack "
         "(5LM_1TM) and the 5.0 V power option."),
 "nangate45": dict(node="45 nm", name="FreePDK45 / Nangate45",
    cells="NangateOpenCellLibrary", tu=1e-9, tname="ns",
    note="The Nangate Open Cell Library on FreePDK45. It is an academic platform rather "
         "than a manufacturable process, and has long served as a reference for EDA "
         "research and flow bring-up."),
 "ihp-sg13g2": dict(node="130 nm", name="IHP SG13G2 (open PDK)",
    cells="sg13g2_stdcell", tu=1e-9, tname="ns",
    note="IHP's SiGe BiCMOS 130 nm open PDK, 1.2 V core supply."),
}

SAED32_NOTE = ("SAED32/28 nm is Synopsys' Educational Design Kit: a complete, "
               "academically licensed 32 nm technology with a 1P9M metal stack, "
               "three threshold-voltage flavours (RVT / LVT / HVT) and low-power "
               "SRAM macros. It is licensed for teaching and research use.")

TITLES = {
 ("asap7","aes-block"): ("AES-128 cipher — hierarchical",
   "aes_cipher_top assembled from hardened S-box and round-constant sub-blocks; 21 macros are placed and routed at the top level."),
 ("asap7","aes-block_aes_rcon"): ("AES round-constant block",
   "The aes_rcon sub-block of the hierarchical AES build, hardened on its own as a reusable macro."),
 ("asap7","aes-block_aes_sbox"): ("AES S-box block",
   "The aes_sbox substitution box, hardened as a macro and instantiated twenty times inside the top-level cipher."),
 ("asap7","aes-mbff"): ("AES-128 cipher — multi-bit flip-flops",
   "Flat AES with multi-bit flip-flop clustering enabled, which merges single-bit registers into banked cells to shrink the clock tree."),
 ("asap7","aes_lvt"): ("AES-128 cipher — low-Vt",
   "Flat AES implemented in the low-threshold-voltage cell flavour: faster switching, paid for in leakage."),
 ("asap7","ethmac"): ("Ethernet MAC",
   "The OpenCores 10/100 Ethernet MAC — three asynchronous clock domains (Wishbone, transmit and receive), each with its own clock tree."),
 ("asap7","ethmac_lvt"): ("Ethernet MAC — low-Vt",
   "The same three-clock Ethernet MAC re-implemented with low-Vt cells and a larger die."),
 ("asap7","gcd"): ("GCD accelerator",
   "A Euclidean greatest-common-divisor datapath — the canonical small design used to shake out a flow end to end."),
 ("asap7","gcd-ccs"): ("GCD accelerator — CCS timing",
   "The same GCD datapath signed off against composite-current-source Liberty models instead of the simpler NLDM tables."),
 ("asap7","jpeg_lvt"): ("JPEG encoder — low-Vt",
   "A baseline JPEG encoder — DCT, quantisation and Huffman coding — built from low-Vt cells."),
 ("asap7","mock-cpu"): ("Mock CPU — two clock domains",
   "A CPU-plus-uncore test vehicle with separate core and uncore clocks, used to exercise multi-domain clock-tree synthesis and timing closure."),
 ("asap7","riscv32i-mock-sram_fakeram7_256x32"): ("SRAM macro — 256 × 32",
   "A 256-word by 32-bit memory macro generated for the RV32I mock-SRAM design and hardened as a standalone block."),
 ("gf180","aes"): ("AES-128 cipher",
   "A flat AES-128 cipher hardened on the open GF180MCU foundry process."),
 ("gf180","aes-hybrid"): ("AES-128 cipher — hybrid cell mix",
   "AES built from a mixed standard-cell set, trading area against timing on the same process."),
 ("gf180","ibex"): ("Ibex RV32 CPU core",
   "lowRISC's Ibex — a compact two-stage 32-bit RISC-V core — implemented on GF180MCU."),
 ("gf180","uart-blocks"): ("UART — hierarchical",
   "A UART built hierarchically, with its receiver hardened separately and placed as a macro."),
 ("gf180","uart-blocks_uart_rx"): ("UART receiver block",
   "The uart_rx sub-block of the hierarchical UART, hardened on its own."),
 ("nangate45","aes"): ("AES-128 cipher",
   "A flat AES-128 cipher on the Nangate45 reference platform."),
 ("nangate45","gcd"): ("GCD accelerator",
   "The GCD datapath on Nangate45 — the default target of the OpenROAD flow."),
}

# ORFS runs kept outside the flow tree (their own WORK_HOME and FLOW_VARIANT). Each is
# read exactly like a flow-tree run; "specs" rows are appended to the generated ones
# and "power" replaces the flow's vectorless power estimate with a measured figure.
V2 = "/Volumes/joule/htc-cnn-asic/v2"
V2W = os.path.join(V2, "orfs", "work")
HTCR_ARRAY = ("16 × 16 weight-stationary HTC-R array — hybrid temporal computing with run-time "
              "precision: 16 stream bits per clock, one stored 8-bit weight set serving 3- to 8-bit "
              "activations, early termination and clock gating")
HTCR_ABOUT = ("Hybrid temporal computing with run-time precision. A product is the number of 1s "
              "in the AND of two bitstreams: the activation as a thermometer code, 1 for its first "
              "x positions, and the weight with each of its bits repeated at binary-weighted "
              "positions (the top bit every second position, the next every fourth, and so on). "
              "Earlier HTC designs stepped through that stream one bit per clock; HTC-R counts 16 "
              "stream bits per clock in closed form, so each processing element is four AND gates "
              "and a 5-bit adder, with no multiplier. Because the weight stream visits the weight "
              "bits most-significant first, an n-bit activation only ever reads the top n bits of "
              "the stored weight: one 8-bit weight set serves every precision from 3 to 8 bits, and "
              "the activations alone set it — one clock per vector up to 4 bits, a few clocks with "
              "early termination above.")
BIN_ARRAY = ("16 × 16 weight-stationary binary array — 8-bit sign-magnitude multipliers and "
             "adder trees, one input vector per clock")
LENET_STORE = ("Row-banked register-file activation buffers, a 5 × 5 × C sliding window and a "
               "56-entry partial-sum buffer, clock-gated per word; weights off-core behind a "
               "128-bit read port")
RESNET_STORE = ("Three 1024 × 128-bit activation buffers built from 12 fakeram45_1024x32 SRAM "
                "macros, clock-gated per buffer, and a 64-entry partial-sum buffer; weights "
                "off-core behind a 128-bit read port")
GATE = ("gate-level simulation of whole inferences on the routed netlist with extracted "
        "parasitics, including the weight-memory reads")
EXTRA_ORFS = [
 dict(slug="orfs-nangate45-lenet5-htcr", blockmap="lenet_acc", pdk="nangate45", work=V2W, design="lenet_acc", variant="arr0",
   config=os.path.join(V2, "orfs", "acc", "config.mk"), periods=[2.5],
   title="LeNet-5 accelerator — HTC-R array",
   blurb="A complete LeNet-5 inference accelerator built around a precision-scalable hybrid "
         "temporal computing (HTC-R) array. One stored 8-bit weight set serves 4- and 8-bit "
         "activations without reconfiguration: at 4 bits a vector takes one clock, above that "
         "the array runs temporally and stops early. Buffers, sliding window, pooling, "
         "requantization and argmax are all on the die.",
   power="32.7 mW measured — average over a 4-bit inference at 400 MHz (gate-level simulation)",
   specs=[("Function", "LeNet-5 inference for Fashion-MNIST — convolution, pooling, fully connected layers and argmax"),
          ("Compute array", HTCR_ARRAY),
          ("What HTC-R is", HTCR_ABOUT),
          ("On-chip storage", LENET_STORE),
          ("Operating points", "4-bit, 4-bit with temporal oversampling, 8-bit — the same stored weights"),
          ("Accuracy", "89.83 % / 90.14 % / 90.31 % on the 10,000 test images (hardware-exact integer model)"),
          ("Energy per inference", "1.02 µJ / 1.17 µJ / 2.47 µJ — " + GATE),
          ("Latency", "29.8 µs / 33.9 µs / 91.3 µs at 400 MHz"),
          ("Verification", "RTL bit-exact against the integer model on 2,000 test images per operating point; "
                           "every gate-level inference returns the model's class"),
          ("Companion design", "Built twice with everything but the array identical — see the binary-array version")]),
 dict(slug="orfs-nangate45-lenet5-binary", blockmap="lenet_acc", pdk="nangate45", work=V2W, design="lenet_acc", variant="arr1",
   config=os.path.join(V2, "orfs", "acc", "config.mk"), periods=[2.5],
   title="LeNet-5 accelerator — binary array",
   blurb="The same LeNet-5 accelerator built around a conventional 16 × 16 binary multiplier "
         "array: the baseline for the HTC-R version, with identical buffers, sliding window, "
         "pooling, requantization and control.",
   power="41.2 mW measured — average over a W4A4 inference at 400 MHz (gate-level simulation)",
   specs=[("Function", "LeNet-5 inference for Fashion-MNIST — convolution, pooling, fully connected layers and argmax"),
          ("Compute array", BIN_ARRAY),
          ("On-chip storage", LENET_STORE),
          ("Operating points", "W4A4 (4-bit weights and activations) and W8A8"),
          ("Accuracy", "90.51 % / 90.57 % on the 10,000 test images (hardware-exact integer model)"),
          ("Energy per inference", "1.27 µJ / 1.53 µJ — " + GATE),
          ("Latency", "29.8 µs at 400 MHz"),
          ("Verification", "RTL bit-exact against the integer model on 2,000 test images per operating point; "
                           "every gate-level inference returns the model's class"),
          ("Companion design", "Built twice with everything but the array identical — see the HTC-R version")]),
 dict(slug="orfs-nangate45-resnet20-htcr", blockmap="resnet_acc", pdk="nangate45", work=V2W, design="resnet_acc", variant="arr0",
   config=os.path.join(V2, "orfs", "res", "config.mk"), periods=[2.5],
   title="ResNet-20 accelerator — HTC-R array",
   blurb="A complete ResNet-20 inference accelerator for CIFAR-10 built around a precision-scalable "
         "hybrid temporal computing (HTC-R) array. "
         "Feature maps live in twelve SRAM macros; 3 × 3 convolutions with zero padding and "
         "stride 2 are streamed from them, batch normalization and the residual additions are "
         "folded into requantization, and global average pooling, the classifier and argmax "
         "finish the network on chip.",
   power="62.4 mW measured — average over a 4-bit inference at 400 MHz (gate-level simulation)",
   specs=[("Function", "ResNet-20 inference for CIFAR-10 — 19 convolutions with residual blocks, global average pooling, classifier and argmax"),
          ("Compute array", HTCR_ARRAY),
          ("What HTC-R is", HTCR_ABOUT),
          ("On-chip storage", RESNET_STORE),
          ("Operating points", "4-bit, 4-bit with temporal oversampling, 8-bit — the same stored weights"),
          ("Accuracy", "90.25 % / 90.97 % / 91.28 % on the 10,000 test images (hardware-exact integer model)"),
          ("Energy per inference", "37.4 µJ / 43.0 µJ / 116.7 µJ — " + GATE),
          ("Latency", "591 µs / 713 µs / 3,245 µs at 400 MHz"),
          ("Verification", "RTL bit-exact against the integer model on 200 test images per operating point; "
                           "every gate-level inference returns the model's class"),
          ("SRAM macros", "fakeram45 models from the OpenROAD Nangate45 platform — abstracts without internal layout; the GDS-II rendering shows their outlines, pins and the power straps routed over them"),
          ("Companion design", "Built twice with everything but the array identical — see the binary-array version")]),
 dict(slug="orfs-nangate45-resnet20-binary", blockmap="resnet_acc", pdk="nangate45", work=V2W, design="resnet_acc", variant="arr1",
   config=os.path.join(V2, "orfs", "res", "config.mk"), periods=[2.5],
   title="ResNet-20 accelerator — binary array",
   blurb="The same ResNet-20 accelerator built around a conventional 16 × 16 binary multiplier "
         "array: the baseline for the HTC-R version, with the same twelve SRAM macros, "
         "streaming, requantization, pooling and control.",
   power="78.3 mW measured — average over a W4A4 inference at 400 MHz (gate-level simulation)",
   specs=[("Function", "ResNet-20 inference for CIFAR-10 — 19 convolutions with residual blocks, global average pooling, classifier and argmax"),
          ("Compute array", BIN_ARRAY),
          ("On-chip storage", RESNET_STORE),
          ("Operating points", "W4A4 (4-bit weights and activations) and W8A8"),
          ("Accuracy", "90.54 % / 91.70 % on the 10,000 test images (hardware-exact integer model)"),
          ("Energy per inference", "46.9 µJ / 58.9 µJ — " + GATE),
          ("Latency", "591 µs at 400 MHz"),
          ("Verification", "RTL bit-exact against the integer model on 200 test images per operating point; "
                           "every gate-level inference returns the model's class"),
          ("SRAM macros", "fakeram45 models from the OpenROAD Nangate45 platform — abstracts without internal layout; the GDS-II rendering shows their outlines, pins and the power straps routed over them"),
          ("Companion design", "Built twice with everything but the array identical — see the HTC-R version")]),
]

CAPTION = {
 "gds.png":               "GDS-II tape-out database, rendered in KLayout",
 "final_all.webp":        "Final layout — every mask layer",
 "final_routing.webp":    "Detailed routing",
 "final_placement.webp":  "Standard-cell placement",
 "final_congestion.webp": "Global-routing congestion",
 "final_clocks.webp":     "Clock nets",
 "final_ir_drop.webp":    "Power-grid IR drop",
 "final_resizer.webp":    "Cells added by the resizer",
 "final_worst_path.webp": "Worst timing path",
 "blocks.png":            "Block map — every placed cell coloured by the functional block it belongs to",
}
ORDER = ["gds.png", "blocks.png", "final_all.webp", "final_routing.webp", "final_placement.webp",
         "final_congestion.webp", "final_clocks.webp", "final_ir_drop.webp",
         "final_resizer.webp", "final_worst_path.webp"]

# ------------------------------------------------------------------ ORFS scrape
def die_from_def(p):
    if not os.path.exists(p): return None, None
    unit = 1000.0
    with open(p, errors="ignore") as f:
        for i, line in enumerate(f):
            if line.startswith("UNITS DISTANCE"):
                m = re.search(r"(\d+)\s*;", line)
                if m: unit = float(m.group(1))
            if line.startswith("DIEAREA"):
                pts = re.findall(r"\(\s*(-?\d+)\s+(-?\d+)\s*\)", line)
                if len(pts) >= 2:
                    xs = [int(a) for a, _ in pts]; ys = [int(b) for _, b in pts]
                    return (max(xs) - min(xs)) / unit, (max(ys) - min(ys)) / unit
            if i > 40: break
    return None, None

def read_cfg(pdk, nick):
    p = os.path.join(FLOW, "designs", pdk, nick, "config.mk")
    d = {}
    if os.path.exists(p):
        for line in open(p, errors="ignore"):
            m = re.match(r"\s*export\s+(\w+)\s*\??=\s*(.*?)\s*$", line)
            if m: d[m.group(1)] = m.group(2)
    return d

def read_cfg_file(p):
    d = {}
    if os.path.exists(p):
        for line in open(p, errors="ignore"):
            m = re.match(r"\s*export\s+(\w+)\s*\??=\s*(.*?)\s*$", line)
            if m: d[m.group(1)] = m.group(2)
    return d

def read_periods(pdk, nick):
    """Clock periods from the design's OWN constraint.sdc. Returns [] when the
    design has no SDC of its own — hierarchical sub-blocks are constrained by
    the generated block SDC, not by the parent's, so falling back to the parent
    would report the wrong number."""
    p = os.path.join(FLOW, "designs", pdk, nick, "constraint.sdc")
    if not os.path.exists(p): return []
    t = open(p, errors="ignore").read()
    v = [float(x) for x in re.findall(r"set\s+\w*clk\w*_period\s+([\d.]+)", t)]
    return v or [float(x) for x in re.findall(r"-period\s+([\d.]+)", t)]

def flatjson(p):
    """Flatten a metrics JSON; later duplicate keys win (the final summary block)."""
    d = {}
    if not os.path.exists(p): return d
    for k, v in re.findall(r'"([^"]+)"\s*:\s*([^,\n}]+)', open(p, errors="ignore").read()):
        d[k] = v.strip()
    return d

def orfs_runs():
    """Every finished ORFS run: first the runs listed in EXTRA_ORFS, which live in
    their own work directories and lead the OpenROAD section, then the flow tree's
    <pdk>/<design>/base runs."""
    for e in EXTRA_ORFS:
        gds = os.path.join(e["work"], "results", e["pdk"], e["design"], e["variant"], "6_final.gds")
        if not os.path.exists(gds):
            continue
        yield dict(slug=e["slug"], pdk=e["pdk"], nick=e["design"], gds=gds,
                   logd=os.path.join(e["work"], "logs", e["pdk"], e["design"], e["variant"]),
                   cfg=read_cfg_file(e["config"]), per=e["periods"],
                   title=(e["title"], e["blurb"]), extra=e)
    for gds in sorted(glob.glob(os.path.join(R, "*", "*", "base", "6_final.gds"))):
        pdk, nick = gds.split("/")[-4], gds.split("/")[-3]
        yield dict(slug="orfs-%s-%s" % (pdk, nick), pdk=pdk, nick=nick, gds=gds,
                   logd=os.path.join(FLOW, "logs", pdk, nick, "base"),
                   cfg=read_cfg(pdk, nick) or read_cfg(pdk, nick.split("_")[0]),
                   per=read_periods(pdk, nick),          # own SDC only — see read_periods
                   title=TITLES.get((pdk, nick), (nick, "")))


def orfs_records():
    out = []
    for run in orfs_runs():
        gds, slug, pdk, nick, logd = run["gds"], run["slug"], run["pdk"], run["nick"], run["logd"]
        base = os.path.dirname(gds)
        extra = run.get("extra", {})

        m  = flatjson(os.path.join(logd, "6_report.json"))
        rt = flatjson(os.path.join(logd, "5_2_route.json"))
        cfg, per = run["cfg"], run["per"]
        P = PDK[pdk]

        w, h = die_from_def(os.path.join(base, "6_final.def"))
        title, blurb = run["title"]

        fmax = num(m.get("finish__timing__fmax"))
        ws   = num(m.get("finish__timing__setup__ws"))
        tns  = num(m.get("finish__timing__setup__tns"))
        hws  = num(m.get("finish__timing__hold__ws"))
        pw   = num(m.get("finish__power__total"))
        wl   = num(rt.get("detailedroute__route__wirelength"))
        util = num(m.get("finish__design__instance__utilization"))
        macros = num(m.get("finish__design__instance__count__macros"))
        cls = ["macro","fill_cell","tap_cell","clock_buffer","timing_repair_buffer",
               "inverter","clock_inverter","sequential_cell","multi_input_combinational_cell"]
        parts = [num(m.get("finish__design__instance__count__class:%s" % c)) for c in cls]
        allinst = sum(x for x in parts if x) if any(parts) else None

        # Per-clock Fmax, when the reporter broke it out by clock.
        perclk = []
        for k, v in m.items():
            mm = re.match(r"finish__timing__fmax__clock:(.+)$", k)
            if mm and num(v): perclk.append((mm.group(1), num(v)))
        perclk.sort(key=lambda t: -t[1])

        clk = None
        if per:
            clk = ", ".join("%g %s (%s)" % (p, P["tname"], si(1.0 / (p * P["tu"]), "Hz"))
                            for p in sorted(set(per)))
        elif fmax and ws is not None and len(perclk) <= 1:
            # Single-clock block with no SDC of its own (a hierarchical sub-block).
            # Fmax is defined as 1 / (period - WNS), so the period follows exactly.
            der = (1.0 / fmax) / P["tu"] + ws
            clk = "%.4g %s (%s) — derived from F<sub>max</sub> and slack" % (
                  der, P["tname"], si(1.0 / (der * P["tu"]), "Hz"))

        if len(perclk) > 1:
            fmax_txt = ", ".join("%s %s" % (n, si(f, "Hz")) for n, f in perclk)
        elif len(perclk) == 1:
            fmax_txt = si(fmax, "Hz")
        elif fmax and ws is not None and per:
            # No per-clock breakdown. Only trust the global Fmax if it reconciles
            # with one of the SDC clocks; otherwise say what it really is.
            der = (1.0 / fmax) / P["tu"] + ws
            tied = any(abs(der - x) <= 0.01 * x for x in per)
            fmax_txt = si(fmax, "Hz") if tied else (
                si(fmax, "Hz") + " — worst register-to-register path; "
                "this block's timing is closed at the SoC level, so it does not "
                "correspond to either SDC clock")
        else:
            fmax_txt = si(fmax, "Hz") if fmax else None

        specs = [
          ("Technology",            "%s — %s" % (P["node"], P["name"])),
          ("Standard-cell library", P["cells"]),
          ("Top module",            cfg.get("DESIGN_NAME", nick)),
          ("Die size",              "%.2f × %.2f µm" % (w, h) if w else None),
          ("Die area",              area(m.get("finish__design__die__area"))),
          ("Core area",             area(m.get("finish__design__core__area"))),
          ("Instances (excl. filler)", ints(m.get("finish__design__instance__count"))),
          ("Standard cells",        ints(m.get("finish__design__instance__count__stdcell"))),
          ("Hard macros",           ints(macros) if macros else None),
          ("Sequential cells",      ints(m.get("finish__design__instance__count__class:sequential_cell"))),
          ("Tap cells",             ints(m.get("finish__design__instance__count__class:tap_cell"))),
          ("Filler cells",          ints(m.get("finish__design__instance__count__class:fill_cell"))),
          ("Total placed cells",    ints(allinst) if allinst else None),
          ("Cell area",             area(m.get("finish__design__instance__area"))),
          ("Core utilisation",      "%.1f %%" % (util * 100) if util else None),
          ("I/O pins",              ints(m.get("finish__design__io"))),
          ("Target clock",          clk),
          ("Clock domains",       "%d" % len(perclk) if len(perclk) > 1 else None),
          ("Achieved F<sub>max</sub>", fmax_txt),
          ("Setup WNS",             "%.4g %s" % (ws, P["tname"]) if ws is not None else None),
          ("Setup TNS",             "%.4g %s" % (tns, P["tname"]) if tns is not None else None),
          ("Hold WNS",              "%.4g %s" % (hws, P["tname"]) if hws is not None else None),
          ("Routed wirelength",     "%s µm" % ints(wl) if wl else None),
          ("Routed nets",           ints(rt.get("detailedroute__route__net"))),
          ("Vias",                  ints(rt.get("detailedroute__route__vias"))),
          ("Routing layers",        "%s – %s" % (cfg.get("MIN_ROUTING_LAYER", "—"),
                                                 cfg.get("MAX_ROUTING_LAYER", "—"))
                                    if cfg.get("MAX_ROUTING_LAYER") else None),
          ("Detailed-route DRC",    ints(rt.get("detailedroute__route__drc_errors"))),
          ("Antenna-violating nets", ints(rt.get("detailedroute__antenna__violating__nets"))),
          ("Total power",           extra.get("power") or ("%.3f mW" % (pw * 1e3) if pw else None)),
          ("GDS-II size",           "%.1f MB" % (os.path.getsize(gds) / 1048576.0)),
        ] + [tuple(r) for r in extra.get("specs", [])]

        d = os.path.join(IMG, slug)
        have = sorted(os.listdir(d)) if os.path.isdir(d) else []
        wanted = [(f, CAPTION[f]) for f in ORDER
                  if f in have or f.replace(".png", ".webp") in have]
        for f in have:
            if f.startswith("cts_") and f.endswith(".webp") and not f.endswith("_layout.webp"):
                wanted.append((f, "Clock tree — %s" % f[4:-5]))

        out.append(dict(
            slug=slug, name=title, blurb=blurb,
            family="openroad", familyLabel="OpenROAD Flow Scripts",
            tool="OpenROAD-flow-scripts (ORFS)",
            toolLine="Yosys synthesis → OpenROAD floorplan, placement, CTS, routing and finishing",
            pdkKey=pdk, pdkLabel=P["name"], node=P["node"], pdkNote=P["note"],
            head=[("Die", "%.0f × %.0f µm" % (w, h) if w else "—"),
                  ("Instances", ints(m.get("finish__design__instance__count")) or "—"),
                  ("Clocks", "%d domains" % len(perclk)) if len(perclk) > 1
                  else ("F<sub>max</sub>", si(fmax, "Hz") or "—") if len(perclk) == 1
                  else ("Clocks", "%d domains" % len(set(per))) if per and len(set(per)) > 1
                  else ("F<sub>max</sub>", si(fmax, "Hz") or "—")],
            specs=[[k, v] for k, v in specs if v],
            images=imgset(slug, order_cover(slug, wanted)),
        ))
    return out

# ------------------------------------------------------------------ Synopsys + OpenLane
FC = dict(family="synopsys", familyLabel="Synopsys Fusion Compiler",
          tool="Synopsys Fusion Compiler X-2025.06-SP3",
          toolLine="Fusion Compiler — RTL-to-GDSII in a single engine: synthesis, floorplanning, "
                   "placement, CTS, routing and sign-off timing",
          pdkKey="saed32", pdkLabel="Synopsys SAED32/28 nm EDK", node="32 nm",
          pdkNote=SAED32_NOTE)

def fc(slug, name, blurb, head, specs, images):
    r = dict(FC); r.update(slug=slug, name=name, blurb=blurb, head=head,
                           specs=[list(s) for s in specs], images=imgset(slug, images))
    return r

LIBS = "saed32_rvt / saed32_lvt / saed32_hvt NDM, plus saed32_sram_lp SRAM macros"
TECH = "saed32nm_1p9m.tf (1 poly, 9 metal), TLU+ Cmax / Cmin extraction models"
SCEN = "func mode; corners ss_125c and ff_m40c (two scenarios)"

synopsys = [
 fc("fc-risc-core", "RISC core with embedded SRAM",
    "A RISC processor core hardened in Fusion Compiler with four SRAM macros placed around a "
    "central logic region. The finished layout shows the memories in the upper and right "
    "quadrants and the random logic packed into the lower-left.",
    [("Chip area", "104,386 µm²"), ("Leaf cells", "8,286"), ("Macros", "4 × SRAM")],
    [("Technology", "32 nm — Synopsys SAED32/28 nm EDK"),
     ("Technology file", TECH),
     ("Cell libraries", LIBS),
     ("Top module", "risc_core"),
     ("Chip area", "104,385.648 µm²"),
     ("Core area", "91,862.128 µm²"),
     ("Site-row area", "91,862.128 µm²"),
     ("Total leaf cells", "8,286 — 70,608.401 µm²"),
     ("Standard cells", "4,308 — 15,887.812 µm²"),
     ("Hard macros", "4 — 51,184.683 µm² (SRAM)"),
     ("Sequential cells", "490 — 55,341.971 µm²"),
     ("Buffers / inverters", "1,034 — 2,986.446 µm²"),
     ("Clock-gating cells", "19"),
     ("Physical-only cells", "3,974 — 3,535.905 µm²"),
     ("Flat nets", "5,147"),
     ("Ports", "149"),
     ("Design masters", "171"),
     ("Placement blockages", "9 — 2,801.459 µm²"),
     ("Clocks", "1 master clock, no generated clocks"),
     ("Modes / corners", SCEN),
     ("Path groups", "7 (1 non-default)"),
     ("Power domains", "1 domain, 1 voltage area"),
     ("Total wire length", "135,460.53 µm"),
     ("Wires", "51,792"),
     ("Contacts", "54,010"),
     ("Metal layers available", "71 tech layers in the technology file"),
     ("Report date", "23 March 2026")],
    [("layout.png", "Finished layout — four SRAM macros and the routed core"),
     ("placement.png", "Placement"),
     ("floorplan.png", "Floorplan with macro placement")]),

 fc("fc-jpeg-encoder", "JPEG encoder",
    "A baseline JPEG encoder — the largest all-standard-cell design in the Fusion Compiler set "
    "at just over 25,000 leaf cells and 607 mm of routed wire. Closes timing at the slow corner; "
    "the fast corner still shows a small setup and hold residue.",
    [("Chip area", "124,900 µm²"), ("Leaf cells", "25,461"), ("Wire", "607 mm")],
    [("Technology", "32 nm — Synopsys SAED32/28 nm EDK"),
     ("Cell libraries", LIBS),
     ("Top module", "jpeg_encoder"),
     ("Chip area", "124,899.574 µm²"),
     ("Core area", "111,163.094 µm²"),
     ("Total leaf cells", "25,461 — 97,293.185 µm²"),
     ("Standard cells", "20,891 — 94,173.313 µm²"),
     ("Hard macros", "none — fully standard-cell"),
     ("Sequential cells", "4,335 — 36,770.062 µm²"),
     ("Buffers / inverters", "5,762 — 20,775.255 µm²"),
     ("Clock-gating cells", "76"),
     ("Physical-only cells", "4,570 — 3,119.872 µm²"),
     ("Flat nets", "25,338 (25,336 detail-routed)"),
     ("Ports", "49"),
     ("Design masters", "162"),
     ("Modes / corners", SCEN),
     ("Setup WNS / TNS", "−0.30 ns / −8.74 ns at ff_m40c (143 violating endpoints); "
                         "+0.26 ns clean at ss_125c"),
     ("Hold WNS / TNS", "−0.45 ns / −5.42 ns (102 violating endpoints)"),
     ("Total wire length", "607,456.06 µm"),
     ("Wires", "238,606"),
     ("Contacts", "241,808"),
     ("Cell area (netlist)", "94,173.31 µm²"),
     ("Peak memory", "978 MB"),
     ("Report date", "16 April 2026")],
    [("layout.png", "Finished routed layout"),
     ("merged.png", "Side-by-side flow stages"),
     ("placement.png", "Placement"),
     ("floorplan.png", "Floorplan")]),

 fc("fc-aes-cipher", "AES-128 cipher",
    "An AES cipher top hardened in Fusion Compiler. Setup timing closes at both corners with "
    "positive slack; only a handful of hold endpoints remain, and the 390-port interface "
    "dominates the pin ring around the core.",
    [("Chip area", "40,353 µm²"), ("Leaf cells", "9,999"), ("Setup", "+0.07 ns")],
    [("Technology", "32 nm — Synopsys SAED32/28 nm EDK"),
     ("Cell libraries", LIBS),
     ("Top module", "aes_cipher_top"),
     ("Chip area", "40,352.682 µm²"),
     ("Core area", "32,717.482 µm²"),
     ("Total leaf cells", "9,999 — 24,395.537 µm²"),
     ("Standard cells", "8,437 — 23,332.706 µm²"),
     ("Hard macros", "none — fully standard-cell"),
     ("Sequential cells", "537 — 4,735.973 µm²"),
     ("Buffers / inverters", "972 — 1,751.306 µm²"),
     ("Clock-gating cells", "7"),
     ("Physical-only cells", "1,562 — 1,062.830 µm²"),
     ("Flat nets", "8,920 (8,918 detail-routed)"),
     ("Ports", "390"),
     ("Design masters", "89"),
     ("Modes / corners", SCEN),
     ("Setup WNS / TNS", "+0.07 ns / 0.00 ns — timing met at both corners"),
     ("Hold WNS / TNS", "−0.03 ns / −0.09 ns (7 violating endpoints)"),
     ("Total wire length", "245,624.94 µm"),
     ("Wires", "109,287"),
     ("Contacts", "101,383"),
     ("Peak memory", "804 MB"),
     ("Report date", "16 April 2026")],
    [("layout.png", "Finished routed layout"),
     ("placement.png", "Placement"),
     ("floorplan.png", "Floorplan")]),

 fc("fc-cortex-m0", "Arm Cortex-M0 DesignStart",
    "An Arm Cortex-M0 DesignStart core (CORTEXM0DS) taken through Fusion Compiler design "
    "planning to a signed-off, fully routed block complete with an I/O pad ring and corner "
    "cells — the most complete full-chip floorplan in the collection.",
    [("Core", "Cortex-M0"), ("Stage", "Routed"), ("Chip", "Pad ring")],
    [("Design library", "CORTEXM0DS.dlib — block CORTEXM0DS/signoff.design"),
     ("Tool", "Synopsys Fusion Compiler, Design Planning / BlockWindow"),
     ("Core IP", "Arm Cortex-M0 DesignStart — a 32-bit Armv6-M processor"),
     ("Flow stage reached", "Sign-off design view: placed, clock-tree-synthesised and fully routed"),
     ("Physical features", "Peripheral I/O pad ring with corner cells, a dense multi-layer "
                           "routed core, and power-ground regions around the block"),
     ("Technology", "Not recorded in this design's source files. The other Fusion Compiler "
                    "projects in this set target the Synopsys SAED32/28 nm EDK."),
     ("Captured", "April 2026")],
    [("layout.png", "Routed core inside the I/O pad ring"),
     ("floorplan.png", "Floorplan"),
     ("gui.png", "The Fusion Compiler session that produced it")]),

 fc("fc-dual-ram", "Dual-port RAM — 256 × 8",
    "A 256-word by 8-bit dual-port RAM built entirely from standard-cell flip-flops — no "
    "compiled memory macro — so the whole 2 kbit array is 2,313 registers spread across the "
    "die. Independent read and write addresses let both ports work in the same cycle, and a "
    "synchronous reset clears the array. Setup closes at both corners; the critical path runs "
    "from the read address pins straight to the output register.",
    [("Memory", "256 × 8"), ("Clock", "200 MHz"), ("Die", "222 × 222 µm")],
    [("Technology", "32 nm — Synopsys SAED32/28 nm EDK"),
     ("Technology file", TECH),
     ("Cell libraries", LIBS),
     ("Threshold flavours", "Predominantly HVT, with RVT and LVT where timing needed it"),
     ("Top module", "dual_ram"),
     ("Memory organisation", "256 words × 8 bits — 2 kbit, register-based, no SRAM macro"),
     ("Ports", "clk, rst, wr_enb, rd_enb, wr_addr[7:0], rd_addr[7:0], data_in[7:0], data_out[7:0]"),
     ("Architecture", "Independent read and write addresses, synchronous reset clearing the whole array"),
     ("Clock", "clk, 5.000 ns period — 200 MHz, waveform {0 2.5}"),
     ("Die size", "222.31 × 222.31 µm"),
     ("Chip area", "49,422.625 µm²"),
     ("Core area", "40,930.145 µm²"),
     ("Total cell area", "26,803.30 µm²"),
     ("Cell area with physical-only", "31,383.99 µm²"),
     ("Core utilisation", "65.5 % (cell area over core area)"),
     ("Cells", "4,872 — 2,559 combinational, 2,313 sequential, 1,061 buffer/inverter"),
     ("Hard macros", "None — the array is built from flip-flops"),
     ("Combinational area", "7,146.53 µm²"),
     ("Noncombinational area", "19,656.77 µm²"),
     ("Buffer/inverter area", "2,891.90 µm²"),
     ("Placed instances incl. fill", "11,207"),
     ("Nets", "4,902"),
     ("Ports", "38"),
     ("Cell references", "60"),
     ("Modes / corners", SCEN),
     ("Setup WNS / TNS", "+0.29 ns / 0.00 ns at ff_m40c, +0.81 ns at ss_125c — met at both corners"),
     ("Hold WNS / TNS", "−0.01 ns / −0.01 ns (2 violating endpoints)"),
     ("Critical path", "rd_addr[3] input port → data_out_reg[5], slack +0.29 ns"),
     ("Clock tree (post-CTS)", "2,056 sinks, 26 levels, 838 repeaters, 30,930 µm of clock wire"),
     ("Clock latency / skew", "2.57 ns / 1.48 ns at ff_m40c; 2.17 ns / 1.24 ns at ss_125c"),
     ("Routing layers", "M1 – M9"),
     ("Open nets", "0 of 4,902"),
     ("Detailed-route DRC", "0 after route_opt; 26 reported at sign-off, after metal fill"),
     ("LVS", "M1 shorts reported among SHFILL3_HVT filler cells; the check stops after 20"),
     ("Total power", "8.85 mW — 1.71 mW dynamic, 7.13 mW leakage at the slow 125 °C corner"),
     ("Power by group", "Registers 80.5 %, clock network 13.0 %, combinational 6.6 %"),
     ("GDS-II size", "7.1 MB"),
     ("Run date", "21 September 2026")],
    [("gds.png", "GDS-II tape-out database, rendered in KLayout")]),
]

OL = dict(family="openlane", familyLabel="OpenLane",
          tool="OpenLane (OpenROAD-based RTL-to-GDSII wrapper)",
          toolLine="OpenLane drives Yosys, OpenROAD, Magic and KLayout as one push-button flow",
          pdkKey="sky130", pdkLabel="SkyWater SKY130 (OpenLane default)", node="130 nm",
          pdkNote="These runs use the OpenLane default PDK — SkyWater SKY130 with the "
                  "sky130_fd_sc_hd high-density standard cells. SKY130 is a real, "
                  "manufacturable open-source 130 nm process; the configurations here "
                  "do not override the default, so the PDK is implied rather than pinned.")

def ol(slug, name, blurb, head, specs, images):
    r = dict(OL); r.update(slug=slug, name=name, blurb=blurb, head=head,
                           specs=[list(s) for s in specs], images=imgset(slug, images))
    return r

CLK25 = ["Clock", "25 ns period — 40 MHz, port <code>clk</code>"]

openlane = [
 ol("ol-risc-core", "RISC core",
    "A RISC processor built from fourteen Verilog modules — ALU, control FSM, datapath, "
    "program counter, decoder, register file, hardware stack and a 128 × 16 SRAM — pushed "
    "through OpenLane to GDS-II. "
    "The power straps and the block outline of the register file are clearly visible in the layout.",
    [("Datapath", "64-bit"), ("Instruction", "32-bit"), ("Clock", "40 MHz")],
    [["Technology", "130 nm — SkyWater SKY130 (OpenLane default PDK)"],
     ["Standard cells", "sky130_fd_sc_hd — high density"],
     ["Top module", "risc_core"],
     CLK25,
     ["Instruction width", "32 bits"],
     ["Datapath width", "64 bits (widened from the original 16-bit design)"],
     ["Program counter", "8-bit"],
     ["Status word", "11-bit PSW with zero, negative and carry flags"],
     ["ALU opcode", "6-bit"],
     ["Register file", "7-bit addressing, three ports (A, B, C), optionally RAM-backed"],
     ["Memory", "sram128x16 — 128 words × 16 bits"],
     ["Stack", "Hardware stack with its own FSM and full flag"],
     ["DFT ports", "scan_en, test_mode"],
     ["Source modules", "risc_core, alu, control, data_path, instrn_lat, prgrm_cnt, "
                        "prgrm_cnt_top, prgrm_decode, prgrm_fsm, reg_file, stack_fsm, "
                        "stack_mem, stack_top, sram128x16"],
     ["Output", "risc_core.gds, inspected in KLayout"],
     ["Run date", "February 2026"]],
    [("layout.png", "Full die — power straps and the register-file block outline"),
     ("zoom.png", "Zoomed into the standard-cell rows and local interconnect")]),

 ol("ol-pm32", "32 × 32 signed multiplier",
    "A signed 32 × 32 multiplier built on a serial-parallel multiplier core (SPM), modelled on "
    "Atmel's AT6000 FPGA application notes. A three-state FSM sequences the shift-and-add "
    "iterations and raises <code>done</code> when the 64-bit product is ready.",
    [("Operands", "32 × 32 signed"), ("Product", "64-bit"), ("Clock", "40 MHz")],
    [["Technology", "130 nm — SkyWater SKY130 (OpenLane default PDK)"],
     ["Standard cells", "sky130_fd_sc_hd — high density"],
     ["Top module", "pm32 (instantiates spm)"],
     CLK25,
     ["Operands", "mc[31:0] × mp[31:0], signed"],
     ["Product", "p[63:0]"],
     ["Handshake", "start input, done output"],
     ["Architecture", "Serial-parallel multiplier (SPM), parameterised SIZE = 32"],
     ["Control", "Three-state FSM — IDLE, RUNNING, DONE — with an 8-bit iteration counter"],
     ["Provenance", "SPM core after the Atmel AT6000 application notes DOC0529 / DOC0716, "
                    "implemented by mshalan@aucegypt.edu (2016)"],
     ["Source files", "pm32.v, spm.v"],
     ["Run date", "February 2026"]],
    [("layout.png", "Routed layout in KLayout")]),

 ol("ol-cnn-3x3", "CNN layer — 3 × 3 convolution",
    "One complete convolutional-neural-network layer in hardware: a 3 × 3 convolution with a "
    "hard-coded Sobel-style kernel, followed by ReLU activation and 2 × 2 max pooling. "
    "Line buffers hold two image rows so a sliding 3 × 3 window can stream over the input "
    "one pixel per cycle.",
    [("Pipeline", "Conv→ReLU→Pool"), ("Data", "8-bit fixed"), ("Clock", "40 MHz")],
    [["Technology", "130 nm — SkyWater SKY130 (OpenLane default PDK)"],
     ["Standard cells", "sky130_fd_sc_hd — high density"],
     ["Top module", "cnn_layer"],
     CLK25,
     ["Data width", "8-bit fixed point (DATA_WIDTH = 8)"],
     ["Image width", "8 pixels (IMG_WIDTH = 8, parameterised)"],
     ["Stage 1", "3 × 3 convolution with two line buffers and a sliding-window register array"],
     ["Kernel", "Hard-coded [[1,0,−1],[2,0,−2],[1,0,−1]] — a Sobel vertical-edge operator"],
     ["MAC accumulator", "2·DATA_WIDTH + 4 bits, signed"],
     ["Stage 2", "ReLU activation"],
     ["Stage 3", "2 × 2 max pooling"],
     ["Interface", "pixel_in / valid_in streaming in, pool_out / valid_out streaming out"],
     ["Reset", "Active-low asynchronous (rst_n)"],
     ["Variants", "Two configurations were run: one_cnn_layer3x3.v (shown) and a second "
                  "one_cnn_layer.v build with no layout captured"],
     ["Run date", "February 2026"]],
    [("layout.png", "Routed layout in KLayout")]),

 ol("ol-riscv-alu", "RISC-V 32-bit ALU",
    "A single-cycle 32-bit arithmetic-logic unit covering the RV32I integer operations — add, "
    "subtract, the three shifts, signed and unsigned set-less-than, and the bitwise logic — "
    "with zero, overflow and carry-out flags. The layout shows a dense cell array with the "
    "64 operand and result pins fanning out to the die edge.",
    [("Width", "32-bit"), ("Operations", "10"), ("Clock", "40 MHz")],
    [["Technology", "130 nm — SkyWater SKY130 (OpenLane default PDK)"],
     ["Standard cells", "sky130_fd_sc_hd — high density"],
     ["Top module", "riscv_alu_32bit"],
     CLK25,
     ["Operand width", "32 bits — operand_a, operand_b"],
     ["Result width", "32 bits"],
     ["Opcode", "4-bit alu_op, encoded from the RISC-V funct3 / funct7 fields"],
     ["Operations", "ADD, SUB, SLL, SLT, SLTU, XOR, SRL, SRA, OR, AND"],
     ["Flags", "zero, overflow (signed), carry_out"],
     ["Arithmetic", "33-bit internal add and subtract paths for carry and borrow capture"],
     ["Overflow detection", "Sign-comparison logic on the operands and the result"],
     ["Output", "riscv_alu_32bit.gds, inspected in KLayout"],
     ["Run date", "February 2026"]],
    [("layout.png", "Routed layout with the pin ring fanning out to the die edge")]),
]

# ------------------------------------------------------------------ emit
import sys
if "--list-extra" in sys.argv:
    # For render_all_gds.sh: slug, GDS, routed database and block-map rules per extra run.
    for e in EXTRA_ORFS:
        b = os.path.join(e["work"], "results", e["pdk"], e["design"], e["variant"])
        print(e["slug"], os.path.join(b, "6_final.gds"), os.path.join(b, "6_final.odb"), e.get("blockmap", ""))
    sys.exit(0)

designs = orfs_records() + synopsys + openlane

for d in designs:
    d["searchText"] = " ".join([d["name"], d["blurb"], d["tool"], d["pdkLabel"], d["node"]] +
                               [str(v) for s in d["specs"] for v in s]).lower()

os.makedirs(os.path.join(SITE, "assets"), exist_ok=True)
with open(os.path.join(SITE, "assets", "data.js"), "w") as f:
    f.write("window.DESIGNS = ")
    json.dump(designs, f, ensure_ascii=False, indent=1)
    f.write(";\n")

nimg = sum(len(d["images"]) for d in designs)
print("designs: %d   images: %d" % (len(designs), nimg))
for d in designs:
    print("  %-46s %-10s %-8s imgs=%-3d specs=%d" %
          (d["slug"], d["family"], d["node"], len(d["images"]), len(d["specs"])))

#!/usr/bin/env python3
"""Block map of a routed OpenROAD design: every placed standard cell coloured by the
functional block that owns it, hard macros drawn as boxes.

python3 tools/render_blockmap.py --odb <6_final.odb> --rules <resnet_acc|lenet_acc> --out <blocks.png>

Cell positions come from the routed database (OpenROAD, dump_cells.tcl); blocks are
recognised from instance names, which is only possible for designs whose RTL keeps
named registers or hierarchy, so the rule sets below are per design.  Unnamed logic
(synthesised glue in a flattened netlist) falls into "control and datapath".
"""
import argparse
import os
import subprocess
import tempfile

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt  # noqa: E402
import numpy as np  # noqa: E402
from matplotlib.colors import ListedColormap  # noqa: E402
from matplotlib.patches import Patch, Rectangle  # noqa: E402

HERE = os.path.dirname(os.path.abspath(__file__))
ORFS_ENV = os.environ.get("ORFS_ENV", "/Volumes/joule/OpenROAD-flow-scripts-Darwin/env.sh")
BG = "#05070d"

# (label, colour); the last entry catches everything unnamed
BLOCKS = [("compute array", "#2dd4bf"), ("partial-sum buffer", "#f59e0b"),
          ("activation buffers", "#c084fc"), ("input window / stream", "#60a5fa"),
          ("requantization", "#f43f5e"), ("clock tree", "#e5e7eb"), ("control and datapath", "#475569")]
MACRO = ("activation SRAM macros", "#a855f7")

RULES = {
    # LeNet-5 accelerator (lenet_acc.v): register-file buffers, 5x5xC sliding window
    "lenet_acc": [
        (0, lambda n: "u_arr" in n),
        (1, lambda n: n.startswith(("ps[", "ps_", "u_psr")) or ("clkbuf" in n and "ps[" in n)),
        (2, lambda n: n.startswith(("ib[", "fa[", "fb[", "bk[", "u_far", "u_fbr", "pw["))),
        (3, lambda n: n.startswith(("win", "slot[", "nc[", "u_cg_win"))),
        (4, lambda n: n.startswith(("mx[", "pr[", "vr[", "u_lane", "u_cg_mx", "u_cg_pr", "u_cg_vr"))),
        (5, lambda n: n.startswith(("clkbuf", "clkload", "delaybuf"))),
    ],
    # ResNet-20 accelerator (resnet_acc.v): SRAM activation buffers, streamed input
    "resnet_acc": [
        (0, lambda n: "u_arr" in n),
        (1, lambda n: n.startswith(("ps[", "ps_", "u_psr")) or ("clkbuf" in n and "ps[" in n)),
        (2, lambda n: n.startswith("ab[")),
        (3, lambda n: n.startswith(("f0", "f1", "f2", "fb[", "u_fcr", "lane["))),
        (4, lambda n: n.startswith(("mx", "pr[", "pb", "rr", "rs", "vr", "qreg", "gsum", "u_lane", "pw[",
                                    "u_cg_p", "u_cg_mx", "u_cg_gs"))),
        (5, lambda n: n.startswith(("clkbuf", "clkload", "delaybuf"))),
    ],
}


def dump(odb):
    fd, out = tempfile.mkstemp(suffix=".txt")
    os.close(fd)
    cmd = f"source {ORFS_ENV} >/dev/null 2>&1; openroad -no_init -exit {HERE}/dump_cells.tcl"
    subprocess.run(["bash", "-c", cmd], env=dict(os.environ, ODB=odb, OUT=out), check=True,
                   capture_output=True)
    return out


def load(path, rules, bin_um):
    die = None
    xs, ys, ws, hs, cs, macros = [], [], [], [], [], []
    for line in open(path):
        if line.startswith("#die"):
            die = [float(v) for v in line.split()[1:]]
            continue
        f = line.split()
        if f[1].startswith(("FILLCELL", "TAPCELL")):
            continue
        x, y, w, h = map(float, f[2:6])
        if f[1].startswith("fakeram"):
            macros.append((x, y, w, h))
            continue
        n = f[0].replace("\\", "")
        c = len(BLOCKS) - 1
        for k, test in rules:
            if test(n):
                c = k
                break
        xs.append(x); ys.append(y); ws.append(w); hs.append(h); cs.append(c)
    xs, ys, ws, hs, cs = map(np.array, (xs, ys, ws, hs, cs))
    nb = int(np.ceil(die[2] / bin_um))
    acc = np.zeros((len(BLOCKS), nb, nb))
    ix = np.clip(((xs + ws / 2) / bin_um).astype(int), 0, nb - 1)
    iy = np.clip(((ys + hs / 2) / bin_um).astype(int), 0, nb - 1)
    np.add.at(acc, (cs, iy, ix), ws * hs)
    grid = np.where(acc.sum(0) > 0, acc.argmax(0), -1)
    return die, grid, macros, sorted(set(cs.tolist()))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--odb", required=True)
    ap.add_argument("--rules", required=True, choices=sorted(RULES))
    ap.add_argument("--out", required=True)
    ap.add_argument("--bin", type=float, default=2.0, help="bin size in um")
    a = ap.parse_args()
    cells = dump(a.odb)
    die, grid, macros, used = load(cells, RULES[a.rules], a.bin)
    os.remove(cells)
    plt.rcParams.update({"font.family": "sans-serif", "font.size": 11})
    fig = plt.figure(figsize=(8.0, 8.9), facecolor=BG)
    ax = fig.add_axes([0.04, 0.13, 0.92, 0.92 * 8.0 / 8.9])
    ax.set_facecolor(BG)
    cols = [c for _, c in BLOCKS]
    if macros:                      # the buffers are the macros; colour their gate cells alike
        cols[2] = MACRO[1]
    cmap = ListedColormap([BG] + cols)
    ax.imshow(grid + 1, origin="lower", cmap=cmap, vmin=0, vmax=len(BLOCKS), interpolation="nearest",
              extent=[0, die[2], 0, die[3]])
    for (x, y, w, h) in macros:
        ax.add_patch(Rectangle((x, y), w, h, facecolor=MACRO[1], edgecolor="#f5f3ff", linewidth=0.6))
    ax.set_xlim(0, die[2]); ax.set_ylim(0, die[3])
    ax.set_xticks([]); ax.set_yticks([])
    for s in ax.spines.values():
        s.set_color("#94a3b8"); s.set_linewidth(0.8)
    handles = [Patch(color=c, label=n) for k, (n, c) in enumerate(BLOCKS) if k in used and not (macros and k == 2)]
    if macros:
        handles.insert(2, Patch(facecolor=MACRO[1], edgecolor="#f5f3ff", label=MACRO[0]))
    leg = fig.legend(handles=handles, loc="lower center", ncol=3, frameon=False, fontsize=10.5,
                     bbox_to_anchor=(0.5, 0.005), handlelength=1.2, columnspacing=1.4)
    for t in leg.get_texts():
        t.set_color("#e5e7eb")
    fig.savefig(a.out, dpi=180, facecolor=BG)
    print("WROTE", a.out)


if __name__ == "__main__":
    main()

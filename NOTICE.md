# Attribution and third-party notices

This gallery shows physical implementations of circuits that, in most cases,
VSCLAB did not author. What the lab contributes is the implementation work —
the floorplanning, placement, clock-tree synthesis, routing and finishing — and
the resulting images. The RTL, the process design kits and the EDA tools all
belong to others and keep their own licenses.

This file records where each piece came from. Several of the upstream licenses
*require* that their notice travel with redistributed material, so please carry
the relevant rows with you if you reuse an image.

Licenses quoted below were read from the copies in the source trees this site
was built from; see **Where to verify** at the end.

---

## The repository itself

| Part | Holder | License |
| --- | --- | --- |
| Website source and generator scripts | VSCLAB, UC Riverside | MIT — [`LICENSE`](LICENSE) |
| Layout images and design descriptions | VSCLAB, UC Riverside | CC BY 4.0 — [`LICENSE-CONTENT`](LICENSE-CONTENT) |

---

## Flows and tools

| Tool | Holder | License |
| --- | --- | --- |
| OpenROAD-flow-scripts (build and run scripts) | The Regents of the University of California, 2018–2023 | BSD 3-Clause |
| OpenROAD | The Regents of the University of California and contributors | BSD 3-Clause (per-tool licenses under `tools/`) |
| OpenLane | Efabless Corporation | Apache-2.0 |
| Yosys | Claire Xen / YosysHQ | ISC |
| KLayout (used to render the GDS-II images) | Matthias Köfferlein | GPL-3.0 — tool only; rendering with it does not place its output under the GPL |
| Synopsys Fusion Compiler, Design Compiler, IC Compiler II | Synopsys, Inc. | Commercial / university program license |

## Process design kits

| PDK | Node | Holder | License |
| --- | --- | --- | --- |
| ASAP7 | 7 nm (predictive) | L. T. Clark, V. Vashishtha, Arizona State University, 2020 | BSD 3-Clause |
| FreePDK45 / Nangate45 | 45 nm | Nangate / ORFS platform package | Apache-2.0 |
| GF180MCU | 180 nm | GlobalFoundries PDK Authors, 2022 | Apache-2.0 |
| SkyWater SKY130 | 130 nm | Google LLC / SkyWater Technology | Apache-2.0 |
| **Synopsys SAED32/28 EDK** | 32 nm | Synopsys, Inc. | **Proprietary — university/EDK agreement. See the caution below.** |

## Designs

### OpenROAD Flow Scripts

| Design in the gallery | RTL origin | License |
| --- | --- | --- |
| AES-128 cipher (all ASAP7, GF180 and Nangate45 variants — hierarchical, MBFF, LVT, hybrid) | ASICs World Services, LTD. and AUTHORS, 2000–2009 | BSD-3-Clause-style, written to cover **source, netlist, binary and silicon forms**. Redistribution must reproduce the copyright notice — this row satisfies that for the images. |
| JPEG encoder (LVT) | ASICs World Services, LTD. and AUTHORS, 2000–2009 | Same as above |
| Ethernet MAC, Ethernet MAC (LVT) | OpenCores 10/100 Ethernet MAC | **GNU LGPL v2.1 or later.** See the caution below. |
| Ibex RV32 CPU core | lowRISC | Apache-2.0 |
| SRAM macro 256 × 32 (RV32I mock-SRAM) | ORFS `riscv32i`, memory macro from FakeRAM2.0 | Apache-2.0 |
| UART, UART receiver block | Alex Forencich, 2014–2017 | MIT |
| GCD accelerator, GCD (CCS) | Originally generated with PyMTL (Cornell) — no separate license file in the ORFS tree | Covered by the ORFS BSD 3-Clause license |
| Mock CPU (two clock domains) | ORFS `mock-array` test vehicle — no separate license file | Covered by the ORFS BSD 3-Clause license |

### OpenLane

| Design | RTL origin | License |
| --- | --- | --- |
| 32 × 32 signed multiplier (`pm32` / `spm`) | Copyright 2016 Mohamed Shalan, American University in Cairo. The SPM core follows Atmel application notes DOC0529 / DOC0716. | No license text in the source files. Distributed with OpenLane as an example design — **confirm the applicable terms before redistributing the RTL.** Only the layout image appears here. |
| RISC core | No copyright header in the sources | Provenance not recorded in the files — **confirm authorship before asserting it.** |
| CNN layer (3 × 3 convolution) | No copyright header in the sources | Believed lab-authored — confirm |
| RISC-V 32-bit ALU | No copyright header in the sources | Believed lab-authored — confirm |

### Synopsys Fusion Compiler

| Design | Origin | License |
| --- | --- | --- |
| AES-128 cipher (`aes_cipher_top`) | Same OpenCores/ASICs World Services lineage as above | BSD-3-Clause-style, attribution required |
| JPEG encoder | Same lineage | BSD-3-Clause-style, attribution required |
| RISC core with embedded SRAM | Lab implementation; SRAM macros from the SAED32 EDK (`saed32_sram_lp`) | Design: confirm. Macros: Synopsys EDK terms |
| **Arm Cortex-M0 DesignStart (`CORTEXM0DS`)** | Arm Limited | **Arm DesignStart license. See the caution below.** |

---

## Three things to check before you publish

These are the items I could not verify from the files available here. None of
them blocks publishing the *images* in the ordinary academic sense — layouts
built in SAED32 and Cortex-M0 DesignStart appear in published papers routinely —
but the terms are yours to confirm, not mine to assume.

**1. Synopsys SAED32/28 EDK.** The kit is distributed under a Synopsys
university agreement. That agreement governs redistribution of the *kit* — the
technology files, the NDM libraries, the SRAM macros — none of which is in this
repository. What is here is images of designs implemented with it. Check your
department's EDK agreement for any clause on publishing derived layout figures,
and do not add GDS, LEF, LIB, NDM or `.tf` files from the kit to the repo.

**2. Arm Cortex-M0 DesignStart.** The `CORTEXM0DS` core comes under an Arm
licence with its own terms on use and publication, and "Arm" and "Cortex" are
Arm trademarks. Confirm your DesignStart agreement covers publishing a layout
figure, and keep the RTL and any Arm-supplied deliverables out of the repo.

**3. The Ethernet MAC is LGPL.** Every other design here is under a permissive
license; the OpenCores Ethernet MAC is LGPL v2.1-or-later. Whether a rendered
picture of a layout is a "derivative work" of LGPL Verilog is genuinely
unsettled, and the LGPL's mechanics were written for linked software, not
images. The conservative options, in order of effort: keep the two `ethmac`
entries and carry this notice (what the repo does today); or drop them if your
institution wants no LGPL exposure at all. Either way, do not add the ethmac
RTL or netlists to this repository without following the LGPL's source-offer
requirements.

## What is deliberately not in this repository

No PDK files, no standard-cell libraries, no RTL, no netlists, no GDS-II, DEF or
LEF. The repository holds rendered images and the numbers read out of the tool
reports. This keeps it clear of the redistribution clauses that apply to the
kits themselves, and is why the caution list above is short.

## Where to verify

| Source | Where its license lives |
| --- | --- |
| OpenROAD-flow-scripts | `LICENSE_BUILD_RUN_SCRIPTS` at the repo root |
| A platform/PDK | `flow/platforms/<platform>/` — and the headers inside the LEF and Liberty files |
| An ORFS design's RTL | `flow/designs/src/<design>/LICENSE` |
| OpenROAD tools | `tools/<tool>/` or `tools/OpenROAD/src/<tool>/` |
| SAED32 EDK, Arm DesignStart | Your institution's signed agreements — not in any of these trees |

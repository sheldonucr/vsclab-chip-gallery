# The VLSI chips designed by VSCLAB @ UC Riverside

A static gallery of the lab's physical designs — 32 designs across five technology nodes,
hardened with Synopsys Fusion Compiler, OpenLane and the OpenROAD flow, with 256
layout views.

## Viewing it

Open `index.html` in a browser. It is plain HTML, CSS and JavaScript with no build step
and no network dependencies, so `file://` works:

```bash
open index.html
```

To serve it over HTTP instead (useful before publishing anywhere):

```bash
python3 -m http.server 8931
```

## What's here

```
index.html            the page
assets/style.css      styling
assets/app.js         filtering, search and the detail sheet
assets/data.js        the generated design dataset (window.DESIGNS)
assets/img/<slug>/    layout images, one folder per design
tools/                the scripts that regenerate everything
```

Each design folder holds one `.webp` per view, 1280 px on the long edge. That is what
the repository ships. The KLayout renderings are produced as full-resolution PNGs first,
but those are local intermediates and are gitignored — `tools/render_all_gds.sh`
regenerates them from the GDS-II. The Synopsys and OpenLane originals are screenshots
kept in the design directories, outside this repository.

## Where the content comes from

| Section | Source |
| --- | --- |
| Synopsys Fusion Compiler | `chip_design_work_desk/{RISC_core_fc, JEPG_encoder_fc, AES_cipher_fc, arm_core_April_2026}` — layout PNGs plus the `report_design` / `report_qor` summaries in the `.docx` design reports; and `dual_ram_project_icc` — a full RTL-to-GDSII run, read from `reports/*.rpt`, `outputs/dual_ram.def` and `outputs/dual_ram.sdc`, with the layout rendered from `outputs/dual_ram.gds` |
| OpenLane | `chip_design_work_desk/openlane_designs/*` — `config.json`, RTL and KLayout captures |
| OpenROAD Flow Scripts | `OpenROAD-flow-scripts-Darwin/flow` — `results/`, `reports/` and `logs/` for each `<pdk>/<design>/base` run; and the LeNet-5 and ResNet-20 accelerators from `htc-cnn-asic/v2/orfs/work`, read the same way from their own work directory and flow variants (`EXTRA_ORFS` in `build_site.py`) |

Every number on the page comes from a tool-generated report.
For the OpenROAD designs that means `logs/<pdk>/<design>/base/6_report.json` and
`5_2_route.json`, the `DIEAREA` line of `6_final.def`, and the design's `config.mk`
and `constraint.sdc`. Note that ASAP7 Liberty timing is in picoseconds while the other
platforms are in nanoseconds; the generator accounts for this when it converts clock
periods to frequencies.

## Regenerating

Rendering the GDS-II files needs [KLayout](https://www.klayout.de/) and `cwebp`
(`brew install webp`). This step is slow — it reads up to 65 MB of GDS per design — and
skips designs that already have a `gds.png`:

```bash
./tools/render_all_gds.sh
```

Rebuilding `assets/data.js` from the reports is fast and safe to re-run any time:

```bash
python3 tools/build_site.py
```

Paths to the source trees are set at the top of `tools/build_site.py` (`FLOW`
and `SITE`), and can be overridden for `render_all_gds.sh` with the
`ORFS_RESULTS` and `KLAYOUT` environment variables. Both trees are outside this
repository, so regeneration only works on a machine that has them.

### Adding a design

- **OpenROAD:** finish a run so that `results/<pdk>/<design>/base/6_final.gds` exists,
  then re-run both scripts. Give it a title and a description in the `TITLES` table in
  `build_site.py`; without one it falls back to the directory name.
- **OpenROAD, outside the flow tree:** add a record to `EXTRA_ORFS` in `build_site.py`
  with the run's work directory, design, flow variant, config and clock period. Its
  `specs` rows are appended to the generated ones, and `power` replaces the flow's
  vectorless estimate with a measured figure. `render_all_gds.sh` then renders its GDS-II,
  copies the flow's report images and, when a `blockmap` rule set is named, draws a block
  map from the routed database with `tools/render_blockmap.py`.
- **Anything else:** drop the images in `assets/img/<slug>/`, add a record to the
  `synopsys` or `openlane` list in `build_site.py`, and re-run it.

## License

The repository holds two kinds of material, each under its own license:

| | License | File |
| --- | --- | --- |
| Website source and generator scripts | MIT | [`LICENSE`](LICENSE) |
| Layout images and design descriptions | CC BY 4.0 | [`LICENSE-CONTENT`](LICENSE-CONTENT) |

The images are free to download and reuse, including commercially, as long as
you credit VSCLAB. The split follows normal practice: software licenses do not
suit images, and content licenses do not suit code.

Neither license reaches the underlying circuits, PDKs or tools — those belong to
their authors and keep their own terms, several of which require attribution.
**[`NOTICE.md`](NOTICE.md) records the origin and license of every design and
PDK in the gallery**, and lists three whose terms are set by separate
agreements: the Synopsys SAED32 EDK, the Arm Cortex-M0 DesignStart licence, and
the LGPL status of the OpenCores Ethernet MAC.

No PDK files, RTL, netlists or GDS-II are committed here — only rendered images
and the numbers read out of the tool reports.

## Technology notes

ASAP7 is a predictive 7 nm FinFET kit, and FreePDK45/Nangate45 and the Synopsys
SAED32 EDK are academic kits for research and teaching. SKY130 and GF180MCU are
open-source PDKs for manufacturable foundry processes.

The PDK for the Arm Cortex-M0 entry is not recorded in that design's source files.

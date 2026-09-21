# The VLSI chips designed by VSCLAB @ UC Riverside

A static gallery of the lab's physical designs — 27 designs across five technology nodes,
hardened with Synopsys Fusion Compiler, OpenLane and the OpenROAD flow, with 211
layout views.

## Viewing it

Open `index.html` in a browser. It is plain HTML, CSS and JavaScript with no build step
and no network dependencies, so `file://` works:

```bash
open /Volumes/joule/chip_designed_io/index.html
```

To serve it over HTTP instead (useful before publishing anywhere):

```bash
cd /Volumes/joule/chip_designed_io && python3 -m http.server 8931
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

Each design folder holds a `.webp` display copy of every view. Where the original was a
full-resolution PNG — the KLayout GDS renderings, and the Synopsys and OpenLane GUI
captures — the PNG is kept beside it and linked from the detail view as
"full resolution".

## Where the content comes from

| Section | Source |
| --- | --- |
| Synopsys Fusion Compiler | `chip_design_work_desk/{RISC_core_fc, JEPG_encoder_fc, AES_cipher_fc, arm_core_April_2026}` — layout PNGs plus the `report_design` / `report_qor` summaries in the `.docx` design reports |
| Synopsys Design Compiler | `chip_design_work_desk/dual_ram_project_icc` — **not currently shown.** The `dual_ram` record is written up in `tools/build_site.py` but held back from the gallery; add `dc` to the `designs` list there to bring it back |
| OpenLane | `chip_design_work_desk/openlane_designs/*` — `config.json`, RTL and KLayout captures |
| OpenROAD Flow Scripts | `OpenROAD-flow-scripts-Darwin/flow` — `results/`, `reports/` and `logs/` for each `<pdk>/<design>/base` run |

Every number on the page is read from a tool-generated report. Nothing is estimated.
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

Paths to the two source trees are set at the top of `tools/build_site.py`
(`FLOW`) and can be overridden for `render_all_gds.sh` with the `ORFS_RESULTS` and
`KLAYOUT` environment variables.

### Adding a design

- **OpenROAD:** finish a run so that `results/<pdk>/<design>/base/6_final.gds` exists,
  then re-run both scripts. Give it a title and a description in the `TITLES` table in
  `build_site.py`; without one it falls back to the directory name.
- **Anything else:** drop the images in `assets/img/<slug>/`, add a record to the
  `synopsys`, `dc` or `openlane` list in `build_site.py`, and re-run it.

## License

Two licenses, because the repository holds two different kinds of thing:

| | License | File |
| --- | --- | --- |
| Website source and generator scripts | MIT | [`LICENSE`](LICENSE) |
| Layout images and design descriptions | CC BY 4.0 | [`LICENSE-CONTENT`](LICENSE-CONTENT) |

The images are free to download and reuse, including commercially, as long as
you credit VSCLAB. Software licenses are a poor fit for images and content
licenses are a poor fit for code, which is why they are split.

Neither license reaches the underlying circuits, PDKs or tools — those belong to
their authors and keep their own terms, several of which require attribution.
**[`NOTICE.md`](NOTICE.md) records the origin and license of every design and
PDK in the gallery**, and flags three items to confirm before publishing:
the Synopsys SAED32 EDK agreement, the Arm Cortex-M0 DesignStart licence, and
the LGPL status of the OpenCores Ethernet MAC.

No PDK files, RTL, netlists or GDS-II are committed here — only rendered images
and the numbers read out of the tool reports.

## A note on the PDKs

ASAP7, FreePDK45/Nangate45 and the Synopsys SAED32 EDK are academic or predictive kits,
not manufacturable processes. SKY130 and GF180MCU are real open-source foundry PDKs.
The Arm Cortex-M0 entry does not record its PDK in the captured artifacts; the page says
so rather than guessing.

import pya, os

gds = os.environ["GDS_IN"]
out = os.environ["PNG_OUT"]
W   = int(os.environ.get("IMG_W", "1500"))
H   = int(os.environ.get("IMG_H", "1500"))

# Cool -> warm ramp, reads like a metal stack from substrate to top metal
PALETTE = [
    0x2d6cdf, 0x00b4d8, 0x00d9a5, 0x4ade80, 0xa3e635, 0xfacc15,
    0xfb923c, 0xf43f5e, 0xec4899, 0xa855f7, 0x818cf8, 0x22d3ee,
    0x34d399, 0x84cc16, 0xeab308, 0xf97316, 0xef4444, 0xd946ef,
    0x8b5cf6, 0x38bdf8, 0x2dd4bf, 0x65a30d, 0xf59e0b, 0xdc2626,
    0xc026d3, 0x7c3aed, 0x0ea5e9, 0x14b8a6, 0x92e600, 0xffd60a,
]

app = pya.Application.instance()

# Label suppression has to happen at application level and BEFORE the view is
# created — setting it on the view afterwards reads back as applied but does not
# affect the render. Two independent sources of labels:
#   text-visible        TEXT objects. Cell libraries such as SAED32 put one
#                       inside each standard-cell definition, so it is drawn
#                       once per instance and the master names end up written
#                       across the whole die.
app.set_config("text-visible", "false")
app.set_config("edit-mode", "true")          # needed to flatten, below

mw = app.main_window()
mw.create_layout(0)
view = mw.current_view()
view.load_layout(gds, 0)
view.max_hier()

# KLayout also writes each cell's master name over every instance wide enough to
# hold it — "(SDFFX2_RVT)" and friends across every standard-cell row. That is
# governed by inst-visible / min-inst-label-size, but neither is consulted by
# save_image_with_options, only by the interactive canvas. Flattening removes the
# instances, and with them the labels. It costs little and leaves the file on
# disk untouched.
view.cellview(0).layout().top_cell().flatten(-1, True)

view.set_config("background-color", "#05070d")
view.set_config("grid-visible", "false")
view.set_config("text-visible", "false")

# Outline-only ("hollow") drawing. Filled polygons let a single blanket layer —
# a well, an implant or metal fill — paint over the whole die and hide everything
# beneath it; outlines keep the routing and macro structure readable.
idx = 0
for lp in view.each_layer():
    c = 0xff000000 | PALETTE[idx % len(PALETTE)]
    lp.fill_color = c
    lp.frame_color = c
    lp.dither_pattern = 1      # 1 = hollow
    lp.width = 1
    lp.visible = True
    idx += 1

view.zoom_fit()
# (file, w, h, linewidth, oversampling, resolution, target_box, monochrome)
view.save_image_with_options(out, W, H, 1, 2, 0, pya.DBox(), False)
print("WROTE %s layers=%d" % (out, idx))
app.exit(0)

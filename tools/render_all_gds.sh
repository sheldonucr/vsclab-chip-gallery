#!/bin/zsh
# Render every finished ORFS GDS-II to assets/img/<slug>/gds.png with KLayout (plus,
# for the runs listed in EXTRA_ORFS, a block map and the flow's report images), then
# make a 1280 px WebP display copy of every PNG in the asset tree.
#
# The WebP copies are what the site serves and what the repository ships. The
# PNGs are local intermediates: cwebp input, and the marker this script uses to
# skip work it has already done. They are gitignored. Delete a gds.png to force
# that design to render again.
set -e
KL=${KLAYOUT:-/Applications/KLayout/klayout.app/Contents/MacOS/klayout}
HERE=${0:a:h}
SITE=${HERE:h}
R=${ORFS_RESULTS:-/Volumes/joule/OpenROAD-flow-scripts-Darwin/flow/results}
OUT=$SITE/assets/img
export IMG_W=1500 IMG_H=1500

for g in $R/*/*/base/6_final.gds; do
  pdk=${${g#$R/}%%/*}
  rest=${g#$R/$pdk/}; des=${rest%%/*}
  slug="orfs-${pdk}-${des}"
  mkdir -p "$OUT/$slug"
  [ -f "$OUT/$slug/gds.png" ] && { echo "skip $slug"; continue; }
  echo "rendering $slug"
  GDS_IN="$g" PNG_OUT="$OUT/$slug/gds.png" $KL -z -nc -rx -r "$HERE/render_gds.py"
done

# Runs kept outside the flow tree (EXTRA_ORFS in build_site.py): the GDS-II rendering,
# a block map from the routed database, and the flow's own report images.
python3 "$HERE/build_site.py" --list-extra | while read slug g odb rules; do
  mkdir -p "$OUT/$slug"
  if [ ! -f "$OUT/$slug/gds.png" ]; then
    echo "rendering $slug"
    GDS_IN="$g" PNG_OUT="$OUT/$slug/gds.png" $KL -z -nc -rx -r "$HERE/render_gds.py"
  fi
  if [ -n "$rules" ] && [ ! -f "$OUT/$slug/blocks.png" ]; then
    python3 "$HERE/render_blockmap.py" --odb "$odb" --rules "$rules" --out "$OUT/$slug/blocks.png"
  fi
  rep=${${g:h}/\/results\//\/reports\/}
  cp -n "$rep"/final_*.webp "$rep"/cts_*.webp "$OUT/$slug/" 2>/dev/null || true
done

for p in $OUT/*/*.png; do
  d=${p:h}; b=${${p:t}%.png}
  w=$(sips -g pixelWidth "$p" | awk '/pixelWidth/{print $2}')
  if [ "$w" -gt 1280 ]; then
    cwebp -quiet -q 80 -m 5 -resize 1280 0 "$p" -o "$d/$b.webp"
  else
    cwebp -quiet -q 80 -m 5 "$p" -o "$d/$b.webp"
  fi
done
echo done

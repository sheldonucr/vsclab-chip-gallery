#!/bin/zsh
# Render every finished ORFS GDS-II to assets/img/<slug>/gds.png with KLayout,
# then make a 1280 px WebP display copy of every PNG in the asset tree.
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

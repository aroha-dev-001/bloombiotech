#!/usr/bin/env bash
# Scrub encodes for one leg: desktop landscape + phone portrait (centre 9:16 crop).
#   enc.sh <in.mp4> <name> [desktop_width] [crf]
# writes public/world/<name>.mp4, public/world/<name>-m.mp4, and first-frame posters.
# A light temporal denoise first: generated clips carry fine noise that costs
# bits at a dense GOP and reads as nothing under a moving camera.
set -euo pipefail
IN="$1"; NAME="$2"; W="${3:-1600}"; CRF="${4:-27}"
OUT=public/world
DN="hqdn3d=2:2:6:6"
ffmpeg -y -hide_banner -loglevel error -i "$IN" -an \
  -vf "$DN,scale=${W}:-2:flags=lanczos,format=yuv420p" \
  -c:v libx264 -profile:v high -preset slow -tune film -crf "$CRF" -g 8 -keyint_min 8 -sc_threshold 0 \
  -movflags +faststart "$OUT/$NAME.mp4"
ffmpeg -y -hide_banner -loglevel error -i "$IN" -an \
  -vf "$DN,crop=ih*9/16:ih,scale=720:-2:flags=lanczos,format=yuv420p" \
  -c:v libx264 -profile:v high -preset slow -tune film -crf 28 -g 4 -keyint_min 4 -sc_threshold 0 \
  -movflags +faststart "$OUT/$NAME-m.mp4"
# posters are the ENCODED clip's own first frame
ffmpeg -y -hide_banner -loglevel error -i "$OUT/$NAME.mp4" -frames:v 1 -q:v 4 "$OUT/$NAME.jpg"
ffmpeg -y -hide_banner -loglevel error -i "$OUT/$NAME-m.mp4" -frames:v 1 -q:v 4 "$OUT/$NAME-m.jpg"
mb() { echo "scale=2; $(stat -f%z "$1")/1048576" | bc; }
printf '%-8s %5s MB %5s MB  %ss\n' "$NAME" "$(mb $OUT/$NAME.mp4)" "$(mb $OUT/$NAME-m.mp4)" \
  "$(ffprobe -v error -show_entries format=duration -of csv=p=0 $OUT/$NAME.mp4)"

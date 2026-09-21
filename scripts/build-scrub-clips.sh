#!/bin/bash
# Scroll-scrubbable versions of the story clips.
#
# The graded cuts in public/film carry exactly ONE keyframe each, so seeking to
# any point means decoding from frame zero — scrubbing them is unusable. These
# re-encodes place a keyframe every 5 frames (~0.17s at 30fps) so a seek only
# ever costs a handful of P-frames.
#
# Dropping to 960x540 pays for the extra keyframes: the sources are upscaled SD
# to begin with, so the detail was never there, and the files come out the same
# size as the 720p originals.
set -e
cd "$(dirname "$0")/.."
mkdir -p public/film/scrub

for n in factory-sign factory-exterior fermentation; do
  ffmpeg -loglevel error -y -i "public/film/$n.mp4" -an \
    -vf "scale=960:540" \
    -c:v libx264 -preset slow -crf 27 \
    -g 5 -keyint_min 5 -sc_threshold 0 \
    -movflags +faststart \
    "public/film/scrub/$n.mp4"
  printf '  %-20s %s\n' "$n" "$(ls -la "public/film/scrub/$n.mp4" | awk '{printf "%.2f MB", $5/1048576}')"
done

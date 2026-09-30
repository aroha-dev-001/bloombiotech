#!/usr/bin/env bash
# Re-encode the portrait phone cut of every leg from its master, for scrubbing.
#   enc-phone.sh            every leg
#   enc-phone.sh leg03 ...  just these
# writes public/world/<leg>-m.mp4 and its first-frame poster <leg>-m.jpg.
#
# Every frame is a keyframe. A scrubbed clip is only ever seeked, never played,
# and a seek decodes from the keyframe at or before its target. The first phone
# cut had one every 4 frames plus B-frames, so a seek decoded up to five frames,
# and on a phone that is the film falling behind the thumb. All-intra, a seek
# decodes one, on every decoder. CRF 25 holds the old cut's SSIM against the
# master (0.965 vs 0.967 on leg00) at about 1.8x the bytes.
#
# The crop and denoise are enc.sh's, so frames, timing and seams are unchanged.
set -euo pipefail
cd "$(dirname "$0")/../../../.."
B=scrollcraft/builds/bloom-home
OUT=public/world

master() {
  case "$1" in
    leg04) echo "$B/out/leg04-ease.mp4" ;;    # last 1.2s compressed 3x
    leg06) echo "$B/out/leg07-aerial.mp4" ;;  # client orbit, retimed (named before the legs were renumbered)
    leg07) echo "$B/out/leg08-ferment.mp4" ;; # client fermenter pan, retimed
    *) echo "$B/raw/$1.mp4" ;;
  esac
}

legs=("$@")
[ ${#legs[@]} -eq 0 ] && legs=(leg00 leg01 leg02 leg03 leg04 leg05 leg06 leg07 leg08 leg09 leg10)

for NAME in "${legs[@]}"; do
  IN=$(master "$NAME")
  ffmpeg -nostdin -y -hide_banner -loglevel error -i "$IN" -an \
    -vf "hqdn3d=2:2:6:6,crop=ih*9/16:ih,scale=720:-2:flags=lanczos,format=yuv420p" \
    -c:v libx264 -profile:v high -preset slow -tune film -crf 25 \
    -g 1 -keyint_min 1 -bf 0 -sc_threshold 0 \
    -movflags +faststart "$OUT/$NAME-m.mp4"
  # posters are the ENCODED clip's own first frame
  ffmpeg -nostdin -y -hide_banner -loglevel error -i "$OUT/$NAME-m.mp4" -frames:v 1 -q:v 4 "$OUT/$NAME-m.jpg"
  printf '%-6s %5s MB\n' "$NAME" "$(echo "scale=2; $(stat -f%z "$OUT/$NAME-m.mp4")/1048576" | bc)"
done

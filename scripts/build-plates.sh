#!/bin/bash
# Build the normalized product plates in public/plates/.
#
# Fifteen packs arrived as four different kinds of picture: silver pouches shot
# flat on a grey bench, tight crops of bottles on a shelf, flat label artwork on
# white, and two that are contents rather than packaging. Dropped into one grid
# they read as four different companies.
#
# This puts every one of them on the same stage without touching the pack:
#
#   · one 4:5 canvas, so nothing is cropped to a landscape card any more
#   · contained, never cover-cropped — the label always stays whole
#   · per-product fill, so a 5 L can and a 5 kg pouch carry the same visual mass
#   · the ground is that photograph's own frame, blown up, blurred and pushed
#     toward neutral, and the pack is feathered into it — so the join is
#     invisible and the ground tone can never clash with the product
#
# The pack itself is untouched: no relighting, no label edits, no generated
# packaging. Only the background, the scale and the crop change.
set -e
cd /Users/rahul0/Workspace/aroha-projects/bloom/bloom-biotech
W=1000; H=1250
mkdir -p public/plates

# $1 src  $2 slug  $3 fill fraction  $4 optional pre-crop filter
plate () {
  local src="$1" slug="$2" fill="$3" pre="${4:-null}"
  local fw fh
  fw=$(python3 -c "print(int($W*$fill))")
  fh=$(python3 -c "print(int($H*$fill))")
  ffmpeg -loglevel error -y -i "$src" -filter_complex "\
[0:v]${pre},split=2[bg][fg];\
[bg]scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H},\
gblur=sigma=60,eq=brightness=0.17:saturation=0.14:contrast=0.72[bgb];\
[fg]scale=${fw}:${fh}:force_original_aspect_ratio=decrease,format=rgba,\
pad=iw+44:ih+44:22:22:color=0x00000000,gblur=sigma=15:steps=2:planes=8[fgs];\
[bgb][fgs]overlay=(W-w)/2:(H-h)/2,\
eq=brightness=0.012:saturation=1.04:contrast=1.02,unsharp=3:3:0.25" \
    -q:v 3 "public/plates/${slug}.jpg"
  printf '  %-24s %s\n' "$slug" "$(basename "$src")"
}

echo "cans — the high-resolution studio shots, in place of the shelf crops"
plate public/packs/can-bhu-samruddhi.jpg bhu-samruddhi 0.86
plate public/packs/can-bluderma.jpg      bluderma      0.86
plate public/packs/can-blumonas.jpg      blumonas      0.86

echo "pouches"
plate public/catalogue/bio-ace.jpg        bio-ace        0.90
plate public/catalogue/bio-erase.jpg      bio-erase      0.90
plate public/catalogue/bio-hit.jpg        bio-hit        0.90
plate public/catalogue/bio-sanjiveeni.jpg bio-sanjiveeni 0.90
plate public/catalogue/bio-vanish.jpg     bio-vanish     0.90
# Bio Astra's frame carries a black band across the foot of the bench.
plate public/catalogue/bio-astra.jpg      bio-astra      0.90 "crop=iw:ih*0.93:0:0"

echo "label artwork"
for n in calcare fulcare jackpot nutricare-c2; do
  plate "public/catalogue/$n.jpg" "$n" 0.84
done

echo "contents — not packaging, and presented as such in the UI"
plate public/catalogue/ascogold.jpg              ascogold              0.88
plate public/catalogue/bloom-compost-culture.jpg bloom-compost-culture 0.88

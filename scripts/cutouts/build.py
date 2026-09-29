#!/usr/bin/env python3
"""
Build the free-standing pack cutouts in public/cutouts/.

The catalogue showcase (components/products/PackShowcase.tsx) stands each pack
on the page ground with its neighbours behind it, so it needs the pack without
its photograph around it. public/plates/ are the same packs on a blurred
ground; these are the packs alone.

  · pouches and cans: the subject is lifted with macOS Vision's foreground
    mask (lift.swift, compiled on first run), pinholes in the mask are filled,
    and the edge is softened by a pixel
  · flat label artwork (Calcare, Fulcare, Jackpot, NutriCare C2): Vision finds
    no subject in a flat print, so the white margin is trimmed instead
  · AscoGold's picture is microscopy, not a pack: it is cut to a round
    specimen, the way it would be seen down a microscope

The pack itself is untouched: no relighting, no label edits, no generated
packaging. Run from the repo root on a Mac:  python3 scripts/cutouts/build.py
"""
import os
import subprocess
import tempfile

import numpy as np
from PIL import Image, ImageChops, ImageDraw, ImageFilter
from scipy import ndimage

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
PUB = os.path.join(ROOT, "public")
OUT = os.path.join(PUB, "cutouts")
LIFT = os.path.join(tempfile.gettempdir(), "bloom-lift")
H = 1100  # every cutout is stored at this height

LIFTED = {
    # studio shots of the cans, in place of the shelf crops
    "bhu-samruddhi": "packs/can-bhu-samruddhi.jpg",
    "bluderma": "packs/can-bluderma.jpg",
    "blumonas": "packs/can-blumonas.jpg",
    # pouches, front label (Bio Astra's can is shot from the side)
    "bio-sanjiveeni": "catalogue/bio-sanjiveeni.jpg",
    "bio-astra": "catalogue/bio-astra.jpg",
    "bio-vanish": "catalogue/bio-vanish.jpg",
    "bio-erase": "catalogue/bio-erase.jpg",
    "bio-hit": "catalogue/bio-hit.jpg",
    "bio-ace": "catalogue/bio-ace.jpg",
    # contents: the petri dish lifts cleanly
    "bloom-compost-culture": "catalogue/bloom-compost-culture.jpg",
}
ARTWORK = ["calcare", "fulcare", "jackpot", "nutricare-c2"]
SPECIMEN = {"ascogold": "catalogue/ascogold.jpg"}


def lift(src):
    if not os.path.exists(LIFT):
        subprocess.run(
            ["swiftc", "-O", os.path.join(os.path.dirname(__file__), "lift.swift"), "-o", LIFT],
            check=True,
        )
    with tempfile.NamedTemporaryFile(suffix=".png", delete=False) as f:
        tmp = f.name
    subprocess.run([LIFT, src, tmp], check=True, capture_output=True)
    im = Image.open(tmp).convert("RGBA")
    os.unlink(tmp)
    return im


def clean(im):
    """Fill pinholes inside the subject and soften the cut by a pixel."""
    a = np.array(im.getchannel("A"))
    solid = ndimage.binary_fill_holes(a > 128)
    a = np.where(solid & (a < 255), 255, a).astype(np.uint8)
    alpha = Image.fromarray(a).filter(ImageFilter.GaussianBlur(0.6))
    im.putalpha(alpha)
    return im


def finish(im, slug):
    im = im.crop(im.getchannel("A").getbbox())
    w = round(im.width * H / im.height)
    im = im.resize((w, H), Image.LANCZOS)
    rgb = im.convert("RGB").filter(ImageFilter.UnsharpMask(radius=1.4, percent=45, threshold=2))
    rgb.putalpha(im.getchannel("A"))
    rgb.save(os.path.join(OUT, f"{slug}.webp"), "WEBP", quality=86, method=6)
    print(f"  {slug:24s} {w}x{H}")


def trim_white(im):
    rgb = im.convert("RGB")
    bg = Image.new("RGB", rgb.size, (255, 255, 255))
    diff = ImageChops.difference(rgb, bg).convert("L").point(lambda v: 255 if v > 18 else 0)
    return rgb.crop(diff.getbbox()).convert("RGBA")


def specimen(im):
    im = im.convert("RGBA")
    s = min(im.size)
    im = im.crop(((im.width - s) // 2, (im.height - s) // 2, (im.width + s) // 2, (im.height + s) // 2))
    big = s * 4
    mask = Image.new("L", (big, big), 0)
    ImageDraw.Draw(mask).ellipse((8, 8, big - 8, big - 8), fill=255)
    im.putalpha(mask.resize((s, s), Image.LANCZOS))
    return im


os.makedirs(OUT, exist_ok=True)
print("lifted")
for slug, rel in LIFTED.items():
    finish(clean(lift(os.path.join(PUB, rel))), slug)
print("label artwork")
for slug in ARTWORK:
    finish(trim_white(Image.open(os.path.join(PUB, "catalogue", f"{slug}.jpg"))), slug)
print("specimen")
for slug, rel in SPECIMEN.items():
    finish(specimen(Image.open(os.path.join(PUB, rel))), slug)

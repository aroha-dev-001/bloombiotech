# Bloom Biotech — Site Revision & Cinematic Storytelling Plan

Status: **plan only — no assets generated, no UI changed.**

---

## 1. What the site is today

Ten routes. The homepage arc is already close to the target flow:

| Route | Sections |
|---|---|
| `/` | Hero · Intro · StoryScroll · FindYourSolution · ProductRail · Questions · Contact |
| `/about` | hero · Origin · Capabilities · Assurance ("Read the label") · address · CTA |
| `/solutions` | hero · SolutionFinder · RouteGuide · CTA |
| `/products`, `/products/[slug]` | CatalogueBrowser (15 packs) |
| `/field` `/gallery` `/faq` `/journal` `/enquire` `/assistant` | — |

**A previous pass already did a lot of the brief.** Worth knowing before re-doing it:

- Micro-fonts are largely gone. `.eyebrow` and `.meta` are now `0.95rem`, no uppercase, no letter-spacing.
- Stat grids and filler sections were deleted: `CountUp`, `EnquiryPulse`, `Scale`, `DataRail`, `PlantStory`, `CropSolutions`, `FieldStories`, `LabsToFarms`, `Pathways`.
- `StoryScroll` already exists — a pinned 5-viewport scroll story (Research → Fermentation → Pack → Field → Crop).
- `SolutionFinder` already exists and replaced the old 3-step finder + crop explorer.

So this is a **refinement pass, not a rebuild.** The remaining gaps are specific.

---

## 2. The real gaps

### 2.1 Asset resolution is the biggest quality ceiling

The story stage is full-bleed `100svh`. What is being stretched across it:

| Asset | Actual pixels | Upscale at 1440px wide |
|---|---|---|
| `plant/panel.jpg` | 848 × 480 | 1.7× |
| `plant/reactor.jpg` | 848 × 480 | 1.7× |
| `photos/pomegranate.jpg` | **563 × 586** | **2.6×** |
| `photos/pepper.jpg` | 504 × 574 | 2.9× |
| `packs/can-blumonas.jpg` | 831 × 1100 (portrait) | forced `object-cover` → badly cropped |

**No amount of motion design fixes this.** The section cannot read as premium while it is upscaling a 563px photo across a full viewport. Asset quality is the first problem to solve, ahead of animation.

Good news: the **product cans are the best assets we own** (~830 × 1100, clean) — exactly the reference we need for accurate product shots.

### 2.2 Real footage exists but is not in the story

`fermentation-hall.mp4` (4.1 MB) and `plant-aerial.mp4` (2.7 MB) are only used in the hero and `/gallery`. The brief explicitly wants real factory footage carrying the authenticity. **Scene 02 should be the real fermentation hall, not an AI tank.**

### 2.3 Story is 5 discrete scenes, not a camera

Current behaviour: scroll position picks an index, the scene cross-dissolves on a fixed `0.9s` CSS transition. The dissolve is **time-based, not scroll-scrubbed** — so it is a slideshow that advances on scroll, not "scroll = camera." There is also no Scene 04 (product → field), so the pack hard-cuts to soil.

### 2.4 Find Your Solution — the mobile bug, diagnosed

Confirmed in `components/solutions/SolutionFinder.tsx`:

- The finder has **two** steps (crop → need), not the three the brief asks for.
- Selecting a crop sets state and **nothing else** — no scroll, no transition.
- The need block sits below with `data-state="locked"` → `opacity: .35; pointer-events: none`.
- On a phone the crop grid is 2-col × 5 cards at 4/5 aspect ≈ **2.5 screens tall**. The need block is far below the fold.

So: tap a crop → the page does not move → the next question is invisible and, until that tap registers, was greyed out. **Dead end.** Exactly as reported.

Only the *need* tap scrolls (to results, `SolutionFinder.tsx:101`).

**Already supported:** `rankForCrop()` in `lib/solutions.ts:329` **already accepts an `application` filter**, and `applications[]` (soil / drip / foliar / compost) is already tagged per pack. The third step is a clean addition — the data layer is done.

### 2.5 Smaller items

- `"Ask the plant"` survives at `SolutionFinder.tsx:158` — the last one on the site.
- `Logo.tsx:41` — `text-[0.46rem] uppercase tracking-[0.28em]` ("Green Biotechnology"). A genuine micro-font, in the header of **every page**.
- `globals.css:1232` — `.pulse-photo-label`, `0.62rem` uppercase. Dead rule (EnquiryPulse was deleted).
- `ChatWidget.tsx` — ~10 uses of `text-xs` / `text-sm`.
- About "Read the label" = heading + vague paragraph + **one static image** + a 6-cell note grid. The copy is generic; the underlying data in `lib/plant.ts` (`assurances`) is specific and good — the section under-uses its own facts.

---

## 3. The cinematic story — script

Six scenes. One film. Copy is one line per scene, nothing more.

| # | Scene | Purpose | Visual | Source | Camera | Copy |
|---|---|---|---|---|---|---|
| 01 | **Research** | Establish rigour. Dark, scientific, still. | Lab bench, petri/microscopy, plant tissue, shallow depth | **AI** | Slow push-in | "It starts with research." |
| 02 | **Fermentation** | Authenticity. This is a real plant. | Stainless fermenters, control panel, the hall | **REAL** `fermentation-hall.mp4` | Existing camera move | "From research to formulation." |
| 03 | **The Product** | The pack, premium, accurate. | Bloom can, light raking across the label | **AI from real can photo** | Slow orbit / light sweep | "Packed and marked by batch." |
| 04 | **Product → Field** | The turn: scientific → natural. | Liquid pours, meets soil, darkens earth | **AI** | Follow the pour down | *(no copy — pure transition)* |
| 05 | **The Field** | Where it is used. | Root-zone drench, hands, Karnataka soil | **REAL stills + AI motion** | Slow track | "Poured at the root." |
| 06 | **The Crop** | The result, without a claim. | Macro leaf, coffee cherry, natural movement | **AI** | Micro-drift, breath | "Built for the crops you grow." |

Scene 06 hands off directly into **Find Your Solution**.

### Visual language — one film, not six generations

Every AI asset shares:

- **Lens:** 35–50mm equivalent, shallow depth, gentle falloff. No wide-angle distortion.
- **Light:** single directional key, deep falloff to near-black. Scene 01–03 cool (5000K); Scene 04 is the crossover; Scene 05–06 warm (3200K low sun).
- **Grade:** lifted blacks toward `#070a08` (the site's `--void`), desaturated mid-greens, one live green accent near `--lime #a6d45b`.
- **Texture:** fine grain, no plastic AI sheen, no lens flare, no floating particles.
- **Motion:** 1 slow move per shot. Never two at once.

### Scroll behaviour

- Section = `6 × 100svh`. Inner stage `position: sticky`.
- Progress **scrubs continuously** — opacity and scale interpolate across scroll, they do not fire a fixed transition. This is the change that makes it read as a camera.
- Copy reveals at 25% into its scene, holds, fades at 85%.
- No scroll hijacking. Normal scroll speed throughout. Flick-scrolling past it is allowed and looks fine.

### Desktop vs mobile — designed separately

| | Desktop | Mobile |
|---|---|---|
| Scenes | 6 | 6 |
| Video | Scenes 02, 03, 05 | **Scene 02 only** (the real one) |
| Others | Video | Still + CSS Ken Burns |
| Assets | Landscape 16:9 | **Portrait 9:16 crops** |
| Height | 600svh | 450svh (shorter, less thumb work) |
| Parallax | Yes | Reduced |
| Ticks | Shown | Hidden |

`prefers-reduced-motion` and no-JS already degrade to a clean stack of frames. That stays.

---

## 4. Asset production plan

### Already have — use, do not regenerate

| Asset | Use |
|---|---|
| `media/fermentation-hall.mp4` | **Scene 02**, unchanged |
| `media/plant-aerial.mp4` | Hero / gallery, unchanged |
| `packs/can-*.jpg` (5 cans, 830×1100) | **Reference input** for Scene 03 |
| `photos/amc/amc-01…04` | Scene 05 base frames |

### To generate

| # | Asset | Type | Model route | Cost est. |
|---|---|---|---|---|
| 01 | Research lab | still → video | text-to-image, then image-to-video | ~40 |
| 03 | Product reveal | video | **image-to-video from `can-blumonas.jpg`** | ~40 |
| 04 | Pour → soil | video | text-to-image → image-to-video | ~40 |
| 06 | Crop macro | video | text-to-image → image-to-video | ~40 |
| 01/04/06 | Portrait 9:16 variants | stills | reframe / regenerate | ~30 |
| — | About: label detail stills | 3 stills | image-to-image from can photos | ~30 |

**Budget: 396.5 credits (Pro).** The above lands ≈ 220–260, leaving little room for re-rolls.

**Recommended sequencing to protect the budget:**

1. Generate **stills first** for scenes 01, 04, 06 (cheap). Review them side by side.
2. Lock the grade/lens language on the stills.
3. Animate **only** where motion earns it — Scene 03 (product) and Scene 06 (crop).
4. Scenes 01/04 can ship as stills with CSS Ken Burns and lose almost nothing.

This halves spend and removes the risk of paying for six videos that do not cut together.

### Product-shot rules (non-negotiable)

The real can photo is the reference image. **Do not** invent or alter logos, names, label text, ingredients, claims, CFU counts or pack shape. Image-to-video only, reference-locked. If a generation alters the label, it is discarded — not "close enough."

### Prompt skeleton (shared across all scenes)

> Cinematic still, 40mm, shallow depth of field, single directional key light with deep falloff into near-black `#070a08`, desaturated palette with one live green accent, fine film grain, no lens flare, no floating particles, photographic realism, muted contrast, anamorphic-free.

Per-scene subject lines are appended to this. Full prompts go in `docs/asset-prompts.md` once the look is approved.

---

## 5. Implementation plan

### A. Independent of asset generation — can start now

1. **Fix the Find Your Solution mobile bug.** Crop tap → save, reveal, smooth-scroll to the next question. Selected state stays visible.
2. **Add the third step** — "How will you apply it?" (`soil / drip / foliar / compost`). Data layer already supports it.
3. **Rename** the last `"Ask the plant"`.
4. **Micro-font sweep** — `Logo.tsx`, dead `.pulse-photo-label`, `ChatWidget`.
5. **Rewrite About "Read the label"** using the specific facts already in `lib/plant.ts`, and replace the single static image with a multi-view label story.
6. **Upgrade StoryScroll to continuous scrubbing** — works with current stills, better with new ones.

### B. Blocked on assets

7. Slot new scenes in, add Scene 04, wire portrait variants.

### C. Verify

8. Desktop pass, mobile pass (375px), reduced-motion pass, no-horizontal-overflow check.

---

## 6. Open decision: GSAP or stay vanilla

The brief asks for GSAP + ScrollTrigger. A recommendation, with the reasoning:

**Current implementation is ~90 lines of vanilla scroll + CSS custom properties. It already pins, scrubs a `--p` variable, and degrades correctly.** Making it continuously scrubbed is a ~40-line change.

GSAP + ScrollTrigger adds **~70 KB gzipped** for one pinned section. This site's audience is farmers, dealers and estates in Karnataka, frequently on mobile data — the hero already ships a `saveData` / `2g` check and refuses to load video on thrifty connections, which says the project has already taken that seriously.

**Recommendation: stay vanilla**, and spend the weight budget on higher-resolution imagery instead. GSAP would be the right call if the section later needs timeline sequencing, multiple pinned sections, or frame-by-frame canvas scrubbing — and it can be swapped in without redesigning the scenes.

---

## 7. What was built (this pass)

### Corrections to the estimates above

**Asset generation was ~10× cheaper than planned.** Stills are **1 credit each**, not ~30. Video is 35 credits per 5s 1080p clip. Actual spend this pass: **6 stills + 2 videos = 76 credits** of 396.5. The "protect the budget" sequencing in §4 was solving a problem that did not exist — worth knowing before commissioning the rest.

### Done

| # | Item | Notes |
|---|---|---|
| 1 | **Find Your Solution mobile bug** | Fixed. Each answer now carries the page to the question it unlocked — but only when that question is not already on screen, so desktop is never yanked. Verified: all three steps land at exactly 156px, under the header. |
| 2 | **Third step added** | "How will you apply it?" (soil / drip / foliar / compost), optional. `rankForCrop` already supported it. Deep-linkable via `?apply=`. |
| 3 | **Answer trail** | Sticky pill under the header showing what was chosen; each chip jumps back to its step or clears it. Scrolls sideways past three answers rather than wrapping. |
| 4 | **"Ask the plant" removed** | Now "Send this to us" — see the naming note below. |
| 5 | **Micro-fonts** | `Logo` tagline (7px) removed; `ChatWidget` normalised; 125 lines of dead `EnquiryPulse` CSS deleted. **Nothing below 0.95rem remains anywhere.** |
| 6 | **About "Read the label"** | Replaced heading + vague copy + one static image with an interactive **label reader**: four real packs, each showing the fields actually printed on it, read from `lib/products.ts` rather than restated. |
| 7 | **Story rebuilt as a true scrub** | Six scenes, continuously cross-dissolved from scroll position. Presence sums to exactly 1 across the whole run — verified numerically. |
| 8 | **Real footage in the story** | Scene 02 is now the actual fermentation-hall film, not a still. |
| 9 | **Mobile story designed separately** | 72svh per scene (vs 100svh desktop), portrait crops, no video at all, ticks hidden. |

### Assets generated

`public/story/` — 1.1 MB of stills, 4.4 MB of video.

| File | What | Source |
|---|---|---|
| `research.jpg` / `-portrait` | Scene 01 lab bench | AI, 1344×752 |
| `pour.jpg` / `-portrait` | Scene 04 pour into soil | AI, 1344×752 |
| `crop.jpg` / `-portrait` | Scene 06 coffee macro | AI, 1344×752 |
| `pour.mp4` | Scene 04 motion | AI image-to-video, 1920×1080, 5s |
| `crop.mp4` | Scene 06 motion | AI image-to-video, 1920×1080, 5s |

All three stills share one lens, light and grade, and drop into the site's near-black ground.

### Two deliberate deviations

**1. The second video is the pour, not the product.** Animating the product needs the real pack image handed to the generator, which requires a manual upload — the site is not deployed, so its URL cannot be fetched. Rather than stall, the second clip went to the pour (Scene 04), where motion genuinely earns its place: a still photograph of liquid mid-pour is a strange thing. The product scene uses the **real can photograph**, which is accurate by construction. The product video is still worth doing and is a single upload away.

**2. "Ask the plant" did not become "Find your solution".** That button is the WhatsApp send at the *end* of the finder, inside a section already headed "Find your solution" — relabelling it would have given one page two different buttons with the same name. It is now **"Send this to us"**, which removes the duplicate experience name the brief was actually objecting to. Every entry point into the finder already says "Find your solution".

### Known limits

- **Scene 05 (field)** still uses `amc-01-soil-drench.jpg` at 800×1200. It crops hard to landscape. It is kept because it is a *real* photograph of a real application, and the brief asks for authenticity over polish. Reshooting beats regenerating here.
- **Scene 02 fermentation on mobile** falls back to `reactor.jpg` (848×480). No portrait variant exists and generating a fake portrait of our own factory would defeat the point.
- **The 5s clips loop with a hard cut.** The moves are slow enough that it reads as a small jump, usually while the scene is partly faded. A longer clip or a ping-pong loop would remove it.
- `assurances` in `lib/plant.ts` is now unused. It is real, sourced content, so it was left in place rather than deleted.
- **Homepage flow** is Hero → Intro → Story → Find → Products → Questions → Contact. The brief's "Three Questions" after the Hero was not built: `Intro` (who Bloom is) occupies that slot and the three questions are now literally the finder's three steps. Worth a decision.
- The FAQ carries 7 questions; the brief said 5–6. Left alone — which to cut is a content call.

---

# Revision 2 — Sunny / documentary direction

The direction was reversed: **light, sunny, real** instead of dark and cinematic. Everything below supersedes the dark-pass notes above.

## The footage reality

The brief assumed several videos — product, factory, drone, plantation, application. **Two exist**, and both are WhatsApp exports:

| Source | Content | Actual spec |
|---|---|---|
| `…14.10.08.mp4` | fermentation hall, one slow pan | **848×480**, 22s, 1.55 Mbps |
| `…14.10.07.mp4` | drone: signage, gate, building, aerial orbit | **640×352**, 31s, 0.75 Mbps |

They were byte-identical to `public/media/` — the site was serving raw WhatsApp files. Also in `media/`: one drone still (1368×770) and five product shots (~960×1280), all bright and genuinely good.

**4K is not reachable from this source.** 640×352 at 0.75 Mbps has already lost the detail; only generative super-resolution could invent it back, which the brief forbids. The chosen path was an honest restoration.

## Restoration applied (ffmpeg 9.0.2, installed this session)

`deblock → hqdn3d denoise → 2× lanczos → gentle unsharp → warm sunny grade`, then H.264 CRF 25 capped at 2 Mbps, faststart, no audio.

Both clips were naturally bright already — the white fermentation hall and the blue-sky drone orbit. **The site's dark treatment had been fighting its own footage.**

Cut into `public/film/`: `factory-exterior`, `factory-aerial`, `factory-sign`, `fermentation`, `fermentation-vessels`, plus full-length graded versions for the gallery and 9:16 portrait crops for phones.

## Tone flipped to light-dominant

| | before | after |
|---|---|---|
| dark / carbon sections | **28** | **11** |
| light / bone sections | 17 | **34** |

Dark now survives only where it earns its place: the header and footer chrome, the hero, and the pinned film. The hero scrim dropped from a 0.9 black floor to 0.7 with no side wash; film grain went 0.3 → 0.14.

## Homepage sequence — 7 scenes, 4 of them real

factory → drone → fermentation → the pack → plantation → application → soil & water.
Headlines wipe up behind their own mask as each scene settles (§6), driven by the same scroll value as the dissolve.

## Imagery corrected

- The four `photos/amc/*` "application photos" were **watercolour illustrations**, not photographs — against §3. Replaced with documentary photography across the route guide, field records and product explorer.
- `photos/coffee.jpg` was generic stock of hands holding soil, and was being used as the **Floriculture** crop card. All five crop cards are now real, correctly-labelled, sunny crops.

## Product page rebuilt (§10–§12)

Four questions instead of a vertical spec wall — *What's in it · What it does · How to use it · Which crops* — and the picture answers alongside: the pack, then the crop, then the route photo that matches **that pack's own first usage step**, then the plantation.

Specification values went from ~17px to **20.8px**; usage steps and benefits to 1.15rem. Long-form copy is kept, moved below.

## Known limits

- **The footage is SD and upscaled honestly.** It looks clean and sunny; it does not look 4K, and nothing available can make it. Original camera files remain the single biggest upgrade.
- Only stills back the non-homepage pages — video there would add weight for decoration.
- `fermentation-vessels.mp4` (3 MB) is cut and graded but currently unused; the products band uses its still.

## Orphaned by this revision (kept, not deleted)

- `public/story/` — 5.4 MB of the dark pass, now off-direction
- `public/media/` — 7 MB of raw WhatsApp copies, superseded by `public/film/`
- `public/photos/amc/` — 1.6 MB of watercolours

Say the word and they go.

---

# Revision 3 — fixes from review

Three things were wrong.

### 1. The film looked like it never changed — because it nearly didn't

The hero played `factory-aerial`, story scene 1 played `factory-exterior` (a different cut of the **same drone clip**) and scene 2 played `factory-aerial` **again — identical to the hero**. Three drone shots in a row. My error.

Sequence rebuilt so nothing repeats, and so it leads with the brand and reaches the products early:

**hero** (drone aerial) → **Bloom Biotech sign** → factory exterior → fermentation → **the packs** → plantation → application → drip

`factory-sign.mp4` — the Bloom Biotech signage, already cut and graded — had been sitting unused.

### 2. The headline genuinely was not animating on arrival

The ramp was `smooth((t − 0.06) / 0.22)`, which is **zero for the first 6% of every scene** and stays near zero well past it. Arriving at a scene showed a picture and no words. Worse, the last scene's text faded to nothing as the section released.

Now the headline wipes in *while the frame is still dissolving in* (`(t + 0.16) / 0.20`), so it is fully there the moment the scene lands, and the final scene keeps its words. Measured across the run: the mask travels ~20px → 0 on every scene, and `--c` reads 0.79–1.00 at each arrival instead of 0. A second variable `--c2` trails it so the supporting line trails the headline.

### 3. Too white

Dark bands restored for rhythm rather than reverting wholesale:

| | original | all-white pass | now |
|---|---|---|---|
| dark + carbon | 28 | 11 | **18** |
| light + bone | 17 | 34 | **30** |

Homepage now reads: hero (dark) → intro (light) → film (dark) → finder (bone) → **products (carbon)** → questions (light) → **contact (carbon)** → footer (dark).

### New asset

`products-lineup.jpg` / `-portrait.jpg` — Blumonas, Bhu Samruddhi, Bio Astra and Root Care composited from the **real pack photography**, no generation. It is shot on white, so that scene carries dark type and a lifting scrim instead of white type and a darkening one — a bright beat inside the film.

---

# Revision 4 — the landing frame

The hero opened on the same drone clip the film below opens on, under a headline that never moved.

**It is now a still frame that holds, and a sentence that finishes itself.**

"Beneficial microbes **for coffee.**" — the second line wipes up behind its own mask and the picture behind it cross-fades to match, cycling coffee → black pepper → pomegranate → flowers on a 3.8s hold.

**The rotation is also the navigation.** The crop row under the lede is four real links into the finder (`/solutions?crop=…`). Hovering or focusing one takes over from the timer and drives both the word and the picture; leaving hands it back. So the thing that is moving is the thing you can click, rather than decoration running beside it.

The whole line wipes rather than just the crop word — reserving width for the longest word would have overflowed a 375px phone at the 48px minimum type size.

Staging on load is the existing `line-up` clip-path wipe, staggered across headline, lede, crops and buttons. A scroll cue pulses at the foot on desktop, hidden on phones.

### Legibility over photography

Type now sits on a picture rather than a flat ground, so: a text-shadow on the headline and lede, a glass fill and a 48% border on the ghost button and crop chips (the default 22% `--fg` border was invisible against bright foliage), and a slightly deeper wash down the reading edge.

### New assets

`farm/hero-coffee.jpg`, `-pepper`, `-pomegranate`, `-flowers` — 16:9, generated bright and documentary, then lanczos-upscaled to 2016×1128 so a full-bleed frame is not soft on a wide display.

The hero no longer loads any video, which also takes the drone clip off the critical path on first paint.

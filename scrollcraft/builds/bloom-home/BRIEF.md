# Bloom Biotech home page: brief

Interviewed 2026-09-23. Answers below are the client's, verbatim.

---

## The interview

**1. Vibe.** Premium, natural, cinematic, scientific, real.

References: cinematic agriculture films, premium skincare/product films, and high-end nature documentaries.

**2. The scroll journey.** Start with the **canopy/farm**. I want the visitor to immediately feel like they are inside a real working farm.

Then move through the story of the farm: crops, soil, farmers, and the problems plants face. From there, introduce Bloom Biotech as the solution and show the factory, fermentation process, products, and how they are made.

Then show the products being used in real farms — for example, a farmer spraying the plants, using the products through drip irrigation, and applying them to crops.

I also want a visual/scientific section showing what happens below the surface: micronutrients moving into the soil, being absorbed by the plants, and helping the plants grow healthier.

The ending should bring everything back to the farm — healthy crops, better growth, and Bloom Biotech connecting the factory, biology, soil, and farmer together.

**3. Energy.** The farm and nature sections should feel calm, warm, and immersive.

The factory, fermentation, product, and scientific sections can become more intense and detailed. The application scenes should feel energetic and real.

**4. Feeling.** At the beginning, I want the visitor to feel curious and connected to nature.

In the middle, they should understand that there is real science and technology behind Bloom Biotech.

When we show the products being applied to crops, they should feel practical and believable.

The main moment I want people to remember is the transition from **the real farm → into the soil → inside the plant**, showing how the micronutrients and biological inputs move through the soil and are absorbed by the plant to support better growth.

**5. One thing no other site does.** I want the website to visually take the visitor **from the canopy of a real farm underneath the soil and into the plant itself**, then connect that microscopic/biological world back to Bloom Biotech's factory and products.

It should feel like the visitor is physically travelling through the entire process rather than just scrolling through sections.

**6. How far from premium and minimal.** Keep the premium and minimal foundation, but make it much more cinematic and immersive.

I don't want it to become overly crowded or maximalist. The visuals, videos, transitions, typography, and animations should do most of the storytelling instead of lots of text.

**7. One place or separate scenes.** I want it to feel like **one continuous journey**, but with distinct chapters.

**Canopy → Farm → Crop → Soil → Microbiology → Plant → Bloom Biotech factory → Products → Application → Healthy crop**

The transitions between these should feel connected rather than like completely separate pages.

**8. Assets.** Use all the existing real assets first. We already have factory aerial footage, factory exterior, fermentation hall, plant aerials, farm and plant photos, 15 product plates, 5 product cans, logo files, WhatsApp videos, other media photos, and the brochure PDF.

I want you to **analyse the products and brochure** and understand what each product is for before building the story.

Generate anything that is missing, especially cinematic transition shots and scientific/biological visuals that are difficult to capture with the existing footage. [Micronutrients entering the soil; nutrients moving through the soil toward plant roots; roots absorbing nutrients; nutrients moving from the roots into the plant; plants showing healthier growth; a farmer applying Bloom Biotech products through spraying; Bloom Biotech products being used through drip irrigation; realistic crop and farm environments.]

The generated visuals should look **real, sunny, natural, and premium**, not like obvious AI footage.

**9. Where it lives.** Build it as the **home page of the existing Next.js site**. The existing Biology.tsx, MicrobialField.tsx, StoryScroll.tsx, and globals.css changes should be considered part of the current project and kept where they are useful, but they can be modified or replaced if needed to achieve the new direction.

**Belief by the end.** Bloom Biotech connects real agricultural needs with biology, science, and practical products that help farmers grow healthier crops.

**The one action.** Explore the products or contact Bloom Biotech. Button: **Explore Our Products**.

Standing rules from earlier rounds (memory): no micro-copy, nothing under ~0.95rem, no decorative statistics, no "revolutionising / next-generation" copy, the navbar stays the liquid-glass capsule.

---

## What the products actually do (from the brochure)

The brochure is image-only; read page by page. What matters for the story:

| Where it works | Products | What the brochure says it does |
|---|---|---|
| In the soil, at the root | Bio Sanjiveeni (powder AMC), Bhu Samruddhi (liquid AMC) | Azotobacter fixes nitrogen, Bacillus solubilises phosphorus and zinc, Pseudomonas controls soil-borne disease. One pack instead of separate biofertilisers. Bio Sanjiveeni: combined CFU at least 1 x 10^9 per gram. Bhu Samruddhi: 10 ml/L, foliar spray and drip fertigation. |
| In the soil, at the root | Bio Astra (Arka Actino Consortium) | Three Streptomyces strains secrete antibiotics in the root zone plus IAA and gibberellins, "profuse rooting". |
| Soil disease | Bluderma (Trichoderma), Blumonas (Pseudomonas fluorescens) | Trichoderma coils round the pathogen fungus and penetrates it. Blumonas: soil and foliar disease, growth hormones. |
| Pests | Bio Vanish (nematodes), Bio Erase (termites, root grubs), Bio Hit (coffee berry borer, mealybug), Bio Ace (thrips, aphids, whitefly) | Entomopathogenic fungi. |
| Compost | Bloom Compost Culture | Aspergillus, coffee pulp to compost in 30-45 days. |
| In the plant | Fulcare, Calcare, Jackpot, NutriCare C2, AscoGold | Fulvic acid chelates metal ions so they "enter plant systems"; calcium regulates transport of nutrients into the plant; EDTA-chelated Fe, Zn, Mn, Cu for foliar and drip; seaweed + amino acids sprayed on the leaf underside. |

So the brief's "micronutrients moving into the soil, absorbed by the plant" is the true mechanism of the range, not a metaphor: microbes free locked nutrients at the root, chelates carry them in, and the plant moves them up with water. The copy stays inside these claims.

Company facts used: started 2013, first in India to licence Arka Microbial Consortium (AMC) and Arka Fermented Cocopeat from ICAR-IIHR, licensed ACT in 2015, production in Chikkamagaluru.

---

## Grammar

**Continuous world** (worldflight mode). The brief is literally travel through a place with physical stages, canopy to cell and back to the field, and question 7 asks for one continuous journey. The chapters live on the map nav, not as sections.

Why the other seven lost:

- **Filmic one-shot**: made of pinned acts, and pinned acts are blocks with seams. The client's previous complaint was sections cutting hard at every tone change.
- **Chaptered editorial**: hard cuts between chapters, media in columns. The opposite of "physically travelling".
- **Live surface**: not software.
- **Typographic poster**: the brief says visuals carry the story, not type.
- **Gallery / catalog**: the products are one stop on the journey, not the page.
- **Split stage**: there is no two-sided argument.
- **Rhythmic cutlist**: the farm is meant to be calm and warm; a cutlist is pulse.

Nav: the site's glass capsule stays (it is the site's chrome), and the page adds its own map: a chapter rail, clickable, one tick per chapter, the current chapter named. The close is arrival back on the farm, with the CTA in that place. The site footer is not rendered on this page: the only thing in document flow is the spacer.

## Signature move

**The specimen.** At the root hair the visitor picks up a living sample: a small round lens detaches from the microscope shot and docks at the edge of the screen with the cells still moving inside it. It travels with them. In the fermentation hall it fills and multiplies until it is dense (the label's real count arrives with it). At the products it drops into the can. At the drip line it is released back into the soil and the lens is gone. One object carries the whole causal chain the client asked for in question 5: soil, factory, product, field.

Canvas-drawn in the page, driven off the worldflight track. Works identically on touch.

## Fingerprint gate

Registry is empty (first build in this workspace). Passes trivially. Row appended after shipping.

---

## The feeling curve

Written before the legs were fixed.

```
1  Curiosity      the estate from high above in morning haze, the camera sinking slowly through the shade trees
2  Connection     at bush height in a coffee row, cherries within reach; one line names what goes wrong underground, then silence as the camera lowers to the base of one plant
3  Held breath    the ground line rises over the lens, light goes, the world turns granular and close        (PEAK begins)
4  Awe            root hairs at microscope scale, living cells on them, nutrients moving in the water film   (PEAK, the specimen is taken)
5  Lift           travelling up inside the root toward light and out into a sunlit leaf                      (PEAK ends)
6  Recognition    pulling out of the leaf and above the farm, and the Bloom plant is there among the same fields
7  Trust          the real building, the real hills; the licence, the year
8  Precision      real steel vessels in a clean hall; the specimen fills and multiplies
9  Clarity        the cans on the bench, the range in three plain groups; the specimen drops into the can
10 Practicality   a farmer spraying in the sun, the drip line at the root, a real dose
11 Resolve        rising up a laden plant into golden canopy, the whole estate, one button
```

No two adjacent lines share a feeling. Energy follows question 3: calm (1-2), deepening (3-5), intense and detailed (6-9), energetic (10), calm and warm (11).

## The peak

> "The camera went down through the soil and into a root, and suddenly I was looking at bacteria on a root hair, then riding the water up inside the plant into a leaf."

Lives in legs 3-5. Gets the asset budget (three 6s clips where every other leg is 5s), the silence before it (the end of leg 2 carries no copy), and the most continuous scroll room: about 4vh with a single line of copy across all three legs.

## Tell-someone sentence

> It's the site where you sink through a coffee farm into the soil, pick up a living microbe at the root, and carry it through their factory, where it's grown into billions, into a can and back out onto the field.

## Authored silence

- The last ~40% of leg 2 (camera lowering to the base of the plant): no copy on purpose. The silence before the peak.
- Leg 3 (the surface closing over the lens): no copy. The first line of the peak arrives only on leg 4.
- The seam between leg 7 (aerial) and leg 8 (fermentation hall) is a directional match dissolve, not a flight. Both shots move right.
- The seam between leg 9 (cans on the bench) and leg 10 (the can in the field) is a match dissolve on the held can. Authored, not a gap.

---

## The score (as built)

One pace for the whole flight: 0.22 viewport-heights of scroll per second of film. Seam 0.16vh, lerp 0.12.

| Leg | Chapter | Clip | Source | Scroll | Copy |
|---|---|---|---|---|---|
| 0 | Canopy | drone descends through the shade canopy into the rows | Kling, A0 to A1 | 1.10vh | hero (lead): h1, one line, ghost CTA |
| 1 | Crop | tracks the row, cranes down to the stem | Kling, A1 to A2 (rerolled once: v1 dissolved mid-clip) | 1.10vh | trail: the problems, named |
| 2 | Soil | sinks below the surface into the root cross-section | Kling, A2 to A3 | 1.32vh | none (authored silence) |
| 3 | Microbiology | pushes to microscope scale on a root hair | Kling, A3 to A4 | 1.32vh | lead: what the three microbes do; specimen opens |
| 4 | Plant | along the root hair, up to a backlit leaf | Kling, A4 to A5, last 1.2s compressed 3x | 1.155vh | trail: into every leaf; specimen docks |
| 5 | Factory | pulls out of the leaf, rises to the real aerial | Kling, A5 to real aerial frame 0 | 1.10vh | lead: "We grow those microbes here." |
| 6 | Factory | real drone orbit of the plant | client footage, 7.8s retimed to 5.2s | 1.144vh | trail: licence, 2013 |
| 7 | Fermentation | real pan along the fermenters | client footage, 10s retimed to 5s; directional dissolve in | 1.10vh | lead (deep scrim); specimen multiplies |
| 8 | Products | hall to the three cans on the bench | Kling, real hall frame to P1 (rerolled once) | 1.10vh | trail (deep scrim); specimen drops into the can |
| 9 | Application | farmer spraying, down to the drip emitter | Kling, P2 to D1; match dissolve in on the held can | 1.10vh | lead: dose; specimen released at the emitter |
| 10 | Healthy crop | up the laden bush, out over the golden estate | Kling, D1 to H1 | 1.10vh | finale: CTA + Contact |

## Feel check (cold, from the final contact sheet, before rereading the curve)

| Leg | Intended | Felt |
|---|---|---|
| 0 | Curiosity | openness |
| 1 | Connection | familiar |
| 2 | Held breath | drop (then the ground opens) |
| 3 | Awe | wonder |
| 4 | Lift | light |
| 5 | Recognition | reveal |
| 6 | Trust | **plain** |
| 7 | Precision | clinical |
| 8 | Clarity | clean |
| 9 | Practicality | practical |
| 10 | Resolve | resolved |

Diff and what changed:
- The first pass had a near-still stretch across the end of the crop leg and the start of the soil leg, because Kling faked the crop move with a mid-clip dissolve. Rerolled the crop leg as one physical move; the stem now holds only as long as the authored silence needs.
- A still backlit leaf held for ~0.6vh at the end of the plant leg. Compressed its last 1.2s to 0.4s instead of trimming, so the seam frame is untouched (32.6 dB).
- Leg 6 still reads **plain**, not trust. It is the client's real drone clip, upscaled from 640x352 and soft next to the generated legs. Left in because the brief asks for real assets first; a fresh 4K drone pass over the plant would fix it.
- The peak is the largest visual change on the sheet and has the longest continuous run (3.8vh, one line of copy). The act before it is the quietest frame on the page. The finale holds with its CTA on screen.

## Rest frames (added 2026-09-24)

Client feedback: *"Every single scroll should end with proper image frame and smoother navigation flow."*

What a scroll could stop on before: the two authored dissolves as a double exposure (hall over the aerial, the can over the field), the mid-clip morphs Kling makes between shots (root into the microscope, root hair into the leaf, the cans materialising, the can sweeping past the lens), and the lens in mid-air above the can.

Now scroll still scrubs the film under the hand, but when a scroll ends the page glides (smoothstep, ~0.6-1.4s by distance) to one of thirteen rest frames in `components/home/world/legs.ts` (`stops`). A nudge of more than ~6% of a screen carries on to the next frame in that direction; less goes back. Keyboard arrows, Page keys and Space step frame to frame; Home and End go to the ends. The chapter rail glides to a chapter within 2.4 screens and cuts through a 240ms dip to the canvas colour for anything further, holding the dip until the destination clip has a real frame at its target. Any input during a glide hands the page back. Reduced motion: no glides, the keyboard and rail jump.

| # | Leg @ local | Frame | Copy up |
|---|---|---|---|
| 0 | 0 @ 0 | the estate from above | hero |
| 1 | 1 @ 0.37 | in the coffee row | crop |
| 2 | 1 @ 0.9 | the base of one plant | none (the silence) |
| 3 | 2 @ 0.92 | the root in the soil | none |
| 4 | 3 @ 0.925 | bacteria on the root hair, lens fully open | microbes |
| 5 | 4 @ 0.92 | the backlit leaf, lens docked | plant |
| 6 | 5 @ 0.87 | the plant from the air | grown-here |
| 7 | 6 @ 0.63 | the orbit | factory |
| 8 | 7 @ 0.51 | the hall, lens full | fermentation |
| 9 | 8 @ 0.88 | the cans on the bench, lens gone into the can | products |
| 10 | 9 @ 0.23 | the farmer spraying | application |
| 11 | 9 @ 0.9 | the drip line, release finished | none |
| 12 | 10 @ 1 | back over the estate | finale |

Every frame sits outside the seam bands, so exactly one clip is on screen. To make each copy block fully up at its frame, the microbes, plant and products windows moved later (they had faded out before the clean frame arrived). Every specimen move now finishes before the frame it leads to: open at leg 3 0.7-0.9, grow at leg 7 0.04-0.46, drop at leg 8 0.56-0.84, release at leg 9 0.6-0.86. The portrait lens is clamped on screen, because the bacteria sit at the right edge of the 9:16 crop.

**If a clip is regenerated, re-pick its rest frame.** Check the frame is not a morph, keep it clear of the seam band (0.08vh either side of a leg boundary), and check the copy windows and the specimen timeline against it.

Verified at 1440x900: at all 13 frames exactly one leg is at opacity 1 and every copy block is at 0 or 1. Wheel, keyboard, rail glide, rail cut, slip back, reverse, an interrupted glide and landing after a reload all end on a rest frame. No frame took over 24ms during a glide, at about 80 seeks per second. At 500x714 portrait, frames 4, 5 and 9 checked by eye. Not verified: real touch on iOS or Android, and Safari, which has no `scrollend` and relies on the 180ms quiet timer.

## Generated

Higgsfield (no kie.ai key on this machine). 12 stills on nano_banana_pro 2K (~2 credits each), 11 Kling 3.0 Pro silent clips (8.75 per 5s, 10.5 per 6s), including 2 rerolls. Balance 245.5 before, 141.5 after the first wave, ~124 after the rerolls. Two stills were cropped rather than regenerated (soil vignette, stem centring).

Encodes: 1600px desktop at crf 27 GOP 8, 720x1280 portrait phone cut at crf 28 GOP 4, light hqdn3d first. 34 MB desktop / 24 MB phone across the whole flight, fetched ±1.6vh around the reader.

## Verified

- `shoot.mjs` desktop 1440x900 and phone 390x844: no dead scroll, all 11 legs reach full opacity and paint real video, every copy block clears 4.5:1 at its worst frame. Reduced motion: posters only, no clip fetched, contrast clean, every copy block reaches opacity 1 (checked at 60px steps).
- `worldflight-assert.mjs`: 20 pass, 4 fail, all four understood. Lerp is 0.12 by choice (worldflight.md 7c) where the script expects 0.18. "Nothing in flow" flags `<main>` and the page wrapper, which are only the spacer's ancestors. The seam-release check samples the exact band edge and catches a rounding pixel. The reduced-motion copy check steps 21 times over 12,000px and misses the plateaus; a 60px sweep reaches 1.0 on every block.
- The harness's FROZEN CLIP list is a harness limit in worldflight mode: it measures a leg's visibility by its rect, and every leg's rect is the viewport, so hidden legs read as frozen.
- Keyboard: skip link, nav, 10 chapter buttons, hero CTA, finale CTAs (focus flies the page to where the block is shown), chat. Rings visible.
- Leaving the page: header link loads /products in full (no engine CSS, footer present); back remounts one engine instance; forward loads in full.

Not verified: a real phone (iOS decoder, Low Power Mode, touch scrolling), Safari desktop, Firefox.

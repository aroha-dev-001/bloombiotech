# Fingerprints

Every site you build with **scroll-craft** gets one row here, appended after it
ships. The registry exists so your next build can prove it is a different page
rather than a re-skin of one you already made.

This file is **yours**. It starts empty on purpose: the gate is about not
repeating *yourself*, so it has nothing to say until you have built something.

The rules and the gate live in the skill's
`references/uniqueness.md`. Short version:

**A new build must differ from EVERY row below on at least 4 of the 6
dimensions.** Four against each row individually, not four on average across the
table. If a planned build fails, change the plan. Never edit a row to make room
for it.

The six dimensions are: **grammar**, **nav treatment**, **hero device**,
**act-sequence shape**, **close pattern**, **signature move**.

Dimension 6 is free, because a signature move is unique by definition. So the
gate really asks for three more out of the remaining five, and a build that
changes only grammar and world will fail it.

---

## The registry

| Build | Grammar | Nav treatment | Hero device | Act-sequence shape | Close pattern | Signature move | World | Port |
|---|---|---|---|---|---|---|---|---|
| bloom-home (Bloom Biotech, Next.js home route, 2026-09-23) | Continuous world (worldflight) | Site's liquid-glass capsule kept as chrome; page map is a clickable vertical chapter rail (10 ticks, glass capsule, ground hairline between Crop and Soil, chapter name flashes on arrival) | Aperture lens-open onto an aerial canopy that is already the first leg; lead-corner headline + ghost CTA on the hero window | 11 legs, one pace (0.22vh per second of film), 12.64vh flight / 13.6vh track, peak = 3 contiguous legs (soil, microbes, plant); two authored dissolves (aerial to hall, cans to field) | Arrival back above the same estate at golden hour; finale window holds with primary CTA + ghost Contact in the lead corner | The specimen: a canvas microscope lens picked up at the root hair, carried docked, multiplied in the fermenter, dropped into the can, released at the drip emitter | Photographic nature documentary, sunny Chikkamagaluru coffee country; 9 Kling legs + 2 real client clips | Next.js 16 app route, engine loaded from /public, leave-by-full-navigation |

---

## What is taken

Add a bullet here whenever a build claims something a later build should avoid
reusing: a grammar, a nav treatment, a close pattern, a signature move, an
act-count-and-length band. The shared columns are what the next build inherits
as a constraint, so writing them down is the whole point.

- **Continuous world with a vertical chapter-tick rail** in a glass capsule (bloom-home).
- **A carried object as the signature**: something picked up mid-flight that travels docked and changes state at later waypoints (bloom-home's specimen). A future build should not reuse "carry a thing through the page".
- **Aperture lens-open into the first leg** as the hero entrance (bloom-home).
- **The 12.5 to 13.8vh band with ~11 legs at one pace** (bloom-home).

---

## Appending a row

After shipping, add one line to the table and one bullet to **What is taken** if
the build claimed something new. Fill every column. Say what the build shares
with existing rows.

Rows are append-only. A build that has been superseded stays in the table,
because the space it occupies is still occupied.

---

## Worked example

The skill's author kept a registry of twelve builds across eight page grammars.
If you want to see what a filled-in table looks like, and which shapes tend to
collide, read `EXAMPLES.md` in the scroll-craft repository. Treat it as
illustration only: those rows are somebody else's builds and they do **not**
constrain yours.

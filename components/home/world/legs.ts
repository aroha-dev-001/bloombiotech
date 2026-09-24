/**
 * The flight, leg by leg.
 *
 * Every leg is one clip, and the scroll each leg owns is its length in seconds
 * times one rate. Holding the rate constant is what makes eleven separate clips
 * read as one camera: a leg that owned more scroll per second of film than its
 * neighbour would drag, and one that owned less would surge.
 *
 * The three peak legs (soil, microbes, plant) are 6s clips where every other
 * generated leg is 5s, so the descent gets the most scroll by construction
 * rather than by slowing the camera down.
 */
export const RATE = 0.22; // viewport-heights of scroll per second of film

export type Leg = {
  id: string;
  /** Rail chapter this leg belongs to. Two legs can share one. */
  chapter: string;
  seconds: number;
};

export const legs: Leg[] = [
  { id: "leg00", chapter: "Canopy", seconds: 5 },
  { id: "leg01", chapter: "Crop", seconds: 5 },
  { id: "leg02", chapter: "Soil", seconds: 6 },
  { id: "leg03", chapter: "Microbiology", seconds: 6 },
  { id: "leg04", chapter: "Plant", seconds: 5.25 },
  { id: "leg05", chapter: "Factory", seconds: 5 },
  { id: "leg06", chapter: "Factory", seconds: 5.2 },
  { id: "leg07", chapter: "Fermentation", seconds: 5 },
  { id: "leg08", chapter: "Products", seconds: 5 },
  { id: "leg09", chapter: "Application", seconds: 5 },
  { id: "leg10", chapter: "Healthy crop", seconds: 5 },
];

export const weights = legs.map((l) => +(l.seconds * RATE).toFixed(3));
export const starts = weights.reduce<number[]>((acc, w, i) => {
  acc.push(i === 0 ? 0 : acc[i - 1] + weights[i - 1]);
  return acc;
}, []);
export const TOTAL = weights.reduce((a, b) => a + b, 0);

/** Track position (in viewport-heights) of a point inside a leg. */
export const at = (leg: number, local: number) => starts[leg] + local * weights[leg];

/**
 * A copy window against the whole track, written in leg terms so the numbers
 * stay tied to frames of film. Re-derived automatically if a weight changes.
 */
export function windowOf(
  from: [number, number],
  to: [number, number],
  ramps?: [number, number],
) {
  const f = at(from[0], from[1]) / TOTAL;
  const t = at(to[0], to[1]) / TOTAL;
  const r = ramps ? ` ${ramps[0]} ${ramps[1]}` : "";
  return `${f.toFixed(4)} ${t.toFixed(4)}${r}`;
}

/**
 * Where a scroll is allowed to come to rest.
 *
 * Between these the film is a camera in motion: generated legs morph from one
 * shot into the next, two seams dissolve one clip over another, and the lens
 * is mid-flight. Any of those held still reads as a broken frame, so when a
 * scroll ends the page glides on to one of these (flight.ts).
 *
 * Each is a composed frame, picked off the clips, and sits clear of every
 * seam band so exactly one clip is on screen. The copy windows and the
 * specimen timeline are laid out around them: at every rest frame each copy
 * block is fully up or fully gone, and the lens is never between states.
 */
export const stops = [
  { leg: 0, at: 0 }, // the estate from above, the hero
  { leg: 1, at: 0.37 }, // in the coffee row
  { leg: 1, at: 0.9 }, // the base of one plant, in silence
  { leg: 2, at: 0.92 }, // the root in the soil
  { leg: 3, at: 0.925 }, // bacteria on the root hair, the lens open
  { leg: 4, at: 0.92 }, // the backlit leaf
  { leg: 5, at: 0.87 }, // the plant from the air
  { leg: 6, at: 0.63 }, // the orbit
  { leg: 7, at: 0.51 }, // the fermentation hall
  { leg: 8, at: 0.88 }, // the cans on the bench
  { leg: 9, at: 0.23 }, // the farmer spraying
  { leg: 9, at: 0.9 }, // the drip line
  { leg: 10, at: 1 }, // back over the estate, the finale
].map((s) => ({ ...s, t: at(s.leg, s.at) }));

/**
 * Chapters for the rail, each pointing at the first leg that carries it and
 * the first rest frame inside it.
 */
export const chapters = legs
  .reduce<{ name: string; leg: number; last: number }[]>((acc, l, i) => {
    const prev = acc[acc.length - 1];
    if (prev && prev.name === l.chapter) prev.last = i;
    else acc.push({ name: l.chapter, leg: i, last: i });
    return acc;
  }, [])
  .map((c) => ({ ...c, stop: stops.findIndex((s) => legs[s.leg].chapter === c.name) }));

// ---------------------------------------------------------------------------
// Simulated directional (per-approach-leg) traffic split, by junction.
//
// IMPORTANT — this entire module is a disclosed MODEL, not a measurement.
// Neither field dataset (field20 or baseline7) recorded which direction/
// approach a vehicle came from or turned toward — there is no Direction
// column anywhere in the real data, so no genuine per-direction volume can
// be computed. What follows instead is a standard traffic-engineering
// illustration: each junction's real ADT (a real, measured figure) is
// distributed across its approach legs using an adjustable assumed split,
// so the *shape* of the result is only as good as the assumption behind it.
//
// The junction TYPE and LEG COUNT below are as specified directly by the
// study author (the researcher who conducted this field survey), which
// takes precedence over any web-sourced guess. The specific named road for
// each individual leg is still not something either party measured, so
// where a road name is well documented in public reference sources
// (Wikipedia, KCCA) it's used and cited; where the count requires more legs
// than have a confirmed name, the remainder are labelled as unconfirmed
// rather than given an invented street name.
// ---------------------------------------------------------------------------

export const JUNCTION_LEG_CONFIG = {
  'Wandegeya Junction': {
    type: '4-Leg Signalized Grid',
    legs: [
      'Bombo Road — north approach (toward Bwaise / Gayaza Rd roundabout)',
      'Bombo Road — south approach (toward City Centre)',
      'Yusuf Lule Road — east approach',
      'Makerere Hill Road / University Rd — west approach',
    ],
    primaryLegs: [0, 1],
    source: 'Leg count/type: study author. Road identities: Wikipedia — "Wandegeya" (boundary roads: Bombo Road, Yusuf Lule Road, Makerere Hill Road)',
  },
  'Kibuye Roundabout': {
    type: '5-Leg Asymmetric Rotary',
    legs: [
      'Kampala–Entebbe Road',
      'Kampala–Masaka Road',
      'Kampala–Makindye Road',
      'Local access road — 4th arm (name not independently confirmed)',
      'Local access road — 5th arm (name not independently confirmed)',
    ],
    primaryLegs: [0, 1],
    source: 'Leg count/type: study author. Road identities (3 of 5): Wikipedia — "Kibuye, Uganda" ("confluence of the Kampala–Entebbe Road, the Kampala–Masaka Road and the Kampala–Makindye Road")',
  },
  'Bwaise Junction': {
    type: '4-Leg Signalized / Flooding Plain',
    legs: [
      'Bombo Road (Kampala–Gulu Hwy) — north approach (toward Kawempe / Gulu)',
      'Bombo Road (Kampala–Gulu Hwy) — south approach (toward City Centre)',
      'Mumbule Road — west approach',
      'Local access road — 4th arm (name not independently confirmed)',
    ],
    primaryLegs: [0, 1],
    source: 'Leg count/type: study author. Road identities (3 of 4): KCCA news, "Bwaise Junction Ready and Flooding Contained" (Mumbule Road); Wikipedia — "Bwaise" (Kampala–Gulu Highway runs N–S through it)',
  },
  'Natete Junction': {
    type: '4-Leg Major Junction',
    legs: [
      'Kampala–Masaka Road — east approach (toward City Centre)',
      'Kampala–Masaka Road — south-west approach (toward Masaka / Mbarara)',
      'Mityana Road — north-west approach (toward Mityana / Fort Portal)',
      'Kampala Northern Bypass — north approach (toward Jinja Highway)',
    ],
    primaryLegs: [0, 1],
    source: 'Leg count/type: study author. Road identities: Wikipedia — "Nateete" (Masaka Road, Mityana Road split, Northern Bypass rejoin all documented at this point)',
  },
  'Bakuli Intersection': {
    type: '4-Leg Signalized',
    legs: [
      'Hoima Road — approach toward City Centre',
      'Hoima Road — approach toward Nankulabye Junction',
      'Cross street — north (name not independently confirmed)',
      'Cross street — south (name not independently confirmed)',
    ],
    primaryLegs: [0, 1],
    source: 'Leg count/type: study author. Road identities (2 of 4): general reference to the Hoima Road corridor — the cross-street identity was not independently verified, so it is left unnamed rather than guessed',
  },
};

// Distributes `totalVolume` across a junction's legs. `skew` (0-0.6) is how
// much extra share the "primary" through-corridor legs get over the minor
// legs, on top of an even split — skew=0 means every leg gets exactly
// 1/N of the total (the most neutral assumption possible).
export function simulateDirectionalSplit(totalVolume, config, skew = 0.3) {
  const n = config.legs.length;
  const primarySet = new Set(config.primaryLegs);
  const nPrimary = config.primaryLegs.length;
  const nMinor = n - nPrimary;
  const totalWeight = nPrimary * (1 + skew) + nMinor * (1 - skew);
  return config.legs.map((label, i) => {
    const w = primarySet.has(i) ? (1 + skew) : (1 - skew);
    const pct = (w / totalWeight) * 100;
    return { leg: label, pct, volume: totalVolume * (pct / 100), isPrimary: primarySet.has(i) };
  });
}

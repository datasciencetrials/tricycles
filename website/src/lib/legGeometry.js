// ---------------------------------------------------------------------------
// Schematic geometry helpers for drawing each junction's approach legs on the
// real Leaflet map in OverviewTab.jsx.
//
// IMPORTANT -- like directionalSplit.js (whose JUNCTION_LEG_CONFIG this reads
// verbatim), this is a disclosed illustration layered on top of real data,
// not a survey of true road geometry. This study never recorded a real
// bearing or true length for any approach leg -- what's real is only the
// LEG COUNT and, where a leg's label names a cardinal/intercardinal
// direction (e.g. "north approach", "south-west approach"), the compass
// direction the study author used to describe it. Where a leg's label gives
// no direction at all (a plain road name, or "not independently confirmed"),
// this falls back to an evenly-spaced slot around the junction purely so the
// spokes don't overlap on screen -- that placement carries no positional
// meaning whatsoever. Every map surface that draws these spokes must
// disclose this alongside the same Directional Split limitation notice
// already shown on the Summary Tables tab.
// ---------------------------------------------------------------------------

// Detects a compass bearing (degrees, 0 = north, clockwise) from a leg
// label's own wording -- compound directions checked before single ones so
// "north-west" isn't mis-read as "north".
export function detectBearing(label) {
  const s = (label || '').toLowerCase();
  if (/north-west|northwest/.test(s)) return 315;
  if (/north-east|northeast/.test(s)) return 45;
  if (/south-west|southwest/.test(s)) return 225;
  if (/south-east|southeast/.test(s)) return 135;
  if (/\bnorth\b/.test(s)) return 0;
  if (/\bsouth\b/.test(s)) return 180;
  if (/\beast\b/.test(s)) return 90;
  if (/\bwest\b/.test(s)) return 270;
  return null;
}

const angularDist = (a, b) => {
  const d = Math.abs(a - b) % 360;
  return d > 180 ? 360 - d : d;
};

// Returns one bearing (degrees) per leg in `config.legs` -- a real detected
// compass direction where the leg's own label names one, otherwise an
// evenly-spaced fallback slot chosen to stay clear of the legs that DID get
// a real detected direction (so spokes fan out rather than overlap).
export function computeLegBearings(config) {
  const labels = config.legs;
  const n = labels.length;
  const detected = labels.map(detectBearing);
  const standardSlots = Array.from({ length: n }, (_, i) => (360 / n) * i);
  const usedAngles = detected.filter((d) => d != null);
  const threshold = 180 / n;
  const availableSlots = standardSlots.filter((slot) => !usedAngles.some((u) => angularDist(slot, u) < threshold));
  let slotIdx = 0;
  return detected.map((d) => {
    if (d != null) return d;
    const slot = availableSlots.length ? availableSlots[slotIdx % availableSlots.length] : standardSlots[slotIdx % standardSlots.length];
    slotIdx += 1;
    return slot;
  });
}

// Standard great-circle destination-point formula: the point `distanceMeters`
// away from [lat, lng] along compass `bearingDeg`. Used only to draw a
// short, fixed-length, schematic spoke on the map -- NOT a real measured
// leg length (this study never recorded one).
export function destinationPoint(lat, lng, bearingDeg, distanceMeters) {
  const R = 6371000; // mean Earth radius, meters
  const bearing = (bearingDeg * Math.PI) / 180;
  const latRad = (lat * Math.PI) / 180;
  const lngRad = (lng * Math.PI) / 180;
  const angularDistance = distanceMeters / R;
  const newLatRad = Math.asin(
    Math.sin(latRad) * Math.cos(angularDistance) + Math.cos(latRad) * Math.sin(angularDistance) * Math.cos(bearing)
  );
  const newLngRad = lngRad + Math.atan2(
    Math.sin(bearing) * Math.sin(angularDistance) * Math.cos(latRad),
    Math.cos(angularDistance) - Math.sin(latRad) * Math.sin(newLatRad)
  );
  return [(newLatRad * 180) / Math.PI, (newLngRad * 180) / Math.PI];
}

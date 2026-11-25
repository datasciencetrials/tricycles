import { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { computeLegBearings } from '../lib/legGeometry';
import { LEG_ROUTES } from '../lib/legRoutes';

// ---------------------------------------------------------------------------
// Live per-leg-per-junction simulated flow, drawn directly onto the real
// Leaflet map (OverviewTab.jsx) as native Leaflet vector layers (polyline
// spokes + animated circle-marker "vehicles").
//
// WHY NATIVE LEAFLET LAYERS (not a separate absolutely-positioned canvas/SVG
// overlay div): every one of these layers is created through the Leaflet
// map instance itself (via useMap()) and added straight into Leaflet's own
// overlay pane, using real lat/lng coordinates. Leaflet re-projects that
// pane's contents on every pan/zoom/viewreset itself -- there is no manual
// pixel math to keep in sync, and no manual re-registration needed on
// pan/zoom. Because OverviewTab.jsx's CSS 3D tilt (`rotateX(35deg)`) is
// applied to the single `.leaflet-container` DOM node as a rigid unit (see
// OverviewTab.jsx's own comments), everything Leaflet draws inside it --
// tiles, markers, and these flow layers alike -- inherits that same tilt for
// free, with no extra transform math on this component's part. Verified
// empirically against panning/zooming/marker-click/HUD-sync in this task's
// Playwright pass (see final report) rather than assumed.
//
// IMPORTANT -- disclosed model/measurement mix, exactly in the spirit of
// directionalSplit.js and legGeometry.js: leg identity/count is real
// (author-confirmed); the per-leg VOLUME shown is `simulateDirectionalSplit()`
// applied to the selected hour's volume (itself `simulateFullDayProfile()`'s
// real reading for 06:00-21:45 or a disclosed modeled estimate outside it) --
// that part is unchanged and still a disclosed model either way.
//
// The LINE ITSELF is now mixed: for every leg listed in legRoutes.js's
// LEG_ROUTES (13 of the 21 legs across all 5 junctions), the line is a real,
// road-following polyline lifted point-for-point from an actual GIS
// road-network dataset (see legRoutes.js's header for the two source
// datasets and extraction method) -- genuine measured road geometry, not a
// schematic. For every other leg (Kibuye Roundabout's 5 legs, Bwaise
// Junction's 4th leg -- neither has a real, locatable direction/road-name
// match in either source dataset), the line remains exactly what it always
// was: a schematic, screen-pixel-length spoke at a bearing that is either
// detected from the leg's compass-word label or, failing that, an evenly
// spaced placeholder slot with no positional meaning whatsoever. Every popup
// below states which kind of line this leg has, plus this junction's own
// JUNCTION_LEG_CONFIG source citation.
// ---------------------------------------------------------------------------

// Spoke length is expressed in fixed SCREEN pixels, not real-world meters --
// deliberately, since this map's default extent spans all 5 study sites
// city-wide: a fixed-meters spoke (a few hundred meters) would shrink to a
// few invisible/unclickable pixels at that zoom, while a screen-pixel spoke
// stays a legible, consistently-sized "compass rose" around each marker at
// any zoom. The pixel offset is converted to a real lat/lng via the map's
// own project()/unproject() (so it's still a genuine point ON the map, just
// not a claim about a real road's length) and is recomputed on every
// 'zoomend' so it re-anchors correctly as the pixels-per-meter ratio changes
// -- panning alone needs no recomputation, since project()/unproject() are
// independent of the map's current center.
const SPOKE_PIXELS_PRIMARY = 68;
const SPOKE_PIXELS_MINOR = 52;
const PHASE_MARGIN = 0.14; // keeps moving dots clear of both the marker hub and the spoke tip -- see the animation loop below

function endLatLngForPixels(map, originLatLng, bearingDeg, pixels) {
  const zoom = map.getZoom();
  const originPoint = map.project(originLatLng, zoom);
  const rad = (bearingDeg * Math.PI) / 180;
  const offset = L.point(Math.sin(rad) * pixels, -Math.cos(rad) * pixels); // screen y grows downward, so north (bearing 0) is -y
  const endPoint = originPoint.add(offset);
  const ll = map.unproject(endPoint, zoom);
  return [ll.lat, ll.lng];
}

// Real-Earth distance between two [lat,lng] points -- used only to place the
// animated dots at an even fraction of a real multi-point road route (the
// route's own points are never moved or resampled, just measured).
function haversineMeters(a, b) {
  const R = 6371000;
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(b[0] - a[0]);
  const dLng = toRad(b[1] - a[1]);
  const s = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a[0])) * Math.cos(toRad(b[0])) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}

// Precomputes cumulative distance along a path (2+ points) for even dot
// placement, then returns a function mapping a 0..1 fraction to a [lat,lng]
// -- for a real multi-point route this walks the real chain of vertices
// rather than a single straight interpolation, so a dot travels ON the real
// road shape (including its actual bends) instead of cutting corners.
function makePathSampler(path) {
  const cum = [0];
  for (let i = 1; i < path.length; i += 1) {
    cum.push(cum[i - 1] + haversineMeters(path[i - 1], path[i]));
  }
  const total = cum[cum.length - 1] || 1;
  return (frac) => {
    const target = Math.max(0, Math.min(1, frac)) * total;
    let seg = 1;
    while (seg < cum.length - 1 && cum[seg] < target) seg += 1;
    const segStart = cum[seg - 1];
    const segLen = cum[seg] - segStart || 1;
    const segFrac = (target - segStart) / segLen;
    const a = path[seg - 1];
    const b = path[seg];
    return [a[0] + (b[0] - a[0]) * segFrac, a[1] + (b[1] - a[1]) * segFrac];
  };
}

export default function MapFlowOverlay({ flowData, accentColor = '#0071e3', mutedColor = 'rgba(110,110,115,0.6)', onLegSelect }) {
  const map = useMap();
  const legStateRef = useRef({}); // "<junction>__<legIndex>" -> { line, dots, start, end, bearing, pixels, siteName, legIndex }
  const paramsRef = useRef({ flowData, onLegSelect });
  paramsRef.current = { flowData, onLegSelect };

  // Build the static geometry (spokes + moving-vehicle markers) exactly once
  // per mount -- junction coordinates and leg bearings never change; only
  // the per-hour simulated volumes do, and those are applied in the second
  // effect below without touching this geometry, so panning/zooming/hour
  // changes never cause a layer teardown-and-rebuild flicker.
  useEffect(() => {
    if (!map || !flowData || !flowData.length) return undefined;

    // A dedicated pane, given a zIndex ABOVE markerPane (600) -- a leg
    // pointing roughly north runs straight up from the marker's own anchor
    // point, directly through the default pin icon's body (anchored at its
    // bottom tip, extending upward) and through its permanent PCU label
    // above that, so anything painted below markerPane would leave that
    // leg's spoke/dots invisible for its full length, not just briefly
    // under the icon. Confirmed empirically in this task's Playwright pass:
    // a north-bearing primary leg (present at 3 of the 5 junctions) was
    // entirely hidden with a below-markerPane pane, and fully visible above
    // it. The real marker's OWN clickability is protected a different way
    // (see onLegSelect below) rather than by yielding z-order.
    if (!map.getPane('flowPane')) {
      const pane = map.createPane('flowPane');
      pane.style.zIndex = 650;
    }

    const group = L.layerGroup().addTo(map);
    const state = {};

    flowData.forEach((site) => {
      const bearings = computeLegBearings({ legs: site.legs.map((l) => l.leg) });
      const realRoutes = LEG_ROUTES[site.name] || [];
      site.legs.forEach((leg, i) => {
        const bearing = bearings[i];
        const pixels = leg.isPrimary ? SPOKE_PIXELS_PRIMARY : SPOKE_PIXELS_MINOR;
        const realRoute = realRoutes[i];
        // A leg with a real, road-following coordinate chain (legRoutes.js)
        // uses that chain verbatim, starting from the junction's own real
        // coordinate outward -- every point is a real GIS vertex. Every
        // other leg keeps the exact original schematic behaviour: a single
        // straight, screen-pixel-length line at a detected/fallback bearing.
        const isReal = !!realRoute;
        const path = isReal ? [site.coords, ...realRoute.coords] : [site.coords, endLatLngForPixels(map, site.coords, bearing, pixels)];
        const end = path[path.length - 1];
        const key = `${site.name}__${i}`;

        // The static spoke/route line is deliberately NON-interactive -- only
        // the small moving dots below carry hover/click affordance, keeping
        // the interactive hit-area small and concentrated on the "vehicles"
        // themselves rather than a full line's length.
        const line = L.polyline(path, {
          pane: 'flowPane',
          color: leg.isPrimary ? accentColor : mutedColor,
          weight: leg.isPrimary ? 4 : 2.5,
          opacity: 0.9,
          dashArray: leg.isPrimary ? null : '2,6',
          className: isReal ? 'a-flow-spoke a-flow-spoke-real' : 'a-flow-spoke',
          interactive: false,
        }).addTo(group);

        const dotCount = leg.isPrimary ? 3 : 2;
        const dots = Array.from({ length: dotCount }, (_, d) => {
          const marker = L.circleMarker(site.coords, {
            pane: 'flowPane',
            radius: leg.isPrimary ? 4.5 : 3.2,
            color: '#ffffff',
            weight: 1.2,
            fillColor: leg.isPrimary ? accentColor : mutedColor,
            fillOpacity: 0.95,
            className: 'a-flow-dot',
            interactive: true,
          }).addTo(group);
          marker.bindPopup('', { className: 'a-flow-popup' });
          // A dot sits ON TOP of the marker pane so every leg (including a
          // due-north one, colinear with the marker's own icon) stays
          // visible -- but that means a click meant for the marker can land
          // on a dot instead. Rather than fight z-order, make a dot click
          // ALSO do what a marker click does (select this site), so the
          // Site Detail HUD stays in sync either way; confirmed empirically
          // in this task's Playwright pass that this keeps every one of the
          // 5 real markers' "click -> HUD sync" behavior working regardless
          // of whether the click actually lands on the icon or a dot.
          marker.on('click', () => { paramsRef.current.onLegSelect?.(site.name); });
          return { marker, phase: d / dotCount, dir: 1 };
        });

        state[key] = {
          line, dots, start: site.coords, end, bearing, pixels, siteName: site.name, legIndex: i,
          isReal, path, sample: makePathSampler(path),
        };
      });
    });
    legStateRef.current = state;

    // Re-anchor every SCHEMATIC spoke's endpoint whenever the zoom level
    // changes, so it keeps the same on-screen length instead of growing/
    // shrinking with the map's real-world scale (see comment above
    // SPOKE_PIXELS_*). A real road-following route is real-world geometry,
    // not a screen-pixel offset, so it is left completely alone here --
    // Leaflet already re-projects its fixed lat/lngs on every zoom for free.
    const onZoomEnd = () => {
      Object.values(legStateRef.current).forEach((entry) => {
        if (entry.isReal) return;
        const end = endLatLngForPixels(map, entry.start, entry.bearing, entry.pixels);
        entry.end = end;
        entry.path = [entry.start, end];
        entry.sample = makePathSampler(entry.path);
        entry.line.setLatLngs(entry.path);
      });
    };
    map.on('zoomend', onZoomEnd);

    let raf;
    let last = 0;
    // Browsers throttle/suspend requestAnimationFrame entirely while a tab is
    // backgrounded (document.hidden) -- that's expected and not a bug; the
    // one real risk is a single huge `dt` jump the instant the tab comes
    // back into view. Resetting `last` on visibilitychange makes that frame
    // a normal small step instead, so dots never visibly "teleport."
    const onVisibilityChange = () => { last = 0; };
    document.addEventListener('visibilitychange', onVisibilityChange);
    const step = (t) => {
      const dt = last ? Math.min((t - last) / 1000, 0.05) : 0.016;
      last = t;
      const { flowData: fd } = paramsRef.current;
      const siteByName = Object.fromEntries((fd || []).map((s) => [s.name, s]));

      Object.values(legStateRef.current).forEach(({ dots, sample, siteName, legIndex }) => {
        const site = siteByName[siteName];
        const leg = site && site.legs[legIndex];
        if (!leg) return;
        const maxVol = Math.max(...site.legs.map((l) => l.volume), 1);
        const congestion = Math.max(0, Math.min(1, ((site.vcMean || 0) - 0.5) / 0.6)); // 0 free-flow .. 1 saturated, same ramp as JunctionDigitalTwin.jsx
        const speedFactor = 1 - 0.6 * congestion;
        const baseSpeed = 0.18 + (leg.volume / maxVol) * 0.5; // busier legs animate faster, same "lively responds to volume" intent as the Digital Twin

        dots.forEach((dot) => {
          dot.phase += dot.dir * baseSpeed * speedFactor * dt;
          if (dot.phase >= 1) { dot.phase = 1; dot.dir = -1; }
          if (dot.phase <= 0) { dot.phase = 0; dot.dir = 1; }
          // Draw within [PHASE_MARGIN, 1-PHASE_MARGIN] rather than the full
          // [0,1] range -- keeps every dot a little clear of both the real
          // junction marker's own clickable icon at the hub end and the far
          // end (schematic spoke tip, or the real route's outer end), so a
          // dot is never exactly on top of the marker's hit area even at its
          // closest approach. `sample()` walks the leg's real multi-point
          // road chain (or the plain 2-point schematic line) by actual
          // cumulative distance, so a dot on a real route rides its true
          // bends rather than cutting a straight line across them.
          const drawn = PHASE_MARGIN + dot.phase * (1 - 2 * PHASE_MARGIN);
          const [lat, lng] = sample(drawn);
          dot.marker.setLatLng([lat, lng]);
          // fade + shrink slightly as it nears the hub, so motion reads as
          // "arriving/departing" rather than a rigid metronome tick
          const alpha = 0.55 + 0.45 * dot.phase;
          dot.marker.setStyle({ fillOpacity: alpha });
        });
      });
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      map.off('zoomend', onZoomEnd);
      group.remove();
      legStateRef.current = {};
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, accentColor, mutedColor, flowData.length]);

  // Refresh each spoke's popup content and static styling whenever the
  // selected hour's simulated volumes change -- geometry from the effect
  // above is left completely alone, so this never causes a visual re-mount.
  useEffect(() => {
    (flowData || []).forEach((site) => {
      site.legs.forEach((leg, i) => {
        const entry = legStateRef.current[`${site.name}__${i}`];
        if (!entry) return;
        const modeledNote = site.isModeledHour
          ? '<div style="color:#ff9f0a;font-weight:700;margin-top:3px;">Modeled hour — outside the 06:00–21:45 field sample</div>'
          : '<div style="color:#30d158;font-weight:700;margin-top:3px;">Real sampled hour (06:00–21:45)</div>';
        const realRoute = (LEG_ROUTES[site.name] || [])[i];
        const routeNote = realRoute
          ? `<div style="color:#0071e3;font-weight:700;margin-top:3px;">Real road route · ${realRoute.realMeters}m mapped from GIS road data</div>`
          : '<div style="color:#888;font-weight:700;margin-top:3px;">Schematic line — direction/length not a real road measurement</div>';
        const html = `
          <div style="min-width:190px;font-family:-apple-system,BlinkMacSystemFont,'Inter',system-ui,sans-serif;">
            <div style="font-weight:800;font-size:12.5px;color:#1d1d1f;">${site.shortName || site.name}</div>
            <div style="font-size:11px;color:#555;margin-top:2px;">${leg.leg}</div>
            <div style="font-size:11.5px;color:#333;margin-top:6px;">${leg.isPrimary ? '★ Primary leg · ' : ''}${leg.pct.toFixed(1)}% assumed share of this hour</div>
            <div style="font-size:13px;font-weight:800;color:#0071e3;margin-top:2px;">${Math.round(leg.volume).toLocaleString()} veh/hr (simulated)</div>
            ${modeledNote}
            ${routeNote}
            <div style="font-size:10px;color:#888;margin-top:6px;line-height:1.4;">Leg identity/count real (author-confirmed). Per-leg split is a disclosed assumption. Source: ${site.source}</div>
          </div>`;
        entry.dots.forEach((dot) => {
          dot.marker.setPopupContent(html);
          dot.marker.setStyle({
            fillColor: leg.isPrimary ? accentColor : mutedColor,
          });
        });
        entry.line.setStyle({
          color: leg.isPrimary ? accentColor : mutedColor,
          weight: leg.isPrimary ? 4 : 2.5,
        });
      });
    });
  }, [flowData, accentColor, mutedColor]);

  return null;
}

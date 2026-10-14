import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip as LeafletTooltip, LayersControl, LayerGroup, ScaleControl, ZoomControl, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import PageControls, { downloadTextFile, downloadJsonFile, downloadChartsAsZip } from './PageControls';
import MethodologyPanel from './MethodologyPanel';
import SearchableSelect, { searchableSelectCss } from './SearchableSelect';
import MapFlowOverlay from './MapFlowOverlay';
import useTrafficStats from '../lib/useTrafficStats';
import { simulateFullDayProfile, OVERNIGHT_TROUGH_FRACTION } from '../lib/trafficStats';
import { JUNCTION_LEG_CONFIG, simulateDirectionalSplit } from '../lib/directionalSplit';
import useScrollbarThumb from '../lib/useScrollbarThumb';

// Fix Leaflet default marker icon issue in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom Leaflet control (no extra dependency) that toggles the browser's
// native fullscreen mode on the map container -- mirrors Leaflet's own
// L.Control.Zoom construction so it inherits the same leaflet-bar styling.
const MapFullscreenControl = () => {
  const map = useMap();
  useEffect(() => {
    const mapEl = map.getContainer();
    const FullscreenControl = L.Control.extend({
      onAdd: function () {
        const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
        const link = L.DomUtil.create('a', 'a-map-fullscreen-btn', container);
        link.href = '#';
        link.title = 'Toggle fullscreen map';
        link.setAttribute('role', 'button');
        link.setAttribute('aria-label', 'Toggle fullscreen map');
        link.innerHTML = '<i class="fa-solid fa-expand" aria-hidden="true"></i>';
        L.DomEvent.disableClickPropagation(container);
        L.DomEvent.on(link, 'click', (e) => {
          L.DomEvent.preventDefault(e);
          if (!document.fullscreenElement) {
            mapEl.requestFullscreen?.();
          } else {
            document.exitFullscreen?.();
          }
        });
        return container;
      },
    });
    // Positioned bottomleft (not Leaflet's usual topleft) -- with the map
    // surface CSS-tilted for the Google-Earth-style oblique view, the top of
    // the plane is the "far" edge that the perspective transform compresses
    // most; bottomleft is the "near" edge closest to the transform's pivot,
    // so controls placed there stay full-size and easily clickable.
    const control = new FullscreenControl({ position: 'bottomleft' });
    control.addTo(map);
    return () => control.remove();
  }, [map]);
  return null;
};

// Custom Leaflet control that resets the map back to the same dynamic
// fit-all-study-sites extent the map opens with (bounds computed live from
// the 5 real site coordinates, not a hardcoded lat/lng box) -- so "reset
// view" always matches the default extent, never a separate hand-picked one.
const MapResetViewControl = ({ bounds, fitOptions }) => {
  const map = useMap();
  useEffect(() => {
    const ResetControl = L.Control.extend({
      onAdd: function () {
        const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
        const link = L.DomUtil.create('a', 'a-map-reset-btn', container);
        link.href = '#';
        link.title = 'Reset to default extent (all 5 study sites)';
        link.setAttribute('role', 'button');
        link.setAttribute('aria-label', 'Reset map to default extent');
        link.innerHTML = '<i class="fa-solid fa-crosshairs" aria-hidden="true"></i>';
        L.DomEvent.disableClickPropagation(container);
        L.DomEvent.on(link, 'click', (e) => {
          L.DomEvent.preventDefault(e);
          map.fitBounds(bounds, fitOptions);
        });
        return container;
      },
    });
    // bottomleft for the same reason as MapFullscreenControl above -- it
    // keeps this control in the tilted plane's undistorted "near" edge.
    const control = new ResetControl({ position: 'bottomleft' });
    control.addTo(map);
    return () => control.remove();
  }, [map, bounds, fitOptions]);
  return null;
};

// Geographic position + qualitative interaction description only -- every
// numeric figure (volume, tricycle share, PCU) is computed live from real
// field data by useTrafficStats() below, never hand-typed here.
// Coordinates are the author's own field-recorded GPS fixes for all 5
// study sites, superseding the earlier OpenStreetMap/Wikipedia reference
// points, so markers sit on the exact surveyed location rather than an
// approximate public-geodata guess.
const SITE_GEO = [
  { name: "Wandegeya Junction", coords: [0.330107, 32.574089], interaction: "Tricycle-Motorcycle Taxi-Non-Motorized Transport (NMT)" },
  { name: "Kibuye Roundabout", coords: [0.293537, 32.572884], interaction: "Tricycle-Car (Expressway Exit)" },
  { name: "Bakuli Intersection", coords: [0.314673, 32.564676], interaction: "Tricycle-Bus (Hub)" },
  { name: "Bwaise Junction", coords: [0.340550, 32.571661], interaction: "Tricycle-Non-Motorized Transport (NMT) (Flood Zone)" },
  { name: "Natete Junction", coords: [0.299511, 32.532720], interaction: "Tricycle-Public Service Vehicle (PSV/Minibus) Hub" }
];

// ---------------------------------------------------------------------------
// Apple-style design tokens (bright, light, system-color palette) — same
// tokens used across the Overview / Summary Tables / Analytics tabs so the
// three redesigned views feel like one product.
// ---------------------------------------------------------------------------
const C = {
  blue: '#0071e3', blue2: '#0a84ff', green: '#30d158', orange: '#ff9f0a',
  red: '#ff453a', purple: '#bf5af2', pink: '#ff375f', teal: '#40c8e0',
  yellow: '#ffd60a', indigo: '#5e5ce6',
  ink: '#1d1d1f', sub: '#6e6e73', faint: '#707074', canvas: '#f5f5f7', card: '#ffffff',
};
const hex2rgba = (hex, a) => {
  const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${a})`;
};
const SITE_COLORS = [C.blue, C.indigo, C.teal, C.orange, C.purple];

const SectionHeader = ({ eyebrow, title, color = C.blue, sub }) => (
  <div style={{ marginBottom: '18px' }}>
    <p className="a-eyebrow" style={{ color }}>{eyebrow}</p>
    <h3 className="a-title">{title}</h3>
    {sub && <p className="a-sub">{sub}</p>}
  </div>
);

const KpiCard = ({ icon, color, label, value, sub }) => (
  <div className="a-card a-kpi">
    <div className="a-kpi-icon" style={{ background: hex2rgba(color, 0.14), color }}>
      <i className={`fa-solid ${icon}`}></i>
    </div>
    <div className="a-kpi-value">{value}</div>
    <div className="a-kpi-label">{label}</div>
    {sub && <div className="a-kpi-sub">{sub}</div>}
  </div>
);

// ---------------------------------------------------------------------------
const OverviewTab = ({ goBack, canGoBack } = {}) => {
  const [selectedSite, setSelectedSite] = useState(null);
  const [hudSiteRef, hudSiteThumb] = useScrollbarThumb('vertical');
  const [weatherView, setWeatherView] = useState('Dry');
  // Live per-leg-per-junction flow overlay state (Task: "show the simulated
  // traffic flow on the map per direction per leg per junction") -- the
  // hour being scrubbed/played, whether it's auto-advancing, and the same
  // disclosed corridor-bias skew the Summary Tables / Digital Twin sections
  // already expose (default matches theirs: 0.3).
  const [selectedHour, setSelectedHour] = useState(8);
  const [isFlowPlaying, setIsFlowPlaying] = useState(false);
  const [flowSkew, setFlowSkew] = useState(0.3);
  const stats = useTrafficStats();

  // Auto-advance the selected hour once per second while "playing", wrapping
  // 23 -> 0. Cleared whenever isFlowPlaying turns off or the tab unmounts.
  useEffect(() => {
    if (!isFlowPlaying) return undefined;
    const id = setInterval(() => setSelectedHour((h) => (h + 1) % 24), 1000);
    return () => clearInterval(id);
  }, [isFlowPlaying]);

  // Merge static geo/interaction info with the live-computed per-site
  // figures from useTrafficStats() -- this is the single place the two are
  // joined, so every chart/card below reads from one consistent source.
  const studySites = useMemo(() => {
    if (!stats) return null;
    return SITE_GEO.map((geo) => {
      const s = stats.byIntersection[geo.name] || {};
      const crit = stats.criticalityByIntersection[geo.name] || {};
      return {
        ...geo,
        meanDailyVolume: s.meanDailyVolume,
        meanDailyVolumeExclMC: s.meanDailyVolumeExclMC,
        tricycleSharePct: s.tricycleSharePct,
        pcuHeadway: stats.pcuByIntersection[geo.name]?.pcuHeadway,
        meanIntervalVolumeDry: s.meanIntervalVolumeDry,
        meanIntervalVolumeWet: s.meanIntervalVolumeWet,
        criticalityIndex: crit.index,
      };
    });
  }, [stats]);

  // The map's default/reset extent: a dynamic fit-all-5-real-sites bounds
  // array (never a hardcoded lat/lng box), memoized so the same reference is
  // used both for MapContainer's initial `bounds` prop and for the "reset
  // view" control -- guaranteeing "reset" always returns to the exact same
  // default extent this tab already opened with.
  const siteBounds = useMemo(() => (studySites ? studySites.map((s) => s.coords) : []), [studySites]);

  // Same fit-bounds behavior as before (40px padding on every side), just
  // expressed as asymmetric Leaflet padding so the two edges that now carry
  // a floating glass HUD (top: title/KPI strip, right: Site Detail panel)
  // reserve enough clearance that no study-site marker ends up hidden
  // underneath one on the default view -- the left/bottom edges, where
  // nothing new was added, keep the original 40px untouched. This is the
  // one dynamic fit-options object used both for the map's initial extent
  // and the "reset view" control, so both always agree.
  const fitOptions = useMemo(() => ({ paddingTopLeft: [40, 210], paddingBottomRight: [368, 40] }), []);

  // Per-leg-per-junction simulated flow for the currently selected hour --
  // real leg identity/count (JUNCTION_LEG_CONFIG, author-confirmed) x this
  // hour's volume (simulateFullDayProfile: real for 06:00-21:45, disclosed
  // model outside it) x the same disclosed directional-split assumption
  // (simulateDirectionalSplit) already used on Summary Tables. The 15-min
  // interval mean is converted to a veh/hr rate via x4, the same convention
  // FORMULAS.peakHourly already uses elsewhere on this site.
  const flowData = useMemo(() => {
    if (!stats) return [];
    return SITE_GEO
      .map((geo) => {
        const config = JUNCTION_LEG_CONFIG[geo.name];
        if (!config) return null;
        const fullProfile = simulateFullDayProfile(geo.name, stats.hourlyProfileByIntersection);
        const hourEntry = fullProfile[selectedHour];
        const hourlyRate = (hourEntry?.volume || 0) * 4;
        const legs = simulateDirectionalSplit(hourlyRate, config, flowSkew);
        return {
          name: geo.name,
          shortName: stats.shortName(geo.name),
          coords: geo.coords,
          legs,
          vcMean: stats.vcByIntersection[geo.name]?.mean,
          isModeledHour: !!hourEntry?.isModeled,
          intervalVolume: hourEntry?.volume,
          hourlyRate,
          source: config.source,
          type: config.type,
        };
      })
      .filter(Boolean);
  }, [stats, selectedHour, flowSkew]);

  const flowIsRealHour = flowData.length ? !flowData[0].isModeledHour : true;

  const exportSites = () => {
    if (!studySites) return;
    const header = 'Study Site,Latitude,Longitude,Mean Daily Volume (2026 field sample),ADT Excluding Motorcycles,Tricycle Share (%),PCU (headway-ratio method),Traffic Criticality Index (0-100),Dominant Interaction';
    const lines = studySites.map(s =>
      `"${s.name}",${s.coords[0]},${s.coords[1]},${Math.round(s.meanDailyVolume)},${Math.round(s.meanDailyVolumeExclMC)},${s.tricycleSharePct.toFixed(2)},${s.pcuHeadway.toFixed(3)},${s.criticalityIndex.toFixed(1)},"${s.interaction}"`
    );
    downloadTextFile('tricycle_pcu_study_sites.csv', [header, ...lines].join('\n'));
  };

  const overviewExportOptions = [
    { id: 'csv', label: 'Site Data (CSV)', icon: 'fa-file-csv', hint: 'Volume, PCU & criticality per site', action: exportSites },
    { id: 'json', label: 'Full Dataset (JSON)', icon: 'fa-file-code', hint: 'All computed network stats, raw', action: () => downloadJsonFile('tricycle_pcu_network_stats.json', stats) },
    { id: 'png', label: 'Charts as Images (ZIP)', icon: 'fa-images', hint: 'Every chart on this page as PNG', action: () => downloadChartsAsZip('tricycle_pcu_overview_charts.zip') },
    { id: 'print', label: 'Print / Save as PDF', icon: 'fa-print', hint: 'Opens your browser’s print dialog', action: () => window.print() },
  ];

  const totalVolume = studySites ? studySites.reduce((s, x) => s + x.meanDailyVolume, 0) : 0;
  const totalVolumeExclMC = stats ? stats.networkAdt.adtExclMotorcycles : 0;
  const busiest = studySites && stats ? studySites.find(s => s.name === stats.busiestIntersection) : null;
  const highestTricycle = studySites && stats ? studySites.find(s => s.name === stats.highestTricycleShareIntersection) : null;
  const weatherDelta = stats ? stats.weatherTest.pctChange : null;

  const chipVolume = (site) => (weatherView === 'Dry' ? site.meanIntervalVolumeDry : site.meanIntervalVolumeWet);

  // Real, weather-conditional figures for the top KPI strip -- so toggling
  // Dry/Wet visibly changes numbers up top, not just the map popup text.
  // Both feed off the same real per-site 15-min interval means (field20's
  // Weather column) already computed by useTrafficStats(); nothing here is
  // extrapolated into a full-day total, since the field data only supports
  // an interval-level Dry/Wet split.
  const weatherSites = studySites ? studySites.filter((s) => chipVolume(s) != null) : [];
  const combinedIntervalVolume = weatherSites.reduce((sum, s) => sum + chipVolume(s), 0);
  const busiestUnderWeather = weatherSites.length
    ? weatherSites.reduce((a, b) => (chipVolume(b) > chipVolume(a) ? b : a))
    : null;
  const weatherN = stats ? (weatherView === 'Dry' ? stats.weatherTest.nA : stats.weatherTest.nB) : null;

  return (
    <div className="apple-overview">
      <style>{`
        .apple-overview { position: relative; width: 100vw; left: 50%; right: 50%; margin-left: -50vw; margin-right: -50vw; background: ${C.canvas}; }
        .apple-overview-inner { width: 100%; margin: 0 auto; padding: 36px 12px 90px; font-family: -apple-system, BlinkMacSystemFont, 'Inter', system-ui, sans-serif; color: ${C.ink}; }
        .a-hero { text-align: center; max-width: 760px; margin: 0 auto 40px; padding: 44px 12px 0; font-family: -apple-system, BlinkMacSystemFont, 'Inter', system-ui, sans-serif; color: ${C.ink}; }
        .a-hero-eyebrow { font-size: 0.78rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: ${C.blue}; margin: 0 0 10px; }
        .a-hero-title { font-size: clamp(2.1rem, 4vw, 3.4rem); font-weight: 800; letter-spacing: -0.03em; margin: 0 0 12px; line-height: 1.05;
          background: linear-gradient(90deg, ${C.blue}, ${C.teal} 50%, ${C.green}); -webkit-background-clip: text; background-clip: text; color: transparent; }
        .a-hero-sub { font-size: 1.05rem; color: ${C.sub}; margin: 0; line-height: 1.5; }

        .a-card { background: ${C.card}; border-radius: 22px; padding: 26px; box-shadow: 0 1px 2px rgba(0,0,0,0.04), 0 12px 28px -12px rgba(0,0,0,0.10); border: 1px solid rgba(0,0,0,0.045); display: flex; flex-direction: column; transition: transform .25s ease, box-shadow .25s ease; }
        .a-card:hover { transform: translateY(-2px); box-shadow: 0 2px 4px rgba(0,0,0,0.05), 0 20px 36px -14px rgba(0,0,0,0.14); }

        .a-eyebrow { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.07em; text-transform: uppercase; margin: 0 0 4px; }
        .a-title { font-size: 1.32rem; font-weight: 700; letter-spacing: -0.01em; margin: 0; color: ${C.ink}; }
        .a-sub { font-size: 0.85rem; color: ${C.sub}; margin: 6px 0 0; line-height: 1.5; }
        .a-footnote { font-size: 0.75rem; color: ${C.faint}; margin: 10px 0 0; line-height: 1.5; }

        .a-kpi-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; margin-bottom: 22px; }
        .a-kpi { padding: 22px; gap: 10px; }
        .a-kpi-icon { width: 42px; height: 42px; border-radius: 13px; display: flex; align-items: center; justify-content: center; font-size: 17px; margin-bottom: 4px; }
        .a-kpi-value { font-size: 1.55rem; font-weight: 800; letter-spacing: -0.02em; color: ${C.ink}; font-feature-settings: "tnum" 1; }
        .a-kpi-label { font-size: 0.72rem; font-weight: 700; color: ${C.sub}; text-transform: uppercase; letter-spacing: 0.03em; }
        .a-kpi-sub { font-size: 0.76rem; color: ${C.faint}; margin-top: -2px; }

        .a-grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 20px; margin-bottom: 20px; }
        .s-4 { grid-column: span 4; } .s-5 { grid-column: span 5; } .s-6 { grid-column: span 6; }
        .s-7 { grid-column: span 7; } .s-8 { grid-column: span 8; } .s-12 { grid-column: span 12; }
        @media (max-width: 1080px) { .a-grid .s-4, .a-grid .s-5, .a-grid .s-6, .a-grid .s-7, .a-grid .s-8 { grid-column: span 12; } }

        .a-chart-box { flex: 1; min-height: 260px; position: relative; width: 100%; margin-top: 10px; }

        .a-toggle-row { display: flex; gap: 8px; }
        .a-toggle-btn { border: 1px solid rgba(0,0,0,0.08); background: #fff; color: ${C.sub}; font-weight: 600; font-size: 0.82rem; padding: 8px 14px; border-radius: 10px; cursor: pointer; transition: all .15s ease; }
        .a-toggle-btn.active { background: ${C.ink}; color: #fff; border-color: ${C.ink}; }
        .a-toggle-btn:hover:not(.active) { background: #f5f5f7; }

        /* ===================================================================
           FULL-BLEED GEOSPATIAL STAGE -- the map is the dominant element of
           this tab: a near-full-viewport, edge-to-edge container sitting
           directly under the sticky 72px topbar (+ the 20px top padding
           main-content applies above every tab), with every other Overview
           control floating on top of it as a HUD rather than sharing a grid
           row with it. See OverviewTab.jsx header comment for the redesign
           rationale.
           =================================================================== */
        .a-map-stage { position: relative; width: 100%; height: calc(100vh - 92px); min-height: 560px; overflow: hidden;
          background: linear-gradient(180deg, #c7ccd6 0%, ${C.canvas} 55%); }

        /* Tilt: a CSS 3D-perspective approximation of Google Earth Pro's
           oblique viewing angle. Leaflet has no native pitch/3D -- this
           wraps ONLY the map's tile/marker/control surface (one DOM node,
           so Leaflet's internal panes move as a single rigid unit) in a
           perspective context and rotates it back around its bottom (near)
           edge, so the "far" edge recedes into the horizon-fade below.
           Floating HUD panels are siblings of this wrapper, NOT descendants
           of it, so they stay flat/upright/legible like a HUD over a tilted
           3D view. */
        .a-map-perspective { position: absolute; inset: 0; perspective: 1900px; perspective-origin: 50% 6%; }
        .a-map-tilt { position: absolute; inset: 0; width: 100%; height: 100%; transform: rotateX(35deg); transform-origin: 50% 100%; will-change: transform; }
        .a-map-tilt .leaflet-container { width: 100%; height: 100%; }
        .a-map-fullscreen-btn { display: flex; align-items: center; justify-content: center; font-size: 14px; }
        .a-map-reset-btn { display: flex; align-items: center; justify-content: center; font-size: 14px; }
        .leaflet-container:fullscreen { width: 100%; height: 100%; }

        /* Leaflet renders no real horizon -- this flat (untilted) gradient
           sibling fades the tilted plane's receding top edge into the page
           background so the foreshortening reads as an intentional oblique
           view rather than a rendering gap. Sits above the map tiles but
           below every HUD panel and below Leaflet's own controls (z-index
           1000+), so it never blocks interaction. */
        .a-map-horizon-fade { position: absolute; top: 0; left: 0; right: 0; height: 24%;
          background: linear-gradient(180deg, ${C.canvas} 0%, rgba(245,245,247,0) 100%); pointer-events: none; z-index: 450; }

        .a-map-label.leaflet-tooltip { background: ${C.ink}; color: #fff; border: none; border-radius: 8px; padding: 4px 9px; box-shadow: 0 3px 10px rgba(0,0,0,0.25); display: flex; flex-direction: column; align-items: center; line-height: 1.25; }
        .a-map-label.leaflet-tooltip::before { border-top-color: ${C.ink}; }
        .a-map-label-name { font-size: 10.5px; font-weight: 800; letter-spacing: 0.01em; white-space: nowrap; }
        .a-map-label-pcu { font-size: 9.5px; font-weight: 700; color: ${C.teal}; white-space: nowrap; }

        /* ---- Floating glass HUD panels (glassmorphism, matches .a-card's
           look but translucent + blurred so the map stays visible through
           them). z-index kept below Leaflet's own leaflet-top/leaflet-bottom
           control corners (z-index: 1000) so native zoom/layers/scale never
           get covered, even where a panel's bounding box brushes a corner. */
        .a-hud { position: absolute; z-index: 550; background: rgba(255,255,255,0.72); backdrop-filter: blur(20px) saturate(160%); -webkit-backdrop-filter: blur(20px) saturate(160%);
          border: 1px solid rgba(255,255,255,0.6); border-radius: 20px; box-shadow: 0 10px 34px rgba(0,0,0,0.18), 0 1px 2px rgba(0,0,0,0.06); font-family: -apple-system, BlinkMacSystemFont, 'Inter', system-ui, sans-serif; }

        .a-hud-top { top: 16px; left: 16px; right: 372px; padding: 14px 20px 12px; }
        .a-hud-top-row { display: flex; align-items: center; justify-content: space-between; gap: 14px; flex-wrap: wrap; margin-bottom: 10px; }
        .a-hud-eyebrow { font-size: 0.62rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: ${C.blue}; margin: 0; }
        .a-hud-title { font-size: 1.02rem; font-weight: 800; margin: 0; color: ${C.ink}; letter-spacing: -0.01em; }
        .a-hud-kpis { display: flex; gap: 10px; overflow-x: auto; padding-bottom: 2px; scrollbar-width: thin; scrollbar-color: rgba(0,0,0,0.3) transparent; }
        .a-hud-kpis::-webkit-scrollbar { height: 8px; }
        .a-hud-kpis::-webkit-scrollbar-track { background: transparent; }
        .a-hud-kpis::-webkit-scrollbar-thumb { background-color: rgba(0,0,0,0.3); border-radius: 6px; }
        .a-hud-kpis::-webkit-scrollbar-thumb:hover { background-color: rgba(0,0,0,0.45); }
        .a-hud-kpis .a-card.a-kpi { flex: 0 0 auto; min-width: 128px; padding: 9px 11px; gap: 2px; border-radius: 13px; box-shadow: none; border-color: rgba(0,0,0,0.06); background: rgba(255,255,255,0.55); }
        .a-hud-kpis .a-card.a-kpi:hover { transform: none; box-shadow: none; }
        .a-hud-kpis .a-kpi-icon { width: 26px; height: 26px; border-radius: 8px; font-size: 11px; margin-bottom: 1px; }
        .a-hud-kpis .a-kpi-value { font-size: 1.0rem; }
        .a-hud-kpis .a-kpi-label { font-size: 0.58rem; }
        .a-hud-kpis .a-kpi-sub { font-size: 0.6rem; }

        .a-hud-site { top: 16px; right: 16px; width: clamp(272px, 25vw, 344px); max-height: calc(100% - 32px); padding: 0; overflow: hidden; display: flex; flex-direction: column; }
        .a-hud-site-inner { flex: 1; min-height: 0; overflow-y: auto; padding: 20px; scrollbar-width: none; }
        .a-hud-site-inner::-webkit-scrollbar { display: none; }
        /* Custom always-visible scrollbar thumb (see useScrollbarThumb) --
           native ::-webkit-scrollbar styling can render invisible on some
           OS/browser combinations even with an explicit color set. */
        .a-hud-site-scrollbar-track { position: absolute; top: 8px; right: 4px; bottom: 8px; width: 5px; border-radius: 3px; background: rgba(0,0,0,0.07); pointer-events: none; }
        .a-hud-site-scrollbar-thumb { position: absolute; left: 0; width: 100%; border-radius: 3px; background: rgba(0,0,0,0.32); }

        /* HUD: Simulated Traffic Flow time-of-day control -- floating
           bottom-center, the one edge of the map stage Leaflet's native
           controls and the other two HUD panels don't already occupy. */
        /* pointer-events:none on the panel itself, re-enabled only on its
           actual controls -- this floating panel's footprint can end up
           geometrically over a real map marker (the 5 study sites are close
           together and the panel is centered over the map), and without
           this a click on the panel's glass background in that spot would
           swallow a click meant for the marker underneath. Confirmed
           empirically in this task's Playwright pass (a marker under this
           panel was unclickable before this rule, clickable after). */
        .a-hud-flow { bottom: 16px; left: 50%; transform: translateX(-50%); width: clamp(300px, 34vw, 420px); padding: 14px 20px 12px; pointer-events: none; }
        .a-hud-flow-row .a-toggle-btn, .a-hud-flow input[type=range] { pointer-events: auto; }
        .a-hud-flow-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 8px; }
        .a-hud-flow-row .a-toggle-btn { padding: 8px 13px; flex-shrink: 0; }
        .a-hud-flow-hours { display: flex; justify-content: space-between; font-size: 0.62rem; font-weight: 700; color: ${C.faint}; margin-top: 4px; font-feature-settings: "tnum" 1; }

        .a-illustrative-badge { display: inline-block; font-size: 0.58rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.03em; color: ${C.orange}; background: ${hex2rgba(C.orange, 0.14)}; padding: 3px 8px; border-radius: 6px; vertical-align: middle; }

        .a-slider { -webkit-appearance: none; width: 100%; height: 6px; border-radius: 4px; background: #e5e5ea; margin: 4px 0; }
        .a-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 20px; height: 20px; border-radius: 50%; background: #ffffff; box-shadow: 0 1px 4px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.06); cursor: pointer; border: 5px solid ${C.blue}; }
        .a-slider::-moz-range-thumb { width: 20px; height: 20px; border-radius: 50%; background: #ffffff; border: 5px solid ${C.blue}; cursor: pointer; }
        .a-slider:focus-visible { outline: 2px solid ${C.blue}; outline-offset: 3px; }
        .a-slider-purple::-webkit-slider-thumb { border-color: ${C.purple}; }
        .a-slider-purple::-moz-range-thumb { border-color: ${C.purple}; }

        /* Flow spoke click popups -- same visual language as .a-map-label
           above, sized for the richer per-leg content. */
        .a-flow-popup .leaflet-popup-content-wrapper { border-radius: 12px; }

        @media (max-width: 980px) {
          .a-hud-top { right: 16px; }
          .a-hud-site { top: auto; bottom: 78px; right: 16px; left: 16px; width: auto; max-height: 32%; }
          .a-hud-flow { bottom: 16px; left: 16px; right: 16px; width: auto; transform: none; }
          .a-map-stage { min-height: 760px; }
        }

        .a-site-list { display: flex; flex-direction: column; gap: 8px; margin-top: 14px; }
        .a-site-chip { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 12px; background: ${C.canvas}; cursor: pointer; transition: background .15s ease; border: 1px solid transparent; width: 100%; text-align: left; font: inherit; }
        .a-site-chip:hover { background: #ececee; }
        .a-site-chip.active { background: ${hex2rgba(C.blue, 0.1)}; border-color: ${hex2rgba(C.blue, 0.35)}; }
        .a-site-chip:focus-visible { outline: 2px solid ${C.blue}; outline-offset: 2px; }
        .a-site-dot { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; }
        .a-site-chip-name { font-size: 0.82rem; font-weight: 600; color: ${C.ink}; }
        .a-site-chip-sub { font-size: 0.7rem; color: ${C.faint}; }

        .a-stat-box { background: ${C.canvas}; border-radius: 14px; padding: 14px 16px; }
        .a-stat-label { font-size: 0.68rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.03em; color: ${C.faint}; margin-bottom: 4px; }
        .a-stat-value { font-size: 1.3rem; font-weight: 800; color: ${C.ink}; font-feature-settings: "tnum" 1; }

        .a-directory-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px; margin-top: 6px; }
        .a-directory-card { background: ${C.canvas}; border-radius: 16px; padding: 18px; border-top: 3px solid; }
        .a-directory-name { font-size: 0.95rem; font-weight: 800; color: ${C.ink}; margin: 0 0 6px; }
        .a-directory-meta { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px 10px; margin-bottom: 8px; }
        .a-directory-meta-item { font-size: 0.68rem; color: ${C.faint}; font-weight: 700; text-transform: uppercase; }
        .a-directory-meta-val { font-size: 0.95rem; color: ${C.ink}; font-weight: 800; display: block; margin-top: 2px; text-transform: none; }
        .a-directory-interaction { font-size: 0.76rem; color: ${C.sub}; line-height: 1.5; }

        .a-loading { padding: 40px; text-align: center; color: ${C.faint}; font-size: 0.9rem; }

        .a-methodology { margin-top: 4px; }
        .a-methodology-toggle { display: flex; align-items: center; justify-content: space-between; width: 100%; background: none; border: none; font: inherit; font-weight: 700; font-size: 0.92rem; color: ${C.ink}; cursor: pointer; padding: 0; }
        .a-methodology-body { margin-top: 16px; }
        .a-methodology-sources { display: flex; flex-direction: column; gap: 6px; }
        .a-methodology-source { font-size: 0.78rem; color: ${C.sub}; line-height: 1.5; }
        .a-methodology-source-tag { display: inline-block; font-size: 0.66rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.03em; color: ${C.blue}; background: ${hex2rgba(C.blue, 0.1)}; padding: 2px 7px; border-radius: 6px; margin-right: 6px; }
        .a-methodology-table { width: 100%; border-collapse: separate; border-spacing: 0 6px; font-size: 0.78rem; }
        .a-methodology-table th { text-align: left; color: ${C.faint}; font-weight: 700; font-size: 0.66rem; text-transform: uppercase; letter-spacing: 0.02em; padding-bottom: 6px; }
        .a-methodology-table td { background: ${C.canvas}; padding: 10px 10px; vertical-align: top; }
        .a-methodology-table td:first-child { border-radius: 10px 0 0 10px; font-weight: 700; }
        .a-methodology-table td:last-child { border-radius: 0 10px 10px 0; white-space: nowrap; }
        .a-methodology-key { font-family: ui-monospace, monospace; font-size: 0.72rem; }
        ${searchableSelectCss}
      `}</style>

      <PageControls onBack={goBack} canGoBack={canGoBack} exportOptions={overviewExportOptions} />

      {!stats || !studySites ? (
        <div className="apple-overview-inner">
          <div className="a-hero">
            <p className="a-hero-eyebrow">Geospatial Study Console</p>
            <h1 className="a-hero-title">Network Overview</h1>
            <p className="a-hero-sub">Five case-study intersections across the Kampala City road network, mapped and instrumented for the Tricycle Passenger Car Unit (PCU) survey.</p>
          </div>
          <div className="a-loading"><i className="fa-solid fa-circle-notch fa-spin" style={{ marginRight: '8px' }}></i>Computing live figures from field data…</div>
        </div>
      ) : (
        <>
        {/* ===============================================================
            FULL-GEOSPATIAL STAGE -- the map fills essentially the whole
            viewport for this tab. Every other Overview control (KPI strip,
            Site Detail, Dry/Wet toggle) floats over it as a glass HUD panel
            instead of sharing a side-by-side grid row with it. Leaflet's own
            zoom/layer/fullscreen/scale controls render natively inside the
            map and are left alone. The map opens on the SAME dynamic extent
            as before -- bounds computed live from the 5 real site
            coordinates, never a hardcoded lat/lng box (see `fitOptions`
            above for the one padding adjustment this redesign required) --
            and the added "reset view" control (bottomleft, crosshair icon)
            returns to that exact same extent. */}
        <div className="a-map-stage">
          <div className="a-map-perspective">
            <div className="a-map-tilt">
              <MapContainer bounds={siteBounds} boundsOptions={fitOptions} scrollWheelZoom={true} zoomControl={false} style={{ height: '100%', width: '100%' }}>
                {/* Every native Leaflet control lives at the BOTTOM corners
                    (near edge of the tilted plane, closest to the transform's
                    pivot) rather than Leaflet's usual topleft/topright --
                    controls placed at the top of a CSS-tilted plane land in
                    the most perspective-compressed region and become tiny
                    and hard to hit. Verified empirically (see final report):
                    at the bottom they stay full-size and clickable. */}
                <ZoomControl position="bottomleft" />
                <MapFullscreenControl />
                <MapResetViewControl bounds={siteBounds} fitOptions={fitOptions} />
                <ScaleControl position="bottomleft" metric imperial />
                <LayersControl position="bottomright" collapsed={true}>
                  <LayersControl.BaseLayer checked name="Streets">
                    <TileLayer
                      url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      maxZoom={19}
                    />
                  </LayersControl.BaseLayer>
                  <LayersControl.BaseLayer name="Imagery Hybrid">
                    <LayerGroup>
                      <TileLayer
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                        attribution='Imagery &copy; Esri, Maxar, Earthstar Geographics'
                        maxZoom={19}
                      />
                      <TileLayer
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
                        attribution='Labels &amp; boundaries &copy; Esri'
                        maxZoom={19}
                      />
                    </LayerGroup>
                  </LayersControl.BaseLayer>
                  <LayersControl.Overlay checked name="Study Site Markers">
                    <LayerGroup>
                      {studySites.map((site, idx) => (
                        <Marker
                          key={idx}
                          position={site.coords}
                          eventHandlers={{ click: () => setSelectedSite(site) }}
                        >
                          <LeafletTooltip permanent direction="top" offset={[0, -8]} opacity={1} className="a-map-label">
                            <span className="a-map-label-name">{stats.shortName(site.name)}</span>
                            <span className="a-map-label-pcu">PCU {site.pcuHeadway.toFixed(2)}</span>
                          </LeafletTooltip>
                          <Popup>
                            <div style={{ minWidth: '200px' }}>
                              <strong style={{ color: '#000', fontSize: '13px' }}>{site.name}</strong><br />
                              <span style={{ color: '#555', fontSize: '11px' }}>{site.interaction}</span>
                              <div style={{ marginTop: '8px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 10px', fontSize: '11.5px', color: '#333' }}>
                                <div><b>PCU (headway):</b> {site.pcuHeadway.toFixed(3)}</div>
                                <div><b>Tricycle share:</b> {site.tricycleSharePct.toFixed(1)}%</div>
                                <div><b>Mean daily volume:</b> {Math.round(site.meanDailyVolume).toLocaleString()} veh/day</div>
                                <div><b>{weatherView} mean (15-min):</b> {chipVolume(site) != null ? Math.round(chipVolume(site)).toLocaleString() : '—'}</div>
                                <div style={{ gridColumn: '1 / -1' }}><b>Coordinates:</b> {site.coords[0].toFixed(4)}, {site.coords[1].toFixed(4)}</div>
                              </div>
                            </div>
                          </Popup>
                        </Marker>
                      ))}
                    </LayerGroup>
                  </LayersControl.Overlay>
                </LayersControl>
                {/* Live per-leg-per-junction simulated flow -- native Leaflet
                    vector layers anchored by real lat/lng via useMap(), so
                    they re-project automatically with every pan/zoom exactly
                    like the markers above (see MapFlowOverlay.jsx header
                    comment for why this approach was chosen over a manually
                    positioned pixel overlay). Always mounted; the HUD below
                    controls WHICH hour's simulated volumes it displays. */}
                <MapFlowOverlay
                  flowData={flowData}
                  accentColor={C.blue}
                  mutedColor="rgba(110,110,115,0.6)"
                  onLegSelect={(name) => setSelectedSite(studySites.find((s) => s.name === name) || null)}
                />
              </MapContainer>
            </div>
          </div>
          <div className="a-map-horizon-fade" aria-hidden="true"></div>

          {/* HUD: Simulated Traffic Flow control -- time-of-day scrubber +
              play/pause for the MapFlowOverlay spokes/dots anchored at every
              real junction marker. Floating bottom-center, the one edge of
              the map stage not already claimed by Leaflet's own native
              controls (bottomleft: zoom/fullscreen/reset/scale, bottomright:
              layers) or the other two HUD panels (top, right). */}
          <div className="a-hud a-hud-flow">
            <div className="a-hud-flow-row">
              <div>
                <p className="a-hud-eyebrow" style={{ color: C.purple }}>Simulated Traffic Flow, Per Leg</p>
                <h2 className="a-hud-title" style={{ fontSize: '0.92rem' }}>
                  {String(selectedHour).padStart(2, '0')}:00
                  <span className="a-illustrative-badge" style={{ marginLeft: '8px' }}>
                    {flowIsRealHour ? 'Real hour · split modeled' : 'Modeled hour'}
                  </span>
                </h2>
              </div>
              <button
                type="button"
                className={`a-toggle-btn ${isFlowPlaying ? 'active' : ''}`}
                aria-pressed={isFlowPlaying}
                onClick={() => setIsFlowPlaying((v) => !v)}
                aria-label={isFlowPlaying ? 'Pause hourly playback' : 'Play hourly playback'}
              >
                <i className={`fa-solid ${isFlowPlaying ? 'fa-pause' : 'fa-play'}`}></i>
              </button>
            </div>
            <input
              type="range"
              min="0"
              max="23"
              step="1"
              value={selectedHour}
              onChange={(e) => { setIsFlowPlaying(false); setSelectedHour(parseInt(e.target.value, 10)); }}
              className="a-slider a-slider-purple"
              aria-label="Hour of day for simulated flow"
            />
            <div className="a-hud-flow-hours">
              <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>23:00</span>
            </div>
            <p className="a-footnote" style={{ margin: '8px 0 0' }}>
              Leg identity/count author-confirmed · this hour's volume is {flowIsRealHour ? 'real, measured' : 'a disclosed model outside the 06:00–21:45 field sample'} · per-leg split is a disclosed assumption, cited on tap.
            </p>
          </div>

          {/* HUD: hero title + Dry/Wet toggle on one row, slim KPI strip
              below -- floating top, flat/upright above the tilted map */}
          <div className="a-hud a-hud-top">
            <div className="a-hud-top-row">
              <div>
                <p className="a-hud-eyebrow">Geospatial Study Console</p>
                <h1 className="a-hud-title">Network Overview — 5 Kampala Study Intersections</h1>
              </div>
              <div className="a-toggle-row" role="group" aria-label="Weather condition for site volume figures">
                <button
                  type="button"
                  className={`a-toggle-btn ${weatherView === 'Dry' ? 'active' : ''}`}
                  aria-pressed={weatherView === 'Dry'}
                  onClick={() => setWeatherView('Dry')}
                ><i className="fa-solid fa-sun" style={{ marginRight: '6px' }}></i>Dry</button>
                <button
                  type="button"
                  className={`a-toggle-btn ${weatherView === 'Wet' ? 'active' : ''}`}
                  aria-pressed={weatherView === 'Wet'}
                  onClick={() => setWeatherView('Wet')}
                ><i className="fa-solid fa-cloud-showers-heavy" style={{ marginRight: '6px' }}></i>Wet</button>
              </div>
            </div>
            <div className="a-hud-kpis">
              <KpiCard icon="fa-location-dot" color={C.blue} label="Study Intersections" value="5" sub="Kampala City road network" />
              <KpiCard icon="fa-car-side" color={C.indigo} label={`Combined Interval Volume (${weatherView})`} value={Math.round(combinedIntervalVolume).toLocaleString()} sub={`Veh/15-min · n=${(weatherN ?? 0).toLocaleString()} intervals`} />
              <KpiCard icon="fa-ban" color={C.purple} label="Combined ADT (Excl. MC)" value={Math.round(totalVolumeExclMC).toLocaleString()} sub="Cars+Tricycles+Minibus+Trucks" />
              <KpiCard icon="fa-gauge-high" color={C.teal} label="Mean PCU (headway-ratio)" value={stats.pcuHeadwayOverall.toFixed(2)} sub={`Range ${Math.min(...studySites.map(s=>s.pcuHeadway)).toFixed(2)}–${Math.max(...studySites.map(s=>s.pcuHeadway)).toFixed(2)}`} />
              <KpiCard icon="fa-fire" color={C.orange} label={`Busiest Site (${weatherView})`} value={stats.shortName((busiestUnderWeather || busiest).name)} sub={`${Math.round(chipVolume(busiestUnderWeather || busiest)).toLocaleString()} veh/15-min mean`} />
              <KpiCard icon="fa-route" color={C.pink} label="Highest Tricycle Share" value={stats.shortName(highestTricycle.name)} sub={`${highestTricycle.tricycleSharePct.toFixed(1)}% of site volume`} />
              <KpiCard icon="fa-cloud-showers-heavy" color={C.red} label="Wet-Weather Impact" value={`${weatherDelta.toFixed(1)}%`} sub={`vs Dry · n=${stats.weatherTest.nA.toLocaleString()}/${stats.weatherTest.nB.toLocaleString()}`} />
            </div>
          </div>

          {/* HUD: Site Detail panel, floating right side of the map */}
          <div className="a-hud a-hud-site">
          <div className="a-hud-site-inner" ref={hudSiteRef}>
            <SectionHeader eyebrow="Site Detail" title={selectedSite ? selectedSite.name : 'Select a study site'} color={C.indigo} />
            <SearchableSelect
              label="Jump to Study Site"
              color={C.indigo}
              placeholder="Search all 5 sites…"
              value={selectedSite?.name || null}
              onChange={(name) => setSelectedSite(studySites.find((s) => s.name === name) || null)}
              options={studySites.map((s) => ({ value: s.name, label: s.name, meta: `PCU ${s.pcuHeadway.toFixed(2)}` }))}
            />
            <div className="a-site-list" style={{ marginTop: '12px' }}>
              {studySites.map((site, idx) => (
                <button
                  type="button"
                  key={idx}
                  className={`a-site-chip ${selectedSite?.name === site.name ? 'active' : ''}`}
                  onClick={() => setSelectedSite(site)}
                >
                  <span className="a-site-dot" style={{ background: SITE_COLORS[idx] }}></span>
                  <div>
                    <div className="a-site-chip-name">{site.name}</div>
                    <div className="a-site-chip-sub">PCU {site.pcuHeadway.toFixed(2)} · {Math.round(site.meanDailyVolume).toLocaleString()} veh/day</div>
                  </div>
                </button>
              ))}
            </div>
            {selectedSite && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '14px' }}>
                <div className="a-stat-box">
                  <div className="a-stat-label">Mean Daily Volume — 20-day field sample, 2026 (n = 20 days)</div>
                  <div className="a-stat-value" style={{ color: C.blue }}>{Math.round(selectedSite.meanDailyVolume).toLocaleString()}</div>
                </div>
                <div className="a-stat-box">
                  <div className="a-stat-label">ADT Excluding Motorcycles — same 20-day sample</div>
                  <div className="a-stat-value" style={{ color: C.purple }}>{Math.round(selectedSite.meanDailyVolumeExclMC).toLocaleString()}</div>
                </div>
                <div className="a-stat-box">
                  <div className="a-stat-label">PCU (headway-ratio method, n = 432 intervals)</div>
                  <div className="a-stat-value" style={{ color: C.indigo }}>{selectedSite.pcuHeadway.toFixed(3)}</div>
                </div>
                <div className="a-stat-box">
                  <div className="a-stat-label">Tricycle Share of Volume (n = 1,280 intervals)</div>
                  <div className="a-stat-value" style={{ color: C.green }}>{selectedSite.tricycleSharePct.toFixed(1)}%</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div className="a-stat-box">
                    <div className="a-stat-label"><i className="fa-solid fa-sun" style={{ marginRight: '5px' }}></i>Dry Mean (15-min)</div>
                    <div className="a-stat-value" style={{ color: C.orange, fontSize: '1.05rem' }}>
                      {selectedSite.meanIntervalVolumeDry != null ? Math.round(selectedSite.meanIntervalVolumeDry).toLocaleString() : '—'}
                    </div>
                  </div>
                  <div className="a-stat-box">
                    <div className="a-stat-label"><i className="fa-solid fa-cloud-showers-heavy" style={{ marginRight: '5px' }}></i>Wet Mean (15-min)</div>
                    <div className="a-stat-value" style={{ color: C.blue2, fontSize: '1.05rem' }}>
                      {selectedSite.meanIntervalVolumeWet != null ? Math.round(selectedSite.meanIntervalVolumeWet).toLocaleString() : '—'}
                    </div>
                  </div>
                </div>
                <div className="a-stat-box">
                  <div className="a-stat-label"><i className="fa-solid fa-triangle-exclamation" style={{ marginRight: '5px' }}></i>Traffic Criticality Index</div>
                  <div className="a-stat-value" style={{ color: C.red, fontSize: '1.05rem' }}>
                    {selectedSite.criticalityIndex != null ? selectedSite.criticalityIndex.toFixed(1) : '—'} / 100
                  </div>
                </div>
                <div className="a-stat-box">
                  <div className="a-stat-label">Primary Vehicle Interaction</div>
                  <div className="a-sub" style={{ margin: 0, fontWeight: 600, color: C.ink }}>{selectedSite.interaction}</div>
                </div>
                <div className="a-stat-box">
                  <div className="a-stat-label">Coordinates</div>
                  <div className="a-sub" style={{ margin: 0, fontWeight: 600, color: C.ink, fontFeatureSettings: '"tnum" 1' }}>{selectedSite.coords[0].toFixed(4)}, {selectedSite.coords[1].toFixed(4)}</div>
                </div>
              </div>
            )}
          </div>
          {hudSiteThumb && (
            <div className="a-hud-site-scrollbar-track">
              <div className="a-hud-site-scrollbar-thumb" style={{ top: `${hudSiteThumb.startPct}%`, height: `${hudSiteThumb.sizePct}%` }} />
            </div>
          )}
          </div>
        </div>

        {/* All per-site charts (Mean Daily Volume, PCU by Site, Traffic
            Criticality Ranking, Mean Volume by Hour of Day, Criticality
            Factor Profile, Share of Combined Daily Volume, Daily Volume vs
            Criticality Index, Volume/PCU/Tricycle-Share bubble, Recorded
            Intervals by Weather, Dry vs Wet Mean Interval Volume) have moved
            to the Analytics tab, where every other chart on this site now
            lives -- see InfographicDashboard.jsx. The full-height map HUD
            above, Site Directory and Methodology below are unchanged. */}

        <div className="apple-overview-inner">
        {/* SITE DIRECTORY */}
        <div className="a-grid">
          <div className="a-card s-12">
            <SectionHeader eyebrow="At a Glance" title="Study Site Directory" color={C.teal} sub="Primary mixed-traffic interaction observed at each intersection" />
            <div className="a-directory-grid">
              {studySites.map((site, idx) => (
                <div className="a-directory-card" key={idx} style={{ borderTopColor: SITE_COLORS[idx] }}>
                  <p className="a-directory-name">{site.name}</p>
                  <div className="a-directory-meta">
                    <div className="a-directory-meta-item">Veh/Day<span className="a-directory-meta-val">{Math.round(site.meanDailyVolume).toLocaleString()}</span></div>
                    <div className="a-directory-meta-item">ADT Excl. MC<span className="a-directory-meta-val" style={{ color: C.purple }}>{Math.round(site.meanDailyVolumeExclMC).toLocaleString()}</span></div>
                    <div className="a-directory-meta-item">PCU<span className="a-directory-meta-val">{site.pcuHeadway.toFixed(2)}</span></div>
                    <div className="a-directory-meta-item">Tricycle %<span className="a-directory-meta-val">{site.tricycleSharePct.toFixed(1)}</span></div>
                    <div className="a-directory-meta-item">Criticality<span className="a-directory-meta-val" style={{ color: C.red }}>{site.criticalityIndex.toFixed(1)}</span></div>
                  </div>
                  <p className="a-directory-interaction">{site.interaction}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* METHODOLOGY */}
        <div className="a-grid">
          <MethodologyPanel color={C.blue} keys={['meanDailyVolume', 'compositionPct', 'pcuHeadway', 'weatherTest', 'criticalityIndex', 'adtByIntersection', 'networkAdt']} />
        </div>
        </div>
        </>
      )}

    </div>
  );
};

export default OverviewTab;

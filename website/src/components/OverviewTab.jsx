import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip as LeafletTooltip, LayersControl, LayerGroup, ScaleControl, ZoomControl, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import PageControls, { downloadTextFile, downloadJsonFile, downloadChartsAsZip } from './PageControls';
import MethodologyPanel from './MethodologyPanel';
import SearchableSelect, { searchableSelectCss } from './SearchableSelect';
import MapFlowOverlay from './MapFlowOverlay';
import useTrafficStats from '../lib/useTrafficStats';
import { projectToYear, VISION_2040_YEARS } from '../lib/trafficStats';
import { JUNCTION_LEG_CONFIG, simulateDirectionalSplit } from '../lib/directionalSplit';
import useScrollbarThumb from '../lib/useScrollbarThumb';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

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
    const control = new FullscreenControl({ position: 'bottomleft' });
    control.addTo(map);
    return () => control.remove();
  }, [map]);
  return null;
};

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
    const control = new ResetControl({ position: 'bottomleft' });
    control.addTo(map);
    return () => control.remove();
  }, [map, bounds, fitOptions]);
  return null;
};

const SITE_GEO = [
  { key: 'Wandegeya', name: 'Wandegeya Junction', coords: [0.330107, 32.574089], interaction: 'Tricycle, Motorcycle Taxi, and Non-Motorised Transport' },
  { key: 'Kibuye', name: 'Kibuye Roundabout', coords: [0.293537, 32.572884], interaction: 'Tricycle and Car (Expressway Corridor)' },
  { key: 'Bakuli', name: 'Bakuli Intersection', coords: [0.314673, 32.564676], interaction: 'Tricycle and Bus Hub' },
  { key: 'Bwaise', name: 'Bwaise Junction', coords: [0.340550, 32.571661], interaction: 'Tricycle and Non-Motorised Transport (Drainage Corridor)' },
  { key: 'Natete', name: 'Natete Junction', coords: [0.299511, 32.532720], interaction: 'Tricycle and Public Service Vehicle (Minibus) Hub' },
];

// True Apple HIG Light Theme tokens (vibrant non-neon, high WCAG AA contrast)
const C = {
  blue: '#0071E3',
  green: '#16A34A',
  amber: '#D97706',
  red: '#DC2626',
  purple: '#7C3AED',
  teal: '#0D9488',
  ink: '#0F172A',
  sub: '#475569',
  faint: '#64748B',
  canvas: '#F5F5F7',
  card: '#FFFFFF',
  line: '#E2E8F0',
};

const hex2rgba = (hex, a) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${a})`;
};

const SITE_COLORS = [C.blue, C.purple, C.teal, C.amber, C.green];

const SectionHeader = ({ eyebrow, title, color = C.blue, sub }) => (
  <div style={{ marginBottom: '18px' }}>
    <p className="a-eyebrow" style={{ color }}>{eyebrow}</p>
    <h3 className="a-title">{title}</h3>
    {sub && <p className="a-sub">{sub}</p>}
  </div>
);

const KpiCard = ({ icon, color, label, value, sub }) => (
  <div className="a-card a-kpi">
    <div className="a-kpi-icon" style={{ background: hex2rgba(color, 0.12), color }}>
      <i className={`fa-solid ${icon}`}></i>
    </div>
    <div className="a-kpi-value">{value}</div>
    <div className="a-kpi-label">{label}</div>
    {sub && <div className="a-kpi-sub">{sub}</div>}
  </div>
);

const OverviewTab = ({ goBack, canGoBack } = {}) => {
  const [selectedSite, setSelectedSite] = useState(null);
  const [hudSiteRef, hudSiteThumb] = useScrollbarThumb('vertical');
  const [selectedHour, setSelectedHour] = useState(8);
  const [isFlowPlaying, setIsFlowPlaying] = useState(false);
  const [surveyWindowOnly, setSurveyWindowOnly] = useState(true);
  const [projectionYear, setProjectionYear] = useState(2026);
  const stats = useTrafficStats();

  useEffect(() => {
    if (!isFlowPlaying) return undefined;
    const id = setInterval(() => {
      setSelectedHour((h) => {
        if (surveyWindowOnly) {
          return h >= 18 || h < 7 ? 7 : h + 1;
        }
        return (h + 1) % 24;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [isFlowPlaying, surveyWindowOnly]);

  const growthMult = useMemo(() => projectToYear(1, projectionYear), [projectionYear]);

  const studySites = useMemo(() => {
    if (!stats) return null;
    return SITE_GEO.map((geo) => {
      const r = stats.resultsBySite[geo.key] || {};
      const pcu = stats.dynamicPcuBySite[geo.key] || {};
      const comp = stats.compositionBySite[geo.key] || {};
      const hourlySeries = stats.hourlyProfile24BySite[geo.key]?.motorizedFlow || [];
      const observedHours = hourlySeries.filter((h) => h.isReal);
      const meanHourlyFlow = observedHours.length
        ? observedHours.reduce((s, h) => s + h.value, 0) / observedHours.length
        : 0;
      return {
        ...geo,
        junctionType: r.junctionType || 'Cross Junction',
        motorizedVehicles: (r.motorizedVehicles || 0) * growthMult,
        passengerTri: (r.passengerTri || 0) * growthMult,
        cargoTri: (r.cargoTri || 0) * growthMult,
        totalTri: (r.totalTri || 0) * growthMult,
        tricycleSharePct: (r.tricycleShare || 0) * 100,
        combinedDynamicPCU: pcu.combinedDynamicPCU || 0,
        passengerDynamicPCU: pcu.passengerDynamicPCU || 0,
        cargoDynamicPCU: pcu.cargoDynamicPCU || 0,
        meanDemandPressure: pcu.meanDemandPressure || 0,
        peakDemandPressure: pcu.peakDemandPressure || 0,
        meanHourlyFlow: meanHourlyFlow * growthMult,
        motorcycleSharePct: comp.Motorcycles || 0,
      };
    });
  }, [stats, growthMult]);

  const siteBounds = useMemo(() => (studySites ? studySites.map((s) => s.coords) : []), [studySites]);

  const fitOptions = useMemo(() => (
    window.innerWidth < 760
      ? { paddingTopLeft: [20, 120], paddingBottomRight: [20, 20] }
      : { paddingTopLeft: [40, 210], paddingBottomRight: [368, 40] }
  ), []);

  const flowData = useMemo(() => {
    if (!stats || !studySites) return [];
    return studySites
      .map((site) => {
        const config = JUNCTION_LEG_CONFIG[site.name] || JUNCTION_LEG_CONFIG[site.key];
        if (!config) return null;
        const series = stats.hourlyProfile24BySite[site.key]?.motorizedFlow || [];
        const hourEntry = series[selectedHour] || { value: 0, isReal: false };
        const hourlyRate = (hourEntry.value || 0) * growthMult;
        const legs = simulateDirectionalSplit(hourlyRate, config, 0.3);
        return {
          name: site.name,
          shortName: site.key,
          coords: site.coords,
          legs,
          vcMean: site.meanDemandPressure,
          isModelledHour: !hourEntry.isReal,
          hourlyRate,
          source: config.source,
          type: config.type,
        };
      })
      .filter(Boolean);
  }, [stats, studySites, selectedHour, growthMult]);

  const flowIsRealHour = flowData.length ? !flowData[0].isModelledHour : true;

  const exportSites = () => {
    if (!studySites) return;
    const header = `Study Site,Junction Type,Latitude,Longitude,Motorised Volume (${projectionYear}),Total Tricycles (${projectionYear}),Tricycle Share (%),Combined Dynamic PCU`;
    const lines = studySites.map((s) =>
      `"${s.name}","${s.junctionType}",${s.coords[0]},${s.coords[1]},${Math.round(s.motorizedVehicles)},${Math.round(s.totalTri)},${s.tricycleSharePct.toFixed(2)},${s.combinedDynamicPCU.toFixed(3)}`
    );
    downloadTextFile(`tricycle_pcu_study_sites_${projectionYear}.csv`, [header, ...lines].join('\n'));
  };

  const overviewExportOptions = [
    { id: 'csv', label: `Site Data ${projectionYear} (CSV)`, icon: 'fa-file-csv', hint: 'Volume, PCU and share per site', action: exportSites },
    { id: 'json', label: 'Full Dataset (JSON)', icon: 'fa-file-code', hint: 'All computed network statistics', action: () => downloadJsonFile('tricycle_pcu_network_stats.json', stats) },
    { id: 'png', label: 'Charts as Images (ZIP)', icon: 'fa-images', hint: 'Download visual charts as PNG', action: () => downloadChartsAsZip('tricycle_pcu_overview_charts.zip') },
    { id: 'print', label: 'Print / Save as PDF', icon: 'fa-print', hint: 'Opens your browser print dialog', action: () => window.print() },
  ];

  const totalMotorized = studySites ? studySites.reduce((s, x) => s + x.motorizedVehicles, 0) : 0;
  const totalTricycles = studySites ? studySites.reduce((s, x) => s + x.totalTri, 0) : 0;
  const busiest = studySites ? studySites.reduce((a, b) => (b.motorizedVehicles > a.motorizedVehicles ? b : a), studySites[0]) : null;
  const highestTricycle = studySites ? studySites.reduce((a, b) => (b.tricycleSharePct > a.tricycleSharePct ? b : a), studySites[0]) : null;

  return (
    <div className="apple-overview">
      <style>{`
        .apple-overview { position: relative; width: 100vw; left: 50%; right: 50%; margin-left: -50vw; margin-right: -50vw; background: ${C.canvas}; }
        .apple-overview-inner { width: 100%; max-width: 1600px; margin: 0 auto; padding: 32px 24px 80px; font-family: var(--font-sans); color: ${C.ink}; }
        .a-hero { text-align: center; max-width: 760px; margin: 0 auto 40px; padding: 44px 12px 0; color: ${C.ink}; }
        .a-hero-eyebrow { font-size: 0.78rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: ${C.blue}; margin: 0 0 10px; }
        .a-hero-title { font-size: clamp(2.1rem, 4vw, 3.2rem); font-weight: 800; letter-spacing: -0.03em; margin: 0 0 12px; line-height: 1.08; color: ${C.ink}; }
        .a-hero-sub { font-size: 1.02rem; color: ${C.sub}; margin: 0; line-height: 1.55; }

        .a-card { background: ${C.card}; border-radius: 20px; padding: 24px; box-shadow: 0 1px 3px rgba(15,23,42,0.05), 0 10px 24px -12px rgba(15,23,42,0.08); border: 1px solid ${C.line}; display: flex; flex-direction: column; transition: transform .2s ease, box-shadow .2s ease; }
        .a-card:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(15,23,42,0.07), 0 16px 32px -12px rgba(15,23,42,0.12); }

        .a-eyebrow { font-size: 0.72rem; font-weight: 700; letter-spacing: 0.07em; text-transform: uppercase; margin: 0 0 4px; }
        .a-title { font-size: 1.28rem; font-weight: 700; letter-spacing: -0.01em; margin: 0; color: ${C.ink}; }
        .a-sub { font-size: 0.85rem; color: ${C.sub}; margin: 6px 0 0; line-height: 1.5; }
        .a-footnote { font-size: 0.75rem; color: ${C.faint}; margin: 10px 0 0; line-height: 1.5; }

        .a-kpi-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; margin-bottom: 22px; }
        .a-kpi { padding: 20px; gap: 8px; }
        .a-kpi-icon { width: 40px; height: 40px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 16px; margin-bottom: 4px; }
        .a-kpi-value { font-size: 1.5rem; font-weight: 800; letter-spacing: -0.02em; color: ${C.ink}; font-feature-settings: "tnum" 1; }
        .a-kpi-label { font-size: 0.72rem; font-weight: 700; color: ${C.sub}; text-transform: uppercase; letter-spacing: 0.03em; }
        .a-kpi-sub { font-size: 0.75rem; color: ${C.faint}; margin-top: -2px; }

        .a-grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 20px; margin-bottom: 20px; }
        .s-12 { grid-column: span 12; }

        .a-toggle-row { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
        .a-toggle-btn { border: 1px solid ${C.line}; background: #FFFFFF; color: ${C.sub}; font-weight: 600; font-size: 0.8rem; padding: 7px 13px; border-radius: 10px; cursor: pointer; transition: all .15s ease; }
        .a-toggle-btn.active { background: ${C.blue}; color: #FFFFFF; border-color: ${C.blue}; }
        .a-toggle-btn:hover:not(.active) { background: #F8FAFC; color: ${C.ink}; }

        .a-map-stage { position: relative; width: 100%; height: calc(100vh - 92px); min-height: 600px; overflow: hidden; background: ${C.canvas}; }
        .a-map-perspective { position: absolute; inset: 0; perspective: 1900px; perspective-origin: 50% 6%; }
        .a-map-tilt { position: absolute; inset: 0; width: 100%; height: 100%; transform: rotateX(32deg); transform-origin: 50% 100%; will-change: transform; }
        .a-map-tilt .leaflet-container { width: 100%; height: 100%; }
        .a-map-fullscreen-btn, .a-map-reset-btn { display: flex; align-items: center; justify-content: center; font-size: 14px; }
        .leaflet-container:fullscreen { width: 100%; height: 100%; }

        .a-map-horizon-fade { position: absolute; top: 0; left: 0; right: 0; height: 22%;
          background: linear-gradient(180deg, ${C.canvas} 0%, rgba(245,245,247,0) 100%); pointer-events: none; z-index: 450; }

        /* Light-theme map tooltip (zero dark backgrounds) */
        .a-map-label.leaflet-tooltip { background: #FFFFFF; color: ${C.ink}; border: 1px solid ${C.line}; border-radius: 8px; padding: 4px 9px; box-shadow: 0 3px 10px rgba(15,23,42,0.14); display: flex; flex-direction: column; align-items: center; line-height: 1.25; }
        .a-map-label.leaflet-tooltip::before { border-top-color: #FFFFFF; }
        .a-map-label-name { font-size: 10.5px; font-weight: 800; letter-spacing: 0.01em; white-space: nowrap; color: ${C.ink}; }
        .a-map-label-pcu { font-size: 9.5px; font-weight: 700; color: ${C.blue}; white-space: nowrap; }

        .a-hud { position: absolute; z-index: 550; background: rgba(255,255,255,0.92); backdrop-filter: blur(18px) saturate(160%); -webkit-backdrop-filter: blur(18px) saturate(160%);
          border: 1px solid ${C.line}; border-radius: 20px; box-shadow: 0 10px 30px rgba(15,23,42,0.12); font-family: var(--font-sans); }

        .a-hud-top { top: 16px; left: 16px; right: 372px; padding: 14px 20px 12px; }
        .a-hud-top-row { display: flex; align-items: center; justify-content: space-between; gap: 14px; flex-wrap: wrap; margin-bottom: 10px; }
        .a-hud-eyebrow { font-size: 0.65rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: ${C.blue}; margin: 0; }
        .a-hud-title { font-size: 1.02rem; font-weight: 800; margin: 0; color: ${C.ink}; letter-spacing: -0.01em; }
        .a-hud-kpis { display: flex; gap: 10px; overflow-x: auto; padding-bottom: 2px; scrollbar-width: thin; scrollbar-color: #CBD5E1 transparent; }
        .a-hud-kpis .a-card.a-kpi { flex: 0 0 auto; min-width: 132px; padding: 9px 11px; gap: 2px; border-radius: 13px; box-shadow: none; border: 1px solid ${C.line}; background: #F8FAFC; }
        .a-hud-kpis .a-card.a-kpi:hover { transform: none; box-shadow: none; }
        .a-hud-kpis .a-kpi-icon { width: 26px; height: 26px; border-radius: 8px; font-size: 11px; margin-bottom: 1px; }
        .a-hud-kpis .a-kpi-value { font-size: 1.0rem; }
        .a-hud-kpis .a-kpi-label { font-size: 0.6rem; }
        .a-hud-kpis .a-kpi-sub { font-size: 0.62rem; }

        .a-hud-site { top: 16px; right: 16px; width: clamp(276px, 25vw, 344px); max-height: calc(100% - 32px); padding: 0; overflow: hidden; display: flex; flex-direction: column; }
        .a-hud-site-inner { flex: 1; min-height: 0; overflow-y: auto; padding: 20px; scrollbar-width: none; }
        .a-hud-site-inner::-webkit-scrollbar { display: none; }
        .a-hud-site-scrollbar-track { position: absolute; top: 8px; right: 4px; bottom: 8px; width: 5px; border-radius: 3px; background: rgba(15,23,42,0.06); pointer-events: none; }
        .a-hud-site-scrollbar-thumb { position: absolute; left: 0; width: 100%; border-radius: 3px; background: rgba(15,23,42,0.28); }

        .a-hud-flow { bottom: 16px; left: 50%; transform: translateX(-50%); width: clamp(320px, 38vw, 460px); padding: 14px 20px 12px; pointer-events: none; }
        .a-hud-flow button, .a-hud-flow input[type=range], .a-hud-flow select { pointer-events: auto; }
        .a-hud-flow-row { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 8px; flex-wrap: wrap; }
        .a-hud-flow-hours { display: flex; justify-content: space-between; font-size: 0.64rem; font-weight: 700; color: ${C.faint}; margin-top: 4px; font-feature-settings: "tnum" 1; }

        .a-illustrative-badge { display: inline-block; font-size: 0.6rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.03em; color: ${C.amber}; background: ${hex2rgba(C.amber, 0.14)}; padding: 3px 8px; border-radius: 6px; vertical-align: middle; }
        .a-verified-badge { display: inline-block; font-size: 0.6rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.03em; color: ${C.green}; background: ${hex2rgba(C.green, 0.14)}; padding: 3px 8px; border-radius: 6px; vertical-align: middle; }

        .a-slider { -webkit-appearance: none; width: 100%; height: 6px; border-radius: 4px; background: #E2E8F0; margin: 4px 0; }
        .a-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 18px; height: 18px; border-radius: 50%; background: #FFFFFF; box-shadow: 0 1px 4px rgba(15,23,42,0.25); cursor: pointer; border: 4px solid ${C.blue}; }
        .a-slider::-moz-range-thumb { width: 18px; height: 18px; border-radius: 50%; background: #FFFFFF; border: 4px solid ${C.blue}; cursor: pointer; }
        .a-slider-purple::-webkit-slider-thumb { border-color: ${C.purple}; }
        .a-slider-purple::-moz-range-thumb { border-color: ${C.purple}; }

        .a-flow-popup .leaflet-popup-content-wrapper { border-radius: 12px; background: #FFFFFF; color: ${C.ink}; }

        @media (max-width: 980px) {
          .a-hud-top { right: 16px; }
          .a-hud-site { top: auto; bottom: 88px; right: 16px; left: 16px; width: auto; max-height: 30%; }
          .a-hud-flow { bottom: 16px; left: 16px; right: 16px; width: auto; transform: none; }
          .a-map-stage { min-height: 780px; }
        }

        .a-site-list { display: flex; flex-direction: column; gap: 8px; margin-top: 14px; }
        .a-site-chip { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 12px; background: ${C.canvas}; cursor: pointer; transition: background .15s ease; border: 1px solid ${C.line}; width: 100%; text-align: left; font: inherit; }
        .a-site-chip:hover { background: #E2E8F0; }
        .a-site-chip.active { background: ${hex2rgba(C.blue, 0.1)}; border-color: ${hex2rgba(C.blue, 0.45)}; }
        .a-site-dot { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; }
        .a-site-chip-name { font-size: 0.82rem; font-weight: 700; color: ${C.ink}; }
        .a-site-chip-sub { font-size: 0.72rem; color: ${C.sub}; }

        .a-stat-box { background: ${C.canvas}; border: 1px solid ${C.line}; border-radius: 14px; padding: 12px 14px; }
        .a-stat-label { font-size: 0.68rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.03em; color: ${C.sub}; margin-bottom: 4px; }
        .a-stat-value { font-size: 1.25rem; font-weight: 800; color: ${C.ink}; font-feature-settings: "tnum" 1; }

        .a-directory-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px; margin-top: 6px; }
        .a-directory-card { background: ${C.canvas}; border: 1px solid ${C.line}; border-radius: 16px; padding: 18px; border-top: 3px solid; }
        .a-directory-name { font-size: 0.95rem; font-weight: 800; color: ${C.ink}; margin: 0 0 8px; }
        .a-directory-meta { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-bottom: 10px; }
        .a-directory-meta-item { font-size: 0.68rem; color: ${C.sub}; font-weight: 700; text-transform: uppercase; }
        .a-directory-meta-val { font-size: 0.95rem; color: ${C.ink}; font-weight: 800; display: block; margin-top: 2px; text-transform: none; }
        .a-directory-interaction { font-size: 0.78rem; color: ${C.sub}; line-height: 1.5; margin: 0; }

        .a-loading { padding: 40px; text-align: center; color: ${C.sub}; font-size: 0.9rem; }

        .a-methodology { margin-top: 4px; }
        .a-methodology-toggle { display: flex; align-items: center; justify-content: space-between; width: 100%; background: none; border: none; font: inherit; font-weight: 700; font-size: 0.92rem; color: ${C.ink}; cursor: pointer; padding: 0; }
        .a-methodology-body { margin-top: 16px; }
        .a-methodology-sources { display: flex; flex-direction: column; gap: 6px; }
        .a-methodology-source { font-size: 0.78rem; color: ${C.sub}; line-height: 1.5; }
        .a-methodology-source-tag { display: inline-block; font-size: 0.66rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.03em; color: ${C.blue}; background: ${hex2rgba(C.blue, 0.1)}; padding: 2px 7px; border-radius: 6px; margin-right: 6px; }
        .a-methodology-table { width: 100%; border-collapse: separate; border-spacing: 0 6px; font-size: 0.78rem; }
        .a-methodology-table th { text-align: left; color: ${C.sub}; font-weight: 700; font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.02em; padding-bottom: 6px; }
        .a-methodology-table td { background: ${C.canvas}; padding: 10px 10px; vertical-align: top; color: ${C.ink}; }
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
            <p className="a-hero-sub">Five case-study intersections across the Kampala City road network, mapped for the Tricycle Passenger Car Unit (PCU) survey.</p>
          </div>
          <div className="a-loading"><i className="fa-solid fa-circle-notch fa-spin" style={{ marginRight: '8px' }}></i>Computing live figures from field data...</div>
        </div>
      ) : (
        <>
          <div className="a-map-stage">
            <div className="a-map-perspective">
              <div className="a-map-tilt">
                <MapContainer bounds={siteBounds} boundsOptions={fitOptions} scrollWheelZoom={true} zoomControl={false} style={{ height: '100%', width: '100%' }}>
                  <ZoomControl position="bottomleft" />
                  <MapFullscreenControl />
                  <MapResetViewControl bounds={siteBounds} fitOptions={fitOptions} />
                  <ScaleControl position="bottomleft" metric={true} imperial={false} />
                  <LayersControl position="bottomright" collapsed={true}>
                    <LayersControl.BaseLayer checked name="Esri World Imagery + Hybrid Labels">
                      <LayerGroup>
                        <TileLayer
                          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                          attribution="Imagery &copy; Esri, Maxar, Earthstar Geographics"
                          maxZoom={19}
                        />
                        <TileLayer
                          url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}"
                          attribution="Transportation &copy; Esri"
                          maxZoom={19}
                        />
                        <TileLayer
                          url="https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
                          attribution="Labels &amp; boundaries &copy; Esri"
                          maxZoom={19}
                        />
                      </LayerGroup>
                    </LayersControl.BaseLayer>
                    <LayersControl.Overlay checked name="Study Site Markers">
                      <LayerGroup>
                        {studySites.map((site, idx) => (
                          <Marker
                            key={site.key}
                            position={site.coords}
                            eventHandlers={{ click: () => setSelectedSite(site) }}
                          >
                            <LeafletTooltip permanent direction="top" offset={[0, -8]} opacity={1} className="a-map-label">
                              <span className="a-map-label-name">{site.key}</span>
                              <span className="a-map-label-pcu">PCU {site.combinedDynamicPCU.toFixed(2)}</span>
                            </LeafletTooltip>
                            <Popup>
                              <div style={{ minWidth: '210px', color: C.ink }}>
                                <strong style={{ color: C.ink, fontSize: '13px' }}>{site.name}</strong><br />
                                <span style={{ color: C.sub, fontSize: '11px' }}>{site.interaction}</span>
                                <div style={{ marginTop: '8px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 10px', fontSize: '11.5px', color: C.ink }}>
                                  <div><b>Dynamic PCU:</b> {site.combinedDynamicPCU.toFixed(3)}</div>
                                  <div><b>Tricycle share:</b> {site.tricycleSharePct.toFixed(1)}%</div>
                                  <div><b>Volume ({projectionYear}):</b> {Math.round(site.motorizedVehicles).toLocaleString()} veh</div>
                                  <div><b>Junction:</b> {site.junctionType}</div>
                                  <div style={{ gridColumn: '1 / -1' }}><b>Coordinates:</b> {site.coords[0].toFixed(4)}, {site.coords[1].toFixed(4)}</div>
                                </div>
                              </div>
                            </Popup>
                          </Marker>
                        ))}
                      </LayerGroup>
                    </LayersControl.Overlay>
                  </LayersControl>
                  <MapFlowOverlay
                    flowData={flowData}
                    accentColor={C.blue}
                    mutedColor="rgba(71,85,105,0.65)"
                    onLegSelect={(name) => setSelectedSite(studySites.find((s) => s.name === name) || null)}
                  />
                </MapContainer>
              </div>
            </div>
            <div className="a-map-horizon-fade" aria-hidden="true"></div>

            <div className="a-hud a-hud-flow">
              <div className="a-hud-flow-row">
                <div>
                  <p className="a-hud-eyebrow" style={{ color: C.purple }}>Simulated Traffic Flow, Per Leg ({projectionYear})</p>
                  <h2 className="a-hud-title" style={{ fontSize: '0.92rem' }}>
                    {String(selectedHour).padStart(2, '0')}:00
                    <span className={flowIsRealHour ? 'a-verified-badge' : 'a-illustrative-badge'} style={{ marginLeft: '8px' }}>
                      {flowIsRealHour ? '07:00-19:00 Observed' : 'Overnight Model'}
                    </span>
                  </h2>
                </div>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  <button
                    type="button"
                    className={`a-toggle-btn ${surveyWindowOnly ? 'active' : ''}`}
                    onClick={() => {
                      const next = !surveyWindowOnly;
                      setSurveyWindowOnly(next);
                      if (next && (selectedHour < 7 || selectedHour > 18)) setSelectedHour(8);
                    }}
                  >
                    {surveyWindowOnly ? '07:00-19:00' : '24-Hour'}
                  </button>
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
              </div>
              <input
                type="range"
                min={surveyWindowOnly ? '7' : '0'}
                max={surveyWindowOnly ? '18' : '23'}
                step="1"
                value={selectedHour}
                onChange={(e) => { setIsFlowPlaying(false); setSelectedHour(parseInt(e.target.value, 10)); }}
                className="a-slider a-slider-purple"
                aria-label="Hour of day for simulated flow"
              />
              <div className="a-hud-flow-hours">
                {surveyWindowOnly ? (
                  <><span>07:00</span><span>10:00</span><span>13:00</span><span>16:00</span><span>18:00</span></>
                ) : (
                  <><span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>23:00</span></>
                )}
              </div>
            </div>

            <div className="a-hud a-hud-top">
              <div className="a-hud-top-row">
                <div>
                  <p className="a-hud-eyebrow">Geospatial Study Console (02/08/2026 to 03/08/2026)</p>
                  <h1 className="a-hud-title">Network Overview: 5 Kampala Study Intersections</h1>
                </div>
                <div className="a-toggle-row" role="group" aria-label="Vision 2040 projection year">
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: C.sub }}>Vision 2040 Horizon:</span>
                  {[2026, 2030, 2035, 2040].map((yr) => (
                    <button
                      key={yr}
                      type="button"
                      className={`a-toggle-btn ${projectionYear === yr ? 'active' : ''}`}
                      onClick={() => setProjectionYear(yr)}
                    >
                      {yr === 2026 ? '2026 Base' : yr}
                    </button>
                  ))}
                </div>
              </div>
              <div className="a-hud-kpis">
                <KpiCard icon="fa-location-dot" color={C.blue} label="Study Intersections" value="5" sub="Kampala City network" />
                <KpiCard icon="fa-car-side" color={C.purple} label={`Motorised Flow (${projectionYear})`} value={Math.round(totalMotorized).toLocaleString('en-GB')} sub="07:00-19:00 window" />
                <KpiCard icon="fa-tricycle" color={C.green} label={`Total Tricycles (${projectionYear})`} value={Math.round(totalTricycles).toLocaleString('en-GB')} sub={`${((totalTricycles / (totalMotorized || 1)) * 100).toFixed(2)}% network share`} />
                <KpiCard icon="fa-gauge-high" color={C.teal} label="Combined Dynamic PCU" value={stats.combinedDynamicPCUOverall.toFixed(3)} sub="Demand-pressure model" />
                <KpiCard icon="fa-fire" color={C.amber} label="Busiest Site" value={busiest ? busiest.key : '-'} sub={busiest ? `${Math.round(busiest.motorizedVehicles).toLocaleString('en-GB')} veh` : ''} />
                <KpiCard icon="fa-route" color={C.red} label="Highest Tricycle Share" value={highestTricycle ? highestTricycle.key : '-'} sub={highestTricycle ? `${highestTricycle.tricycleSharePct.toFixed(2)}% of site flow` : ''} />
              </div>
            </div>

            <div className="a-hud a-hud-site">
              <div className="a-hud-site-inner" ref={hudSiteRef}>
                <SectionHeader eyebrow="Site Detail" title={selectedSite ? selectedSite.name : 'Select a study site'} color={C.purple} />
                <SearchableSelect
                  label="Jump to Study Site"
                  color={C.purple}
                  placeholder="Search all 5 sites..."
                  value={selectedSite?.name || null}
                  onChange={(name) => setSelectedSite(studySites.find((s) => s.name === name) || null)}
                  options={studySites.map((s) => ({ value: s.name, label: s.name, meta: `PCU ${s.combinedDynamicPCU.toFixed(2)}` }))}
                />
                <div className="a-site-list" style={{ marginTop: '12px' }}>
                  {studySites.map((site, idx) => (
                    <button
                      type="button"
                      key={site.key}
                      className={`a-site-chip ${selectedSite?.name === site.name ? 'active' : ''}`}
                      onClick={() => setSelectedSite(site)}
                    >
                      <span className="a-site-dot" style={{ background: SITE_COLORS[idx] }}></span>
                      <div>
                        <div className="a-site-chip-name">{site.name}</div>
                        <div className="a-site-chip-sub">PCU {site.combinedDynamicPCU.toFixed(2)} | {Math.round(site.motorizedVehicles).toLocaleString('en-GB')} veh ({projectionYear})</div>
                      </div>
                    </button>
                  ))}
                </div>
                {selectedSite && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '14px' }}>
                    <div className="a-stat-box">
                      <div className="a-stat-label">Motorised Volume ({projectionYear})</div>
                      <div className="a-stat-value" style={{ color: C.blue }}>{Math.round(selectedSite.motorizedVehicles).toLocaleString('en-GB')}</div>
                    </div>
                    <div className="a-stat-box">
                      <div className="a-stat-label">Total Tricycles ({projectionYear})</div>
                      <div className="a-stat-value" style={{ color: C.green }}>{Math.round(selectedSite.totalTri).toLocaleString('en-GB')}</div>
                    </div>
                    <div className="a-stat-box">
                      <div className="a-stat-label">Combined Dynamic PCU (Modelled)</div>
                      <div className="a-stat-value" style={{ color: C.purple }}>{selectedSite.combinedDynamicPCU.toFixed(3)}</div>
                    </div>
                    <div className="a-stat-box">
                      <div className="a-stat-label">Tricycle Share of Volume</div>
                      <div className="a-stat-value" style={{ color: C.teal }}>{selectedSite.tricycleSharePct.toFixed(2)}%</div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <div className="a-stat-box">
                        <div className="a-stat-label">Passenger PCU</div>
                        <div className="a-stat-value" style={{ color: C.amber, fontSize: '1.05rem' }}>{selectedSite.passengerDynamicPCU.toFixed(3)}</div>
                      </div>
                      <div className="a-stat-box">
                        <div className="a-stat-label">Cargo PCU</div>
                        <div className="a-stat-value" style={{ color: C.red, fontSize: '1.05rem' }}>{selectedSite.cargoDynamicPCU.toFixed(3)}</div>
                      </div>
                    </div>
                    <div className="a-stat-box">
                      <div className="a-stat-label">Primary Vehicle Interaction</div>
                      <div className="a-sub" style={{ margin: 0, fontWeight: 600, color: C.ink }}>{selectedSite.interaction}</div>
                    </div>
                    <div className="a-stat-box">
                      <div className="a-stat-label">Coordinates (Decimal Degrees)</div>
                      <div className="a-sub" style={{ margin: 0, fontWeight: 600, color: C.ink }}>{selectedSite.coords[0].toFixed(4)}, {selectedSite.coords[1].toFixed(4)}</div>
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

          <div className="apple-overview-inner">
            <div className="a-grid">
              <div className="a-card s-12">
                <SectionHeader
                  eyebrow={`At a Glance (${projectionYear} Horizon)`}
                  title="Study Site Directory"
                  color={C.teal}
                  sub="Primary mixed-traffic interaction and modelled Dynamic PCU observed at each intersection (02/08/2026 to 03/08/2026, 07:00 to 19:00)"
                />
                <div className="a-directory-grid">
                  {studySites.map((site, idx) => (
                    <div className="a-directory-card" key={site.key} style={{ borderTopColor: SITE_COLORS[idx] }}>
                      <p className="a-directory-name">{site.name}</p>
                      <div className="a-directory-meta">
                        <div className="a-directory-meta-item">Motorised ({projectionYear})<span className="a-directory-meta-val">{Math.round(site.motorizedVehicles).toLocaleString('en-GB')}</span></div>
                        <div className="a-directory-meta-item">Tricycles ({projectionYear})<span className="a-directory-meta-val" style={{ color: C.green }}>{Math.round(site.totalTri).toLocaleString('en-GB')}</span></div>
                        <div className="a-directory-meta-item">Dynamic PCU<span className="a-directory-meta-val" style={{ color: C.blue }}>{site.combinedDynamicPCU.toFixed(3)}</span></div>
                        <div className="a-directory-meta-item">Tricycle %<span className="a-directory-meta-val" style={{ color: C.purple }}>{site.tricycleSharePct.toFixed(2)}%</span></div>
                      </div>
                      <p className="a-directory-interaction">{site.interaction}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="a-grid">
              <MethodologyPanel color={C.blue} keys={['staticPCU', 'resultsBySite', 'dynamicPcuBySite', 'compositionBySite', 'hourlyProfile24', 'vision2040']} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OverviewTab;

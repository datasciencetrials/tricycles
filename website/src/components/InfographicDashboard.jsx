import React, { useState, useMemo } from 'react';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, LineController,
  BarElement, ArcElement, Filler, Tooltip, Legend
} from 'chart.js';
import { Bar, Doughnut, Scatter, Line } from 'react-chartjs-2';
import PageControls, { downloadTextFile, downloadJsonFile, downloadChartsAsZip } from './PageControls';
import MethodologyPanel from './MethodologyPanel';
import SearchableSelect, { searchableSelectCss } from './SearchableSelect';
import useTrafficStats from '../lib/useTrafficStats';
import { REAL_SITES, ASSUMPTIONS } from '../lib/trafficStats';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, LineController, BarElement, ArcElement, Filler, Tooltip, Legend);

// ---------------------------------------------------------------------------
// Apple-style design tokens (bright, light, system-color palette)
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

const chartSub = C.faint;
const chartGrid = 'rgba(0,0,0,0.06)';
const animConfig = { duration: 800, easing: 'easeOutQuart' };
const tooltipTheme = {
  backgroundColor: '#1d1d1f', titleColor: '#ffffff', bodyColor: '#f5f5f7',
  padding: 10, cornerRadius: 10, titleFont: { weight: '600' }, displayColors: true, boxPadding: 4,
};
const legendTheme = { labels: { color: chartSub, boxWidth: 10, boxHeight: 10, padding: 14, font: { size: 11, weight: '600' }, usePointStyle: true, pointStyle: 'circle' } };
const INCIDENT_COLORS = [C.red, C.orange, C.blue, C.indigo, C.teal, C.purple, C.pink, C.green, C.yellow, '#8e8e93'];
const SITE_COLORS = { Kibuye: C.blue, Wandegeya: C.indigo, Bakuli: C.teal, Bwaise: C.orange };
const COMP_CLASSES = ['Motorcycles', 'PassengerTricycle', 'CargoTricycle', 'CarsTaxi', 'OtherMotorized'];
const COMP_LABELS = { Motorcycles: 'Motorcycles', PassengerTricycle: 'Passenger Tricycles', CargoTricycle: 'Cargo Tricycles', CarsTaxi: 'Cars / Taxis', OtherMotorized: 'Other Motorized' };
const COMP_COLORS = { Motorcycles: C.indigo, PassengerTricycle: C.green, CargoTricycle: C.orange, CarsTaxi: C.blue, OtherMotorized: C.faint };
const PERIOD_COLORS = { 'Morning Peak': C.blue, 'Midday / Off-Peak': C.orange, 'Evening Peak': C.indigo };

// Guarded number formatters -- every derived figure passes through one of
// these before it reaches the DOM, so a null/undefined/NaN renders as an
// em dash instead of leaking "undefined"/"NaN" text.
const isBad = (v) => v === null || v === undefined || Number.isNaN(v);
const fmt = (v, d = 1) => (isBad(v) ? '—' : Number(v).toFixed(d));
const fmtN = (v) => (isBad(v) ? '—' : Number(v).toLocaleString());
const pFmt = (p) => (isBad(p) ? '—' : (p < 0.001 ? 'p < .001' : `p = ${p.toFixed(3)}`));

// Equation text for a correlation's OLS line of best fit (slope/intercept
// come straight from trafficStats.js's pearson(), fit on the same real
// paired data as r -- not a separate model).
const eqFmt = (slope, intercept) => `y = ${slope.toFixed(3)}x ${intercept >= 0 ? '+' : '−'} ${Math.abs(intercept).toFixed(3)}`;

// Builds the Chart.js "line of best fit" dataset overlaid on a scatter plot:
// two endpoints spanning the real observed x-range, at the OLS slope/intercept.
const fitLineDataset = (pairs, slope, intercept, color, label = 'Line of best fit') => {
  const xs = pairs.map((p) => p.x);
  const xMin = Math.min(...xs), xMax = Math.max(...xs);
  return {
    type: 'line', label,
    data: [{ x: xMin, y: slope * xMin + intercept }, { x: xMax, y: slope * xMax + intercept }],
    borderColor: color, borderWidth: 2.5, borderDash: [6, 4], pointRadius: 0, pointHitRadius: 0,
    fill: false, tension: 0, order: 0,
  };
};

// ---------------------------------------------------------------------------
// Small reusable pieces
// ---------------------------------------------------------------------------
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

const StatRow = ({ label, value }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '7px 0', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
    <span style={{ fontSize: '0.8rem', color: C.sub, fontWeight: 600 }}>{label}</span>
    <span style={{ fontSize: '0.85rem', color: C.ink, fontWeight: 800, fontFeatureSettings: '"tnum" 1' }}>{value}</span>
  </div>
);

// Descriptive-statistics card: mean/median/mode/std/quartiles/IQR/CV for a
// single group, computed by `describe()` in trafficStats.js from the real
// per-record tricycle totals -- never hand-typed.
const DescribeCard = ({ color, span = 's-4', eyebrow, title, sub, d, unit }) => {
  const u = unit ? ` ${unit}` : '';
  return (
    <div className={`a-card ${span}`}>
      <SectionHeader eyebrow={eyebrow} title={title} color={color} sub={sub} />
      <div style={{ marginTop: '4px' }}>
        <StatRow label="Sample size (n)" value={fmtN(d?.n)} />
        <StatRow label="Mean" value={d ? `${fmt(d.mean, 2)}${u}` : '—'} />
        <StatRow label="Median" value={d ? `${fmt(d.median, 2)}${u}` : '—'} />
        <StatRow label="Std. deviation" value={d ? `${fmt(d.std, 2)}${u}` : '—'} />
        <StatRow label="Q1 – Q3 (IQR)" value={d ? `${fmt(d.q1, 2)} – ${fmt(d.q3, 2)} (${fmt(d.iqr, 2)})${u}` : '—'} />
        <StatRow label="Min – Max" value={d ? `${fmt(d.min, 2)} – ${fmt(d.max, 2)}${u}` : '—'} />
        <StatRow label="Coeff. of variation" value={d && !isBad(d.cv) ? `${fmt(d.cv)}%` : '—'} />
      </div>
    </div>
  );
};

const PhotoCarousel = ({ photos }) => {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return true;
  });
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const touchStartX = React.useRef(null);

  const count = photos.length;
  const goTo = (i) => setIndex(((i % count) + count) % count);
  const goNext = () => goTo(index + 1);
  const goPrev = () => goTo(index - 1);

  React.useEffect(() => {
    if (!isPlaying || hovered || focused) return undefined;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), 5500);
    return () => clearInterval(id);
  }, [isPlaying, hovered, focused, count]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); goPrev(); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); goNext(); }
  };

  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) { delta < 0 ? goNext() : goPrev(); }
    touchStartX.current = null;
  };

  return (
    <div
      className="a-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Traffic and site data collection photographs"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onKeyDown={handleKeyDown}
    >
      <div
        className="a-carousel-viewport"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="a-carousel-track" style={{ transform: `translateX(-${index * 100}%)` }}>
          {photos.map((p, i) => (
            <div
              className="a-carousel-slide"
              key={p.title}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}: ${p.title}`}
              aria-hidden={i !== index}
            >
              <img src={p.src} alt={p.title} />
              <div className="a-photo-overlay">
                <p className="a-eyebrow" style={{ color: p.color }}>{p.eyebrow}</p>
                <h3 className="a-photo-title">{p.title}</h3>
                <p className="a-photo-text">{p.text}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="a-carousel-controls">
          <button type="button" className="a-carousel-arrow a-carousel-prev" aria-label="Previous photo" onClick={goPrev}>
            <i className="fa-solid fa-chevron-left" aria-hidden="true"></i>
          </button>
          <button type="button" className="a-carousel-arrow a-carousel-next" aria-label="Next photo" onClick={goNext}>
            <i className="fa-solid fa-chevron-right" aria-hidden="true"></i>
          </button>
          <button
            type="button"
            className="a-carousel-playpause"
            aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
            aria-pressed={isPlaying}
            onClick={() => setIsPlaying((p) => !p)}
          >
            <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'}`} aria-hidden="true"></i>
          </button>
        </div>
      </div>
      <div className="a-carousel-dots" role="tablist" aria-label="Choose photo">
        {photos.map((p, i) => (
          <button
            key={p.title}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Slide ${i + 1}: ${p.title}`}
            className={`a-carousel-dot${i === index ? ' active' : ''}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
const InfographicDashboard = ({ goBack, canGoBack } = {}) => {
  const stats = useTrafficStats();
  const baseUrl = import.meta.env.BASE_URL || '/';

  const incidentTypes = useMemo(() => {
    if (!stats) return [];
    return Object.entries(stats.incidentTotalsByType).sort((a, b) => b[1] - a[1]).map(([type]) => type);
  }, [stats]);

  // Incident-type filter for the Safety chart -- default shows every type
  // (no selective reporting); the searchable dropdown narrows to one.
  const [incidentFocus, setIncidentFocus] = useState(null);
  const visibleIncidentTypes = incidentFocus ? incidentTypes.filter((t) => t === incidentFocus) : incidentTypes;

  // 24-hour traffic profile toggle -- on by default so the full clock is
  // visible, but the disclosed overnight model can be switched off entirely
  // to show only the 12 real surveyed hours (07:00-18:00).
  const [showOvernightModel, setShowOvernightModel] = useState(true);

  // Which site's 24-hour profile to chart -- 'All Sites' (mean across the 4
  // real junctions) or one real site, using the matching precomputed profile
  // from trafficStats.js (both grains use the same real-hours + disclosed-
  // overnight-model construction).
  const [hourlyProfileSite, setHourlyProfileSite] = useState('All Sites');

  const exportVolumeTable = () => {
    if (!stats) return;
    const header = 'Study Site,Mean Tricycle Total per Record,Median,Std Dev,n';
    const lines = REAL_SITES.map((s) => {
      const d = stats.tricycleDescribeBySite[s];
      return `"${s}",${d.mean.toFixed(3)},${d.median.toFixed(3)},${d.std.toFixed(3)},${d.n}`;
    });
    downloadTextFile('tricycle_volume_by_site.csv', [header, ...lines].join('\n'));
  };

  const dashboardExportOptions = [
    { id: 'csv', label: 'Tricycle Volume by Site (CSV)', icon: 'fa-file-csv', hint: 'Descriptive stats per site', action: exportVolumeTable },
    { id: 'json', label: 'Full Dataset (JSON)', icon: 'fa-file-code', hint: 'All computed network stats, raw', action: () => downloadJsonFile('tricycle_pcu_analytics_stats.json', stats) },
    { id: 'png', label: 'Charts as Images (ZIP)', icon: 'fa-images', hint: 'Every chart on this page as PNG', action: () => downloadChartsAsZip('tricycle_pcu_analytics_charts.zip') },
    { id: 'print', label: 'Print / Save as PDF', icon: 'fa-print', hint: 'Opens your browser’s print dialog', action: () => window.print() },
  ];

  return (
    <div className="apple-dash">
      <style>{`
        .apple-dash { position: relative; width: 100vw; left: 50%; right: 50%; margin-left: -50vw; margin-right: -50vw; background: ${C.canvas}; padding: 44px 12px 90px; }
        .apple-dash-inner { width: 100%; margin: 0 auto; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Inter', system-ui, sans-serif; color: ${C.ink}; }
        .a-hero { text-align: center; max-width: 760px; margin: 0 auto 40px; }
        .a-hero-eyebrow { font-size: 0.78rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: ${C.blue}; margin: 0 0 10px; }
        .a-hero-title { font-size: clamp(2.1rem, 4vw, 3.4rem); font-weight: 800; letter-spacing: -0.03em; margin: 0 0 12px; line-height: 1.05;
          background: linear-gradient(90deg, ${C.blue}, ${C.purple} 50%, ${C.pink}); -webkit-background-clip: text; background-clip: text; color: transparent; }
        .a-hero-sub { font-size: 1.05rem; color: ${C.sub}; margin: 0; line-height: 1.5; }

        .a-card { background: ${C.card}; border-radius: 22px; padding: 26px; box-shadow: 0 1px 2px rgba(0,0,0,0.04), 0 12px 28px -12px rgba(0,0,0,0.10); border: 1px solid rgba(0,0,0,0.045); display: flex; flex-direction: column; transition: transform .25s ease, box-shadow .25s ease; }
        .a-card:hover { transform: translateY(-2px); box-shadow: 0 2px 4px rgba(0,0,0,0.05), 0 20px 36px -14px rgba(0,0,0,0.14); }

        .a-eyebrow { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.07em; text-transform: uppercase; margin: 0 0 4px; }
        .a-title { font-size: 1.32rem; font-weight: 700; letter-spacing: -0.01em; margin: 0; color: ${C.ink}; }
        .a-sub { font-size: 0.85rem; color: ${C.sub}; margin: 6px 0 0; line-height: 1.5; }
        .a-footnote { font-size: 0.75rem; color: ${C.faint}; margin: 2px 0 0; line-height: 1.5; }

        .a-kpi-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; margin-bottom: 22px; }
        .a-kpi { padding: 22px; gap: 10px; }
        .a-kpi-icon { width: 42px; height: 42px; border-radius: 13px; display: flex; align-items: center; justify-content: center; font-size: 17px; margin-bottom: 4px; }
        .a-kpi-value { font-size: 1.55rem; font-weight: 800; letter-spacing: -0.02em; color: ${C.ink}; font-feature-settings: "tnum" 1; }
        .a-kpi-label { font-size: 0.72rem; font-weight: 700; color: ${C.sub}; text-transform: uppercase; letter-spacing: 0.03em; }
        .a-kpi-sub { font-size: 0.76rem; color: ${C.faint}; margin-top: -2px; }

        .a-grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 20px; margin-bottom: 20px; }
        .s-3 { grid-column: span 3; } .s-4 { grid-column: span 4; } .s-5 { grid-column: span 5; } .s-6 { grid-column: span 6; }
        .s-7 { grid-column: span 7; } .s-8 { grid-column: span 8; } .s-12 { grid-column: span 12; }
        @media (max-width: 1080px) { .a-grid .s-3, .a-grid .s-4, .a-grid .s-5, .a-grid .s-6, .a-grid .s-7, .a-grid .s-8 { grid-column: span 12; } }

        .a-chart-box { flex: 1; min-height: 280px; position: relative; width: 100%; margin-top: 10px; }

        .a-toggle-row { display: flex; gap: 8px; flex-wrap: wrap; }
        .a-toggle-btn { border: 1px solid rgba(0,0,0,0.08); background: #fff; color: ${C.sub}; font-weight: 600; font-size: 0.82rem; padding: 8px 14px; border-radius: 10px; cursor: pointer; transition: all .15s ease; }
        .a-toggle-btn.active { background: ${C.ink}; color: #fff; border-color: ${C.ink}; }
        .a-toggle-btn:hover:not(.active) { background: #f5f5f7; }
        .a-stat-box { background: ${C.canvas}; border-radius: 14px; padding: 14px 16px; }
        .a-stat-label { font-size: 0.68rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.03em; color: ${C.faint}; margin-bottom: 4px; }
        .a-stat-value { font-size: 1.3rem; font-weight: 800; color: ${C.ink}; font-feature-settings: "tnum" 1; }
        .a-stat-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; margin-top: 8px; }

        .a-illustrative-badge { display: inline-block; font-size: 0.6rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.03em; color: ${C.sub}; background: rgba(0,0,0,0.05); padding: 2px 7px; border-radius: 5px; margin-left: 8px; vertical-align: middle; }
        .a-nodata-badge { display: inline-block; font-size: 0.6rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.03em; color: #9a9a9e; background: rgba(154,154,158,0.14); padding: 2px 7px; border-radius: 5px; margin-left: 8px; vertical-align: middle; }
        .a-caveat-box { font-size: 0.78rem; color: ${C.sub}; line-height: 1.6; background: ${hex2rgba(C.orange, 0.07)}; border: 1px solid ${hex2rgba(C.orange, 0.22)}; border-radius: 12px; padding: 12px 14px; margin-top: 14px; }

        .a-photo { padding: 0; position: relative; overflow: hidden; min-height: 300px; }
        .a-photo-overlay { position: absolute; left: 0; right: 0; bottom: 0; z-index: 2; padding: 26px; background: linear-gradient(to top, rgba(10,10,12,0.94) 0%, rgba(10,10,12,0.6) 65%, transparent 100%); }
        .a-photo-title { margin: 2px 0 8px; font-size: 1.2rem; font-weight: 800; color: #ffffff; letter-spacing: -0.01em; }
        .a-photo-text { margin: 0; font-size: 0.86rem; color: rgba(255,255,255,0.88); line-height: 1.55; }

        .a-carousel-card { padding: 26px; max-width: 980px; margin: 0 auto; }
        .a-carousel { position: relative; }
        .a-carousel-viewport { position: relative; width: 100%; aspect-ratio: 3 / 2; min-height: 320px; max-height: 520px; border-radius: 18px; overflow: hidden; background: #0b0b0c; }
        @media (max-width: 720px) {
          .a-carousel-viewport { aspect-ratio: 4 / 3; min-height: 280px; max-height: 420px; }
          .a-carousel-slide .a-photo-overlay { padding: 20px 20px 24px; }
        }
        .a-carousel-track { display: flex; height: 100%; width: 100%; transition: transform .55s cubic-bezier(.4,0,.2,1); }
        @media (prefers-reduced-motion: reduce) { .a-carousel-track { transition: none; } }
        .a-carousel-slide { position: relative; flex: 0 0 100%; height: 100%; }
        .a-carousel-slide img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .a-carousel-slide .a-photo-overlay { padding: 30px 34px; }

        .a-carousel-controls { position: absolute; top: 14px; right: 14px; display: flex; gap: 8px; z-index: 3; }
        .a-carousel-arrow, .a-carousel-playpause { width: 36px; height: 36px; border-radius: 50%; border: none;
          background: rgba(0,0,0,0.45); color: #ffffff; font-size: 13px; display: flex; align-items: center; justify-content: center;
          cursor: pointer; backdrop-filter: blur(6px); box-shadow: 0 4px 14px rgba(0,0,0,0.22); transition: background .2s ease, transform .2s ease; }
        .a-carousel-arrow:hover, .a-carousel-playpause:hover { background: rgba(0,0,0,0.68); transform: scale(1.06); }
        .a-carousel-arrow:focus-visible, .a-carousel-playpause:focus-visible { outline: 2px solid #ffffff; outline-offset: 2px; }

        .a-carousel-dots { display: flex; justify-content: center; gap: 2px; margin-top: 14px; }
        .a-carousel-dot { width: 26px; height: 26px; border-radius: 50%; border: none; background: transparent; cursor: pointer; padding: 0;
          display: flex; align-items: center; justify-content: center; }
        .a-carousel-dot::after { content: ''; width: 8px; height: 8px; border-radius: 50%; background: #d2d2d7; transition: background .2s ease, transform .2s ease; }
        .a-carousel-dot.active::after { background: ${C.blue}; transform: scale(1.35); }
        .a-carousel-dot:focus-visible { outline: 2px solid ${C.blue}; outline-offset: 2px; }

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

      <PageControls onBack={goBack} canGoBack={canGoBack} exportOptions={dashboardExportOptions} />

      <div className="apple-dash-inner">

        {/* HERO */}
        <div className="a-hero">
          <p className="a-hero-eyebrow">Statistical Diagnostics</p>
          <h1 className="a-hero-title">Tricycle PCU Analytics</h1>
          <p className="a-hero-sub">Every figure below is computed live in your browser from the source-reconciled traffic counts at four Kampala junctions — nothing here is hand-typed.</p>
        </div>

        {!stats ? (
          <div className="a-loading"><i className="fa-solid fa-circle-notch fa-spin" style={{ marginRight: '8px' }}></i>Computing live figures from field data…</div>
        ) : (
        <>
        {/* KPI STRIP */}
        <div className="a-kpi-grid">
          <KpiCard icon="fa-database" color={C.blue} label="Real Movement Records" value={stats.rawMovementCount.toLocaleString()} sub={`4 sites · ${stats.siteHourCount} site-hour aggregates`} />
          <KpiCard icon="fa-gauge-high" color={C.teal} label="Combined Dynamic PCU" value={stats.combinedDynamicPCUOverall.toFixed(3)} sub="Static x demand-pressure model" />
          <KpiCard icon="fa-route" color={C.purple} label="Combined Tricycle Share" value={`${((stats.allSitesTotalTri / stats.allSitesMotorized) * 100).toFixed(1)}%`} sub="of surveyed motorized flow" />
          <KpiCard icon="fa-chart-simple" color={C.indigo} label="Tricycle Volume by Site" value={`F = ${stats.tricycleSiteAnova.F.toFixed(2)}`} sub={`One-way ANOVA · ${pFmt(stats.tricycleSiteAnova.p)}`} />
          <KpiCard icon="fa-clock" color={C.orange} label="Tricycle Volume by Period" value={`F = ${stats.tricyclePeriodAnova.F.toFixed(2)}`} sub={`One-way ANOVA · ${pFmt(stats.tricyclePeriodAnova.p)}`} />
          <KpiCard icon="fa-chart-line" color={C.green} label="Flow ↔ Tricycle Correlation" value={`r = ${stats.flowTricycleCorrelation.r.toFixed(2)}`} sub={`${stats.flowTricycleCorrelation.r2Pct.toFixed(0)}% of variance · n = ${stats.flowTricycleCorrelation.n}`} />
          <KpiCard icon="fa-square-poll-vertical" color={C.pink} label="Kibuye Poisson Fit" value={`χ² = ${stats.kibuyePoissonChiSq.toFixed(2)}`} sub={`λ = ${stats.kibuyeLambda.toFixed(1)} · n = ${stats.kibuyeN}`} />
          <KpiCard icon="fa-triangle-exclamation" color={C.red} label="Recorded Incidents" value={stats.incidentN.toLocaleString()} sub={`χ²(${stats.incidentChiSquare.df}) = ${stats.incidentChiSquare.chi2.toFixed(1)}, ${pFmt(stats.incidentChiSquare.p)}`} />
        </div>

        {/* ROW: 24-hour traffic profile -- real 07:00-18:00 measured means,
            plus a disclosed, toggleable overnight model connecting the real
            18:00 and 07:00 endpoints (never presented as measured). */}
        <div className="a-grid">
          <div className="a-card s-12">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
              <SectionHeader eyebrow="24-Hour Traffic Volume Profile" title={`Hourly Traffic Pattern — ${hourlyProfileSite === 'All Sites' ? 'All Sites (Mean)' : hourlyProfileSite}`} color={hourlyProfileSite === 'All Sites' ? C.blue : SITE_COLORS[hourlyProfileSite]}
                sub={hourlyProfileSite === 'All Sites' ? 'Mean hourly value per surveyed junction, averaged across the 2 survey days and across the 4 sites' : `Mean hourly value at ${hourlyProfileSite}, averaged across the 2 survey days`} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
                <div className="a-toggle-row" role="group" aria-label="Study site">
                  {['All Sites', ...REAL_SITES].map((s) => (
                    <button key={s} type="button" className={`a-toggle-btn ${hourlyProfileSite === s ? 'active' : ''}`} aria-pressed={hourlyProfileSite === s} onClick={() => setHourlyProfileSite(s)}>{s}</button>
                  ))}
                </div>
                <div className="a-toggle-row" role="group" aria-label="Overnight hours display">
                  <button type="button" className={`a-toggle-btn ${!showOvernightModel ? 'active' : ''}`} aria-pressed={!showOvernightModel} onClick={() => setShowOvernightModel(false)}>
                    <i className="fa-solid fa-sun" style={{ marginRight: '6px' }}></i>Measured only (07:00–18:00)
                  </button>
                  <button type="button" className={`a-toggle-btn ${showOvernightModel ? 'active' : ''}`} aria-pressed={showOvernightModel} onClick={() => setShowOvernightModel(true)}>
                    <i className="fa-solid fa-moon" style={{ marginRight: '6px' }}></i>Full 24h (incl. modeled overnight)
                  </button>
                </div>
              </div>
            </div>
            <div className="a-chart-box" style={{ minHeight: '340px' }}>
              <Line
                data={(() => {
                  const profile = hourlyProfileSite === 'All Sites' ? stats.hourlyProfile24 : stats.hourlyProfile24BySite[hourlyProfileSite];
                  const lineColor = hourlyProfileSite === 'All Sites' ? C.blue : SITE_COLORS[hourlyProfileSite];
                  return {
                    labels: profile.motorizedFlow.map((h) => `${String(h.hour).padStart(2, '0')}:00`),
                    datasets: [
                      {
                        label: 'Motorized flow (mean, veh/hr)',
                        data: profile.motorizedFlow.map((h) => (showOvernightModel || h.isReal ? h.value : null)),
                        borderColor: lineColor, backgroundColor: hex2rgba(lineColor, 0.12), fill: true, tension: 0.35,
                        pointRadius: profile.motorizedFlow.map((h) => (h.isReal ? 4 : 3)),
                        pointBackgroundColor: profile.motorizedFlow.map((h) => (h.isReal ? lineColor : hex2rgba(lineColor, 0.4))),
                        pointBorderWidth: 0, spanGaps: false,
                        segment: {
                          borderDash: (ctx) => (profile.motorizedFlow[ctx.p0DataIndex].isReal && profile.motorizedFlow[ctx.p1DataIndex].isReal ? undefined : [6, 4]),
                          borderColor: (ctx) => (profile.motorizedFlow[ctx.p0DataIndex].isReal && profile.motorizedFlow[ctx.p1DataIndex].isReal ? lineColor : hex2rgba(lineColor, 0.45)),
                        },
                      },
                      {
                        label: 'Tricycle total (mean, veh/hr)',
                        data: profile.tricycleTotal.map((h) => (showOvernightModel || h.isReal ? h.value : null)),
                        borderColor: C.green, backgroundColor: 'transparent', fill: false, tension: 0.35, yAxisID: 'y1',
                        pointRadius: profile.tricycleTotal.map((h) => (h.isReal ? 4 : 3)),
                        pointBackgroundColor: profile.tricycleTotal.map((h) => (h.isReal ? C.green : hex2rgba(C.green, 0.4))),
                        pointBorderWidth: 0, spanGaps: false,
                        segment: {
                          borderDash: (ctx) => (profile.tricycleTotal[ctx.p0DataIndex].isReal && profile.tricycleTotal[ctx.p1DataIndex].isReal ? undefined : [6, 4]),
                          borderColor: (ctx) => (profile.tricycleTotal[ctx.p0DataIndex].isReal && profile.tricycleTotal[ctx.p1DataIndex].isReal ? C.green : hex2rgba(C.green, 0.45)),
                        },
                      },
                    ],
                  };
                })()}
                options={{
                  responsive: true, maintainAspectRatio: false, animation: animConfig,
                  plugins: {
                    legend: { ...legendTheme, position: 'bottom' },
                    tooltip: {
                      ...tooltipTheme,
                      callbacks: {
                        label: (ctx) => {
                          const profile = hourlyProfileSite === 'All Sites' ? stats.hourlyProfile24 : stats.hourlyProfile24BySite[hourlyProfileSite];
                          const arr = ctx.dataset.label.startsWith('Motorized') ? profile.motorizedFlow : profile.tricycleTotal;
                          const isReal = arr[ctx.dataIndex]?.isReal;
                          return `${ctx.dataset.label}: ${ctx.parsed.y === null ? '—' : Math.round(ctx.parsed.y).toLocaleString()}${isReal ? '' : ' (modeled)'}`;
                        },
                      },
                    },
                  },
                  scales: {
                    x: { grid: { display: false }, ticks: { color: chartSub, font: { size: 10 } } },
                    y: { title: { display: true, text: 'Motorized flow (veh/hr)', color: chartSub, font: { size: 11 } }, ticks: { color: chartSub }, grid: { color: chartGrid } },
                    y1: { position: 'right', title: { display: true, text: 'Tricycle total (veh/hr)', color: chartSub, font: { size: 11 } }, ticks: { color: chartSub }, grid: { display: false } },
                  },
                }}
              />
            </div>
            <p className="a-footnote">
              Solid markers and solid line = real measured hourly means, 07:00–18:00 ({hourlyProfileSite === 'All Sites' ? '96 real site-hour rows across all 4 sites' : '24 real hourly rows at this site'}). Dashed, lighter line = 19:00–06:00, when no vehicle was ever counted{hourlyProfileSite === 'All Sites' ? ' at any of the 4 sites' : ' at this site'}: a disclosed, purely mathematical connector between the real 18:00 and 07:00 values (a cosine-shaped dip reaching {(ASSUMPTIONS.overnightTroughRatio * 100).toFixed(0)}% of the straight trend line at its midpoint, an editable assumption) -- never a measured or literature-sourced result. Toggle above to switch site or view the measured window alone.
            </p>
          </div>
        </div>

        {/* ROW: Composition by site + Static PCU / speed sensitivity */}
        <div className="a-grid">
          <div className="a-card s-6">
            <SectionHeader eyebrow="Real Vehicle-Class Counts" title="Fleet Composition by Junction" color={C.blue}
              sub="Share of surveyed motorized flow, from the 96 real site-hour aggregates" />
            <div className="a-chart-box">
              <Bar
                data={{
                  labels: REAL_SITES,
                  datasets: COMP_CLASSES.map((cls) => ({
                    label: COMP_LABELS[cls],
                    data: REAL_SITES.map((s) => stats.compositionBySite[s][cls]),
                    backgroundColor: COMP_COLORS[cls],
                    borderRadius: 4,
                  })),
                }}
                options={{
                  responsive: true, maintainAspectRatio: false, animation: animConfig,
                  plugins: { legend: { ...legendTheme, position: 'bottom' }, tooltip: { ...tooltipTheme, callbacks: { label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y.toFixed(1)}%` } } },
                  scales: {
                    x: { stacked: true, grid: { display: false }, ticks: { color: chartSub, font: { size: 11, weight: '600' } } },
                    y: { stacked: true, max: 100, ticks: { color: chartSub, callback: (v) => `${v}%` }, grid: { color: chartGrid } },
                  },
                }}
              />
            </div>
            <p className="a-footnote">Motorcycles dominate every junction's motorized flow; tricycles (passenger + cargo) are the minority mode this study measures the capacity effect of.</p>
          </div>

          <div className="a-card s-6">
            <SectionHeader eyebrow="Objective 1 · Speed-Area Equivalency" title="Static PCU &amp; Speed Sensitivity" color={C.indigo}
              sub="PCU_i = (Speed_car / Speed_i) x (Area_i / Area_car); Area = Length x Width" />
            <div className="a-chart-box">
              <Bar
                data={{
                  labels: stats.speedSensitivity.map((s) => `${s.scenario} (${s.speed} km/h)`),
                  datasets: [
                    { label: 'Passenger tricycle static PCU', data: stats.speedSensitivity.map((s) => s.passengerStaticPCU), backgroundColor: C.green, borderRadius: 6 },
                    { label: 'Cargo tricycle static PCU', data: stats.speedSensitivity.map((s) => s.cargoStaticPCU), backgroundColor: C.orange, borderRadius: 6 },
                  ],
                }}
                options={{
                  responsive: true, maintainAspectRatio: false, animation: animConfig,
                  plugins: { legend: { ...legendTheme, position: 'bottom' }, tooltip: tooltipTheme },
                  scales: { x: { grid: { display: false }, ticks: { color: chartSub, font: { size: 10 } } }, y: { ticks: { color: chartSub }, grid: { color: chartGrid } } },
                }}
              />
            </div>
            <p className="a-footnote">Length/width/speed are editable literature assumptions (Assumptions_References) -- no measured tricycle dimensions or speeds exist in the raw counts. Recomputed here at the literature's low/base/high operating-speed bounds, holding dimensions fixed.</p>
          </div>
        </div>

        {/* ROW: Dynamic PCU by site / period / junction type */}
        <div className="a-grid">
          <div className="a-card s-4">
            <SectionHeader eyebrow="Objective 3 · Demand-Pressure Model" title="Dynamic PCU by Site" color={C.teal} />
            <div className="a-chart-box">
              <Bar
                data={{
                  labels: REAL_SITES,
                  datasets: [
                    { label: 'Passenger', data: REAL_SITES.map((s) => stats.dynamicPcuBySite[s].passengerDynamicPCU), backgroundColor: C.green, borderRadius: 5 },
                    { label: 'Cargo', data: REAL_SITES.map((s) => stats.dynamicPcuBySite[s].cargoDynamicPCU), backgroundColor: C.orange, borderRadius: 5 },
                    { label: 'Combined', data: REAL_SITES.map((s) => stats.dynamicPcuBySite[s].combinedDynamicPCU), backgroundColor: C.indigo, borderRadius: 5 },
                  ],
                }}
                options={{
                  responsive: true, maintainAspectRatio: false, animation: animConfig,
                  plugins: { legend: { ...legendTheme, position: 'bottom' }, tooltip: tooltipTheme },
                  scales: { x: { grid: { display: false }, ticks: { color: chartSub, font: { size: 10 } } }, y: { ticks: { color: chartSub }, grid: { color: chartGrid } } },
                }}
              />
            </div>
            <p className="a-footnote">Tricycle-count-weighted mean of 24 real hourly rows per site. Dynamic PCU = Static PCU x [1 + 0.4 x (Demand Pressure − 0.5)].</p>
          </div>

          <div className="a-card s-4">
            <SectionHeader eyebrow="Time-of-Day Effect" title="Dynamic PCU by Period" color={C.purple} />
            <div className="a-chart-box">
              <Bar
                data={{
                  labels: stats.timePeriods,
                  datasets: [
                    { label: 'Passenger', data: stats.timePeriods.map((p) => stats.dynamicPcuByTimePeriod[p].passengerDynamicPCU), backgroundColor: C.green, borderRadius: 5 },
                    { label: 'Cargo', data: stats.timePeriods.map((p) => stats.dynamicPcuByTimePeriod[p].cargoDynamicPCU), backgroundColor: C.orange, borderRadius: 5 },
                    { label: 'Combined', data: stats.timePeriods.map((p) => stats.dynamicPcuByTimePeriod[p].combinedDynamicPCU), backgroundColor: C.indigo, borderRadius: 5 },
                  ],
                }}
                options={{
                  responsive: true, maintainAspectRatio: false, animation: animConfig,
                  plugins: { legend: { ...legendTheme, position: 'bottom' }, tooltip: tooltipTheme },
                  scales: { x: { grid: { display: false }, ticks: { color: chartSub, font: { size: 9.5 } } }, y: { ticks: { color: chartSub }, grid: { color: chartGrid } } },
                }}
              />
            </div>
            <p className="a-footnote">Morning Peak 07-09h, Midday/Off-Peak 10-15h, Evening Peak 16-18h -- the three real recorded periods.</p>
          </div>

          <div className="a-card s-4">
            <SectionHeader eyebrow="Descriptive Only" title="Dynamic PCU by Junction Type" color={C.pink} />
            <div className="a-chart-box">
              <Bar
                data={{
                  labels: Object.keys(stats.dynamicPcuByJunctionType),
                  datasets: [{ label: 'Combined dynamic PCU', data: Object.values(stats.dynamicPcuByJunctionType).map((v) => v.combinedDynamicPCU), backgroundColor: [C.blue, C.orange], borderRadius: 6 }],
                }}
                options={{
                  responsive: true, maintainAspectRatio: false, animation: animConfig,
                  plugins: { legend: { display: false }, tooltip: tooltipTheme },
                  scales: { x: { grid: { display: false }, ticks: { color: chartSub, font: { size: 10 } } }, y: { ticks: { color: chartSub }, grid: { color: chartGrid } } },
                }}
              />
            </div>
            <div className="a-caveat-box">
              <i className="fa-solid fa-circle-info" style={{ marginRight: '6px' }}></i>
              Kibuye is the only roundabout in the study (n = 1 site) -- this is a descriptive comparison, not a statistically valid intersection-type test.
            </div>
          </div>
        </div>

        {/* ROW: Regional benchmark + all-data sensitivity */}
        <div className="a-grid">
          <div className="a-card s-6">
            <SectionHeader eyebrow="Literature Sanity Check" title="Regional PCU Benchmark" color={C.blue2}
              sub="This study's base passenger-tricycle static PCU against two published regional ranges" />
            <div className="a-chart-box">
              <Bar
                data={{
                  labels: stats.regionalBenchmark.map((b) => b.benchmark),
                  datasets: [
                    { label: 'Published range (lower–upper)', data: stats.regionalBenchmark.map((b) => [b.lower, b.upper]), backgroundColor: hex2rgba(C.faint, 0.4), borderRadius: 6 },
                    { label: 'This study (base static PCU)', data: stats.regionalBenchmark.map((b) => b.basePassengerStaticPCU), backgroundColor: C.green, borderRadius: 6, type: 'bar', barThickness: 10 },
                  ],
                }}
                options={{
                  responsive: true, maintainAspectRatio: false, animation: animConfig,
                  plugins: { legend: { ...legendTheme, position: 'bottom' }, tooltip: tooltipTheme },
                  scales: { x: { grid: { display: false }, ticks: { color: chartSub, font: { size: 10 } } }, y: { ticks: { color: chartSub }, grid: { color: chartGrid } } },
                }}
              />
            </div>
            <p className="a-footnote">{stats.regionalBenchmark.map((b) => `${b.benchmark}: ${b.withinRange ? 'within' : 'below'} range (${b.source})`).join(' · ')}</p>
          </div>

          <div className="a-card s-6">
            <SectionHeader eyebrow="Diagnostic Only" title="All-Data vs. Flags-Removed" color={C.red}
              sub={`7 flagged high-concentration Kibuye records -- primary results always use the all-data column`} />
            <div className="a-chart-box">
              <Bar
                data={{
                  labels: ['Motorized Vehicles', 'Passenger Tricycles', 'Cargo Tricycles', 'Total Tricycles'],
                  datasets: [
                    { label: 'All data (primary)', data: [stats.allDataSensitivity.motorizedVehicles.allData, stats.allDataSensitivity.passengerTri.allData, stats.allDataSensitivity.cargoTri.allData, stats.allDataSensitivity.totalTri.allData], backgroundColor: C.blue, borderRadius: 5 },
                    { label: 'Flags removed', data: [stats.allDataSensitivity.motorizedVehicles.flagsRemoved, stats.allDataSensitivity.passengerTri.flagsRemoved, stats.allDataSensitivity.cargoTri.flagsRemoved, stats.allDataSensitivity.totalTri.flagsRemoved], backgroundColor: hex2rgba(C.red, 0.55), borderRadius: 5 },
                  ],
                }}
                options={{
                  responsive: true, maintainAspectRatio: false, animation: animConfig,
                  plugins: { legend: { ...legendTheme, position: 'bottom' }, tooltip: tooltipTheme },
                  scales: { x: { grid: { display: false }, ticks: { color: chartSub, font: { size: 9.5 } } }, y: { ticks: { color: chartSub }, grid: { color: chartGrid } } },
                }}
              />
            </div>
            <p className="a-footnote">Kibuye passenger-tricycle share of motorized flow: {(stats.allDataSensitivity.kibuyePassengerShare.allData * 100).toFixed(1)}% all-data vs {(stats.allDataSensitivity.kibuyePassengerShare.flagsRemoved * 100).toFixed(1)}% with the 7 flagged records removed. No observation is deleted from any primary figure on this site.</p>
          </div>
        </div>

        {/* ROW: Tricycle volume by site -- ANOVA + Kruskal-Wallis */}
        <div className="a-grid">
          <div className="a-card s-12">
            <SectionHeader eyebrow="Section E · Real Movement Records (n = 984)" title="Tricycle Volume per Record, by Site" color={C.indigo}
              sub="Tricycle Total (passenger + cargo) per raw classified hourly movement record, across the 4 real sites" />
            <div className="a-stat-grid">
              <div className="a-stat-box"><div className="a-stat-label">One-way ANOVA</div><div className="a-stat-value">F({stats.tricycleSiteAnova.df1},{stats.tricycleSiteAnova.df2}) = {stats.tricycleSiteAnova.F.toFixed(3)}</div><div className="a-footnote">{pFmt(stats.tricycleSiteAnova.p)}</div></div>
              <div className="a-stat-box"><div className="a-stat-label">Kruskal-Wallis (robustness check)</div><div className="a-stat-value">H({stats.tricycleSiteKruskalWallis.df}) = {stats.tricycleSiteKruskalWallis.H.toFixed(3)}</div><div className="a-footnote">{pFmt(stats.tricycleSiteKruskalWallis.p)}</div></div>
              <div className="a-stat-box"><div className="a-stat-label">Interpretation</div><div className="a-sub" style={{ margin: 0, fontWeight: 600, color: C.ink }}>{stats.tricycleSiteAnova.p < 0.05 ? 'Tricycle volume per record differs significantly by site.' : 'No statistically significant difference in tricycle volume by site at α = 0.05.'}</div></div>
            </div>
          </div>
        </div>
        <div className="a-grid">
          {REAL_SITES.map((s) => (
            <DescribeCard key={s} span="s-3" color={SITE_COLORS[s]} eyebrow={s} title="Tricycle Total / Record" d={stats.tricycleDescribeBySite[s]} />
          ))}
        </div>

        {/* ROW: Tricycle volume by period -- ANOVA + Kruskal-Wallis */}
        <div className="a-grid">
          <div className="a-card s-12">
            <SectionHeader eyebrow="Section E · Real Movement Records (n = 984)" title="Tricycle Volume per Record, by Time Period" color={C.orange}
              sub="The 3 real recorded time periods -- the honest replacement for a 2-group peak/off-peak split" />
            <div className="a-stat-grid">
              <div className="a-stat-box"><div className="a-stat-label">One-way ANOVA</div><div className="a-stat-value">F({stats.tricyclePeriodAnova.df1},{stats.tricyclePeriodAnova.df2}) = {stats.tricyclePeriodAnova.F.toFixed(3)}</div><div className="a-footnote">{pFmt(stats.tricyclePeriodAnova.p)}</div></div>
              <div className="a-stat-box"><div className="a-stat-label">Kruskal-Wallis (robustness check)</div><div className="a-stat-value">H({stats.tricyclePeriodKruskalWallis.df}) = {stats.tricyclePeriodKruskalWallis.H.toFixed(3)}</div><div className="a-footnote">{pFmt(stats.tricyclePeriodKruskalWallis.p)}</div></div>
              <div className="a-stat-box"><div className="a-stat-label">Interpretation</div><div className="a-sub" style={{ margin: 0, fontWeight: 600, color: C.ink }}>{stats.tricyclePeriodAnova.p < 0.05 ? 'Tricycle volume per record differs significantly by time period.' : 'No statistically significant difference in tricycle volume by time period at α = 0.05.'}</div></div>
            </div>
          </div>
        </div>
        <div className="a-grid">
          {stats.timePeriods.map((p) => (
            <DescribeCard key={p} span="s-4" color={PERIOD_COLORS[p]} eyebrow={p} title="Tricycle Total / Record" d={stats.tricycleDescribeByPeriod[p]} />
          ))}
        </div>

        {/* ROW: Flow<->Tricycle correlation + Kibuye Poisson fit */}
        <div className="a-grid">
          <div className="a-card s-6">
            <SectionHeader eyebrow="Pearson Correlation · 96 real site-hour rows" title="Motorized Flow vs. Tricycle Total" color={C.green}
              sub={`r = ${stats.flowTricycleCorrelation.r.toFixed(3)} (${stats.flowTricycleCorrelation.r2Pct.toFixed(1)}% of variance), ${pFmt(stats.flowTricycleCorrelation.p)}, n = ${stats.flowTricycleCorrelation.n} · ${eqFmt(stats.flowTricycleCorrelation.slope, stats.flowTricycleCorrelation.intercept)}`} />
            <div className="a-chart-box">
              <Scatter
                data={{
                  datasets: [
                    { label: 'Site-hour observations', data: stats.flowTricyclePairs, backgroundColor: stats.flowTricyclePairs.map((p) => hex2rgba(SITE_COLORS[p.site] || C.faint, 0.65)), pointRadius: 4.5, order: 1 },
                    fitLineDataset(stats.flowTricyclePairs, stats.flowTricycleCorrelation.slope, stats.flowTricycleCorrelation.intercept, C.ink),
                  ],
                }}
                options={{
                  responsive: true, maintainAspectRatio: false, animation: animConfig,
                  plugins: { legend: { ...legendTheme, position: 'bottom' }, tooltip: { ...tooltipTheme, callbacks: { label: (ctx) => ctx.dataset.label === 'Site-hour observations' ? `${ctx.raw.site}: flow ${ctx.raw.x}, tricycles ${ctx.raw.y}` : ctx.dataset.label } } },
                  scales: {
                    x: { title: { display: true, text: 'Motorized flow (veh/hr)', color: chartSub, font: { size: 11 } }, ticks: { color: chartSub }, grid: { color: chartGrid } },
                    y: { title: { display: true, text: 'Tricycle total (veh/hr)', color: chartSub, font: { size: 11 } }, ticks: { color: chartSub }, grid: { color: chartGrid } },
                  },
                }}
              />
            </div>
            <p className="a-footnote">Two independently observed quantities -- not the demand-pressure/PCU relationship, which is definitional by formula and is never reported as a statistical finding on this site.</p>
          </div>

          <div className="a-card s-6">
            <SectionHeader eyebrow="Goodness-of-Fit · Kibuye, n = 24 real hourly rows" title="Poisson Fit: Hourly Tricycle Arrivals" color={C.teal}
              sub={`λ (real hourly mean) = ${stats.kibuyeLambda.toFixed(2)} · χ² = ${stats.kibuyePoissonChiSq.toFixed(2)}`} />
            <div className="a-chart-box">
              <Bar
                data={{
                  labels: stats.kibuyePoissonBins.map((b) => b.label),
                  datasets: [
                    { label: 'Observed', data: stats.kibuyePoissonBins.map((b) => b.observed), backgroundColor: C.blue, borderRadius: 5 },
                    { label: 'Poisson-expected', data: stats.kibuyePoissonBins.map((b) => Number(b.expected.toFixed(2))), backgroundColor: hex2rgba(C.faint, 0.55), borderRadius: 5 },
                  ],
                }}
                options={{
                  responsive: true, maintainAspectRatio: false, animation: animConfig,
                  plugins: { legend: { ...legendTheme, position: 'bottom' }, tooltip: tooltipTheme },
                  scales: { x: { title: { display: true, text: 'Hourly tricycle count bin', color: chartSub, font: { size: 11 } }, grid: { display: false }, ticks: { color: chartSub } }, y: { ticks: { stepSize: 1, color: chartSub }, grid: { color: chartGrid } } },
                }}
              />
            </div>
            <p className="a-footnote">Disclosed small-sample limitation: only 24 real hourly observations exist for this site.</p>
          </div>
        </div>

        {/* ROW: Incidents */}
        <div className="a-grid">
          <div className="a-card s-6">
            <SectionHeader eyebrow="Real Incident Log · n = 841" title="Incident Type by Severity" color={C.red} />
            <SearchableSelect
              label="Filter to one incident type"
              color={C.red}
              placeholder="All types shown…"
              value={incidentFocus}
              onChange={setIncidentFocus}
              options={incidentTypes.map((t) => ({ value: t, label: t, meta: `n = ${stats.incidentTotalsByType[t]}` }))}
            />
            <div className="a-chart-box">
              <Bar
                data={{
                  labels: visibleIncidentTypes,
                  datasets: [
                    { label: 'Fatal', data: visibleIncidentTypes.map((t) => stats.incidentSeverityByType[t]?.Fatal || 0), backgroundColor: C.red },
                    { label: 'Serious', data: visibleIncidentTypes.map((t) => stats.incidentSeverityByType[t]?.Serious || 0), backgroundColor: C.orange },
                    { label: 'Minor', data: visibleIncidentTypes.map((t) => stats.incidentSeverityByType[t]?.Minor || 0), backgroundColor: C.green },
                  ],
                }}
                options={{
                  responsive: true, maintainAspectRatio: false, animation: animConfig,
                  plugins: { legend: { ...legendTheme, position: 'bottom' }, tooltip: tooltipTheme },
                  scales: { x: { stacked: true, grid: { display: false }, ticks: { color: chartSub, font: { size: 9 }, autoSkip: false, maxRotation: 28, minRotation: incidentFocus ? 0 : 28 } }, y: { stacked: true, ticks: { stepSize: 1, color: chartSub, font: { size: 10.5 } }, grid: { color: chartGrid } } },
                }}
              />
            </div>
            <p className="a-footnote">{incidentFocus ? `Showing ${incidentFocus} only (n = ${stats.incidentTotalsByType[incidentFocus]}).` : `All ${incidentTypes.length} recorded incident types shown -- no types excluded.`}</p>
          </div>

          <div className="a-card s-6">
            <SectionHeader eyebrow="Chi-Square Test of Independence" title="Observed vs. Independence-Expected" color={C.purple}
              sub={`χ²(${stats.incidentChiSquare.df}) = ${stats.incidentChiSquare.chi2.toFixed(1)}, ${pFmt(stats.incidentChiSquare.p)} — full crosstab in Summary Tables`} />
            <div className="a-chart-box">
              <Bar
                data={{
                  labels: stats.incidentChiSquare.typeNames,
                  datasets: [
                    { label: 'Observed total', data: stats.incidentChiSquare.typeNames.map((t) => stats.incidentTotalsByType[t]), backgroundColor: C.red, borderRadius: 6 },
                    { label: 'Expected under independence', data: stats.incidentChiSquare.expected.map((row) => Number(row.reduce((a, b) => a + b, 0).toFixed(1))), backgroundColor: hex2rgba(C.faint, 0.5), borderRadius: 6 },
                  ],
                }}
                options={{
                  responsive: true, maintainAspectRatio: false, animation: animConfig,
                  plugins: { legend: { ...legendTheme, position: 'bottom' }, tooltip: tooltipTheme },
                  scales: { x: { grid: { display: false }, ticks: { color: chartSub, font: { size: 9 }, autoSkip: false, maxRotation: 28 } }, y: { ticks: { color: chartSub }, grid: { color: chartGrid } } },
                }}
              />
            </div>
            <p className="a-footnote">{stats.incidentChiSquare.p < 0.05 ? 'Severity distribution depends significantly on incident type.' : `No statistically significant association between incident type and severity (${pFmt(stats.incidentChiSquare.p)}).`}</p>
          </div>
        </div>

        {/* ROW: Weather availability + wet-pavement scenario disclosure */}
        <div className="a-grid">
          <div className="a-card s-6">
            <SectionHeader eyebrow="Data-Availability Disclosure" title="Weather Conditions Actually Recorded" color={C.blue}
              sub="Zero wet/rain hours were recorded on the source count sheets" />
            <div className="a-chart-box">
              <Doughnut
                data={{
                  labels: Object.keys(stats.weatherAvailability),
                  datasets: [{ data: Object.values(stats.weatherAvailability).map((w) => w.records), backgroundColor: [C.yellow, C.faint], borderWidth: 0 }],
                }}
                options={{ responsive: true, maintainAspectRatio: false, animation: animConfig, cutout: '62%', plugins: { legend: { ...legendTheme, position: 'bottom' }, tooltip: { ...tooltipTheme, callbacks: { label: (ctx) => `${ctx.label}: ${ctx.parsed} site-hour rows` } } } }}
              />
            </div>
            <p className="a-footnote">No empirical wet-vs-dry comparison exists in this dataset -- the wet-pavement figure shown throughout this site is a disclosed sensitivity scenario, never a measured result.</p>
          </div>
          <div className="a-card s-6">
            <SectionHeader eyebrow="Disclosed Sensitivity Scenario" title="Wet-Pavement Scenario (x1.10)" color={C.orange} />
            <div className="a-stat-grid">
              <div className="a-stat-box"><div className="a-stat-label">Observed (Dry) Combined PCU</div><div className="a-stat-value">{stats.wetPavementScenario.dryCombinedPCU.toFixed(3)}</div></div>
              <div className="a-stat-box"><div className="a-stat-label">Scenario (Wet x1.10) Combined PCU</div><div className="a-stat-value" style={{ color: C.orange }}>{stats.wetPavementScenario.wetCombinedPCU.toFixed(3)}</div></div>
              <div className="a-stat-box"><div className="a-stat-label">Observed (Dry) Passenger / Cargo</div><div className="a-stat-value">{stats.wetPavementScenario.dryPassengerPCU.toFixed(2)} / {stats.wetPavementScenario.dryCargoPCU.toFixed(2)}</div></div>
              <div className="a-stat-box"><div className="a-stat-label">Scenario (Wet) Passenger / Cargo</div><div className="a-stat-value" style={{ color: C.orange }}>{stats.wetPavementScenario.wetPassengerPCU.toFixed(2)} / {stats.wetPavementScenario.wetCargoPCU.toFixed(2)}</div></div>
            </div>
            <p className="a-footnote" style={{ marginTop: '10px' }}>An editable x1.10 multiplier on the observed dry PCU -- disclosed as a scenario because zero wet-pavement observations exist in the source data.</p>
          </div>
        </div>

        {/* METHODOLOGY */}
        <div className="a-grid">
          <MethodologyPanel color={C.indigo} keys={['staticPCU', 'resultsBySite', 'dynamicPcuBySite', 'dynamicPcuByTimePeriod', 'dynamicPcuByJunctionType', 'weatherAvailability', 'wetPavementScenario', 'speedSensitivity', 'regionalBenchmark', 'allDataSensitivity', 'tricycleSiteAnova', 'tricycleSiteKruskalWallis', 'tricyclePeriodAnova', 'tricyclePeriodKruskalWallis', 'flowTricycleCorrelation', 'kibuyePoissonBins', 'incidentChiSquare', 'compositionBySite', 'hourlyProfile24']} />
        </div>

        {/* PHOTO CAROUSEL — all 24 original geotagged field photographs from
            this study's own count sessions (no stock or illustrative images). */}
        <div className="a-card a-carousel-card s-12">
          <SectionHeader eyebrow="Field Documentation" title="Traffic & Site Conditions" color={C.teal}
            sub="All 24 original photographs taken during this study's own traffic data collection at the case-study corridors in Kampala." />
          <PhotoCarousel photos={[
            { src: `${baseUrl}assets/field/field-01.jpg`, eyebrow: 'Kibuye – Natete Road', title: 'Logging Counts Roadside', color: C.blue,
              text: 'Two enumerators seated on the paved shoulder with clipboards, logging vehicle counts opposite an electronics shopfront as motorcycles and a tricycle move through the Kibuye–Natete Road junction.' },
            { src: `${baseUrl}assets/field/field-02.jpg`, eyebrow: 'Kibuye – Natete Road', title: 'Pedestrians Near the Mosque', color: C.blue2,
              text: 'A pedestrian crosses near a combo-meal billboard and a neighbourhood mosque, while two people rest at the roadside during a count interval at the Kibuye–Natete Road site.' },
            { src: `${baseUrl}assets/field/field-03.jpg`, eyebrow: 'Kibuye – Natete Road', title: 'Recording a Count Interval', color: C.teal,
              text: 'An enumerator in an orange hard hat and hi-vis vest records counts on a clipboard at a roadside table, with a pickup truck and passing motorcycles part of the stream being logged.' },
            { src: `${baseUrl}assets/field/field-04.jpg`, eyebrow: 'Kibuye – Natete Road', title: 'Passing Commercial Traffic', color: C.indigo,
              text: 'A branded delivery truck passes close to the count point, with motorcycles, an SUV, and roadside advertising boards forming the junction backdrop under an overcast sky.' },
            { src: `${baseUrl}assets/field/field-05.jpg`, eyebrow: 'Wandegeya', title: 'The Junction at Sunrise', color: C.green,
              text: 'An early-morning view of the signalized Wandegeya junction, with motorcycles and cars crossing beneath the traffic-signal gantries as the sun rises behind the intersection.' },
            { src: `${baseUrl}assets/field/field-06.jpg`, eyebrow: 'Entebbe Road', title: 'Beside a Parked Tricycle', color: C.orange,
              text: 'An enumerator records counts beside a parked yellow tricycle while a colleague logs notes nearby, with the Clock Tower visible in the distance along Entebbe Road.' },
            { src: `${baseUrl}assets/field/field-07.jpg`, eyebrow: 'Wandegeya', title: 'The Market Frontage', color: C.pink,
              text: 'The red-roofed market buildings and shopfronts lining the Wandegeya junction, with motorcycles and a minivan navigating the paved approach past pedestrians.' },
            { src: `${baseUrl}assets/field/field-08.jpg`, eyebrow: 'Bombo Road', title: 'Enumerators at the Crossing', color: C.red,
              text: 'A cluster of enumerators, one in a hi-vis vest, note pedestrian and vehicle activity at a Bombo Road crossing as a pedestrian in a red football jersey passes the roadside storefronts.' },
            { src: `${baseUrl}assets/field/field-09.jpg`, eyebrow: 'Bombo Road', title: 'Delivery Motorcycles Under the Shelter', color: C.blue,
              text: 'Enumerators positioned under a roadside shelter count insulated food-delivery motorcycles and passing traffic at the Bombo Road junction.' },
            { src: `${baseUrl}assets/field/field-10.jpg`, eyebrow: 'Old Masaka Road', title: 'Beside the Recruitment Billboard', color: C.blue2,
              text: 'Two enumerators mark their tally sheets on a low brick wall beside a jobs-abroad recruitment billboard at the dusty Old Masaka Road junction.' },
            { src: `${baseUrl}assets/field/field-11.jpg`, eyebrow: 'Entebbe Road', title: 'Near the Clock Tower Roundabout', color: C.teal,
              text: 'Enumerators record counts beside a parked pickup truck near the Clock Tower roundabout on Entebbe Road, with festival banners strung overhead.' },
            { src: `${baseUrl}assets/field/field-12.jpg`, eyebrow: 'Bombo Road', title: 'Counting Into the Evening', color: C.indigo,
              text: 'As dusk falls on Bombo Road, enumerators in hi-vis vests continue observing the junction, with an SUV and passing traffic still moving through in the fading light.' },
            { src: `${baseUrl}assets/field/field-13.jpg`, eyebrow: 'Bombo Road', title: 'At the Pedestrian Crossing Post', color: C.green,
              text: 'Enumerators and pedestrians gather beside a pedestrian-crossing signal post, with a fuel station and market stalls visible along the Bombo Road corridor.' },
            { src: `${baseUrl}assets/field/field-14.jpg`, eyebrow: 'Bombo Road', title: 'Watching the Road at Dusk', color: C.orange,
              text: 'Three enumerators in hi-vis vests sit on a roadside bench near a café sign, watching traffic pass in the golden evening light on Bombo Road.' },
            { src: `${baseUrl}assets/field/field-15.jpg`, eyebrow: 'Bombo Road', title: 'Recording Counts Beside the Road', color: C.pink,
              text: 'An enumerator in an orange hard hat records counts on a clipboard while a colleague looks on, seated streetside near a phone shopfront on Bombo Road.' },
            { src: `${baseUrl}assets/field/field-16.jpg`, eyebrow: 'Bombo Road', title: 'The Field Team at the Corner', color: C.red,
              text: 'The enumerator team gathers at a street corner on Bombo Road, comparing notes as vans and motorcycles pass through the junction.' },
            { src: `${baseUrl}assets/field/field-17.jpg`, eyebrow: 'Entebbe Road', title: 'Logging Counts Near the Clock Tower', color: C.blue,
              text: 'Enumerators record counts beside parked vehicles near the Clock Tower roundabout on Entebbe Road, with festival banners and a motorcycle-laden pickup truck in view.' },
            { src: `${baseUrl}assets/field/field-18.jpg`, eyebrow: 'Bombo Road', title: 'Delivery Boxes in the Traffic Stream', color: C.blue2,
              text: 'Motorcycles fitted with insulated food-delivery boxes move through the mixed traffic stream at the Bombo Road count point, observed from the roadside shelter.' },
            { src: `${baseUrl}assets/field/field-19.jpg`, eyebrow: 'Bombo Road', title: 'The Roadside Table', color: C.teal,
              text: 'Enumerators seated at a shopfront table log counts as pedestrians, including a man carrying market bags, pass by on Bombo Road.' },
            { src: `${baseUrl}assets/field/field-20.jpg`, eyebrow: 'Entebbe Road', title: 'Beside the Clock Tower', color: C.indigo,
              text: 'An enumerator records counts near the Airtel-branded Clock Tower on Entebbe Road, as a man carries sacks past the roundabout.' },
            { src: `${baseUrl}assets/field/field-21.jpg`, eyebrow: 'Kibuye – Natete Road', title: 'The Junction Being Counted', color: C.green,
              text: 'A wide view of an unpaved roundabout lined with shop signage as enumerators seated on a brick wall log motorcycles and cars crossing the junction.' },
            { src: `${baseUrl}assets/field/field-22.jpg`, eyebrow: 'Bombo Road', title: 'Comparing Notes at the Corner', color: C.orange,
              text: 'The enumerator team gathers at a Bombo Road street corner, comparing tally sheets between count intervals near the roadside shopfronts.' },
            { src: `${baseUrl}assets/field/field-23.jpg`, eyebrow: 'Bombo Road', title: 'Counting Alongside Parked Transit', color: C.pink,
              text: 'Enumerators seated on a roadside bench log counts as a flatbed truck and sedan pass near the café signage on Bombo Road.' },
            { src: `${baseUrl}assets/field/field-24.jpg`, eyebrow: 'Bombo Road', title: 'Between Sessions at Dusk', color: C.red,
              text: 'The field team rests on a roadside bench as evening traffic passes along the palm-lined Bombo Road corridor.' },
          ]} />
        </div>
        </>
        )}

      </div>
    </div>
  );
};

export default InfographicDashboard;

import React, { useState, useMemo } from 'react';
import PageControls, { downloadJsonFile } from './PageControls';
import useTrafficStats from '../lib/useTrafficStats';
import { DATA_SOURCES, FORMULAS, REAL_SITES, projectToYear } from '../lib/trafficStats';

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

const fmt = (value, digits = 0) => Number(value).toLocaleString('en-GB', {
  minimumFractionDigits: digits,
  maximumFractionDigits: digits,
});
const pFmt = (p) => (p < 0.001 ? 'p < 0.001' : `p = ${p.toFixed(3)}`);

export default function DocumentationMindMapTab({ goBack, canGoBack } = {}) {
  const stats = useTrafficStats();
  const [selectedNodeId, setSelectedNodeId] = useState('root');
  const [zoom, setZoom] = useState(1);
  const [activeSubView, setActiveSubView] = useState('all'); // 'all' | 'mindmap' | 'docs' | 'evidence'

  const mindMapNodes = useMemo(() => {
    const totalMotorized = stats ? stats.allSitesMotorized : 0;
    const totalTri = stats ? stats.allSitesTotalTri : 0;
    const dynPcu = stats ? stats.combinedDynamicPCUOverall : 0;
    const projected2040 = stats ? Math.round(projectToYear(totalMotorized, 2040)) : 0;

    return [
      {
        id: 'root', x: 460, y: 240, r: 44, color: C.blue, label: 'Tricycle PCU\nPlatform',
        category: 'Core System',
        summary: 'View-only urban traffic research platform analysing tricycle Passenger Car Unit (PCU) equivalency across five Kampala intersections.',
        metrics: [
          { k: 'Survey Window', v: '02/08/2026 to 03/08/2026 (07:00-19:00)' },
          { k: 'Observed Motorised Flow', v: stats ? `${fmt(totalMotorized)} veh` : 'Loading...' },
          { k: 'Combined Dynamic PCU', v: stats ? dynPcu.toFixed(3) : 'Loading...' },
        ],
      },
      {
        id: 'sites', x: 180, y: 110, r: 34, color: C.blue, parent: 'root', label: '5 Study\nSites',
        category: 'Geospatial Scope',
        summary: 'Five surveyed intersections on the Kampala City road network mapped on Esri World Imagery + Hybrid Labels.',
        metrics: [
          { k: 'Roundabout', v: 'Kibuye Roundabout' },
          { k: 'Cross Junctions', v: 'Wandegeya, Bakuli, Bwaise, Natete' },
          { k: 'Highest Tricycle Share', v: stats ? `Kibuye (${fmt(stats.resultsBySite.Kibuye.tricycleShare * 100, 2)}%)` : '-' },
        ],
      },
      {
        id: 'fleet', x: 180, y: 360, r: 34, color: C.green, parent: 'root', label: 'Vehicle\nClasses',
        category: 'Fleet Mix',
        summary: 'Five governed motorised vehicle classes with distinct static dimensions, speeds, and dynamic PCU factors.',
        metrics: [
          { k: 'Total Tricycles', v: stats ? `${fmt(totalTri)} veh` : '-' },
          { k: 'Passenger Tricycles', v: stats ? `${fmt(stats.allSitesPassengerTri)} veh` : '-' },
          { k: 'Cargo Tricycles', v: stats ? `${fmt(stats.allSitesCargoTri)} veh` : '-' },
        ],
      },
      {
        id: 'pcu', x: 460, y: 70, r: 34, color: C.purple, parent: 'root', label: 'PCU\nModelling',
        category: 'Analytical Engine',
        summary: 'Combines speed-area static equivalency with demand-pressure dynamic PCU scaling across peak and off-peak periods.',
        metrics: [
          { k: 'Passenger Dynamic PCU', v: stats ? stats.passengerDynamicPCUOverall.toFixed(3) : '-' },
          { k: 'Cargo Dynamic PCU', v: stats ? stats.cargoDynamicPCUOverall.toFixed(3) : '-' },
          { k: 'Demand Pressure Beta', v: '0.40' },
        ],
      },
      {
        id: 'twin', x: 740, y: 110, r: 34, color: C.amber, parent: 'root', label: 'Digital\nTwin',
        category: 'Interactive Simulation',
        summary: 'Per-junction animated schematic with calendar date selection, Play/Pause, 07:00-19:00 window toggle, and directional split.',
        metrics: [
          { k: 'Survey Dates', v: '02/08/2026 & 03/08/2026' },
          { k: 'Survey Window', v: '07:00 to 19:00' },
          { k: 'Overnight Mode', v: 'Toggleable 24-hour connector' },
        ],
      },
      {
        id: 'vision2040', x: 740, y: 360, r: 34, color: C.teal, parent: 'root', label: 'Vision\n2040',
        category: 'Long-Term Horizon',
        summary: 'Compounded 4.5% p.a. corridor growth projection from 2026 observed baseline through 2040 for network capacity planning.',
        metrics: [
          { k: '2026 Base Flow', v: stats ? `${fmt(totalMotorized)} veh` : '-' },
          { k: '2040 Projected Flow', v: stats ? `${fmt(projected2040)} veh` : '-' },
          { k: 'Horizon Span', v: '2026 to 2040' },
        ],
      },
      {
        id: 'safety', x: 460, y: 410, r: 32, color: C.red, parent: 'root', label: 'Safety &\nIncidents',
        category: 'Network Safety',
        summary: 'Traffic incident severity distribution and Chi-square independence evaluation across the Kampala network.',
        metrics: [
          { k: 'Chi-Square Stat', v: stats ? fmt(stats.incidentChiSquare.chi2, 2) : '-' },
          { k: 'Significance', v: stats ? pFmt(stats.incidentChiSquare.p) : '-' },
          { k: 'Mode', v: 'View-only analytical summary' },
        ],
      },
    ];
  }, [stats]);

  const selectedNode = mindMapNodes.find((n) => n.id === selectedNodeId) || mindMapNodes[0];

  const exports = stats ? [
    { id: 'json', label: 'Verified Evidence (JSON)', icon: 'fa-file-code', hint: 'Computed statistics and methodology register', action: () => downloadJsonFile('tricycle_research_evidence.json', { stats, sources: DATA_SOURCES, formulas: FORMULAS }) },
    { id: 'print', label: 'Print / Save as PDF', icon: 'fa-print', hint: 'Opens the browser print dialog', action: () => window.print() },
  ] : [];

  return (
    <div className="doc-page">
      <style>{`
        .doc-page { max-width: 1440px; margin: 0 auto; padding: 20px 18px 80px; color: ${C.ink}; font-family: var(--font-sans); }
        .doc-hero { background: ${C.card}; border: 1px solid ${C.line}; border-radius: 22px; padding: clamp(22px, 4vw, 38px); box-shadow: 0 1px 3px rgba(15,23,42,0.05), 0 12px 28px -12px rgba(15,23,42,0.08); margin: 16px 0 22px; }
        .doc-badge { display: inline-block; background: rgba(0, 113, 227, 0.10); color: ${C.blue}; border-radius: 999px; padding: 5px 11px; font-size: 0.72rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em; }
        .doc-hero h1 { color: ${C.ink}; font-size: clamp(1.9rem, 3.6vw, 2.8rem); letter-spacing: -0.025em; margin: 14px 0 10px; }
        .doc-hero p { color: ${C.sub}; line-height: 1.6; max-width: 860px; margin: 0; }

        .doc-subnav { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px; }
        .doc-subnav-btn { border: 1px solid ${C.line}; background: ${C.card}; color: ${C.sub}; font-weight: 600; font-size: 0.84rem; padding: 8px 16px; border-radius: 10px; cursor: pointer; transition: all .15s ease; }
        .doc-subnav-btn.active { background: ${C.blue}; color: #FFFFFF; border-color: ${C.blue}; }
        .doc-subnav-btn:hover:not(.active) { background: ${C.canvas}; color: ${C.ink}; }

        .doc-panel { background: ${C.card}; border: 1px solid ${C.line}; border-radius: 20px; padding: 24px; box-shadow: 0 1px 3px rgba(15,23,42,0.05), 0 10px 24px -12px rgba(15,23,42,0.08); margin-bottom: 20px; }
        .doc-panel h2 { color: ${C.ink}; margin: 0 0 8px; font-size: 1.32rem; }
        .doc-panel p { color: ${C.sub}; line-height: 1.6; margin: 0 0 14px; }

        .mm-grid { display: grid; grid-template-columns: 1.65fr 1fr; gap: 20px; align-items: start; }
        @media (max-width: 1024px) { .mm-grid { grid-template-columns: 1fr; } }

        .mm-canvas-wrap { background: ${C.canvas}; border: 1px solid ${C.line}; border-radius: 16px; overflow: hidden; position: relative; }
        .mm-toolbar { display: flex; justify-content: space-between; align-items: center; padding: 10px 14px; border-bottom: 1px solid ${C.line}; background: ${C.card}; flex-wrap: wrap; gap: 8px; }
        .mm-zoom-btn { border: 1px solid ${C.line}; background: ${C.card}; color: ${C.ink}; border-radius: 8px; padding: 5px 10px; font-size: 0.8rem; font-weight: 700; cursor: pointer; }
        .mm-zoom-btn:hover { background: ${C.canvas}; }

        .mm-inspector { background: ${C.canvas}; border: 1px solid ${C.line}; border-radius: 16px; padding: 20px; }
        .mm-metric { background: ${C.card}; border: 1px solid ${C.line}; border-radius: 12px; padding: 11px 14px; margin-top: 10px; }
        .mm-metric span { display: block; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; color: ${C.sub}; letter-spacing: 0.03em; }
        .mm-metric strong { display: block; font-size: 1rem; color: ${C.ink}; margin-top: 3px; }

        .doc-cards-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; margin-top: 14px; }
        .doc-mini-card { background: ${C.canvas}; border: 1px solid ${C.line}; border-radius: 14px; padding: 16px; }
        .doc-mini-card h3 { font-size: 1rem; margin: 0 0 6px; color: ${C.ink}; }
        .doc-mini-card p { font-size: 0.86rem; margin: 0; color: ${C.sub}; line-height: 1.5; }

        .ev-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px; margin-top: 14px; }
        .ev-stat { background: ${C.canvas}; border: 1px solid ${C.line}; border-radius: 14px; padding: 16px; }
        .ev-stat span { display: block; color: ${C.sub}; font-size: 0.72rem; text-transform: uppercase; font-weight: 700; letter-spacing: 0.03em; }
        .ev-stat strong { display: block; font-size: 1.2rem; margin-top: 6px; color: ${C.ink}; }
        .ev-stat small { display: block; color: ${C.faint}; margin-top: 4px; font-size: 0.78rem; }
      `}</style>

      <PageControls onBack={goBack} canGoBack={canGoBack} exportOptions={exports} />

      <header className="doc-hero">
        <span className="doc-badge">View-Only Research Platform</span>
        <h1>Platform Documentation &amp; Interactive Mind Map</h1>
        <p>
          Explore the system architecture through the interactive view-only Mind Map, review the Platform Documentation, and inspect the governed statistical evidence. No login, access levels, or administrative editing tools are present.
        </p>
      </header>

      <div className="doc-subnav" role="group" aria-label="Filter documentation sections">
        {[
          { id: 'all', label: 'All Sections' },
          { id: 'mindmap', label: 'Interactive Mind Map' },
          { id: 'docs', label: 'Platform Documentation' },
          { id: 'evidence', label: 'Statistical Evidence' },
        ].map((v) => (
          <button
            key={v.id}
            type="button"
            className={`doc-subnav-btn ${activeSubView === v.id ? 'active' : ''}`}
            onClick={() => setActiveSubView(v.id)}
          >
            {v.label}
          </button>
        ))}
      </div>

      {(activeSubView === 'all' || activeSubView === 'mindmap') && (
        <section className="doc-panel">
          <h2>Interactive Platform Mind Map (View-Only)</h2>
          <p>Click any node to inspect its scope, methodology, and live computed metrics.</p>
          <div className="mm-grid">
            <div className="mm-canvas-wrap">
              <div className="mm-toolbar">
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: C.sub }}>
                  Selected: <strong style={{ color: C.ink }}>{selectedNode.label.replace('\n', ' ')}</strong>
                </span>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button type="button" className="mm-zoom-btn" onClick={() => setZoom((z) => Math.max(0.75, +(z - 0.15).toFixed(2)))} aria-label="Zoom out mind map">-</button>
                  <button type="button" className="mm-zoom-btn" onClick={() => setZoom(1)}>Reset ({Math.round(zoom * 100)}%)</button>
                  <button type="button" className="mm-zoom-btn" onClick={() => setZoom((z) => Math.min(1.45, +(z + 0.15).toFixed(2)))} aria-label="Zoom in mind map">+</button>
                </div>
              </div>
              <div style={{ overflow: 'auto', padding: '12px' }}>
                <svg
                  viewBox="0 0 920 480"
                  style={{ width: `${Math.round(zoom * 100)}%`, minWidth: '640px', height: 'auto', display: 'block', margin: '0 auto' }}
                  role="img"
                  aria-label="Interactive Mind Map of the Tricycle PCU Research Platform"
                >
                  {mindMapNodes.filter((n) => n.parent).map((n) => {
                    const p = mindMapNodes.find((x) => x.id === n.parent);
                    const active = selectedNodeId === n.id || selectedNodeId === p.id;
                    return (
                      <line
                        key={`edge-${n.id}`}
                        x1={p.x}
                        y1={p.y}
                        x2={n.x}
                        y2={n.y}
                        stroke={active ? n.color : '#CBD5E1'}
                        strokeWidth={active ? 3.5 : 2}
                        strokeDasharray={n.id === 'vision2040' ? '6 4' : undefined}
                      />
                    );
                  })}
                  {mindMapNodes.map((n) => {
                    const isSel = selectedNodeId === n.id;
                    const lines = n.label.split('\n');
                    return (
                      <g
                        key={n.id}
                        style={{ cursor: 'pointer' }}
                        onClick={() => setSelectedNodeId(n.id)}
                        role="button"
                        tabIndex={0}
                        aria-label={`Select mind map node ${n.label.replace('\n', ' ')}`}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setSelectedNodeId(n.id);
                          }
                        }}
                      >
                        <circle
                          cx={n.x}
                          cy={n.y}
                          r={n.r + (isSel ? 6 : 0)}
                          fill={isSel ? n.color : '#FFFFFF'}
                          stroke={n.color}
                          strokeWidth={isSel ? 4 : 2.5}
                        />
                        {lines.map((line, idx) => (
                          <text
                            key={idx}
                            x={n.x}
                            y={n.y + (idx - (lines.length - 1) / 2) * 14 + 4}
                            textAnchor="middle"
                            fontSize={n.id === 'root' ? '12' : '11'}
                            fontWeight="700"
                            fill={isSel ? '#FFFFFF' : C.ink}
                            fontFamily="Inter, system-ui, sans-serif"
                          >
                            {line}
                          </text>
                        ))}
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            <div className="mm-inspector">
              <span className="doc-badge" style={{ background: 'rgba(13, 148, 136, 0.12)', color: C.teal }}>
                {selectedNode.category}
              </span>
              <h3 style={{ margin: '10px 0 6px', fontSize: '1.2rem', color: C.ink }}>
                {selectedNode.label.replace('\n', ' ')}
              </h3>
              <p style={{ fontSize: '0.88rem', color: C.sub, margin: '0 0 12px', lineHeight: 1.55 }}>
                {selectedNode.summary}
              </p>
              {selectedNode.metrics.map((m) => (
                <div className="mm-metric" key={m.k}>
                  <span>{m.k}</span>
                  <strong>{m.v}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {(activeSubView === 'all' || activeSubView === 'docs') && (
        <section className="doc-panel">
          <h2>Platform Documentation</h2>
          <p>Architecture, data governance, and reporting standards implemented across all five views.</p>
          <div className="doc-cards-grid">
            <div className="doc-mini-card">
              <h3>1. Five-Tab Architecture</h3>
              <p>Includes Geospatial Overview (Esri World Imagery + Hybrid Labels), Junction Digital Twin, Summary Tables, Analytics, and Documentation &amp; Mind Map.</p>
            </div>
            <div className="doc-mini-card">
              <h3>2. Survey Window &amp; Calendar</h3>
              <p>Field counts cover 02/08/2026 to 03/08/2026 across the 07:00 to 19:00 survey window. Overnight hours are toggleable as a disclosed mathematical connector.</p>
            </div>
            <div className="doc-mini-card">
              <h3>3. Dynamic PCU &amp; Vision 2040</h3>
              <p>Dynamic PCU scales speed-area static equivalency by hourly demand pressure (beta = 0.40). Vision 2040 projections apply a 4.5% p.a. compounded corridor growth rate.</p>
            </div>
            <div className="doc-mini-card">
              <h3>4. View-Only Public Governance</h3>
              <p>Strictly view-only analytical interface with no login, no role-based access control, no data-entry forms, UK English, metric units, and dd/mm/yyyy date formatting.</p>
            </div>
          </div>
        </section>
      )}

      {(activeSubView === 'all' || activeSubView === 'evidence') && (
        <section className="doc-panel">
          <h2>Governed Statistical Evidence</h2>
          <p>Reproducible statistical tests computed live in the browser from the verified Kampala survey and incident datasets.</p>
          {!stats ? <p>Computing statistical evidence...</p> : (
            <div className="ev-grid">
              <div className="ev-stat">
                <span>Site ANOVA (Tricycle Volume)</span>
                <strong>F({stats.tricycleSiteAnova.df1}, {stats.tricycleSiteAnova.df2}) = {fmt(stats.tricycleSiteAnova.F, 3)}</strong>
                <small>{pFmt(stats.tricycleSiteAnova.p)}</small>
              </div>
              <div className="ev-stat">
                <span>Site Kruskal-Wallis H</span>
                <strong>H = {fmt(stats.tricycleSiteKruskalWallis.H, 3)}</strong>
                <small>{pFmt(stats.tricycleSiteKruskalWallis.p)}</small>
              </div>
              <div className="ev-stat">
                <span>Time-Period ANOVA</span>
                <strong>F({stats.tricyclePeriodAnova.df1}, {stats.tricyclePeriodAnova.df2}) = {fmt(stats.tricyclePeriodAnova.F, 3)}</strong>
                <small>{pFmt(stats.tricyclePeriodAnova.p)}</small>
              </div>
              <div className="ev-stat">
                <span>Flow vs Tricycle Correlation</span>
                <strong>r = {fmt(stats.flowTricycleCorrelation.r, 3)}</strong>
                <small>R² = {fmt(stats.flowTricycleCorrelation.r2Pct, 1)}% ({pFmt(stats.flowTricycleCorrelation.p)})</small>
              </div>
              <div className="ev-stat">
                <span>Kibuye Poisson Fit</span>
                <strong>chi² = {fmt(stats.kibuyePoissonChiSq.chi2, 2)}</strong>
                <small>lambda = {fmt(stats.kibuyeLambda, 1)} veh/hr ({pFmt(stats.kibuyePoissonChiSq.p)})</small>
              </div>
              <div className="ev-stat">
                <span>Incident Type x Severity</span>
                <strong>chi² = {fmt(stats.incidentChiSquare.chi2, 2)}</strong>
                <small>{pFmt(stats.incidentChiSquare.p)}</small>
              </div>
            </div>
          )}
        </section>
      )}
    </div>
  );
}

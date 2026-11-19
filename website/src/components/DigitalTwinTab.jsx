import React, { useState, useEffect, useMemo } from 'react';
import PageControls, { downloadTextFile, downloadJsonFile } from './PageControls';
import MethodologyPanel from './MethodologyPanel';
import JunctionDigitalTwin from './JunctionDigitalTwin';
import useTrafficStats from '../lib/useTrafficStats';
import { REAL_SITES, projectToYear } from '../lib/trafficStats';
import { JUNCTION_LEG_CONFIG, simulateDirectionalSplit } from '../lib/directionalSplit';

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

const SITE_FULL_NAME = {
  Kibuye: 'Kibuye Roundabout',
  Wandegeya: 'Wandegeya Junction',
  Bakuli: 'Bakuli Intersection',
  Bwaise: 'Bwaise Junction',
  Natete: 'Natete Junction',
};

const SURVEY_DATES = [
  { id: 'all', label: 'All Survey Days (02/08/2026 to 03/08/2026)' },
  { id: '2026-08-02', label: '02/08/2026 (Day 1)' },
  { id: '2026-08-03', label: '03/08/2026 (Day 2)' },
];

const CLASS_COLORS = {
  Motorcycles: C.purple,
  PassengerTricycle: C.green,
  CargoTricycle: C.amber,
  CarsTaxi: C.blue,
  OtherMotorized: C.teal,
};

const CLASS_LABELS = {
  Motorcycles: 'Motorcycles',
  PassengerTricycle: 'Passenger Tricycles',
  CargoTricycle: 'Cargo Tricycles',
  CarsTaxi: 'Cars and Taxis',
  OtherMotorized: 'Other Motorised',
};

const formatDateDdMmYyyy = (iso) => {
  if (!iso || iso === 'all') return '02/08/2026 to 03/08/2026';
  const [y, m, d] = String(iso).slice(0, 10).split('-');
  return y && m && d ? `${d}/${m}/${y}` : iso;
};

export default function DigitalTwinTab({ goBack, canGoBack } = {}) {
  const stats = useTrafficStats();
  const [selectedSite, setSelectedSite] = useState('Kibuye');
  const [selectedDate, setSelectedDate] = useState('all');
  const [surveyWindowOnly, setSurveyWindowOnly] = useState(true);
  const [selectedHour, setSelectedHour] = useState(8);
  const [isPlaying, setIsPlaying] = useState(true);
  const [projectionYear, setProjectionYear] = useState(2026);
  const [corridorSkew, setCorridorSkew] = useState(0.3);

  useEffect(() => {
    if (!isPlaying) return undefined;
    const id = setInterval(() => {
      setSelectedHour((h) => {
        if (surveyWindowOnly) {
          return h >= 18 || h < 7 ? 7 : h + 1;
        }
        return (h + 1) % 24;
      });
    }, 1600);
    return () => clearInterval(id);
  }, [isPlaying, surveyWindowOnly]);

  const growthMult = useMemo(() => projectToYear(1, projectionYear), [projectionYear]);

  const twinModel = useMemo(() => {
    if (!stats) return null;
    const fullName = SITE_FULL_NAME[selectedSite] || selectedSite;
    const legConfig = JUNCTION_LEG_CONFIG[fullName] || JUNCTION_LEG_CONFIG[selectedSite];
    const siteRows = (stats.siteHourRows || []).filter((r) => {
      if (r.Site !== selectedSite) return false;
      if (selectedDate === 'all') return true;
      return String(r.Date).slice(0, 10) === selectedDate;
    });

    const hourKey = `${String(selectedHour).padStart(2, '0')}:00:00`;
    const matchingHours = siteRows.filter((r) => String(r.TimeFrom) === hourKey);

    let hourlyFlow = 0;
    let hourlyTricycles = 0;
    let demandPressure = 0.5;
    let dynamicPcu = stats.dynamicPcuBySite[selectedSite]?.combinedDynamicPCU || 1.1;
    let isObservedHour = false;

    if (matchingHours.length > 0) {
      isObservedHour = true;
      hourlyFlow = matchingHours.reduce((s, r) => s + (r.MotorizedFlow || 0), 0) / matchingHours.length;
      hourlyTricycles = matchingHours.reduce((s, r) => s + (r.TricycleTotal || 0), 0) / matchingHours.length;
      demandPressure = matchingHours.reduce((s, r) => s + (r.DemandPressure || 0), 0) / matchingHours.length;
      dynamicPcu = matchingHours.reduce((s, r) => s + (r.CombinedDynamicPCU || 0), 0) / matchingHours.length;
    } else {
      const series = stats.hourlyProfile24BySite[selectedSite] || [];
      const fallback = series[selectedHour] || { motorizedFlow: 0, tricycleTotal: 0, isModelled: true };
      hourlyFlow = fallback.motorizedFlow || 0;
      hourlyTricycles = fallback.tricycleTotal || 0;
      isObservedHour = !fallback.isModelled;
      demandPressure = stats.dynamicPcuBySite[selectedSite]?.meanDemandPressure || 0.5;
    }

    const projectedFlow = hourlyFlow * growthMult;
    const projectedTricycles = hourlyTricycles * growthMult;
    const legFlows = legConfig ? simulateDirectionalSplit(projectedFlow, legConfig, corridorSkew) : [];

    const comp = stats.compositionBySite[selectedSite] || {};
    const classMix = Object.keys(CLASS_LABELS).map((vehicleClass) => ({
      vehicleClass,
      label: CLASS_LABELS[vehicleClass],
      sharePct: comp[vehicleClass] || 0,
    }));

    return {
      fullName,
      legConfig,
      legFlows,
      classMix,
      hourlyFlow: projectedFlow,
      hourlyTricycles: projectedTricycles,
      tricycleSharePct: projectedFlow > 0 ? (projectedTricycles / projectedFlow) * 100 : 0,
      demandPressure: Math.min(1.2, demandPressure * Math.pow(growthMult, 0.35)),
      dynamicPcu,
      isObservedHour,
    };
  }, [stats, selectedSite, selectedDate, selectedHour, growthMult, corridorSkew]);

  const exportCsv = () => {
    if (!twinModel) return;
    const header = 'Approach Leg,Role,Split (%),Hourly Volume (veh/hr),Survey Date,Hour,Horizon Year';
    const lines = twinModel.legFlows.map((l) =>
      `"${l.leg}","${l.isPrimary ? 'Primary' : 'Secondary'}",${l.pct.toFixed(2)},${Math.round(l.volume)},"${formatDateDdMmYyyy(selectedDate)}","${String(selectedHour).padStart(2, '0')}:00",${projectionYear}`
    );
    downloadTextFile(`digital_twin_${selectedSite.toLowerCase()}_${projectionYear}.csv`, [header, ...lines].join('\n'));
  };

  const exportOptions = twinModel ? [
    { id: 'csv', label: 'Approach Split (CSV)', icon: 'fa-file-csv', hint: 'Directional flow for current junction and hour', action: exportCsv },
    { id: 'json', label: 'Junction Twin State (JSON)', icon: 'fa-file-code', hint: 'Current Digital Twin parameters and flows', action: () => downloadJsonFile(`digital_twin_${selectedSite.toLowerCase()}_${projectionYear}.json`, twinModel) },
    { id: 'print', label: 'Print / Save as PDF', icon: 'fa-print', hint: 'Opens browser print dialog', action: () => window.print() },
  ] : [];

  return (
    <div className="dt-page">
      <style>{`
        .dt-page { max-width: 1480px; margin: 0 auto; padding: 20px 12px 72px; color: ${C.ink}; font-family: var(--font-sans); }
        .dt-hero { margin: 12px 0 24px; }
        .dt-eyebrow { font-size: 0.74rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: ${C.blue}; margin: 0 0 6px; }
        .dt-title { font-size: clamp(1.8rem, 3.2vw, 2.6rem); font-weight: 800; letter-spacing: -0.025em; margin: 0 0 8px; color: ${C.ink}; }
        .dt-sub { font-size: 0.96rem; color: ${C.sub}; margin: 0; max-width: 820px; line-height: 1.55; }

        .dt-controls-card { background: ${C.card}; border: 1px solid ${C.line}; border-radius: 20px; padding: 20px 24px; box-shadow: 0 1px 3px rgba(15,23,42,0.05), 0 10px 24px -12px rgba(15,23,42,0.08); margin-bottom: 20px; }
        .dt-controls-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; align-items: end; }
        .dt-field label { display: block; font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: ${C.sub}; margin-bottom: 6px; }
        .dt-select { width: 100%; padding: 9px 12px; border-radius: 10px; border: 1px solid ${C.line}; background: ${C.canvas}; color: ${C.ink}; font-size: 0.86rem; font-weight: 600; font-family: inherit; }
        .dt-btn-row { display: flex; gap: 8px; flex-wrap: wrap; }
        .dt-pill-btn { border: 1px solid ${C.line}; background: ${C.card}; color: ${C.sub}; font-weight: 600; font-size: 0.82rem; padding: 8px 14px; border-radius: 10px; cursor: pointer; transition: all .15s ease; }
        .dt-pill-btn.active { background: ${C.blue}; color: #FFFFFF; border-color: ${C.blue}; }
        .dt-pill-btn:hover:not(.active) { background: ${C.canvas}; color: ${C.ink}; }

        .dt-kpi-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 14px; margin-bottom: 20px; }
        .dt-kpi { background: ${C.card}; border: 1px solid ${C.line}; border-radius: 16px; padding: 16px 18px; }
        .dt-kpi-label { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: ${C.sub}; }
        .dt-kpi-val { font-size: 1.45rem; font-weight: 800; color: ${C.ink}; margin: 4px 0 2px; font-feature-settings: "tnum" 1; }
        .dt-kpi-sub { font-size: 0.74rem; color: ${C.faint}; }

        .dt-main-grid { display: grid; grid-template-columns: 1.55fr 1fr; gap: 20px; margin-bottom: 20px; }
        @media (max-width: 1080px) { .dt-main-grid { grid-template-columns: 1fr; } }

        .dt-card { background: ${C.card}; border: 1px solid ${C.line}; border-radius: 20px; padding: 22px; box-shadow: 0 1px 3px rgba(15,23,42,0.05), 0 10px 24px -12px rgba(15,23,42,0.08); }
        .dt-card-head { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; margin-bottom: 12px; }
        .dt-badge { display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; border-radius: 999px; font-size: 0.72rem; font-weight: 700; }
        .dt-badge-obs { background: rgba(22, 163, 74, 0.12); color: ${C.green}; }
        .dt-badge-mod { background: rgba(217, 119, 6, 0.12); color: ${C.amber}; }

        .dt-legend { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 12px; padding-top: 12px; border-top: 1px solid ${C.line}; }
        .dt-legend-item { display: flex; align-items: center; gap: 6px; font-size: 0.78rem; font-weight: 600; color: ${C.ink}; }
        .dt-legend-dot { width: 10px; height: 10px; border-radius: 50%; }

        .dt-table { width: 100%; border-collapse: collapse; font-size: 0.84rem; margin-top: 10px; }
        .dt-table th, .dt-table td { padding: 10px 8px; border-bottom: 1px solid ${C.line}; text-align: left; }
        .dt-table th { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.03em; color: ${C.sub}; background: ${C.canvas}; }
        .dt-table td.num, .dt-table th.num { text-align: right; font-feature-settings: "tnum" 1; }

        .dt-slider { -webkit-appearance: none; width: 100%; height: 6px; border-radius: 4px; background: #E2E8F0; margin: 8px 0 4px; }
        .dt-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 18px; height: 18px; border-radius: 50%; background: #FFFFFF; border: 4px solid ${C.blue}; cursor: pointer; box-shadow: 0 1px 4px rgba(15,23,42,0.22); }
      `}</style>

      <PageControls onBack={goBack} canGoBack={canGoBack} exportOptions={exportOptions} />

      <header className="dt-hero">
        <p className="dt-eyebrow">Interactive Schematic Simulator</p>
        <h1 className="dt-title">Junction Digital Twin</h1>
        <p className="dt-sub">
          Inspect per-junction approach flows, vehicle-class mix, per-junction calendar dates, and Vision 2040 traffic projections across the 07:00 to 19:00 survey window or full 24-hour cycle.
        </p>
      </header>

      <section className="dt-controls-card">
        <div className="dt-controls-grid">
          <div className="dt-field">
            <label htmlFor="dt-site-select">Study Junction</label>
            <select
              id="dt-site-select"
              className="dt-select"
              value={selectedSite}
              onChange={(e) => setSelectedSite(e.target.value)}
            >
              {REAL_SITES.map((s) => (
                <option key={s} value={s}>{SITE_FULL_NAME[s] || s}</option>
              ))}
            </select>
          </div>

          <div className="dt-field">
            <label htmlFor="dt-calendar-select">Per-Junction Survey Calendar</label>
            <select
              id="dt-calendar-select"
              className="dt-select"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            >
              {SURVEY_DATES.map((d) => (
                <option key={d.id} value={d.id}>{d.label}</option>
              ))}
            </select>
          </div>

          <div className="dt-field">
            <label>Hourly Window &amp; Playback</label>
            <div className="dt-btn-row">
              <button
                type="button"
                className={`dt-pill-btn ${surveyWindowOnly ? 'active' : ''}`}
                onClick={() => {
                  const next = !surveyWindowOnly;
                  setSurveyWindowOnly(next);
                  if (next && (selectedHour < 7 || selectedHour > 18)) setSelectedHour(8);
                }}
              >
                {surveyWindowOnly ? '07:00-19:00 Survey Window' : '24-Hour Cycle'}
              </button>
              <button
                type="button"
                className={`dt-pill-btn ${isPlaying ? 'active' : ''}`}
                onClick={() => setIsPlaying((p) => !p)}
                aria-pressed={isPlaying}
              >
                <i className={`fa-solid ${isPlaying ? 'fa-pause' : 'fa-play'}`} style={{ marginRight: '6px' }}></i>
                {isPlaying ? 'Pause' : 'Play'}
              </button>
            </div>
          </div>

          <div className="dt-field">
            <label htmlFor="dt-hour-slider">Hour of Day: {String(selectedHour).padStart(2, '0')}:00</label>
            <input
              id="dt-hour-slider"
              type="range"
              className="dt-slider"
              min={surveyWindowOnly ? 7 : 0}
              max={surveyWindowOnly ? 18 : 23}
              step={1}
              value={selectedHour}
              onChange={(e) => {
                setIsPlaying(false);
                setSelectedHour(parseInt(e.target.value, 10));
              }}
            />
          </div>

          <div className="dt-field">
            <label htmlFor="dt-year-slider">Vision 2040 Horizon: {projectionYear}</label>
            <input
              id="dt-year-slider"
              type="range"
              className="dt-slider"
              min={2026}
              max={2040}
              step={1}
              value={projectionYear}
              onChange={(e) => setProjectionYear(parseInt(e.target.value, 10))}
            />
          </div>
        </div>
      </section>

      {!twinModel ? (
        <div className="dt-card">Loading junction twin model...</div>
      ) : (
        <>
          <div className="dt-kpi-grid">
            <div className="dt-kpi">
              <div className="dt-kpi-label">Junction &amp; Date</div>
              <div className="dt-kpi-val" style={{ fontSize: '1.15rem', color: C.blue }}>{twinModel.fullName}</div>
              <div className="dt-kpi-sub">{formatDateDdMmYyyy(selectedDate)}</div>
            </div>
            <div className="dt-kpi">
              <div className="dt-kpi-label">Hourly Flow ({projectionYear})</div>
              <div className="dt-kpi-val">{Math.round(twinModel.hourlyFlow).toLocaleString('en-GB')} veh/hr</div>
              <div className="dt-kpi-sub">{String(selectedHour).padStart(2, '0')}:00 interval</div>
            </div>
            <div className="dt-kpi">
              <div className="dt-kpi-label">Tricycle Flow ({projectionYear})</div>
              <div className="dt-kpi-val" style={{ color: C.green }}>{Math.round(twinModel.hourlyTricycles).toLocaleString('en-GB')} veh/hr</div>
              <div className="dt-kpi-sub">{twinModel.tricycleSharePct.toFixed(2)}% of hourly flow</div>
            </div>
            <div className="dt-kpi">
              <div className="dt-kpi-label">Modelled Dynamic PCU</div>
              <div className="dt-kpi-val" style={{ color: C.purple }}>{twinModel.dynamicPcu.toFixed(3)}</div>
              <div className="dt-kpi-sub">Demand pressure {(twinModel.demandPressure * 100).toFixed(1)}%</div>
            </div>
          </div>

          <div className="dt-main-grid">
            <div className="dt-card">
              <div className="dt-card-head">
                <div>
                  <h2 style={{ margin: 0, fontSize: '1.18rem' }}>{twinModel.fullName} Schematic</h2>
                  <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: C.sub }}>
                    {twinModel.legConfig?.type || 'Junction'} | {String(selectedHour).padStart(2, '0')}:00 | Horizon {projectionYear}
                  </p>
                </div>
                <span className={`dt-badge ${twinModel.isObservedHour ? 'dt-badge-obs' : 'dt-badge-mod'}`}>
                  <i className={`fa-solid ${twinModel.isObservedHour ? 'fa-circle-check' : 'fa-clock'}`}></i>
                  {twinModel.isObservedHour ? '07:00-19:00 Observed Window' : 'Overnight Modelled Connector'}
                </span>
              </div>

              {twinModel.legConfig && (
                <JunctionDigitalTwin
                  legConfig={twinModel.legConfig}
                  legFlows={twinModel.legFlows}
                  classMix={twinModel.classMix}
                  vcMean={twinModel.demandPressure}
                  classColors={CLASS_COLORS}
                  isPlaying={isPlaying}
                  unitLabel="veh/hr"
                  height={480}
                />
              )}

              <div className="dt-legend">
                {twinModel.classMix.map((c) => (
                  <div className="dt-legend-item" key={c.vehicleClass}>
                    <span className="dt-legend-dot" style={{ background: CLASS_COLORS[c.vehicleClass] }}></span>
                    <span>{c.label}: {c.sharePct.toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="dt-card">
              <div className="dt-card-head">
                <div>
                  <h2 style={{ margin: 0, fontSize: '1.18rem' }}>Directional Approach Split</h2>
                  <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: C.sub }}>
                    Disclosed corridor-skew model across confirmed approach legs
                  </p>
                </div>
              </div>

              <div className="dt-field" style={{ marginBottom: '12px' }}>
                <label htmlFor="dt-skew-slider">Primary Corridor Skew: {(corridorSkew * 100).toFixed(0)}%</label>
                <input
                  id="dt-skew-slider"
                  type="range"
                  className="dt-slider"
                  min={0}
                  max={0.6}
                  step={0.05}
                  value={corridorSkew}
                  onChange={(e) => setCorridorSkew(parseFloat(e.target.value))}
                />
              </div>

              <table className="dt-table">
                <thead>
                  <tr>
                    <th>Approach Leg</th>
                    <th>Role</th>
                    <th className="num">Share</th>
                    <th className="num">Flow (veh/hr)</th>
                  </tr>
                </thead>
                <tbody>
                  {twinModel.legFlows.map((leg) => (
                    <tr key={leg.leg}>
                      <td style={{ fontWeight: 600 }}>{leg.leg}</td>
                      <td>
                        <span style={{
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          color: leg.isPrimary ? C.blue : C.sub,
                          background: leg.isPrimary ? 'rgba(0,113,227,0.10)' : C.canvas,
                          padding: '2px 8px',
                          borderRadius: '999px',
                        }}>
                          {leg.isPrimary ? 'Primary' : 'Secondary'}
                        </span>
                      </td>
                      <td className="num">{leg.pct.toFixed(1)}%</td>
                      <td className="num" style={{ fontWeight: 700 }}>{Math.round(leg.volume).toLocaleString('en-GB')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <MethodologyPanel color={C.blue} keys={['dynamicPcuBySite', 'hourlyProfile24', 'compositionBySite', 'vision2040']} />
        </>
      )}
    </div>
  );
}

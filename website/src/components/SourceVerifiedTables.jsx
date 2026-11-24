import React, { useState } from 'react';
import PageControls, { downloadJsonFile, downloadTextFile } from './PageControls';
import MethodologyPanel from './MethodologyPanel';
import useTrafficStats from '../lib/useTrafficStats';
import { REAL_SITES, VISION_2040_YEARS, projectToYear } from '../lib/trafficStats';

const C = {
  blue: '#0071E3',
  green: '#16A34A',
  amber: '#D97706',
  red: '#DC2626',
  purple: '#7C3AED',
  teal: '#0D9488',
  ink: '#0F172A',
  sub: '#475569',
  canvas: '#F5F5F7',
  card: '#FFFFFF',
  line: '#E2E8F0',
};

const CLASSES = [
  ['Motorcycles', 'Motorcycles (Boda-Boda)'],
  ['PassengerTricycle', 'Passenger Tricycles'],
  ['CargoTricycle', 'Cargo Tricycles'],
  ['CarsTaxi', 'Cars and Taxis'],
  ['OtherMotorized', 'Other Motorised'],
];

const SITE_CORRIDOR_META = {
  Kibuye: { urbanCentre: 'Kibuye Urban Centre', corridors: 'Entebbe Road, Masaka Road, Makindye Road' },
  Wandegeya: { urbanCentre: 'Wandegeya Urban Centre', corridors: 'Bombo Road, Yusuf Lule Road, Makerere Hill Road' },
  Bakuli: { urbanCentre: 'Bakuli Urban Centre', corridors: 'Hoima Road Corridor' },
  Bwaise: { urbanCentre: 'Bwaise Urban Centre', corridors: 'Bombo Road (Kampala-Gulu Hwy), Mumbule Road' },
  Natete: { urbanCentre: 'Natete Urban Centre', corridors: 'Masaka Road, Mityana Road, Northern Bypass' },
};

const ALL_VEHICLE_CLASSES = [
  ['Carts', 'Handcarts & Animal Carts'],
  ['Bicycles', 'Bicycles'],
  ['Motorcycles', 'Motorcycles (Boda-Boda)'],
  ['PassengerTricycle', 'Passenger Tricycles'],
  ['CargoTricycle', 'Cargo Tricycles'],
  ['CarsTaxi', 'Cars & Taxis'],
  ['LightGoods', 'Light Goods Vehicles'],
  ['MinibusMatatu', 'Minibuses (Matatu)'],
  ['Coaster', 'Coasters'],
  ['Bus', 'Buses'],
  ['LightTruck', 'Light Trucks'],
  ['HeavyTruck', 'Heavy Trucks'],
  ['Trailer', 'Trailers'],
];

const fmt = (value, digits = 0) => Number(value).toLocaleString('en-GB', {
  minimumFractionDigits: digits,
  maximumFractionDigits: digits,
});

const itmCsv = (stats) => {
  const header = [
    'Urban Centre', 'Study Site', 'Primary Corridors',
    ...ALL_VEHICLE_CLASSES.map(([, label]) => label),
    'Total ITMs', 'Grand Total Traffic', 'ITM Share (%)',
  ];
  const rows = REAL_SITES.map((site) => {
    const rec = stats.reconciliationBySite[site] || {};
    const meta = SITE_CORRIDOR_META[site] || { urbanCentre: site, corridors: 'Urban Corridor' };
    const totalItm = (rec.Carts || 0) + (rec.Bicycles || 0) + (rec.Motorcycles || 0) + (rec.PassengerTricycle || 0) + (rec.CargoTricycle || 0);
    const grandTotal = ALL_VEHICLE_CLASSES.reduce((s, [k]) => s + (rec[k] || 0), 0);
    return [
      meta.urbanCentre, site, meta.corridors,
      ...ALL_VEHICLE_CLASSES.map(([k]) => rec[k] || 0),
      totalItm, grandTotal, grandTotal ? ((totalItm / grandTotal) * 100).toFixed(2) : '0.00',
    ].map((value) => `"${String(value).replaceAll('"', '""')}"`).join(',');
  });
  return [header.join(','), ...rows].join('\n');
};

const csv = (stats) => {
  const header = [
    'Study Site', 'Junction Type', 'Motorised Vehicles (2026)', 'Passenger Tricycles',
    'Cargo Tricycles', 'Total Tricycles', 'Tricycle Share (%)',
    'Passenger Dynamic PCU', 'Cargo Dynamic PCU', 'Combined Dynamic PCU',
    'Projected Motorised (2040)', 'Projected Tricycles (2040)',
  ];
  const rows = REAL_SITES.map((site) => {
    const result = stats.resultsBySite[site];
    const pcu = stats.dynamicPcuBySite[site];
    return [
      site, result.junctionType, result.motorizedVehicles, result.passengerTri,
      result.cargoTri, result.totalTri, result.tricycleShare * 100,
      pcu.passengerDynamicPCU, pcu.cargoDynamicPCU, pcu.combinedDynamicPCU,
      Math.round(projectToYear(result.motorizedVehicles, 2040)),
      Math.round(projectToYear(result.totalTri, 2040)),
    ].map((value) => `"${String(value).replaceAll('"', '""')}"`).join(',');
  });
  return [header.join(','), ...rows].join('\n');
};

export default function SourceVerifiedTables({ goBack, canGoBack } = {}) {
  const stats = useTrafficStats();
  const [siteFilter, setSiteFilter] = useState('All');

  const visibleSites = siteFilter === 'All' ? REAL_SITES : REAL_SITES.filter((s) => s === siteFilter);

  const exportOptions = stats ? [
    { id: 'csv', label: 'Verified Site Summary (CSV)', icon: 'fa-file-csv', hint: 'Five surveyed sites with Vision 2040 projections', action: () => downloadTextFile('tricycle_verified_site_summary.csv', csv(stats)) },
    { id: 'itm-csv', label: 'ITM & Corridor Inventory (CSV)', icon: 'fa-table', hint: 'All 13 decoded vehicle & ITM classes per corridor', action: () => downloadTextFile('itm_corridor_mobility_inventory.csv', itmCsv(stats)) },
    { id: 'json', label: 'Full Computed Dataset (JSON)', icon: 'fa-file-code', hint: 'Source-reconciled statistics', action: () => downloadJsonFile('tricycle_verified_statistics.json', stats) },
    { id: 'print', label: 'Print / Save as PDF', icon: 'fa-print', hint: 'Opens the browser print dialog', action: () => window.print() },
  ] : [];

  return (
    <div className="verified-page">
      <style>{`
        .verified-page { max-width: 1440px; margin: 0 auto; padding: 20px 18px 72px; color: ${C.ink}; font-family: var(--font-sans); }
        .verified-hero { margin: 14px 0 24px; }
        .verified-hero h1 { font-size: clamp(1.9rem, 3.6vw, 2.8rem); margin: 8px 0 10px; letter-spacing: -0.025em; color: ${C.ink}; }
        .verified-hero p { color: ${C.sub}; max-width: 860px; line-height: 1.55; margin: 0; }
        .verified-note { background: rgba(217, 119, 6, 0.08); border: 1px solid rgba(217, 119, 6, 0.30); border-radius: 14px; padding: 14px 16px; color: ${C.ink}; margin-bottom: 20px; line-height: 1.55; font-size: 0.9rem; }
        .verified-card { background: ${C.card}; border: 1px solid ${C.line}; border-radius: 20px; padding: 22px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(15,23,42,0.05), 0 10px 24px -12px rgba(15,23,42,0.08); }
        .verified-card h2 { margin: 0 0 6px; font-size: 1.22rem; color: ${C.ink}; }
        .verified-card p { color: ${C.sub}; margin: 0 0 16px; line-height: 1.5; font-size: 0.9rem; }
        .verified-scroll { overflow-x: auto; }
        .verified-table { border-collapse: collapse; width: 100%; min-width: 860px; font-size: 0.86rem; }
        .verified-table th, .verified-table td { padding: 11px 12px; border-bottom: 1px solid ${C.line}; text-align: right; white-space: nowrap; color: ${C.ink}; }
        .verified-table th { color: ${C.sub}; font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.03em; background: ${C.canvas}; font-weight: 700; }
        .verified-table th:first-child, .verified-table td:first-child, .verified-table th:nth-child(2), .verified-table td:nth-child(2) { text-align: left; }
        .verified-table tbody tr:hover { background: #F8FAFC; }
        .verified-pill { display: inline-block; padding: 4px 10px; border-radius: 999px; background: rgba(0, 113, 227, 0.10); color: ${C.blue}; font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; }
        .verified-filter-bar { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 18px; align-items: center; }
        .verified-filter-btn { border: 1px solid ${C.line}; background: ${C.card}; color: ${C.sub}; font-weight: 600; font-size: 0.82rem; padding: 7px 14px; border-radius: 10px; cursor: pointer; transition: all .15s ease; }
        .verified-filter-btn.active { background: ${C.blue}; color: #FFFFFF; border-color: ${C.blue}; }
        .verified-filter-btn:hover:not(.active) { background: ${C.canvas}; color: ${C.ink}; }
      `}</style>
      <PageControls onBack={goBack} canGoBack={canGoBack} exportOptions={exportOptions} />
      <header className="verified-hero">
        <div className="verified-pill">Source verified (02/08/2026 to 03/08/2026)</div>
        <h1>Traffic Summary Tables</h1>
        <p>Complete observed traffic volumes, modelled Dynamic PCU values, and Vision 2040 projections across all five Kampala study sites (07:00 to 19:00 survey window).</p>
      </header>

      <div className="verified-filter-bar" role="group" aria-label="Filter summary tables by study site">
        <span style={{ fontSize: '0.76rem', fontWeight: 700, color: C.sub, textTransform: 'uppercase' }}>Filter Site:</span>
        {['All', ...REAL_SITES].map((s) => (
          <button
            key={s}
            type="button"
            className={`verified-filter-btn ${siteFilter === s ? 'active' : ''}`}
            onClick={() => setSiteFilter(s)}
          >
            {s}
          </button>
        ))}
      </div>

      {!stats ? <p>Computing source-reconciled statistics...</p> : <>
        <div className="verified-note">
          <strong>Evidence boundary:</strong> These tables report only quantities supported by the verified field survey (02/08/2026 to 03/08/2026, 07:00 to 19:00). Modelled Dynamic PCU values and Vision 2040 growth projections are explicitly labelled.
        </div>

        <section className="verified-card">
          <h2>Observed traffic and modelled Dynamic PCU by site</h2>
          <p>Counts are summed from classified hourly directional traffic surveys. Dynamic PCU values use the disclosed demand-pressure model.</p>
          <div className="verified-scroll"><table className="verified-table">
            <thead>
              <tr>
                <th>Study site</th><th>Junction type</th><th>Motorised vehicles</th>
                <th>Passenger tricycles</th><th>Cargo tricycles</th><th>Total tricycles</th>
                <th>Share</th><th>Passenger PCU (modelled)</th><th>Cargo PCU (modelled)</th><th>Combined PCU (modelled)</th>
              </tr>
            </thead>
            <tbody>
              {visibleSites.map((site) => {
                const r = stats.resultsBySite[site];
                const p = stats.dynamicPcuBySite[site];
                return (
                  <tr key={site}>
                    <td style={{ fontWeight: 700 }}>{site}</td>
                    <td>{r.junctionType}</td>
                    <td>{fmt(r.motorizedVehicles)}</td>
                    <td>{fmt(r.passengerTri)}</td>
                    <td>{fmt(r.cargoTri)}</td>
                    <td style={{ fontWeight: 700, color: C.green }}>{fmt(r.totalTri)}</td>
                    <td>{fmt(r.tricycleShare * 100, 2)}%</td>
                    <td>{fmt(p.passengerDynamicPCU, 3)}</td>
                    <td>{fmt(p.cargoDynamicPCU, 3)}</td>
                    <td style={{ fontWeight: 700, color: C.blue }}>{fmt(p.combinedDynamicPCU, 3)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table></div>
        </section>

        <section className="verified-card">
          <h2>Vehicle composition by site</h2>
          <p>Complete percentage composition across all governed motorised vehicle classes.</p>
          <div className="verified-scroll"><table className="verified-table">
            <thead><tr><th>Study site</th>{CLASSES.map(([, label]) => <th key={label}>{label}</th>)}</tr></thead>
            <tbody>
              {visibleSites.map((site) => (
                <tr key={site}>
                  <td style={{ fontWeight: 700 }}>{site}</td>
                  {CLASSES.map(([key]) => <td key={key}>{fmt(stats.compositionBySite[site][key], 2)}%</td>)}
                </tr>
              ))}
            </tbody>
          </table></div>
        </section>

        <section className="verified-card">
          <h2>Time-of-day Dynamic PCU profile (07:00 to 19:00)</h2>
          <p>Modelled Dynamic PCU and tricycle share across the three surveyed time periods.</p>
          <div className="verified-scroll"><table className="verified-table">
            <thead>
              <tr>
                <th>Time period</th><th>Motorised flow</th><th>Total tricycles</th>
                <th>Tricycle share</th><th>Passenger PCU (modelled)</th><th>Cargo PCU (modelled)</th><th>Combined PCU (modelled)</th>
              </tr>
            </thead>
            <tbody>
              {(stats.timePeriods || []).map((period) => {
                const tp = stats.dynamicPcuByTimePeriod[period];
                if (!tp) return null;
                return (
                  <tr key={period}>
                    <td style={{ fontWeight: 700 }}>{period}</td>
                    <td>{fmt(tp.motorizedFlow)}</td>
                    <td>{fmt(tp.tricycleTotal)}</td>
                    <td>{fmt((tp.tricycleTotal / (tp.motorizedFlow || 1)) * 100, 2)}%</td>
                    <td>{fmt(tp.passengerDynamicPCU, 3)}</td>
                    <td>{fmt(tp.cargoDynamicPCU, 3)}</td>
                    <td style={{ fontWeight: 700, color: C.purple }}>{fmt(tp.combinedDynamicPCU, 3)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table></div>
        </section>

        <section className="verified-card">
          <h2>Intermediate Transport Modes (ITMs) &amp; Tricycles Inventory Across Corridors and Urban Centres</h2>
          <p>Disaggregated mobility inventory of non-motorised and intermediate transport modes (handcarts, bicycles, motorcycles, passenger tricycles, and cargo tricycles) across the five surveyed Kampala urban centres and arterial corridors (02/08/2026 to 03/08/2026, 07:00 to 19:00).</p>
          <div className="verified-scroll"><table className="verified-table">
            <thead>
              <tr>
                <th>Urban centre</th><th>Corridors served</th><th>Handcarts &amp; animal carts</th>
                <th>Bicycles</th><th>Motorcycles (Boda-Boda)</th><th>Passenger tricycles</th>
                <th>Cargo tricycles</th><th>Total tricycles</th><th>Total ITMs</th><th>ITM share of total traffic</th>
              </tr>
            </thead>
            <tbody>
              {visibleSites.map((site) => {
                const rec = stats.reconciliationBySite[site] || {};
                const meta = SITE_CORRIDOR_META[site] || { urbanCentre: site, corridors: 'Urban Corridor' };
                const totalTri = (rec.PassengerTricycle || 0) + (rec.CargoTricycle || 0);
                const totalItm = (rec.Carts || 0) + (rec.Bicycles || 0) + (rec.Motorcycles || 0) + totalTri;
                const grandTotal = ALL_VEHICLE_CLASSES.reduce((s, [k]) => s + (rec[k] || 0), 0);
                return (
                  <tr key={site}>
                    <td style={{ fontWeight: 700 }}>{meta.urbanCentre}</td>
                    <td style={{ whiteSpace: 'normal', minWidth: '210px' }}>{meta.corridors}</td>
                    <td>{fmt(rec.Carts || 0)}</td>
                    <td>{fmt(rec.Bicycles || 0)}</td>
                    <td>{fmt(rec.Motorcycles || 0)}</td>
                    <td>{fmt(rec.PassengerTricycle || 0)}</td>
                    <td>{fmt(rec.CargoTricycle || 0)}</td>
                    <td style={{ fontWeight: 700, color: C.green }}>{fmt(totalTri)}</td>
                    <td style={{ fontWeight: 700, color: C.blue }}>{fmt(totalItm)}</td>
                    <td style={{ fontWeight: 700 }}>{fmt(grandTotal ? (totalItm / grandTotal) * 100 : 0, 2)}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table></div>
        </section>

        <section className="verified-card">
          <h2>Complete classified vehicle fleet inventory (all 13 decoded categories)</h2>
          <p>Full multi-modal classified traffic counts including non-motorised transport, ITMs, public transport vehicles, and freight classes.</p>
          <div className="verified-scroll"><table className="verified-table">
            <thead>
              <tr>
                <th>Study site</th>
                <th>Junction type</th>
                {ALL_VEHICLE_CLASSES.map(([key, label]) => <th key={key}>{label}</th>)}
                <th>Grand total</th>
              </tr>
            </thead>
            <tbody>
              {visibleSites.map((site) => {
                const rec = stats.reconciliationBySite[site] || {};
                const res = stats.resultsBySite[site] || {};
                const grandTotal = ALL_VEHICLE_CLASSES.reduce((s, [k]) => s + (rec[k] || 0), 0);
                return (
                  <tr key={site}>
                    <td style={{ fontWeight: 700 }}>{site}</td>
                    <td>{res.junctionType}</td>
                    {ALL_VEHICLE_CLASSES.map(([key]) => <td key={key}>{fmt(rec[key] || 0)}</td>)}
                    <td style={{ fontWeight: 700, color: C.blue }}>{fmt(grandTotal)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table></div>
        </section>

        <section className="verified-card">
          <h2>Vision 2040 Traffic and Tricycle Horizon Projections (2026 to 2040)</h2>
          <p>Compounded urban corridor growth projection (4.5% p.a. baseline scenario) from 2026 observed levels to 2040.</p>
          <div className="verified-scroll"><table className="verified-table">
            <thead>
              <tr>
                <th>Study site</th>
                <th>2026 Base Motorised</th>
                <th>2030 Projected</th>
                <th>2035 Projected</th>
                <th>2040 Vision Horizon</th>
                <th>2026 Tricycles</th>
                <th>2040 Projected Tricycles</th>
              </tr>
            </thead>
            <tbody>
              {visibleSites.map((site) => {
                const r = stats.resultsBySite[site];
                return (
                  <tr key={site}>
                    <td style={{ fontWeight: 700 }}>{site}</td>
                    <td>{fmt(r.motorizedVehicles)}</td>
                    <td>{fmt(Math.round(projectToYear(r.motorizedVehicles, 2030)))}</td>
                    <td>{fmt(Math.round(projectToYear(r.motorizedVehicles, 2035)))}</td>
                    <td style={{ fontWeight: 700, color: C.blue }}>{fmt(Math.round(projectToYear(r.motorizedVehicles, 2040)))}</td>
                    <td>{fmt(r.totalTri)}</td>
                    <td style={{ fontWeight: 700, color: C.teal }}>{fmt(Math.round(projectToYear(r.totalTri, 2040)))}</td>
                  </tr>
                );
              })}
            </tbody>
          </table></div>
        </section>

        <MethodologyPanel color={C.blue} keys={['resultsBySite', 'dynamicPcuBySite', 'dynamicPcuByTimePeriod', 'compositionBySite', 'vision2040']} />
      </>}
    </div>
  );
}

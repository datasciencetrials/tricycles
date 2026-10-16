import React from 'react';
import PageControls, { downloadJsonFile, downloadTextFile } from './PageControls';
import useTrafficStats from '../lib/useTrafficStats';
import { REAL_SITES } from '../lib/trafficStats';

const CLASSES = [
  ['Motorcycles', 'Motorcycles'],
  ['PassengerTricycle', 'Passenger tricycles'],
  ['CargoTricycle', 'Cargo tricycles'],
  ['CarsTaxi', 'Cars and taxis'],
  ['OtherMotorized', 'Other motorised'],
];

const fmt = (value, digits = 0) => Number(value).toLocaleString('en-GB', {
  minimumFractionDigits: digits,
  maximumFractionDigits: digits,
});

const csv = (stats) => {
  const header = [
    'Study Site', 'Junction Type', 'Motorised Vehicles', 'Passenger Tricycles',
    'Cargo Tricycles', 'Total Tricycles', 'Tricycle Share (%)',
    'Passenger Dynamic PCU', 'Cargo Dynamic PCU', 'Combined Dynamic PCU',
  ];
  const rows = REAL_SITES.map((site) => {
    const result = stats.resultsBySite[site];
    const pcu = stats.dynamicPcuBySite[site];
    return [
      site, result.junctionType, result.motorizedVehicles, result.passengerTri,
      result.cargoTri, result.totalTri, result.tricycleShare * 100,
      pcu.passengerDynamicPCU, pcu.cargoDynamicPCU, pcu.combinedDynamicPCU,
    ].map((value) => `"${String(value).replaceAll('"', '""')}"`).join(',');
  });
  return [header.join(','), ...rows].join('\n');
};

export default function SourceVerifiedTables({ goBack, canGoBack } = {}) {
  const stats = useTrafficStats();
  const exportOptions = stats ? [
    { id: 'csv', label: 'Verified Site Summary (CSV)', icon: 'fa-file-csv', hint: 'Four surveyed sites', action: () => downloadTextFile('tricycle_verified_site_summary.csv', csv(stats)) },
    { id: 'json', label: 'Full Computed Dataset (JSON)', icon: 'fa-file-code', hint: 'Source-reconciled statistics', action: () => downloadJsonFile('tricycle_verified_statistics.json', stats) },
    { id: 'print', label: 'Print / Save as PDF', icon: 'fa-print', hint: 'Opens the browser print dialog', action: () => window.print() },
  ] : [];

  return (
    <div className="verified-page">
      <style>{`
        .verified-page { max-width: 1440px; margin: 0 auto; padding: 28px 18px 72px; color: #1d1d1f; }
        .verified-hero { margin: 18px 0 28px; }
        .verified-hero h1 { font-size: clamp(2rem, 4vw, 3rem); margin: 0 0 10px; letter-spacing: -.03em; }
        .verified-hero p { color: #6e6e73; max-width: 860px; line-height: 1.6; }
        .verified-note { background: #fff8e8; border: 1px solid #f2cf7a; border-radius: 14px; padding: 14px 16px; color: #6a4b00; margin-bottom: 22px; line-height: 1.55; }
        .verified-card { background: #fff; border: 1px solid rgba(0,0,0,.07); border-radius: 18px; padding: 20px; margin-bottom: 20px; box-shadow: 0 12px 28px -20px rgba(0,0,0,.25); }
        .verified-card h2 { margin: 0 0 6px; font-size: 1.25rem; }
        .verified-card p { color: #6e6e73; margin: 0 0 16px; line-height: 1.5; }
        .verified-scroll { overflow-x: auto; }
        .verified-table { border-collapse: collapse; width: 100%; min-width: 900px; font-size: .86rem; }
        .verified-table th, .verified-table td { padding: 11px 12px; border-bottom: 1px solid #e8e8ed; text-align: right; white-space: nowrap; }
        .verified-table th { color: #6e6e73; font-size: .72rem; text-transform: uppercase; letter-spacing: .03em; background: #f5f5f7; }
        .verified-table th:first-child, .verified-table td:first-child, .verified-table th:nth-child(2), .verified-table td:nth-child(2) { text-align: left; }
        .verified-table tbody tr:hover { background: #fafafa; }
        .verified-pill { display: inline-block; padding: 4px 8px; border-radius: 999px; background: #eaf5ff; color: #0067b9; font-size: .72rem; font-weight: 700; }
      `}</style>
      <PageControls onBack={goBack} canGoBack={canGoBack} exportOptions={exportOptions} />
      <header className="verified-hero">
        <div className="verified-pill">Source verified</div>
        <h1>Traffic Summary Tables</h1>
        <p>Complete results for the four sites supported by the governed source files. Natete is not included because no source observations are present.</p>
      </header>
      {!stats ? <p>Computing source-reconciled statistics...</p> : <>
        <div className="verified-note"><strong>Evidence boundary:</strong> these tables do not report headway, capacity, V/C ratio, weather significance, weekday or weekend comparisons, or monthly trends because those fields are not present in the governed source data.</div>
        <section className="verified-card">
          <h2>Observed traffic and dynamic PCU by site</h2>
          <p>Counts come from 984 classified movement records. Dynamic PCU values use the disclosed demand-pressure model and are explicitly modelled.</p>
          <div className="verified-scroll"><table className="verified-table">
            <thead><tr><th>Study site</th><th>Junction type</th><th>Motorised vehicles</th><th>Passenger tricycles</th><th>Cargo tricycles</th><th>Total tricycles</th><th>Share</th><th>Passenger PCU, modelled</th><th>Cargo PCU, modelled</th><th>Combined PCU, modelled</th></tr></thead>
            <tbody>{REAL_SITES.map((site) => { const r = stats.resultsBySite[site]; const p = stats.dynamicPcuBySite[site]; return <tr key={site}><td>{site}</td><td>{r.junctionType}</td><td>{fmt(r.motorizedVehicles)}</td><td>{fmt(r.passengerTri)}</td><td>{fmt(r.cargoTri)}</td><td>{fmt(r.totalTri)}</td><td>{fmt(r.tricycleShare * 100, 1)}%</td><td>{fmt(p.passengerDynamicPCU, 3)}</td><td>{fmt(p.cargoDynamicPCU, 3)}</td><td>{fmt(p.combinedDynamicPCU, 3)}</td></tr>; })}</tbody>
          </table></div>
        </section>
        <section className="verified-card">
          <h2>Vehicle composition by site</h2>
          <p>Complete percentage composition across all governed vehicle classes.</p>
          <div className="verified-scroll"><table className="verified-table">
            <thead><tr><th>Study site</th>{CLASSES.map(([, label]) => <th key={label}>{label}</th>)}</tr></thead>
            <tbody>{REAL_SITES.map((site) => <tr key={site}><td>{site}</td>{CLASSES.map(([key]) => <td key={key}>{fmt(stats.compositionBySite[site][key], 1)}%</td>)}</tr>)}</tbody>
          </table></div>
        </section>
      </>}
    </div>
  );
}

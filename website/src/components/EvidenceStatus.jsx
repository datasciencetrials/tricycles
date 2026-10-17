import React from 'react';
import PageControls, { downloadJsonFile } from './PageControls';
import useTrafficStats from '../lib/useTrafficStats';
import {
  DATA_SOURCES,
  FORMULAS,
  GOVERNED_CATEGORICAL_FIELDS,
  GOVERNED_CATEGORICAL_LABELS,
  REAL_SITES,
} from '../lib/trafficStats';

const fmt = (value, digits = 0) => Number(value).toLocaleString('en-GB', {
  minimumFractionDigits: digits,
  maximumFractionDigits: digits,
});
const pFmt = (p) => p < 0.001 ? 'p < 0.001' : `p = ${p.toFixed(3)}`;

export default function EvidenceStatus({ goBack, canGoBack } = {}) {
  const stats = useTrafficStats();
  const exports = stats ? [
    { id: 'json', label: 'Verified Evidence (JSON)', icon: 'fa-file-code', hint: 'Computed statistics and source register', action: () => downloadJsonFile('tricycle_thesis_verified_evidence.json', { stats, sources: DATA_SOURCES, formulas: FORMULAS }) },
    { id: 'print', label: 'Print / Save as PDF', icon: 'fa-print', hint: 'Opens the browser print dialog', action: () => window.print() },
  ] : [];

  return (
    <div className="evidence-status">
      <style>{`
        .evidence-status { max-width: 1180px; margin: 0 auto; padding: 28px 18px 80px; color: #1d1d1f; }
        .evidence-hero, .evidence-panel { background: #fff; border: 1px solid rgba(0,0,0,.08); border-radius: 22px; padding: clamp(24px, 5vw, 46px); box-shadow: 0 18px 45px -34px rgba(0,0,0,.35); margin: 24px 0; }
        .evidence-badge { display: inline-block; background: #e8f5ff; color: #0067b9; border-radius: 999px; padding: 5px 10px; font-size: .72rem; font-weight: 800; text-transform: uppercase; letter-spacing: .04em; }
        .evidence-hero h1 { color: #1d1d1f; font-size: clamp(2rem, 4vw, 3.2rem); letter-spacing: -.035em; margin: 18px 0 12px; }
        .evidence-hero p, .evidence-panel p, .evidence-panel li { color: #5f6065; line-height: 1.65; }
        .evidence-panel h2 { color: #1d1d1f; margin: 0 0 8px; font-size: 1.45rem; }
        .evidence-warning { background: #fff5dc; border: 1px solid #ebc66f; color: #684900; border-radius: 14px; padding: 14px 16px; line-height: 1.55; }
        .evidence-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 14px; margin-top: 18px; }
        .evidence-stat { background: #f5f5f7; border-radius: 14px; padding: 16px; }
        .evidence-stat span { display: block; color: #6e6e73; font-size: .72rem; text-transform: uppercase; font-weight: 800; letter-spacing: .03em; }
        .evidence-stat strong { display: block; font-size: 1.15rem; margin-top: 6px; }
        .evidence-stat small { display: block; color: #6e6e73; margin-top: 5px; }
        .evidence-scroll { overflow-x: auto; margin-top: 16px; }
        .evidence-table { border-collapse: collapse; width: 100%; min-width: 760px; font-size: .86rem; }
        .evidence-table th, .evidence-table td { padding: 11px 12px; border-bottom: 1px solid #e5e5ea; text-align: right; white-space: nowrap; }
        .evidence-table th { background: #f5f5f7; color: #6e6e73; font-size: .7rem; text-transform: uppercase; letter-spacing: .03em; }
        .evidence-table th:first-child, .evidence-table td:first-child { text-align: left; }
        .evidence-table caption { text-align: left; color: #1d1d1f; font-weight: 800; padding: 0 0 10px; }
        .evidence-breakdown { border: 1px solid #e5e5ea; border-radius: 14px; padding: 0 16px; margin-top: 12px; background: #fff; }
        .evidence-breakdown summary { cursor: pointer; padding: 15px 0; color: #1d1d1f; font-weight: 800; }
        .evidence-breakdown[open] summary { border-bottom: 1px solid #e5e5ea; }
        .source-register { display: grid; gap: 12px; margin-top: 16px; }
        .source-item { border-left: 4px solid #0a84ff; background: #f7fbff; border-radius: 0 12px 12px 0; padding: 13px 15px; }
        .source-item strong { display: block; margin-bottom: 4px; }
        .source-item p { margin: 0; font-size: .86rem; }
      `}</style>
      <PageControls onBack={goBack} canGoBack={canGoBack} exportOptions={exports} />
      <header className="evidence-hero">
        <span className="evidence-badge">Source-verified extract</span>
        <h1>Tricycle PCU Research Evidence</h1>
        <p>This page restores only thesis evidence that can be reproduced from the governed browser data. It is an evidence extract, not the unreconciled earlier thesis. Measured observations, modelled PCU values and unavailable analyses are labelled separately.</p>
      </header>
      {!stats ? <section className="evidence-panel"><p>Computing source-reconciled evidence...</p></section> : <>
        <section className="evidence-panel">
          <h2>1. Governed study population</h2>
          <p>The governed traffic-count population covers all five Kampala study sites. Each site contributes 24 site-hour rows; Natete contributes 288 underlying movement records.</p>
          <div className="evidence-grid">
            <div className="evidence-stat"><span>Movement records</span><strong>{fmt(stats.rawMovementCount)}</strong></div>
            <div className="evidence-stat"><span>Site-hour rows</span><strong>{fmt(stats.siteHourCount)}</strong></div>
            <div className="evidence-stat"><span>Observed sites</span><strong>{REAL_SITES.length}</strong></div>
            <div className="evidence-stat"><span>Incident records</span><strong>{fmt(stats.incidentN)}</strong></div>
          </div>
          <div className="evidence-scroll"><table className="evidence-table">
            <caption>Table 1: Governed Study Population by Site</caption>
            <thead><tr><th>Study site</th><th>Junction type</th><th>Motorised vehicles</th><th>Passenger tricycles</th><th>Cargo tricycles</th><th>Total tricycles</th><th>Tricycle share</th></tr></thead>
            <tbody>{REAL_SITES.map((site) => { const row = stats.resultsBySite[site]; return <tr key={site}><td>{site}</td><td>{row.junctionType}</td><td>{fmt(row.motorizedVehicles)}</td><td>{fmt(row.passengerTri)}</td><td>{fmt(row.cargoTri)}</td><td>{fmt(row.totalTri)}</td><td>{fmt(row.tricycleShare * 100, 1)}%</td></tr>; })}</tbody>
          </table></div>
        </section>

        <section className="evidence-panel">
          <h2>2. Modelled passenger and cargo tricycle PCU</h2>
          <p>Dynamic PCU is modelled from the governed site-hour data using the disclosed demand-pressure method. These are not directly measured PCU observations.</p>
          <div className="evidence-scroll"><table className="evidence-table">
            <caption>Table 2: Modelled Tricycle PCU by Site</caption>
            <thead><tr><th>Study site</th><th>Mean demand pressure</th><th>Peak demand pressure</th><th>Passenger PCU, modelled</th><th>Cargo PCU, modelled</th><th>Combined PCU, modelled</th></tr></thead>
            <tbody>{REAL_SITES.map((site) => { const row = stats.dynamicPcuBySite[site]; return <tr key={site}><td>{site}</td><td>{fmt(row.meanDemandPressure, 3)}</td><td>{fmt(row.peakDemandPressure, 3)}</td><td>{fmt(row.passengerDynamicPCU, 3)}</td><td>{fmt(row.cargoDynamicPCU, 3)}</td><td>{fmt(row.combinedDynamicPCU, 3)}</td></tr>; })}</tbody>
          </table></div>
          <p><strong>Method:</strong> {FORMULAS.dynamicPcuBySite.formula}</p>
        </section>

        <section className="evidence-panel">
          <h2>3. Reproducible statistical findings</h2>
          <div className="evidence-grid">
            <div className="evidence-stat"><span>Site ANOVA</span><strong>F({stats.tricycleSiteAnova.df1}, {stats.tricycleSiteAnova.df2}) = {fmt(stats.tricycleSiteAnova.F, 3)}</strong><small>{pFmt(stats.tricycleSiteAnova.p)}</small></div>
            <div className="evidence-stat"><span>Site robustness check</span><strong>H({stats.tricycleSiteKruskalWallis.df}) = {fmt(stats.tricycleSiteKruskalWallis.H, 3)}</strong><small>{pFmt(stats.tricycleSiteKruskalWallis.p)}</small></div>
            <div className="evidence-stat"><span>Period ANOVA</span><strong>F({stats.tricyclePeriodAnova.df1}, {stats.tricyclePeriodAnova.df2}) = {fmt(stats.tricyclePeriodAnova.F, 3)}</strong><small>{pFmt(stats.tricyclePeriodAnova.p)}</small></div>
            <div className="evidence-stat"><span>Period robustness check</span><strong>H({stats.tricyclePeriodKruskalWallis.df}) = {fmt(stats.tricyclePeriodKruskalWallis.H, 3)}</strong><small>{pFmt(stats.tricyclePeriodKruskalWallis.p)}</small></div>
            <div className="evidence-stat"><span>Flow and tricycle correlation</span><strong>r = {fmt(stats.flowTricycleCorrelation.r, 3)}</strong><small>{pFmt(stats.flowTricycleCorrelation.p)}, n = {stats.flowTricycleCorrelation.n}</small></div>
            <div className="evidence-stat"><span>Incident type and severity</span><strong>χ²({stats.incidentChiSquare.df}) = {fmt(stats.incidentChiSquare.chi2, 1)}</strong><small>{pFmt(stats.incidentChiSquare.p)}, n = {stats.incidentN}</small></div>
          </div>
          <p>Interpretations remain bounded to the available records. These tests do not establish causality, capacity effects or network-wide representativeness.</p>
        </section>

        <section className="evidence-panel">
          <h2>4. Complete measured traffic breakdowns</h2>
          <p>Every category present in the governed traffic-count population is shown below. No Top-N selection or category suppression is applied. Blank direction labels are retained as Not recorded. These tables contain measured traffic totals only; the modelled PCU results remain separate in Section 2.</p>
          <div className="evidence-scroll"><table className="evidence-table">
            <caption>Table 4.1: Complete Annual Traffic Trend</caption>
            <thead><tr><th>Year</th><th>Records</th><th>Motorised vehicles</th><th>Passenger tricycles</th><th>Cargo tricycles</th><th>Total tricycles</th></tr></thead>
            <tbody>{stats.measuredAnnualTrend.map((row) => <tr key={row.period}><td>{row.period}</td><td>{fmt(row.records)}</td><td>{fmt(row.motorizedVehicles)}</td><td>{fmt(row.passengerTri)}</td><td>{fmt(row.cargoTri)}</td><td>{fmt(row.totalTri)}</td></tr>)}</tbody>
          </table></div>
          <div className="evidence-scroll"><table className="evidence-table">
            <caption>Table 4.2: Complete Monthly Traffic Trend</caption>
            <thead><tr><th>Month</th><th>Records</th><th>Motorised vehicles</th><th>Passenger tricycles</th><th>Cargo tricycles</th><th>Total tricycles</th></tr></thead>
            <tbody>{stats.measuredMonthlyTrend.map((row) => <tr key={row.period}><td>{row.period}</td><td>{fmt(row.records)}</td><td>{fmt(row.motorizedVehicles)}</td><td>{fmt(row.passengerTri)}</td><td>{fmt(row.cargoTri)}</td><td>{fmt(row.totalTri)}</td></tr>)}</tbody>
          </table></div>
          {GOVERNED_CATEGORICAL_FIELDS.map((field, fieldIndex) => {
            const rows = stats.measuredTrafficBreakdowns[field];
            return <details className="evidence-breakdown" key={field} open={field === 'Site'}>
              <summary>{GOVERNED_CATEGORICAL_LABELS[field]} ({rows.length} categories)</summary>
              <div className="evidence-scroll"><table className="evidence-table">
                <caption>Table 4.{fieldIndex + 3}: Complete Traffic Breakdown by {GOVERNED_CATEGORICAL_LABELS[field]}</caption>
                <thead><tr><th>{GOVERNED_CATEGORICAL_LABELS[field]}</th><th>Records</th><th>Motorised vehicles</th><th>Passenger tricycles</th><th>Cargo tricycles</th><th>Total tricycles</th><th>Tricycle share</th></tr></thead>
                <tbody>{rows.map((row) => <tr key={row.category}><td>{row.category}</td><td>{fmt(row.records)}</td><td>{fmt(row.motorizedVehicles)}</td><td>{fmt(row.passengerTri)}</td><td>{fmt(row.cargoTri)}</td><td>{fmt(row.totalTri)}</td><td>{fmt(row.tricycleShare * 100, 1)}%</td></tr>)}</tbody>
              </table></div>
            </details>;
          })}
          <p>The governed traffic records cover August 2026 only. Therefore the complete annual and monthly trends each contain one observed period. No additional months or years are inferred.</p>
        </section>

        <section className="evidence-panel">
          <h2>5. Explicit evidence boundary</h2>
          <div className="evidence-warning"><strong>Not reported as findings:</strong> headway, capacity, V/C ratio, wet-weather significance, weekday versus weekend comparisons, change across multiple months or years, and measured overnight demand. The governed files do not contain the observations required for those analyses.</div>
          <p>The optional 19:00 to 06:00 profile shown in Analytics is a disclosed mathematical connector only. It is not measured traffic and is visually distinguished from the observed 07:00 to 18:00 segment.</p>
        </section>

        <section className="evidence-panel">
          <h2>6. Source register</h2>
          <div className="source-register">
            {Object.entries(DATA_SOURCES).map(([key, description]) => <div className="source-item" key={key}><strong>{key}</strong><p>{description}</p></div>)}
          </div>
        </section>
      </>}
    </div>
  );
}

import React, { useState } from 'react';
import { FORMULAS, DATA_SOURCES } from '../lib/trafficStats';

// Collapsible panel listing the exact formula, data source, and sample size
// behind every dynamically-computed figure on the tab it's placed in.
// `keys` selects which FORMULAS entries are relevant to that tab.
const MethodologyPanel = ({ keys, color = '#0071e3' }) => {
  const [open, setOpen] = useState(false);
  const sourcesUsed = [...new Set(keys.map((k) => FORMULAS[k]?.source).filter(Boolean))];

  return (
    <div className="a-card s-12 a-methodology">
      <button
        type="button"
        className="a-methodology-toggle"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span>
          <i className="fa-solid fa-square-root-variable" style={{ color, marginRight: '10px' }}></i>
          Methodology &amp; Formulas — how every figure on this page is calculated
        </span>
        <i className={`fa-solid fa-chevron-${open ? 'up' : 'down'}`}></i>
      </button>
      {open && (
        <div className="a-methodology-body">
          <p className="a-sub" style={{ marginBottom: '14px' }}>
            Every number on this page is computed live in your browser from real field data shipped with the
            site (not hand-typed) — reload the page and it recomputes from scratch. Two source datasets are
            used; a figure's row below states which one.
          </p>
          <div className="a-methodology-sources">
            {sourcesUsed.map((s) => (
              <div key={s} className="a-methodology-source">
                <span className="a-methodology-source-tag">{s}</span> {DATA_SOURCES[s]}
              </div>
            ))}
          </div>
          <div className="a-table-wrap" style={{ marginTop: '14px' }}>
            <table className="a-methodology-table">
              <thead>
                <tr><th>Figure</th><th>Formula</th><th>Source</th><th>Sample size</th></tr>
              </thead>
              <tbody>
                {keys.map((k) => {
                  const f = FORMULAS[k];
                  if (!f) return null;
                  return (
                    <tr key={k}>
                      <td className="a-methodology-key">{k}</td>
                      <td>{f.formula}</td>
                      <td><span className="a-methodology-source-tag">{f.source}</span></td>
                      <td>{f.n}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MethodologyPanel;

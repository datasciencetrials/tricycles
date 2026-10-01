import React, { useState, useMemo } from 'react';

const trafficData = [
  {
    junction: "Wandegeya Junction",
    mc: 4520, tc: 1245, pc: 2130, ps: 610, lgv: 180, hgv: 95, nmt: 850
  },
  {
    junction: "Kibuye Roundabout",
    mc: 3850, tc: 1105, pc: 1980, ps: 720, lgv: 240, hgv: 130, nmt: 610
  },
  {
    junction: "Bakuli Intersection",
    mc: 2940, tc: 980, pc: 1450, ps: 890, lgv: 150, hgv: 85, nmt: 540
  },
  {
    junction: "Bwaise Junction",
    mc: 2100, tc: 860, pc: 920, ps: 450, lgv: 110, hgv: 160, nmt: 420
  },
  {
    junction: "Natete Junction",
    mc: 3410, tc: 1050, pc: 1260, ps: 1150, lgv: 190, hgv: 110, nmt: 710
  }
];

const COLUMNS = [
  { key: 'junction', label: 'Study Site', type: 'text' },
  { key: 'mc', label: 'Motorcycles (MC)' },
  { key: 'tc', label: 'Tricycles (TC)' },
  { key: 'pc', label: 'Passenger Cars (PC)' },
  { key: 'ps', label: 'Minibuses (PSV)' },
  { key: 'lgv', label: 'Light Goods Vehicles (LGV)' },
  { key: 'hgv', label: 'Heavy Goods Vehicles (HGV)' },
  { key: 'total', label: 'Total Motorized (Veh/Hr)' },
];

function withTotal(row) {
  return { ...row, total: row.mc + row.tc + row.pc + row.ps + row.lgv + row.hgv };
}

function downloadCsv(rows) {
  const header = COLUMNS.map(c => c.label).join(',');
  const lines = rows.map(r => COLUMNS.map(c => {
    const v = r[c.key];
    return c.type === 'text' ? `"${v}"` : v;
  }).join(','));
  const totals = ['Network Total', 'mc', 'tc', 'pc', 'ps', 'lgv', 'hgv', 'total']
    .map((k, i) => {
      if (i === 0) return '"Network Total"';
      return rows.reduce((acc, r) => acc + r[k], 0);
    }).join(',');
  const csv = [header, ...lines, totals].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'tricycle_pcu_traffic_volumes.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

const SummaryTables = () => {
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState('desc');

  const rows = useMemo(() => trafficData.map(withTotal), []);

  const sortedRows = useMemo(() => {
    if (!sortKey) return rows;
    const copy = [...rows];
    copy.sort((a, b) => {
      const av = a[sortKey], bv = b[sortKey];
      if (typeof av === 'string') {
        return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
      }
      return sortDir === 'asc' ? av - bv : bv - av;
    });
    return copy;
  }, [rows, sortKey, sortDir]);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir(d => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  };

  const totals = COLUMNS.slice(1).reduce((acc, c) => {
    acc[c.key] = rows.reduce((sum, r) => sum + r[c.key], 0);
    return acc;
  }, {});

  return (
    <div className="workspace-grid">
      <div className="col-span-12" style={{ textAlign: 'center', marginBottom: '8px' }}>
        <p className="nexus-eyebrow">Field Data Aggregation</p>
        <h2 className="text-primary" style={{ fontSize: '2.25rem' }}>Primary Traffic Volumes</h2>
        <p className="text-muted">Peak-hour categorized vehicle counts (veh/hr) by study site</p>
      </div>
        
      <div className="glass-card col-span-12">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ border: 'none', paddingBottom: 0, marginBottom: '4px' }}>Empirical Flow Classification</h3>
            <p className="text-muted" style={{ fontSize: '0.85rem' }}>
              Sample size N = 6,400 fifteen-minute intervals across all primary study sites &mdash; click a column to sort
            </p>
          </div>
          <button className="btn" onClick={() => downloadCsv(rows)}>
            <i className="fa-solid fa-download" style={{marginRight: '8px'}}></i>Export CSV
          </button>
        </div>
        
        <div style={{ overflowX: 'auto' }}>
          <table className="heatmap-table" style={{ width: '100%', textAlign: 'right' }}>
            <thead>
              <tr>
                {COLUMNS.map(col => (
                  <th
                    key={col.key}
                    className="sortable-th"
                    onClick={() => handleSort(col.key)}
                    style={col.type === 'text'
                      ? { textAlign: 'left', color: 'var(--accent-2)' }
                      : col.key === 'tc' ? { color: 'var(--positive)' } : undefined}
                  >
                    {col.label}
                    {sortKey === col.key && (
                      <span className="sort-arrow">{sortDir === 'asc' ? '▲' : '▼'}</span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedRows.map((row, idx) => (
                <tr key={idx}>
                  <td style={{ textAlign: 'left', fontWeight: '600', borderLeft: '3px solid var(--accent)' }}>{row.junction}</td>
                  <td>{row.mc.toLocaleString()}</td>
                  <td style={{ fontWeight: '600', color: 'var(--positive)', background: 'var(--positive-soft)' }}>{row.tc.toLocaleString()}</td>
                  <td>{row.pc.toLocaleString()}</td>
                  <td>{row.ps.toLocaleString()}</td>
                  <td>{row.lgv.toLocaleString()}</td>
                  <td>{row.hgv.toLocaleString()}</td>
                  <td style={{ fontWeight: '600', color: '#fff' }}>{row.total.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ background: 'rgba(255, 255, 255, 0.03)' }}>
                <td style={{ textAlign: 'left', fontWeight: '700' }}>Network Total</td>
                <td style={{ fontWeight: '700', color: '#fff' }}>{totals.mc.toLocaleString()}</td>
                <td style={{ fontWeight: '700', color: 'var(--positive)' }}>{totals.tc.toLocaleString()}</td>
                <td style={{ fontWeight: '700', color: '#fff' }}>{totals.pc.toLocaleString()}</td>
                <td style={{ fontWeight: '700', color: '#fff' }}>{totals.ps.toLocaleString()}</td>
                <td style={{ fontWeight: '700', color: '#fff' }}>{totals.lgv.toLocaleString()}</td>
                <td style={{ fontWeight: '700', color: '#fff' }}>{totals.hgv.toLocaleString()}</td>
                <td style={{ fontWeight: '700', color: 'var(--accent-2)', fontSize: '1.1rem' }}>{totals.total.toLocaleString()}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div className="glass-card col-span-12" style={{ marginTop: '4px' }}>
        <p className="nexus-eyebrow">Non-Motorized Transport</p>
        <h3 style={{ border: 'none', paddingBottom: 0 }}>Vulnerable Road User Intersections</h3>
        <p className="text-muted" style={{ margin: '4px 0 16px' }}>
          Pedestrian and cyclist flows significantly influence tricycle weaving behavior, particularly at Bwaise and Wandegeya.
          The figures below are absolute hourly counts for non-motorized transport (NMT).
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '14px' }}>
          {trafficData.map((row, idx) => (
            <div key={idx} className="stat-box" style={{ borderTop: '2px solid var(--accent)' }}>
              <div className="stat-label" style={{ minHeight: '32px' }}>{row.junction}</div>
              <div className="stat-value" style={{ fontSize: '1.7rem', marginTop: '6px' }}>
                {row.nmt.toLocaleString()}
              </div>
              <div className="stat-label" style={{ fontSize: '0.63rem' }}>Non-Motorized Transport (NMT) / Hour</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default SummaryTables;

import React, { useState, useEffect, useRef } from 'react';
import JSZip from 'jszip';

// ---------------------------------------------------------------------------
// Shared floating top-right control cluster: Back (in-app tab history, not
// browser history - this is a single-page app with no routing, so a literal
// browser-back would just leave the site), scroll-to-Top, and a tab-specific
// Export menu. Used by all four tabs so the interaction feels the same
// everywhere. Fades in once the user has actually scrolled, and collapses to
// a bottom-right cluster on narrow screens so it never fights the (possibly
// multi-row) mobile header for space.
//
// Export is a popover menu (`exportOptions`) rather than a single action, so
// each tab can offer every output format that makes sense for its data:
// CSV, a bundled ZIP of several CSVs, a ZIP of every chart on the page as
// PNG, a raw JSON dump of the computed stats, and print/save-as-PDF.
// ---------------------------------------------------------------------------

export function downloadTextFile(filename, content, mime = 'text/csv;charset=utf-8;') {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadJsonFile(filename, data) {
  downloadTextFile(filename, JSON.stringify(data, null, 2), 'application/json;charset=utf-8;');
}

export function downloadBlobFile(filename, blob) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Bundles several { name, content } CSV files into one ZIP download.
export async function downloadCsvBundle(zipFilename, files) {
  const zip = new JSZip();
  files.forEach(({ name, content }) => zip.file(name, content));
  const blob = await zip.generateAsync({ type: 'blob' });
  downloadBlobFile(zipFilename, blob);
}

// Finds every <canvas> inside `container` (a DOM element or CSS selector,
// defaults to the whole document) that Chart.js has rendered, and bundles
// each as a PNG into a single ZIP. Canvases are matched up with a caption/
// heading via `labelFor` if provided, otherwise numbered in DOM order.
export async function downloadChartsAsZip(zipFilename, { container = document, labelFor } = {}) {
  const root = typeof container === 'string' ? document.querySelector(container) : container;
  if (!root) return { count: 0 };
  const canvases = Array.from(root.querySelectorAll('canvas'));
  if (canvases.length === 0) return { count: 0 };
  const zip = new JSZip();
  const usedNames = new Set();
  canvases.forEach((canvas, i) => {
    let base = (labelFor && labelFor(canvas, i)) || `chart-${i + 1}`;
    base = base.replace(/[^a-z0-9\-_ ]/gi, '').trim().replace(/\s+/g, '_') || `chart-${i + 1}`;
    let name = `${base}.png`;
    let n = 2;
    while (usedNames.has(name)) { name = `${base}_${n}.png`; n += 1; }
    usedNames.add(name);
    try {
      const dataUrl = canvas.toDataURL('image/png');
      const base64 = dataUrl.split(',')[1];
      if (base64) zip.file(name, base64, { base64: true });
    } catch {
      // canvas may be tainted or empty - skip it rather than fail the whole export
    }
  });
  const blob = await zip.generateAsync({ type: 'blob' });
  downloadBlobFile(zipFilename, blob);
  return { count: canvases.length };
}

const ExportMenu = ({ options, closeMenu }) => {
  const [busyId, setBusyId] = useState(null);

  const run = async (opt) => {
    if (busyId) return;
    try {
      setBusyId(opt.id);
      await opt.action();
    } finally {
      setBusyId(null);
      closeMenu();
    }
  };

  return (
    <div className="pg-menu" role="menu" aria-label="Export options">
      {options.map((opt) => (
        <button
          key={opt.id}
          type="button"
          role="menuitem"
          className="pg-menu-item"
          disabled={!!busyId}
          onClick={() => run(opt)}
        >
          <i className={`fa-solid ${busyId === opt.id ? 'fa-circle-notch fa-spin' : opt.icon || 'fa-download'}`} aria-hidden="true"></i>
          <span className="pg-menu-text">
            <span className="pg-menu-label">{opt.label}</span>
            {opt.hint && <span className="pg-menu-hint">{opt.hint}</span>}
          </span>
        </button>
      ))}
    </div>
  );
};

const PageControls = ({ onBack, canGoBack = false, onExport, exportLabel = 'Export CSV', exportOptions }) => {
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const wrapRef = useRef(null);

  // Back-compat: tabs that still pass a single onExport get wrapped into a
  // one-item menu automatically, so nothing else needs to change if a tab
  // is never upgraded to the richer `exportOptions` list.
  const options = exportOptions && exportOptions.length > 0
    ? exportOptions
    : (onExport ? [{ id: 'default', label: exportLabel, icon: 'fa-file-csv', action: onExport }] : null);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 220);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const handleOutside = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setMenuOpen(false);
    };
    const handleKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleKey);
    };
  }, [menuOpen]);

  const scrollToTop = () => {
    const reduceMotion = typeof window !== 'undefined' && window.matchMedia
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <div className={`pg-ctrl${visible ? ' visible' : ''}`} role="toolbar" aria-label="Page navigation and export">
      <style>{`
        .pg-ctrl { position: fixed; top: 92px; right: 22px; display: flex; flex-direction: column; gap: 10px; z-index: 600;
          opacity: 0; transform: translateY(-8px); pointer-events: none; transition: opacity .25s ease, transform .25s ease; }
        .pg-ctrl.visible { opacity: 1; transform: translateY(0); pointer-events: auto; }
        @media (prefers-reduced-motion: reduce) { .pg-ctrl { transition: opacity .01s linear; transform: none; } }
        @media (max-width: 780px) { .pg-ctrl { top: auto; bottom: 22px; right: 16px; flex-direction: column-reverse; } }

        .pg-btn-wrap { position: relative; }

        .pg-btn { position: relative; width: 44px; height: 44px; border-radius: 50%; border: 1px solid #E2E8F0;
          background: rgba(255,255,255,0.95);
          color: #0F172A;
          display: flex; align-items: center; justify-content: center; font-size: 16px; cursor: pointer;
          backdrop-filter: blur(12px); box-shadow: 0 4px 16px rgba(15,23,42,0.10); transition: background .2s ease, transform .2s ease, border-color .2s ease; }
        .pg-btn:hover:not(:disabled) { transform: scale(1.06); background: #FFFFFF; border-color: #CBD5E1; }
        .pg-btn:focus-visible { outline: 2px solid #0071E3; outline-offset: 2px; }
        .pg-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .pg-btn.menu-open { background: #0071E3; color: #FFFFFF; border-color: #0071E3; }

        .pg-tip { position: absolute; right: 54px; top: 50%; transform: translateY(-50%); background: #FFFFFF; color: #0F172A;
          border: 1px solid #E2E8F0; box-shadow: 0 4px 12px rgba(15,23,42,0.10);
          font-size: 0.72rem; font-weight: 600; padding: 5px 10px; border-radius: 8px; white-space: nowrap;
          opacity: 0; pointer-events: none; transition: opacity .15s ease; }
        .pg-btn:hover .pg-tip, .pg-btn:focus-visible .pg-tip { opacity: 1; }
        @media (max-width: 780px) { .pg-tip { right: auto; left: 54px; } }

        .pg-menu { position: absolute; right: 54px; top: 50%; transform: translateY(-50%); min-width: 248px; max-width: 300px;
          background: rgba(255,255,255,0.98); border: 1px solid #E2E8F0; border-radius: 14px; padding: 8px;
          box-shadow: 0 12px 32px rgba(15,23,42,0.14); display: flex; flex-direction: column; gap: 3px;
          animation: pgMenuIn .16s ease; z-index: 700; }
        @keyframes pgMenuIn { from { opacity: 0; transform: translateY(-50%) scale(0.94); } to { opacity: 1; transform: translateY(-50%) scale(1); } }
        @media (max-width: 780px) { .pg-menu { right: auto; left: 54px; } }

        .pg-menu-item { display: flex; align-items: center; gap: 11px; width: 100%; text-align: left; border: none; background: transparent;
          color: #0F172A; padding: 9px 10px; border-radius: 9px; cursor: pointer; font-size: 0.82rem; font-weight: 600;
          font-family: inherit; transition: background .15s ease; }
        .pg-menu-item:hover:not(:disabled) { background: rgba(0,113,227,0.08); }
        .pg-menu-item:disabled { opacity: 0.45; cursor: not-allowed; }
        .pg-menu-item i { width: 18px; text-align: center; flex: 0 0 auto; color: #0071E3; font-size: 0.95rem; }
        .pg-menu-text { display: flex; flex-direction: column; gap: 1px; min-width: 0; }
        .pg-menu-label { line-height: 1.2; color: #0F172A; }
        .pg-menu-hint { font-size: 0.68rem; font-weight: 500; color: #475569; line-height: 1.2; }
        @media print { .pg-ctrl { display: none !important; } }
      `}</style>

      <button type="button" className="pg-btn" aria-label="Back to previous tab" onClick={onBack} disabled={!canGoBack}>
        <i className="fa-solid fa-arrow-left" aria-hidden="true"></i>
        <span className="pg-tip">Back</span>
      </button>

      <button type="button" className="pg-btn" aria-label="Scroll to top" onClick={scrollToTop}>
        <i className="fa-solid fa-arrow-up" aria-hidden="true"></i>
        <span className="pg-tip">Top</span>
      </button>

      {options && (
        <div className="pg-btn-wrap" ref={wrapRef}>
          <button
            type="button"
            className={`pg-btn${menuOpen ? ' menu-open' : ''}`}
            aria-label="Export options"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <i className={`fa-solid ${menuOpen ? 'fa-xmark' : 'fa-download'}`} aria-hidden="true"></i>
            {!menuOpen && <span className="pg-tip">Export</span>}
          </button>
          {menuOpen && <ExportMenu options={options} closeMenu={() => setMenuOpen(false)} />}
        </div>
      )}
    </div>
  );
};

export default PageControls;

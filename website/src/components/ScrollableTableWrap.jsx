import React from 'react';
import useScrollbarThumb from '../lib/useScrollbarThumb';

// ---------------------------------------------------------------------------
// Wraps a wide <table> that needs horizontal scrolling with a custom,
// always-rendered scrollbar thumb -- native ::-webkit-scrollbar styling can
// render invisible on some OS/browser combinations even with an explicit
// color set (confirmed in this site's own headless-Chromium testing). See
// lib/useScrollbarThumb.js for the underlying scroll-ratio computation.
// ---------------------------------------------------------------------------
export default function ScrollableTableWrap({ children }) {
  const [ref, thumb] = useScrollbarThumb('horizontal');
  return (
    <div className="a-table-outer">
      <div className="a-table-wrap" ref={ref}>
        {children}
      </div>
      {thumb && (
        <div className="a-table-scrollbar-track">
          <div className="a-table-scrollbar-thumb" style={{ left: `${thumb.startPct}%`, width: `${thumb.sizePct}%` }} />
        </div>
      )}
    </div>
  );
}

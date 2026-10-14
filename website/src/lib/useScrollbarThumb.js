import { useCallback, useRef, useState } from 'react';

// ---------------------------------------------------------------------------
// A custom, always-rendered scrollbar thumb -- built because native
// ::-webkit-scrollbar styling can render invisible on some OS/browser
// combinations (confirmed in headless Chromium testing for this site) even
// with an explicit color set. Rather than depend on native scrollbar
// rendering at all, this computes real scrollTop/scrollHeight (or
// scrollLeft/scrollWidth) ratios and exposes them as plain percentages a
// component can render as its own track+thumb divs, so the scrollbar is
// guaranteed visible regardless of the viewer's platform.
//
// Implemented as a CALLBACK ref (not a plain useRef + useEffect) on purpose:
// several of this site's scroll containers only mount after an async data
// load (e.g. stats fetched, then a panel renders for the first time), so a
// plain useEffect keyed on a fixed dependency array can run once with the
// ref still null and never re-run once the node actually appears. A
// callback ref fires exactly when React attaches (or detaches) the node,
// however many renders that takes, so setup always happens against a real
// element.
//
// Usage:
//   const [ref, thumb] = useScrollbarThumb('vertical');
//   <div ref={ref} style={{ overflowY: 'auto' }}>...</div>
//   {thumb && <div className="..-track"><div className="..-thumb" style={{
//     top: `${thumb.startPct}%`, height: `${thumb.sizePct}%`,
//   }} /></div>}
// ---------------------------------------------------------------------------
export default function useScrollbarThumb(axis = 'vertical') {
  const [thumb, setThumb] = useState(null);
  const cleanupRef = useRef(null);

  const recompute = useCallback((el) => {
    if (!el) return;
    if (axis === 'horizontal') {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      if (scrollWidth <= clientWidth + 1) { setThumb(null); return; }
      setThumb({ startPct: (scrollLeft / scrollWidth) * 100, sizePct: (clientWidth / scrollWidth) * 100 });
    } else {
      const { scrollTop, scrollHeight, clientHeight } = el;
      if (scrollHeight <= clientHeight + 1) { setThumb(null); return; }
      setThumb({ startPct: (scrollTop / scrollHeight) * 100, sizePct: (clientHeight / scrollHeight) * 100 });
    }
  }, [axis]);

  const ref = useCallback((el) => {
    // Tear down listeners from whatever node this ref was previously
    // attached to (React re-invokes a callback ref with `null` on unmount,
    // and with the new node on any change).
    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
    }
    if (!el) return;

    const onChange = () => recompute(el);
    recompute(el);
    el.addEventListener('scroll', onChange, { passive: true });
    // Catches the container's OWN box changing size (window resize, or a
    // flex/max-height layout settling after first paint).
    const ro = new ResizeObserver(onChange);
    ro.observe(el);
    // Catches the container's CONTENT changing size while the container's
    // own box stays fixed -- e.g. a max-height panel whose content grows
    // once the user picks something, which ResizeObserver on the container
    // alone would never see since the container's rendered size doesn't
    // change at all.
    const mo = new MutationObserver(onChange);
    mo.observe(el, { childList: true, subtree: true, characterData: true });
    window.addEventListener('resize', onChange);

    cleanupRef.current = () => {
      el.removeEventListener('scroll', onChange);
      ro.disconnect();
      mo.disconnect();
      window.removeEventListener('resize', onChange);
    };
  }, [recompute]);

  return [ref, thumb];
}

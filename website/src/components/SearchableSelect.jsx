import React, { useState, useRef, useEffect, useId } from 'react';

// Accessible combobox: every dropdown on the site uses this instead of a
// plain <select> so the option list can always be filtered by typing,
// per the site's "dropdowns should double as search boxes" requirement.
// options: [{ value, label, meta? }]
const SearchableSelect = ({ label, options, value, onChange, placeholder = 'Search…', color = '#0071e3' }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const wrapRef = useRef(null);
  const inputRef = useRef(null);
  const listId = useId();

  const selected = options.find((o) => o.value === value);

  const filtered = query.trim()
    ? options.filter((o) => o.label.toLowerCase().includes(query.trim().toLowerCase()))
    : options;

  useEffect(() => {
    const onDocClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
        setQuery('');
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  const commit = (opt) => {
    onChange(opt.value);
    setOpen(false);
    setQuery('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setOpen(true); setActiveIdx((i) => Math.min(i + 1, filtered.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIdx((i) => Math.max(i - 1, 0)); }
    else if (e.key === 'Enter') { e.preventDefault(); if (filtered[activeIdx]) commit(filtered[activeIdx]); }
    else if (e.key === 'Escape') { setOpen(false); setQuery(''); }
  };

  return (
    <div className="a-ssel" ref={wrapRef}>
      {label && <label className="a-ssel-label" htmlFor={`${listId}-input`}>{label}</label>}
      <div className={`a-ssel-box ${open ? 'open' : ''}`} style={{ borderColor: open ? color : undefined }}>
        <i className="fa-solid fa-magnifying-glass a-ssel-icon" aria-hidden="true"></i>
        <input
          id={`${listId}-input`}
          ref={inputRef}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={`${listId}-list`}
          aria-autocomplete="list"
          className="a-ssel-input"
          placeholder={selected ? selected.label : placeholder}
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); setActiveIdx(0); }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
        />
        {selected && !open && (
          <button type="button" className="a-ssel-clear" aria-label="Clear selection" onClick={(e) => { e.stopPropagation(); onChange(null); }}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        )}
        <i className={`fa-solid fa-chevron-down a-ssel-chev ${open ? 'up' : ''}`} aria-hidden="true"></i>
      </div>
      {open && (
        <ul id={`${listId}-list`} role="listbox" className="a-ssel-list">
          {filtered.length === 0 && <li className="a-ssel-empty">No matches</li>}
          {filtered.map((o, i) => (
            <li
              key={o.value ?? 'all'}
              role="option"
              aria-selected={o.value === value}
              className={`a-ssel-opt ${i === activeIdx ? 'active' : ''} ${o.value === value ? 'selected' : ''}`}
              onMouseEnter={() => setActiveIdx(i)}
              onMouseDown={(e) => { e.preventDefault(); commit(o); }}
            >
              <span>{o.label}</span>
              {o.meta && <span className="a-ssel-meta">{o.meta}</span>}
              {o.value === value && <i className="fa-solid fa-check" style={{ color }}></i>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchableSelect;

// Shared CSS injected once — every tab that renders a SearchableSelect
// includes this same stylesheet string in its own <style> block, so no
// separate import wiring is needed. Kept here so the rules travel with
// the component.
export const searchableSelectCss = `
  .a-ssel { position: relative; width: 100%; }
  .a-ssel-label { display: block; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.03em; color: #6e6e73; margin-bottom: 6px; }
  .a-ssel-box { display: flex; align-items: center; gap: 8px; background: #fff; border: 1.5px solid rgba(0,0,0,0.1); border-radius: 12px; padding: 9px 12px; transition: border-color .15s ease, box-shadow .15s ease; }
  .a-ssel-box.open { box-shadow: 0 0 0 4px rgba(0,113,227,0.12); }
  .a-ssel-icon { color: #9a9a9e; font-size: 12px; flex-shrink: 0; }
  .a-ssel-input { flex: 1; border: none; outline: none; font: inherit; font-size: 0.85rem; font-weight: 600; color: #1d1d1f; background: transparent; min-width: 0; }
  .a-ssel-input::placeholder { color: #1d1d1f; font-weight: 600; opacity: 1; }
  .a-ssel-clear, .a-ssel-chev { background: none; border: none; color: #9a9a9e; font-size: 11px; cursor: pointer; flex-shrink: 0; padding: 2px; }
  .a-ssel-chev { transition: transform .15s ease; pointer-events: none; }
  .a-ssel-chev.up { transform: rotate(180deg); }
  .a-ssel-list { position: absolute; z-index: 40; top: calc(100% + 6px); left: 0; right: 0; max-height: 260px; overflow-y: auto; background: #fff; border-radius: 14px; box-shadow: 0 4px 10px rgba(0,0,0,0.06), 0 16px 36px -10px rgba(0,0,0,0.22); border: 1px solid rgba(0,0,0,0.06); padding: 6px; margin: 0; list-style: none; scrollbar-width: thin; scrollbar-color: rgba(0,0,0,0.3) transparent; }
  /* Dark thumb override -- this dropdown is a white panel, but the sitewide
     native scrollbar (in index.css) is tuned for the dark app background
     (a light/white thumb), which renders invisible on this white list. */
  .a-ssel-list::-webkit-scrollbar { width: 8px; }
  .a-ssel-list::-webkit-scrollbar-track { background: transparent; }
  .a-ssel-list::-webkit-scrollbar-thumb { background-color: rgba(0,0,0,0.3); border-radius: 6px; }
  .a-ssel-list::-webkit-scrollbar-thumb:hover { background-color: rgba(0,0,0,0.45); }
  .a-ssel-opt { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 9px 10px; border-radius: 9px; font-size: 0.84rem; font-weight: 600; color: #1d1d1f; cursor: pointer; }
  .a-ssel-opt.active { background: #f5f5f7; }
  .a-ssel-opt.selected { background: rgba(0,113,227,0.08); }
  .a-ssel-meta { font-size: 0.72rem; color: #9a9a9e; font-weight: 600; }
  .a-ssel-empty { padding: 10px; font-size: 0.8rem; color: #9a9a9e; text-align: center; }
`;

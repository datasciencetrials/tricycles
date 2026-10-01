import React, { useState, useEffect } from 'react';

const TABS = [
  { id: 'overview', label: 'Overview', icon: 'fa-map' },
  { id: 'summary', label: 'Summary Tables', icon: 'fa-table-list' },
  { id: 'analytics', label: 'Analytics', icon: 'fa-chart-pie' },
  { id: 'thesis', label: 'Thesis', icon: 'fa-book-open' },
];

const Layout = ({ children, activeTab, setActiveTab }) => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  const selectTab = (id) => {
    setActiveTab(id);
    setMenuOpen(false);
  };

  return (
    <div className="app-shell">
      <div className="grain-overlay" aria-hidden="true"></div>
      <header className="topbar">
        <div className="brand-block">
          <div className="brand-mark"><i className="fa-solid fa-route"></i></div>
          <div>
            <h1>Tricycle PCU Research Platform</h1>
            <p className="nexus-version">Kampala Traffic Study</p>
          </div>
        </div>

        <nav className="nav-links">
          {TABS.map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => selectTab(tab.id)}
              className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
            >
              <i className={`fa-solid ${tab.icon}`}></i>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="topbar-actions">
          <div className="live-clock" aria-label="Local time">{time}</div>
          <div className="status-block">
            <div className="system-status">
              <span className="status-dot"></span>
              <span className="status-text">Dashboard Active</span>
            </div>
            <p className="agency-text">Kampala Capital City Authority · Study Area</p>
          </div>
          <button
            type="button"
            className="nav-toggle"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen(o => !o)}
          >
            <i className={`fa-solid ${menuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
          </button>
        </div>

        <div className={`nav-mobile-panel ${menuOpen ? 'open' : ''}`}>
          {TABS.map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => selectTab(tab.id)}
              className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
            >
              <i className={`fa-solid ${tab.icon}`}></i>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </header>

      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;

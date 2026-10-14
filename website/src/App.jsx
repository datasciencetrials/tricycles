import React, { useState } from 'react';
import Layout from './components/Layout';
import OverviewTab from './components/OverviewTab';
import InfographicDashboard from './components/InfographicDashboard';
import SummaryTables from './components/SummaryTables';
import ThesisTab from './components/ThesisTab';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('overview');

  // In-app "Back" needs its own tab-visit history, not the browser's: this is
  // a single-page app with no routing, so a literal window.history.back()
  // would just carry the visitor off the site entirely rather than to their
  // previously viewed tab.
  const [tabHistory, setTabHistory] = useState(['overview']);

  const navigateTo = (tab) => {
    setActiveTab((current) => {
      if (tab === current) return current;
      setTabHistory((h) => [...h, tab]);
      return tab;
    });
  };

  const goBack = () => {
    setTabHistory((h) => {
      if (h.length < 2) return h;
      const next = h.slice(0, -1);
      setActiveTab(next[next.length - 1]);
      return next;
    });
  };

  const canGoBack = tabHistory.length > 1;

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab goBack={goBack} canGoBack={canGoBack} />;
      case 'summary':
        return <SummaryTables goBack={goBack} canGoBack={canGoBack} />;
      case 'analytics':
        return <InfographicDashboard goBack={goBack} canGoBack={canGoBack} />;
      case 'thesis':
        return <ThesisTab goBack={goBack} canGoBack={canGoBack} />;
      default:
        return <OverviewTab goBack={goBack} canGoBack={canGoBack} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={navigateTo}>
      <div className="tab-panel" key={activeTab}>
        {renderContent()}
      </div>
    </Layout>
  );
}

export default App;

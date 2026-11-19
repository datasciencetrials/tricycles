import React, { useState } from 'react';
import Layout from './components/Layout';
import OverviewTab from './components/OverviewTab';
import DigitalTwinTab from './components/DigitalTwinTab';
import SourceVerifiedTables from './components/SourceVerifiedTables';
import InfographicDashboard from './components/InfographicDashboard';
import DocumentationMindMapTab from './components/DocumentationMindMapTab';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('overview');
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
      case 'digital-twin':
        return <DigitalTwinTab goBack={goBack} canGoBack={canGoBack} />;
      case 'summary':
        return <SourceVerifiedTables goBack={goBack} canGoBack={canGoBack} />;
      case 'analytics':
        return <InfographicDashboard goBack={goBack} canGoBack={canGoBack} />;
      case 'documentation':
        return <DocumentationMindMapTab goBack={goBack} canGoBack={canGoBack} />;
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

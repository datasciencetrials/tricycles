import React, { useState } from 'react';
import Layout from './components/Layout';
import OverviewTab from './components/OverviewTab';
import InfographicDashboard from './components/InfographicDashboard';
import SummaryTables from './components/SummaryTables';
import ThesisTab from './components/ThesisTab';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab />;
      case 'summary':
        return <SummaryTables />;
      case 'analytics':
        return <InfographicDashboard />;
      case 'thesis':
        return <ThesisTab />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="tab-panel" key={activeTab}>
        {renderContent()}
      </div>
    </Layout>
  );
}

export default App;

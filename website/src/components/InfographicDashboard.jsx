import React, { useState } from 'react';
import { 
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, 
  BarElement, RadialLinearScale, ArcElement, Filler, Tooltip, Legend 
} from 'chart.js';
import { Line, Bar, Radar, Scatter, PolarArea, Doughnut } from 'react-chartjs-2';
import { useEffect, useRef } from 'react';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, 
  BarElement, RadialLinearScale, ArcElement, Filler, Tooltip, Legend
);

const LazyChart = ({ config }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const renderChart = () => {
    switch(config.type) {
      case 'bar': return <Bar data={config.data} options={config.options} />;
      case 'line': return <Line data={config.data} options={config.options} />;
      case 'radar': return <Radar data={config.data} options={config.options} />;
      case 'doughnut': return <Doughnut data={config.data} options={config.options} />;
      case 'polarArea': return <PolarArea data={config.data} options={config.options} />;
      case 'scatter': return <Scatter data={config.data} options={config.options} />;
      default: return null;
    }
  };

  return (
    <div ref={ref} className="glass-card col-span-4" style={{ minHeight: '340px', display: 'flex', flexDirection: 'column' }}>
      <p className="nexus-eyebrow">Dynamically Generated</p>
      <div style={{ flex: 1, position: 'relative', width: '100%', marginTop: '8px' }}>
        {isVisible ? renderChart() : <div style={{ color: '#9aa1af', textAlign: 'center', marginTop: '100px' }}>Loading chart...</div>}
      </div>
    </div>
  );
};

const InfographicDashboard = () => {
  // Diagnostic simulator state
  const [vcRatio, setVcRatio] = useState(0.85);
  const [modalShare, setModalShare] = useState(15);
  const [roadWidth, setRoadWidth] = useState(7.0);
  const [megaCharts, setMegaCharts] = useState([]);

  useEffect(() => {
    const baseUrl = import.meta.env.BASE_URL || '/';
    fetch(`${baseUrl}assets/analytics_data.json`)
      .then(res => res.json())
      .then(data => setMegaCharts(data))
      .catch(err => console.error('Failed to load mega charts:', err));
  }, []);

  // Dynamic calculations based on state
  const basePcu = 1.35;
  const vcPenalty = (vcRatio - 0.5) > 0 ? (vcRatio - 0.5) * 0.8 : 0;
  const modalPenalty = (modalShare - 5) * 0.02;
  const widthBonus = (roadWidth - 7.0) * -0.05;
  const dynamicPcu = (basePcu + vcPenalty + modalPenalty + widthBonus).toFixed(2);
  const capacityDrop = Math.round((dynamicPcu - 1.0) * 100);

  const animConfig = { duration: 900, easing: 'easeOutQuart' };

  const vcRatios = [0.2, 0.4, 0.6, 0.8, 1.0];
  const modalShares = [0.05, 0.10, 0.15, 0.20, 0.25];

  const axisLabelColor = '#9aa1af';
  const gridColor = 'rgba(255,255,255,0.06)';
  const legendColor = '#f2f3f6';

  return (
    <div className="workspace-grid">
      <div className="col-span-12" style={{ textAlign: 'center', marginBottom: '4px' }}>
        <p className="nexus-eyebrow">Advanced Traffic Diagnostics</p>
        <h2 className="text-primary" style={{ fontSize: '2.25rem' }}>Microscopic Traffic Diagnostics</h2>
      </div>

      {/* SUMMARY METRIC STRIP */}
      <div className="col-span-12" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '14px' }}>
        <div className="glass-card" style={{ padding: '16px', borderTop: '2px solid var(--accent)', textAlign: 'center' }}>
          <p className="stat-label">Network Flow State</p>
          <div className="stat-value text-primary" style={{ fontSize: '1.4rem' }}>Saturated</div>
          <p className="text-muted" style={{ fontSize: '0.7rem', marginTop: '2px' }}>Level of Service (LOS) E</p>
        </div>
        <div className="glass-card" style={{ padding: '16px', borderTop: '2px solid var(--positive)', textAlign: 'center' }}>
          <p className="stat-label">Recorded Vehicles</p>
          <div className="stat-value" style={{ fontSize: '1.4rem', color: 'var(--positive)' }}>6,400</div>
          <p className="text-muted" style={{ fontSize: '0.7rem', marginTop: '2px' }}>15-min interval count, full study</p>
        </div>
        <div className="glass-card" style={{ padding: '16px', borderTop: '2px solid var(--warn)', textAlign: 'center' }}>
          <p className="stat-label">Mean Network Delay</p>
          <div className="stat-value" style={{ fontSize: '1.4rem', color: 'var(--warn)' }}>142.5s</div>
          <p className="text-muted" style={{ fontSize: '0.7rem', marginTop: '2px' }}>Per intersection</p>
        </div>
        <div className="glass-card" style={{ padding: '16px', borderTop: '2px solid var(--danger)', textAlign: 'center' }}>
          <p className="stat-label">Critical V/C Ratio</p>
          <div className="stat-value" style={{ fontSize: '1.4rem', color: vcRatio > 0.9 ? 'var(--danger)' : '#fff' }}>{vcRatio.toFixed(2)}</div>
          <p className="text-muted" style={{ fontSize: '0.7rem', marginTop: '2px' }}>Wandegeya site</p>
        </div>
        <div className="glass-card" style={{ padding: '16px', borderTop: '2px solid var(--info)', textAlign: 'center' }}>
          <p className="stat-label">Tricycle Share</p>
          <div className="stat-value" style={{ fontSize: '1.4rem', color: 'var(--info)' }}>{modalShare}%</div>
          <p className="text-muted" style={{ fontSize: '0.7rem', marginTop: '2px' }}>System average</p>
        </div>
        <div className="glass-card" style={{ padding: '16px', borderTop: '2px solid var(--violet)', textAlign: 'center' }}>
          <p className="stat-label">Economic Delay Cost</p>
          <div className="stat-value" style={{ fontSize: '1.4rem', color: 'var(--violet)' }}>$1.5M</div>
          <p className="text-muted" style={{ fontSize: '0.7rem', marginTop: '2px' }}>Daily est., Greater Kampala Metropolitan Area (GKMA)</p>
        </div>
        <div className="glass-card" style={{ padding: '16px', borderTop: '2px solid var(--accent-2)', textAlign: 'center' }}>
          <p className="stat-label">Excess CO2</p>
          <div className="stat-value" style={{ fontSize: '1.4rem', color: 'var(--accent-2)' }}>+12.4%</div>
          <p className="text-muted" style={{ fontSize: '0.7rem', marginTop: '2px' }}>Attributed to weaving</p>
        </div>
      </div>

      {/* FLEET COMPOSITION */}
      <div className="glass-card col-span-4">
        <p className="nexus-eyebrow">Fleet Composition</p>
        <h3>Vehicle-Class Share, Full Study</h3>
        <div style={{ flex: 1, minHeight: '260px', position: 'relative', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Doughnut
            data={{
              labels: ['Boda Bodas (Motorcycle Taxis)', 'Tricycles', 'Passenger Cars', 'Matatus (14-Seater)', 'Heavy Trucks'],
              datasets: [{
                data: [51.96, 12.77, 24.39, 9.71, 1.18],
                backgroundColor: ['#8891a0', '#34d399', '#6d7bff', '#38bdf8', '#f87171'],
                borderColor: '#0c0e11',
                borderWidth: 2,
                hoverOffset: 6,
              }]
            }}
            options={{
              animation: animConfig,
              maintainAspectRatio: false,
              cutout: '62%',
              plugins: {
                legend: { position: 'bottom', labels: { color: legendColor, boxWidth: 12, padding: 10, font: { size: 10.5 } } },
                tooltip: { callbacks: { label: (ctx) => ctx.label + ': ' + ctx.parsed + '%' } }
              }
            }}
          />
        </div>
        <p className="text-muted" style={{ fontSize: '0.72rem', marginTop: '10px', textAlign: 'center' }}>
          Share of all 6,400 recorded 15-minute intervals across the five study intersections.
        </p>
      </div>

      {/* DIAGNOSTIC SIMULATOR */}
      <div className="glass-card col-span-4" style={{ display: 'flex', flexDirection: 'column' }}>
        <p className="nexus-eyebrow">Interactive Simulator</p>
        <h3>Dynamic PCU Calculator</h3>
        
        <div style={{ marginTop: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className="text-muted">Volume/Capacity (V/C)</span>
            <span className="text-primary" style={{ fontWeight: '600' }}>{vcRatio.toFixed(2)}</span>
          </div>
          <input type="range" min="0.2" max="1.5" step="0.05" value={vcRatio} onChange={(e) => setVcRatio(parseFloat(e.target.value))} className="custom-slider" />
        </div>

        <div style={{ marginTop: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className="text-muted">Tricycle Modal Share (%)</span>
            <span className="text-primary" style={{ fontWeight: '600' }}>{modalShare}%</span>
          </div>
          <input type="range" min="2" max="30" step="1" value={modalShare} onChange={(e) => setModalShare(parseInt(e.target.value))} className="custom-slider" />
        </div>

        <div style={{ marginTop: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className="text-muted">Effective Road Width (m)</span>
            <span className="text-primary" style={{ fontWeight: '600' }}>{roadWidth.toFixed(1)}m</span>
          </div>
          <input type="range" min="6.0" max="9.0" step="0.1" value={roadWidth} onChange={(e) => setRoadWidth(parseFloat(e.target.value))} className="custom-slider" />
        </div>

        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}>
          <div style={{ textAlign: 'center', padding: '20px', background: 'var(--accent-soft)', border: '1px solid var(--accent-border)', borderRadius: '50%', width: '170px', height: '170px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span className="text-muted" style={{ fontSize: '0.75rem', letterSpacing: '0.04em' }}>Computed PCU</span>
            <span className="text-primary" style={{ fontSize: '2.8rem', fontWeight: '700', lineHeight: '1' }}>{dynamicPcu}</span>
            <span style={{ fontSize: '0.72rem', color: 'var(--danger)', marginTop: '8px' }}><i className="fa-solid fa-arrow-up"></i> {capacityDrop}% capacity impact</span>
          </div>
        </div>
      </div>

      {/* DELAY SIMULATION */}
      <div className="glass-card col-span-8">
        <p className="nexus-eyebrow">Simulation Model</p>
        <h3>Intersection Delay by Tricycle PCU Profile</h3>
        <div style={{ flex: 1, minHeight: '320px', position: 'relative', width: '100%' }}>
          <Line 
            data={{
              labels: ['V/C 0.6', 'V/C 0.7', 'V/C 0.8', 'V/C 0.9', 'V/C 1.0', 'V/C 1.1', 'V/C 1.2', 'V/C 1.3'],
              datasets: [
                {
                  label: 'Baseline (PCU 1.0)',
                  data: [46, 62, 97, 373, 1994, 1948, 2011, 2150],
                  borderColor: '#8891a0',
                  backgroundColor: 'rgba(136, 145, 160, 0.08)',
                  borderWidth: 2,
                  tension: 0.4
                },
                {
                  label: 'Empirical Tricycle (PCU 1.35)',
                  data: [51, 76, 176, 1803, 2075, 1901, 2180, 2405],
                  borderColor: '#6d7bff',
                  backgroundColor: 'rgba(109, 123, 255, 0.12)',
                  borderWidth: 3,
                  fill: true,
                  tension: 0.4
                },
                {
                  label: 'Severe Weather/Rain (PCU 1.5)',
                  data: [54, 84, 279, 2228, 2623, 1915, 2300, 2650],
                  borderColor: '#f87171',
                  backgroundColor: 'rgba(248, 113, 113, 0.1)',
                  borderWidth: 2,
                  borderDash: [5, 5],
                  tension: 0.4
                }
              ]
            }}
            options={{
              animation: animConfig,
              maintainAspectRatio: false,
              scales: {
                y: { title: { display: true, text: 'Delay (Seconds / Veh)', color: axisLabelColor }, grid: { color: gridColor }, ticks: { color: axisLabelColor } },
                x: { grid: { display: false }, ticks: { color: axisLabelColor } }
              },
              plugins: { legend: { labels: { color: legendColor } } }
            }}
          />
        </div>
      </div>

      {/* SAFETY ANALYSIS */}
      <div className="glass-card col-span-6">
        <p className="nexus-eyebrow">Safety Analysis (N = 840 incidents)</p>
        <h3>Incident Severity by Type in Tricycle Corridors</h3>
        <div style={{ flex: 1, minHeight: '280px', position: 'relative', width: '100%' }}>
          <Bar 
            data={{
              labels: ['Rollover', 'Pedestrian', 'Moto Crash', 'Rear-End', 'Single Veh', 'Side-swipe'],
              datasets: [
                { label: 'Fatal', data: [25, 45, 30, 15, 20, 12], backgroundColor: '#f87171' },
                { label: 'Serious', data: [40, 30, 35, 30, 25, 25], backgroundColor: '#f59e0b' },
                { label: 'Minor', data: [40, 15, 23, 42, 40, 46], backgroundColor: '#34d399' }
              ]
            }}
            options={{
              animation: animConfig,
              maintainAspectRatio: false,
              scales: {
                x: { stacked: true, grid: { display: false }, ticks: { color: axisLabelColor } },
                y: { stacked: true, grid: { color: gridColor }, ticks: { color: axisLabelColor } }
              },
              plugins: { legend: { labels: { color: legendColor } } }
            }}
          />
        </div>
      </div>

      {/* WEAVING PHOTO CARD */}
      <div className="glass-card col-span-6" style={{ padding: 0, position: 'relative', overflow: 'hidden', minHeight: '320px', display: 'flex', flexDirection: 'column' }}>
        <img src="/assets/weaving.jpg" alt="Tricycle Weaving" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0, zIndex: 1, opacity: 0.8 }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(5,6,8,0.96) 0%, rgba(5,6,8,0.72) 60%, transparent 100%)', padding: '24px', zIndex: 2 }}>
          <p className="nexus-eyebrow" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>The Weaving Effect</p>
          <h3 style={{ margin: '0 0 8px 0', textShadow: '0 2px 4px rgba(0,0,0,0.8)', color: '#8b93ff' }}>Space Thieves</h3>
          <p className="text-muted" style={{ margin: 0, fontSize: '0.9rem', color: '#f1f5f9', textShadow: '0 1px 3px rgba(0,0,0,1)' }}>
            Tricycles rarely wait in line, wedging into the tight gaps between cars and taking up the safety buffer (headway) that following vehicles depend on. This forces abrupt braking and disrupts the flow of the entire road.
          </p>
        </div>
      </div>

      {/* SHOCKWAVE PHOTO CARD */}
      <div className="glass-card col-span-4" style={{ padding: 0, position: 'relative', overflow: 'hidden', minHeight: '300px' }}>
        <img src="/assets/shockwave.jpg" alt="Traffic Shockwave" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0, zIndex: 1, opacity: 0.8 }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(5,6,8,0.96) 0%, rgba(5,6,8,0.72) 60%, transparent 100%)', padding: '20px', zIndex: 2 }}>
          <p className="nexus-eyebrow" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>The Ripple Effect</p>
          <h3 style={{ margin: '0 0 8px 0', textShadow: '0 2px 4px rgba(0,0,0,0.8)', fontSize: '1.15rem', color: '#34d399' }}>Stop-and-Go Chaos</h3>
          <p className="text-muted" style={{ margin: 0, fontSize: '0.8rem', color: '#f1f5f9', textShadow: '0 1px 3px rgba(0,0,0,1)' }}>
            A single tricycle stopping to drop off a passenger can block a lane for roughly 10 seconds &mdash; enough to trigger a backward shockwave that piles up traffic for a kilometer.
          </p>
        </div>
      </div>

      {/* SAFETY PHOTO CARD */}
      <div className="glass-card col-span-4" style={{ padding: 0, position: 'relative', overflow: 'hidden', minHeight: '300px' }}>
        <img src="/assets/accident.jpg" alt="Tricycle Accident" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0, zIndex: 1, opacity: 0.8 }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(5,6,8,0.96) 0%, rgba(5,6,8,0.72) 60%, transparent 100%)', padding: '20px', zIndex: 2 }}>
          <p className="nexus-eyebrow" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Safety Reality</p>
          <h3 style={{ margin: '0 0 8px 0', textShadow: '0 2px 4px rgba(0,0,0,0.8)', fontSize: '1.15rem', color: '#f59e0b' }}>The Friction Tax</h3>
          <p className="text-muted" style={{ margin: 0, fontSize: '0.8rem', color: '#f1f5f9', textShadow: '0 1px 3px rgba(0,0,0,1)' }}>
            Tricycles often operate in the blind spots of sedans on narrow lanes. Minor side-swipes are common, and can trigger sudden gridlock with little warning.
          </p>
        </div>
      </div>
      
      {/* PREDICTIVE MATRIX */}
      <div className="glass-card col-span-4">
        <p className="nexus-eyebrow">Predictive Matrix</p>
        <h3>PCU Sensitivity: Modal Share vs. V/C</h3>
        <div style={{ flex: 1, minHeight: '250px', position: 'relative', overflowX: 'auto', marginTop: '14px' }}>
          <table className="heatmap-table" style={{ width: '100%', height: '100%', fontSize: '0.85rem' }}>
            <thead>
              <tr>
                <th>V/C</th>
                {modalShares.map(ms => <th key={ms}>{ms * 100}%</th>)}
              </tr>
            </thead>
            <tbody>
              {vcRatios.map(vc => (
                <tr key={vc}>
                  <td style={{ fontWeight: '600' }}>{vc}</td>
                  {modalShares.map(ms => {
                    const pcu = (1.1 + (vc * 0.4) + (ms * 1.2)).toFixed(2);
                    const opacity = (pcu - 1.1) / 1.0;
                    return (
                      <td key={ms} style={{ background: `rgba(109, 123, 255, ${opacity})`, color: opacity > 0.5 ? '#0a0b0d' : '#fff', transition: 'all 0.3s' }}>
                        {pcu}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* GREENSHIELDS FUNDAMENTAL DIAGRAM */}
      <div className="glass-card col-span-6">
        <p className="nexus-eyebrow">Macroscopic Flow Theory</p>
        <h3>Greenshields Fundamental Diagram</h3>
        <div style={{ flex: 1, minHeight: '280px', position: 'relative', width: '100%' }}>
          <Line 
            data={{
              labels: [0, 6.8, 13.7, 20.5, 27.4, 34.2, 41.1, 47.9, 54.7, 61.6, 68.4, 75.3, 82.1, 88.9, 95.8, 102.6, 109.5, 116.3, 123.2, 130.0],
              datasets: [
                {
                  label: 'Standard Traffic (q_max = 1798)',
                  data: [0, 387, 727, 1020, 1267, 1467, 1620, 1726, 1786, 1798, 1764, 1683, 1555, 1381, 1159, 891, 576, 214, 0, 0],
                  borderColor: '#8891a0',
                  borderWidth: 2,
                  tension: 0.4
                },
                {
                  label: '20% Tricycles (q_max = 1068)',
                  data: [0, 285, 527, 724, 876, 985, 1049, 1068, 1043, 974, 861, 703, 501, 255, 0, 0, 0, 0, 0, 0],
                  borderColor: '#f87171',
                  backgroundColor: 'rgba(248, 113, 113, 0.1)',
                  borderWidth: 3,
                  fill: true,
                  tension: 0.4
                }
              ]
            }}
            options={{
              animation: animConfig,
              maintainAspectRatio: false,
              scales: {
                x: { title: { display: true, text: 'Density (Veh/km)', color: axisLabelColor }, grid: { display: false }, ticks: { color: axisLabelColor } },
                y: { title: { display: true, text: 'Flow (Veh/hr)', color: axisLabelColor }, grid: { color: gridColor }, ticks: { color: axisLabelColor } }
              },
              plugins: { legend: { labels: { color: legendColor } } }
            }}
          />
        </div>
      </div>

      {/* SHOCKWAVE PROFILE */}
      <div className="glass-card col-span-6">
        <p className="nexus-eyebrow">Kinematic Wave Theory (LWR)</p>
        <h3>Backward Shockwave Velocity (Stop-and-Go)</h3>
        <div style={{ flex: 1, minHeight: '280px', position: 'relative', width: '100%' }}>
          <Line 
            data={{
              labels: ['0s', '10s', '20s', '30s', '40s', '50s', '60s'],
              datasets: [
                {
                  label: 'Queue Length (meters)',
                  data: [0, 51, 102, 153, 205, 256, 307],
                  borderColor: '#6d7bff',
                  backgroundColor: 'rgba(109, 123, 255, 0.12)',
                  borderWidth: 3,
                  fill: true,
                  tension: 0.1
                }
              ]
            }}
            options={{
              animation: animConfig,
              maintainAspectRatio: false,
              scales: {
                x: { title: { display: true, text: 'Time since Tricycle stop (seconds)', color: axisLabelColor }, grid: { display: false }, ticks: { color: axisLabelColor } },
                y: { title: { display: true, text: 'Queue Platoon Length (meters)', color: axisLabelColor }, grid: { color: gridColor }, ticks: { color: axisLabelColor } }
              },
              plugins: { legend: { labels: { color: legendColor } } }
            }}
          />
        </div>
      </div>

      {/* COMMUTE PHOTO CARD */}
      <div className="glass-card col-span-6" style={{ padding: 0, position: 'relative', overflow: 'hidden', minHeight: '320px', display: 'flex', flexDirection: 'column' }}>
        <img src="/assets/commute.jpg" alt="Commuter Flow" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0, zIndex: 1, opacity: 0.8 }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(5,6,8,0.96) 0%, rgba(5,6,8,0.72) 60%, transparent 100%)', padding: '24px', zIndex: 2 }}>
          <p className="nexus-eyebrow" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Origin-Destination Flow</p>
          <h3 style={{ margin: '0 0 8px 0', textShadow: '0 2px 4px rgba(0,0,0,0.8)', color: '#8b93ff' }}>The Commuter Arteries</h3>
          <p className="text-muted" style={{ margin: 0, fontSize: '0.9rem', color: '#f1f5f9', textShadow: '0 1px 3px rgba(0,0,0,1)' }}>
            Analysis of 1,446 origin-destination zones shows where traffic pulses concentrate. Tricycles act as last-mile suburban feeders but add significant friction to primary arteries during peak hours.
          </p>
        </div>
      </div>

      {/* CHOKEPOINT PHOTO CARD */}
      <div className="glass-card col-span-6" style={{ padding: 0, position: 'relative', overflow: 'hidden', minHeight: '320px', display: 'flex', flexDirection: 'column' }}>
        <img src="/assets/chokepoint.jpg" alt="Structural Chokepoint" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0, zIndex: 1, opacity: 0.8 }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(5,6,8,0.96) 0%, rgba(5,6,8,0.72) 60%, transparent 100%)', padding: '24px', zIndex: 2 }}>
          <p className="nexus-eyebrow" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Structural Geometry</p>
          <h3 style={{ margin: '0 0 8px 0', textShadow: '0 2px 4px rgba(0,0,0,0.8)', color: '#f87171' }}>Physical Constraints</h3>
          <p className="text-muted" style={{ margin: 0, fontSize: '0.9rem', color: '#f1f5f9', textShadow: '0 1px 3px rgba(0,0,0,1)' }}>
            Geospatial road-network mapping shows that many Kampala routes are physically too narrow for safe mixed flow, making safe overtaking geometrically impossible in several corridors.
          </p>
        </div>
      </div>

      {/* MEGA ANALYTICS REPOSITORY (100+ CHARTS) */}
      {megaCharts.length > 0 && (
        <>
          <div className="col-span-12" style={{ textAlign: 'center', marginTop: '40px', padding: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <h2 className="text-primary">Extensive Analytical Repository</h2>
            <p className="text-muted">Displaying {megaCharts.length} cross-variable visualizations across all captured fields and locations.</p>
          </div>
          {megaCharts.map(chart => (
            <LazyChart key={chart.id} config={chart} />
          ))}
        </>
      )}

    </div>
  );
};

export default InfographicDashboard;

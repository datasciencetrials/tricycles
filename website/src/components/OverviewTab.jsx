import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet default marker icon issue in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const studySites = [
  { name: "Wandegeya Junction", coords: [0.3308, 32.5744], pcu: 1.35, adt: 103899, interaction: "Tricycle-Boda-boda (Motorcycle Taxi)-Non-Motorized Transport (NMT)" },
  { name: "Kibuye Roundabout", coords: [0.2981, 32.5761], pcu: 1.41, adt: 85000, interaction: "Tricycle-Car (Expressway Exit)" },
  { name: "Bakuli Intersection", coords: [0.3114, 32.5669], pcu: 1.32, adt: 65000, interaction: "Tricycle-Bus (Hub)" },
  { name: "Bwaise Junction", coords: [0.3458, 32.5611], pcu: 1.45, adt: 45000, interaction: "Tricycle-Non-Motorized Transport (NMT) (Flood Zone)" },
  { name: "Natete Junction", coords: [0.3014, 32.5469], pcu: 1.36, adt: 72000, interaction: "Tricycle-Public Service Vehicle (PSV/Minibus) Hub" }
];

const OverviewTab = () => {
  const [selectedSite, setSelectedSite] = useState(null);
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    // Determine base URL, works in dev and gh-pages
    const baseUrl = import.meta.env.BASE_URL || '/';
    fetch(`${baseUrl}assets/kampala_roads.geojson`)
      .then(res => res.json())
      .then(data => setGeoData(data))
      .catch(err => console.error('Error loading geojson:', err));
  }, []);

  return (
    <div className="workspace-grid">
      <div className="glass-card col-span-12" style={{ textAlign: 'center', padding: '44px 24px' }}>
        <h1 className="text-primary" style={{ marginBottom: '14px' }}>Network Overview</h1>
        <p className="text-muted" style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.05rem' }}>
          Geospatial study console for the Tricycle Passenger Car Unit (PCU) survey across five case-study intersections on the Kampala City road network.
        </p>
      </div>

      {/* Map Card */}
      <div className="glass-card col-span-8">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <p className="nexus-eyebrow">Study Area</p>
            <h3>Interactive Case Study Map</h3>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn active"><i className="fa-solid fa-sun" style={{marginRight: '6px'}}></i>Dry</button>
            <button className="btn"><i className="fa-solid fa-cloud-showers-heavy" style={{marginRight: '6px'}}></i>Wet</button>
          </div>
        </div>
        <div style={{ height: '400px', borderRadius: '12px', overflow: 'hidden', margin: '16px 0 0', border: '1px solid var(--border)' }}>
          <MapContainer bounds={[[0.2981, 32.5469], [0.3458, 32.5761]]} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            />
            {geoData && <GeoJSON data={geoData} style={{ color: '#00f2ff', weight: 1.5, opacity: 0.6 }} />}
            {studySites.map((site, idx) => (
              <Marker 
                key={idx} 
                position={site.coords}
                eventHandlers={{ click: () => setSelectedSite(site) }}
              >
                <Popup>
                  <strong style={{color: '#000'}}>{site.name}</strong><br/>
                  <span style={{color: '#333'}}>PCU: {site.pcu}</span>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>

      {/* Site Details Sidebar */}
      <div className="glass-card col-span-4">
        <p className="nexus-eyebrow">Site Detail</p>
        <h3>{selectedSite ? selectedSite.name : 'Select a study site'}</h3>
        {selectedSite ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '6px' }}>
            <div className="stat-box">
              <div className="stat-label">Annual Average Daily Traffic (AADT) &mdash; 2021</div>
              <div className="stat-value text-primary" style={{ fontSize: '1.5rem' }}>{selectedSite.adt.toLocaleString()}</div>
            </div>
            <div className="stat-box">
              <div className="stat-label">Base PCU (Eq. 2)</div>
              <div className="stat-value text-accent" style={{ fontSize: '1.5rem' }}>{selectedSite.pcu}</div>
            </div>
            <div className="stat-box">
              <div className="stat-label">Primary Vehicle Interaction</div>
              <div className="text-muted" style={{ fontWeight: '500' }}>{selectedSite.interaction}</div>
            </div>
            <div className="stat-box">
              <div className="stat-label">VISSIM Standstill Distance (Parameter a<sub>x</sub>)</div>
              <div className="text-muted" style={{ fontWeight: '500' }}>0.65 m</div>
            </div>
          </div>
        ) : (
          <p className="text-muted" style={{ marginTop: '18px' }}>
            <i className="fa-solid fa-location-crosshairs" style={{ marginRight: '8px' }}></i>
            Select a marker on the map to view intersection-level PCU and traffic-volume detail.
          </p>
        )}
      </div>
    </div>
  );
};

export default OverviewTab;

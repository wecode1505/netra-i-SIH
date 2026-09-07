import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MapPin } from 'lucide-react';
import { renderToStaticMarkup } from 'react-dom/server';

// CRITICAL FIX 1: Direct CSS import to fix the broken/floating tiles
import 'leaflet/dist/leaflet.css';

// CRITICAL FIX 2: Forces the map to recalculate its grid size perfectly 
// when placed inside a modern Flexbox/Grid dashboard layout.
const MapResizer = () => {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 200);
  }, [map]);
  return null;
};

// Create a custom glowing neon marker using Lucide icons
const iconMarkup = renderToStaticMarkup(
  <div className="text-accent-cyan drop-shadow-[0_0_12px_rgba(6,182,212,0.9)]">
    <MapPin size={32} fill="#0f1115" strokeWidth={2} />
  </div>
);

const customMarker = new L.DivIcon({
  html: iconMarkup,
  className: 'custom-leaflet-icon',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const MapWidget = () => {
  // Coordinates for the active cases
  const caseLocations = [
    { id: '2047', title: 'Downtown Warehouse', lat: 28.6139, lng: 77.2090, type: 'Robbery' },
    { id: '3312', title: 'Sector 7 Complex', lat: 28.5355, lng: 77.3910, type: 'Grand Theft Auto' },
    { id: '3390', title: 'Highland Ave', lat: 28.4595, lng: 77.0266, type: 'Burglary' },
  ];

  return (
    <div className="h-full w-full rounded-xl overflow-hidden relative z-0">
      <MapContainer 
        center={[28.5500, 77.2000]} // Centered on Delhi/NCR region
        zoom={10} 
        style={{ height: '100%', width: '100%', background: '#050505' }}
        zoomControl={false}
      >
        <MapResizer />
        
        {/* Using standard OpenStreetMap (Free, No API Key) */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap'
        />
        
        {caseLocations.map((loc) => (
          <Marker key={loc.id} position={[loc.lat, loc.lng]} icon={customMarker}>
            <Popup className="custom-popup">
              <div className="bg-dark-900 border border-dark-700 p-3 rounded-lg shadow-xl text-white font-mono min-w-[150px]">
                <p className="text-accent-cyan font-bold text-xs mb-1">CASE #{loc.id}</p>
                <p className="font-bold text-sm">{loc.title}</p>
                <p className="text-gray-400 text-xs mt-1">{loc.type}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      {/* Custom CSS to invert the map to dark mode and style popups */}
      <style>{`
        /* Invert the light map to a sleek dark map */
        .leaflet-tile-pane {
          filter: invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%);
        }
        
        /* Fix the Popup styling */
        .leaflet-popup-content-wrapper, .leaflet-popup-tip {
          background: #0f1115 !important;
          border: 1px solid #1e2128 !important;
          box-shadow: 0 0 20px rgba(0,0,0,0.5) !important;
        }
        .leaflet-popup-content { margin: 0 !important; }
        .leaflet-container a.leaflet-popup-close-button { color: #06b6d4 !important; }
        
        /* Remove the white background from the map container itself */
        .leaflet-container { background: #050505 !important; }
      `}</style>
    </div>
  );
};

export default MapWidget;
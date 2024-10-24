import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Define custom red marker icon
const redMarkerIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png', // Red marker image
  iconSize: [25, 41], // Original size of the icon
  iconAnchor: [12, 41], // Anchor the icon to its center point
  popupAnchor: [1, -34], // Popup should open above the icon
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png', // Shadow image
  shadowSize: [41, 41], // Size of the shadow image
});

const Map = ({ startLocation, endLocation }) => {
  const route = [
    [startLocation.lat, startLocation.lng],
    [endLocation.lat, endLocation.lng]
  ];

  return (
    <MapContainer 
      center={[startLocation.lat, startLocation.lng]} 
      zoom={5} 
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      
      {/* Marker for start location */}
      <Marker position={[startLocation.lat, startLocation.lng]} icon={redMarkerIcon}>
        <Popup>Start Location</Popup>
      </Marker>
      
      {/* Marker for end location */}
      <Marker position={[endLocation.lat, endLocation.lng]} icon={redMarkerIcon}>
        <Popup>End Location</Popup>
      </Marker>
      
      {/* Draw polyline (route) between start and end locations */}
      <Polyline positions={route} color="blue" />
    </MapContainer>
  );
};

export default Map;

import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./map.css";

const Map = ({ userLocation, CourtsMarkers, DraggMarker, UserMarker }) => {
  return (
    <MapContainer center={userLocation} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {CourtsMarkers}
      {DraggMarker}
      {UserMarker}
    </MapContainer>
  );
};

export default Map;

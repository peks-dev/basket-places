import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./map.css";

const Map = ({
  mapPosition,
  CourtsMarkers,
  SingleMarker,
  DraggMarker,
  UserMarker,
}) => {
  return (
    <MapContainer center={mapPosition} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {CourtsMarkers}
      {SingleMarker}
      {DraggMarker}
      {UserMarker}
    </MapContainer>
  );
};

export default Map;

import React, { useContext } from "react";
import "./map.css";

// leaflet
import { MapContainer, TileLayer } from "react-leaflet";
import { openStreetMapTile } from "./const/tile-layers";
import "leaflet/dist/leaflet.css";

// context
import UserContext from "../../context/user/userContext";

const Map = ({
  mapPosition,
  zoomLevel,
  CourtsMarkers,
  DraggMarker,
  singleMarker,
  mapRef,
  mapPositionSave,
}) => {
  const { user } = useContext(UserContext);

  return (
    <MapContainer
      center={mapPosition}
      zoom={zoomLevel}
      scrollWheelZoom={false}
      ref={mapRef}
    >
      <TileLayer
        attribution={openStreetMapTile.attribution}
        url={openStreetMapTile.url}
      />
      {CourtsMarkers}
      {DraggMarker}
      {singleMarker}
      {mapPositionSave}
    </MapContainer>
  );
};

export default Map;

import "./map.css";

// leaflet
import { MapContainer, TileLayer } from "react-leaflet";
import { openStreetMapTile } from "./const/tile-layers";
import "leaflet/dist/leaflet.css";

const Map = ({ mapPosition, zoomLevel, children, mapRef, courtsMarkers }) => {
  const defaultPosition = [24.005386577116106, -99.11535224115887];
  const defaultZoom = [4];
  return (
    <MapContainer
      center={mapPosition ? mapPosition : defaultPosition}
      zoom={zoomLevel ? zoomLevel : defaultZoom}
      ref={mapRef}
    >
      <TileLayer
        attribution={openStreetMapTile.attribution}
        url={openStreetMapTile.url}
      />
      {courtsMarkers}
      {children}
    </MapContainer>
  );
};

export default Map;

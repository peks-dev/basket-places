import "./map.css";

// leaflet
import { MapContainer, TileLayer } from "react-leaflet";
import { openStreetMapTile, mapBoxTile } from "./lib/tile-layers";
import "leaflet/dist/leaflet.css";
// Context
import { useThemeStore } from "@/context/themeStore";

const Map = ({ mapPosition, zoomLevel, children, mapRef, courtsMarkers }) => {
  const { currentTheme } = useThemeStore();
  const defaultPosition = { lat: 24.005386577116106, lng: -99.11535224115887 };
  const defaultZoom = [4];
  const mapAtribution =
    currentTheme === "dark"
      ? mapBoxTile.attribution
      : openStreetMapTile.attribution;
  const mapUrl =
    currentTheme === "dark" ? mapBoxTile.url : openStreetMapTile.url;

  const centerPosition = mapPosition ? mapPosition : defaultPosition;

  return (
    <MapContainer
      center={centerPosition}
      zoom={zoomLevel ? zoomLevel : defaultZoom}
      ref={mapRef}
    >
      <TileLayer attribution={mapAtribution} url={mapUrl} />
      {courtsMarkers}
      {children}
    </MapContainer>
  );
};

export default Map;

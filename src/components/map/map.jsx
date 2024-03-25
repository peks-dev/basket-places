import "./map.css";

// leaflet
import { MapContainer, TileLayer } from "react-leaflet";
import { openStreetMapTile, mapBoxTile } from "./lib/tile-layers";
import "leaflet/dist/leaflet.css";
// Context
import { useThemeStore } from "@/context/themeStore";

const Map = ({ mapPosition, zoomLevel, children, mapRef, courtsMarkers }) => {
  const { currentTheme } = useThemeStore();
  const defaultPosition = [24.005386577116106, -99.11535224115887];
  const defaultZoom = [4];
  const mapAtribution =
    currentTheme === "dark"
      ? mapBoxTile.attribution
      : openStreetMapTile.attribution;
  const mapUrl =
    currentTheme === "dark" ? mapBoxTile.url : openStreetMapTile.url;

  return (
    <MapContainer
      center={mapPosition ? mapPosition : defaultPosition}
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

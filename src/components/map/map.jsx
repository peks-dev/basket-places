import React, { useContext, useRef, useEffect } from "react";
import "./map.css";

// leaflet
import { MapContainer, TileLayer, Popup, Marker  } from "react-leaflet";
import { openStreetMapTile } from "./const/tile-layers";
import "leaflet/dist/leaflet.css";

// context
import UserContext from "../../context/user/userContext";


const Map = ({
  mapPosition,
  zoomLevel,
  CourtsMarkers,
  DraggMarker,
  UserMarker,
  singleMarker,
}) => {
  const {user} = useContext(UserContext)
  const mapRef = useRef()
  
  useEffect(() => {
    if (mapRef.current && user.location) {
      mapRef.current.flyTo(user.location, 13, { animate: true });
    }
  }, [user.location]);

  const handleMapCreated = (map) => {
    mapRef.current = map;
  };
  return (
    <MapContainer center={mapPosition} zoom={zoomLevel} scrollWheelZoom={false} ref={mapRef} whenCreated={handleMapCreated}>
      <TileLayer
        attribution={openStreetMapTile.attribution}
        url={openStreetMapTile.url}
      />
      {CourtsMarkers}
      {DraggMarker}
      {UserMarker}
      {singleMarker}
    </MapContainer>
  );
};

export default Map;

import React from "react";

// Componentes
import { Marker } from "react-leaflet";
import { CourtMarkerIcon } from "./icons/court-marker-icon";
import { UserMarkerIcon } from "./icons/user-marker-icon";

const UserPositionMarker = ({ markerPosition }) => {
  return <Marker position={markerPosition} icon={UserMarkerIcon} />;
};

export default UserPositionMarker;

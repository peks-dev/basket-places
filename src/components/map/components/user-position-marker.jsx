import React from "react";

// Componentes
import { Marker } from "react-leaflet";
import { UserMarkerIcon } from "./icons/user-marker-icon";

const UserPositionMarker = ({ markerPosition }) => {
  return <Marker position={markerPosition} icon={UserMarkerIcon} />;
};

export default UserPositionMarker;

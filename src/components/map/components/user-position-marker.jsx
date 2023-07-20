import React from "react";

// Componentes
import { Marker } from "react-leaflet";
import { IconMarker } from "./icon-marker";

const UserMarker = ({ markerPosition }) => {
  return <Marker position={markerPosition} icon={IconMarker} />;
};

export default UserMarker;

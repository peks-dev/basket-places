import React from "react";
import { Marker } from "react-leaflet";
import CourtMarkerIcon from "./icons/court-marker-icon";

const DraggableMarker = ({ position, onDragEnd }) => {
  const handleDragEnd = (event) => {
    const newZoom = event.target._map._zoom;
    const newPosition = event.target.getLatLng();
    onDragEnd(newPosition, newZoom);
  };

  return (
    <Marker
      draggable={true}
      position={position}
      icon={CourtMarkerIcon}
      eventHandlers={{
        dragend: handleDragEnd,
      }}
    />
  );
};

export default DraggableMarker;

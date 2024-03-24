import React from "react";
import { Marker } from "react-leaflet";

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
      eventHandlers={{
        dragend: handleDragEnd,
      }}
    />
  );
};

export default DraggableMarker;

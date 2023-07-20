import React from "react";
import { Marker } from "react-leaflet";

const DraggableMarker = ({ position, onDragEnd }) => {
  const handleDragEnd = (event) => {
    const newPosition = event.target.getLatLng();
    onDragEnd(newPosition);
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

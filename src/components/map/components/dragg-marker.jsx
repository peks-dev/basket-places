import React from "react";
import { Marker } from "react-leaflet";
import CourtMarkerIcon from "./icons/court-marker-icon";

//icons
import courtIconSvgDark from "/icons/court-marker-dark.svg";
import courtIconSvgLight from "/icons/court-marker-light.svg";

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
      icon={L.icon({
        iconUrl: iconUrl,
        iconRetinaUrl: iconUrl,
        iconAnchor: null,
        shadowAnchor: null,
        shadowUrl: null,
        shadowSize: null,
        iconSize: [35, 35],
        className: "icono-masiso",
      })}
      eventHandlers={{
        dragend: handleDragEnd,
      }}
    />
  );
};

export default DraggableMarker;

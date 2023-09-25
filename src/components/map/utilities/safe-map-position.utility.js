import { useMapEvents } from "react-leaflet";
import React from "react";

export const HandleMapMovement = ({ changePosition, changeZoom }) => {
  // Guardar la posición y el zoom cuando el usuario hace clic en el mapa
  const map = useMapEvents({
    mouseup(e) {
      const center = map.getCenter();
      changePosition(center);
      // localStorage.setItem("mapPosition", JSON.stringify(center));
      const zoom = map.getZoom();
      // localStorage.setItem("mapZoom", zoom);
      changeZoom(zoom);
    },
  });

  return null;
};

import React from "react";

// Componentes
import { Marker } from "react-leaflet";
// icons
import userMarkerSvgDark from "/icons/user-marker-dark.svg";
import userMarkerSvgLight from "/icons/user-marker-light.svg";
// context
import { useThemeStore } from "@/context/themeStore";

const UserPositionMarker = ({ markerPosition }) => {
  const { currentTheme } = useThemeStore();
  const userIcon =
    currentTheme === "dark" ? userMarkerSvgLight : userMarkerSvgDark;
  return (
    <Marker
      position={markerPosition}
      icon={L.icon({
        iconUrl: userIcon,
        iconRetinaUrl: userIcon,
        iconAnchor: null,
        shadowAnchor: null,
        shadowUrl: null,
        shadowSize: null,
        iconSize: [35],
        className: "icono-masiso",
      })}
    />
  );
};

export default UserPositionMarker;

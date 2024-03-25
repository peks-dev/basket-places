import React from "react";
import L from "leaflet";
import { useThemeStore } from "@/context/themeStore";

import courtIconSvgDark from "/icons/court-marker-dark.svg";
import courtIconSvgLight from "/icons/court-marker-light.svg";

const CourtMarkerIcon = () => {
  const { currentTheme } = useThemeStore();

  const iconUrl =
    currentTheme === "dark" ? courtIconSvgDark : courtIconSvgLight;

  return L.icon({
    iconUrl: "/icons/court-marker-dark.svg",
    iconRetinaUrl: "/icons/court-marker-dark.svg",
    iconAnchor: null,
    shadowAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    iconSize: [40, 40],
    className: "icono-masiso",
  });
};

export default CourtMarkerIcon;

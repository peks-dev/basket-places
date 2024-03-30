import React from "react";

//leaflet
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
// global state
import { useThemeStore } from "@/context/themeStore";
//icons
import courtIconSvgDark from "/icons/court-marker-dark.svg";
import courtIconSvgLight from "/icons/court-marker-light.svg";
// components
import CourtCard from "@/components/court-card-preview/court-card";
import Loader from "@/components/loader/loader";
// hooks
import { useFetchCourtData } from "@/lib/court-data-fetch";

const CourtMarker = React.memo(
  ({ courtId, markerPosition, showPopup, isDraggable, onDragEnd }) => {
    const { loading, error, fetchAllCourtData, courtInfo } =
      useFetchCourtData();
    const { currentTheme } = useThemeStore();
    const iconUrl =
      currentTheme === "dark" ? courtIconSvgLight : courtIconSvgDark;

    async function handlePopUp() {
      fetchAllCourtData(courtId);
    }

    const handleDragEnd = (event) => {
      const newZoom = event.target._map._zoom;
      const newPosition = event.target.getLatLng();
      onDragEnd(newPosition, newZoom);
    };
    return (
      <Marker
        position={markerPosition}
        draggable={isDraggable}
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
          click: (e) => {
            showPopup && handlePopUp(e);
          },
          dragend: handleDragEnd,
        }}
      >
        {showPopup && (
          <Popup>
            {loading ? <Loader /> : <CourtCard courtData={courtInfo} />}
          </Popup>
        )}
      </Marker>
    );
  },
  (prevProps, nextProps) => {
    // Evitar el re-renderizado si currentTheme no cambia
    return prevProps.currentTheme === nextProps.currentTheme;
  }
);

export default CourtMarker;

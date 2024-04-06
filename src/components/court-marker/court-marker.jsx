import React from "react";

//leaflet
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
// global state
import { useThemeStore } from "@/context/themeStore";
//icons
import courtIconSvgLight from "/icons/court-marker-light.svg";
import courtIconSvgDark from "/icons/court-marker-dark.svg";
// components
import ErrorDisplay from "@/components/errors/error-display/error-display";
import CourtCard from "@/components/court-card-preview/court-card";
import Loader from "@/components/loader/loader";
// hooks
import { useFetchCourtData } from "@/lib/fetch-court-data";

const CourtMarker = React.memo(
  ({ courtId, markerPosition, showPopup, isDraggable, onDragEnd }) => {
    const { loading, error, fetchAllCourtData, courtInfo } =
      useFetchCourtData();
    const { currentTheme } = useThemeStore();

    const iconUrl =
      currentTheme === "dark" ? courtIconSvgLight : courtIconSvgDark;

    function handlePopUp() {
      fetchAllCourtData(courtId);
    }

    const handleDragEnd = (event) => {
      const newZoom = event.target._map._zoom;
      const newPosition = event.target.getLatLng();
      onDragEnd(newPosition, newZoom);
    };

    if (error) {
      console.log(error.name);
    }

    const renderContent = () => {
      if (error) {
        return <ErrorDisplay error={error} />;
      } else if (loading) {
        return <Loader />;
      } else {
        return <CourtCard courtData={courtInfo} />;
      }
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
        {showPopup && <Popup>{renderContent()}</Popup>}
      </Marker>
    );
  },
  (prevProps, nextProps) => {
    // Evitar el re-renderizado si currentTheme no cambia
    return prevProps.currentTheme === nextProps.currentTheme;
  }
);

export default CourtMarker;

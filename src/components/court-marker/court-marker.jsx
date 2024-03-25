import React, { useState } from "react";

//leaflet
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
// utilities
import { prepareCourtData } from "@/utilities/prepare-court-data";
// global state
import { useThemeStore } from "@/context/themeStore";
//icons
import courtIconSvgDark from "/icons/court-marker-dark.svg";
import courtIconSvgLight from "/icons/court-marker-light.svg";
// components
import CourtCard from "@/components/court-card-preview/court-card";
import Loader from "@/components/loader/loader";

const CourtMarker = React.memo(
  ({ courtId, markerPosition, showPopup }) => {
    const [courtDetails, setCourtDetails] = useState(null);
    const { currentTheme } = useThemeStore();
    const iconUrl =
      currentTheme === "dark" ? courtIconSvgDark : courtIconSvgLight;

    async function handlePopUp() {
      if (!courtDetails) {
        const adaptCourtData = await prepareCourtData(courtId);
        setCourtDetails(adaptCourtData);
      }
    }
    console.log(courtDetails);
    return (
      <Marker
        position={markerPosition}
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
          click: (e) => handlePopUp(e),
        }}
      >
        {showPopup && (
          <Popup>
            {courtDetails ? <CourtCard courtData={courtDetails} /> : <Loader />}
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

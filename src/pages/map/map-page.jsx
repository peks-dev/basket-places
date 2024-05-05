import React, { useRef } from "react";
import "./map-page.css";

// Context
import { useUserStore } from "@/context/userStore";
// utilities
import { HandleMapMovement } from "@/components/map/utilities/safe-map-position.utility";
// hooks
import { useLocationsCourtsList } from "./hooks/locations-courts-list.hook";
import { useMapStore } from "@/context/mapStore";
// Components
import UserPositionMarker from "@/components/map/components/user-position-marker";
import UserLocationBtn from "@/components/user-location-btn/user-location-btn";
import ErrorDisplay from "@/components/errors/error-display/error-display";
import CourtMarker from "@/components/court-marker/court-marker";
import ThemeButton from "@/components/theme-button/theme-button";
import FeedBackButton from "@/components/feedback-button/feedback-button";
import Loader from "@/components/loader/loader";
import Map from "@/components/map/map";

const MapPage = () => {
  const { profile } = useUserStore();
  const {
    courtsList,
    loading: markersLoading,
    error: markersError,
    fetchLocationCourts,
  } = useLocationsCourtsList();

  const { mapPagePosition, updateMapPageCenter, updateMapPageZoom } =
    useMapStore();
  const mapRef = useRef();

  async function handleReloadCourtsList() {
    try {
      localStorage.removeItem("courtCoordinates");
      await fetchLocationCourts();
    } catch (error) {
      throw error;
    }
  }

  if (markersLoading) {
    return <Loader />;
  }

  if (markersError) {
    return <ErrorDisplay />;
  }

  return (
    <div className="map-wrap">
      <Map
        mapRef={mapRef}
        mapPosition={mapPagePosition.coordinates && mapPagePosition.coordinates}
        zoomLevel={mapPagePosition.zoom && mapPagePosition.zoom}
      >
        <HandleMapMovement
          changePosition={updateMapPageCenter}
          changeZoom={updateMapPageZoom}
        />
        {profile.location && (
          <UserPositionMarker markerPosition={profile.location} />
        )}
        {courtsList.map((court) => (
          <CourtMarker
            key={court.court_id}
            courtId={court.court_id}
            markerPosition={court.coordinates}
            showPopup={true}
          />
        ))}
      </Map>
      <div className="map-controls-wrapper">
        <ThemeButton />
        <UserLocationBtn mapRef={mapRef} />
      </div>
      <FeedBackButton />
    </div>
  );
};

export default MapPage;

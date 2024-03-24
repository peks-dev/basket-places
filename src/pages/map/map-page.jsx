import React, { useContext, useState, useRef, useEffect } from "react";
import "./map-page.css";

// Context
import UserContext from "@/context/user/userContext";

// leaflet
import { Marker, Popup } from "react-leaflet";

// Components
import Map from "@/components/map/map";
import UserPositionMarker from "@/components/map/components/user-position-marker";
import { CourtMarkerIcon } from "@/components/map/components/icons/court-marker-icon";
import CourtCard from "@/components/court-card-preview/court-card";
import Error from "@/components/error/error";
import Loader from "@/components/loader/loader";
import UserLocationBtn from "@/components/user-location-btn/user-location-btn";

// utilities
import { prepareCourtData } from "@/utilities/prepare-court-data";
import { HandleMapMovement } from "@/components/map/utilities/safe-map-position.utility";

// hooks
import { useLocationsCourtsList } from "./hooks/locations-courts-list.hook";
import { useMapStore } from "@/context/mapStore";

const MapPage = () => {
  const { user } = useContext(UserContext);
  const {
    courtsList,
    loading: markersLoading,
    error: markersError,
    fetchLocationCourts,
  } = useLocationsCourtsList();
  const [courtSelected, setCourtSelected] = useState(null);
  const { mapPagePosition, updateMapPageCenter, updateMapPageZoom } =
    useMapStore();
  const mapRef = useRef();

  async function handleMarkerClick(courtId) {
    if (courtId) {
      const adaptCourtData = await prepareCourtData(courtId);
      setCourtSelected(adaptCourtData);
    }
  }

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
    return <Error />;
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
        {user.location && <UserPositionMarker markerPosition={user.location} />}

        {courtsList.map((court) => (
          <Marker
            key={court.court_id}
            position={court.coordinates}
            icon={CourtMarkerIcon}
            eventHandlers={{
              click: (e) => handleMarkerClick(court.court_id),
            }}
          >
            <Popup minWidth={300}>
              {courtSelected ? (
                <CourtCard
                  courtData={courtSelected}
                  showDeleteButton={false}
                  showCloseButton={false}
                />
              ) : (
                <Loader />
              )}
            </Popup>
          </Marker>
        ))}
      </Map>
      <div className="map-controls-wrapper">
        <UserLocationBtn mapRef={mapRef} />
      </div>
    </div>
  );
};

export default MapPage;

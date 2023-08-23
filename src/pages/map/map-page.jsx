import React, { useContext, useState } from "react";

import "./map-page.css";

// Context
import UserContext from "../../context/user/userContext";

// Components
import Map from "../../components/map/map";
import { Marker } from "react-leaflet";
import UserPositionMarker from "../../components/map/components/user-position-marker";
import { CourtMarkerIcon } from "../../components/map/components/icons/court-marker-icon";
import CourtCard from "../../components/court-card-preview/court-card";

// utilities
import { prepareCourtData } from "../../utilities/prepare-court-data";

// hooks
import { useCourtsMarkersList } from "./hooks/courts-markers-list.hook";

const MapPage = () => {
  const { user } = useContext(UserContext);
  const {
    markersData,
    loading: markersLoading,
    error: markersError,
  } = useCourtsMarkersList();
  const [courtSelected, setCourtSelected] = useState(null);
  const defaultLocation = [20.97974498745322, -89.6202153569469];

  const handleMarkerClick = async (courtId) => {
    console.log(`El marcador con court_id ${courtId} ha sido clickeado`);
    const adaptCourtData = await prepareCourtData(courtId);
    setCourtSelected(adaptCourtData);
    console.log(adaptCourtData);
  };

  if (markersLoading) {
    return <div>loading data...</div>;
  }

  if (markersError) {
    return <div>hubo un error</div>;
  }

  const userLocation = user.location || defaultLocation;

  console.log(userLocation);

  return (
    <div className="map-wrap">
      <Map
        mapPosition={userLocation}
        UserMarker={
          user.location ? (
            <UserPositionMarker markerPosition={userLocation} />
          ) : null
        }
        CourtsMarkers={markersData.map((court) => (
          <Marker
            key={court.court_id}
            position={court.coordinates}
            icon={CourtMarkerIcon}
            eventHandlers={{
              click: () => handleMarkerClick(court.court_id),
            }}
          />
        ))}
      />
      {courtSelected ? (
        <div className="map__court-card">
          <CourtCard
            courtData={courtSelected}
            showDeleteButton={false}
            showCloseButton={true}
            handleCloseButton={() => {
              setCourtSelected(null);
            }}
          />
        </div>
      ) : null}
    </div>
  );
};

export default MapPage;

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
import { useGetDataCourt } from "../court-details/hooks/use-get-data-court.hook";

const MapPage = () => {
  const { user } = useContext(UserContext);
  const {
    markersData,
    loading: markersLoading,
    error: markersError,
  } = useCourtsMarkersList();
  const [courtSelected, setCourtSelected] = useState(null);

  if (markersLoading) {
    return <div>loading data...</div>;
  }

  if (markersError) {
    return <div>hubo un error</div>;
  }

  const handleMarkerClick = async (courtId) => {
    console.log(`El marcador con court_id ${courtId} ha sido clickeado`);
    const adaptCourtData = await prepareCourtData(courtId);
    setCourtSelected(adaptCourtData);
    console.log(adaptCourtData);
  };
  return (
    <div className="map-wrap">
      {user.location ? (
        <Map
          userCoordinates={user.location}
          UserMarker={<UserPositionMarker markerPosition={user.location} />}
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
      ) : (
        <div>no hay ubicacion del usuario</div>
      )}
      {courtSelected ? (
        <div className="map__court-card">
          <CourtCard courtData={courtSelected} showDeleteButton={false} />
        </div>
      ) : null}
    </div>
  );
};

export default MapPage;

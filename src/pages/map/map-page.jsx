import React, { useContext, useState, useRef } from "react";
import "./map-page.css";

// Context
import UserContext from "../../context/user/userContext";

// leaflet
import { Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Components
import Map from "../../components/map/map";
import UserPositionMarker from "../../components/map/components/user-position-marker";
import { CourtMarkerIcon } from "../../components/map/components/icons/court-marker-icon";
import CourtCard from "../../components/court-card-preview/court-card";
import Error from "../../components/error/error";
import Loader from "../../components/loader/loader";
import Btn from "../../components/layout/button/button";

// utilities
import { prepareCourtData } from "../../utilities/prepare-court-data";

// hooks
import { useLocationsCourtsList } from "./hooks/locations-courts-list.hook";

const MapPage = () => {
  const { user, userLocation } = useContext(UserContext);
  const {
    courtsList,
    loading: markersLoading,
    error: markersError,
  } = useLocationsCourtsList();
  const [courtSelected, setCourtSelected] = useState(null);
  const mexicoCoordinates = [23.305952, -102.542565]
  const defaultMapPosition = user.location || mexicoCoordinates
  const mapRef = useRef()

  const handleMarkerClick = async (courtId) => {
    if(courtId){
      const adaptCourtData = await prepareCourtData(courtId);
      setCourtSelected(adaptCourtData);
    }  
  };

  if (markersLoading) {
    return <Loader />;
  }

  if (markersError) {
    return <Error />;
  }

  console.log(courtSelected)
 

  return (
    <div className="map-wrap">
      <Map
      mapRef={mapRef}
        mapPosition={defaultMapPosition}
        zoomLevel={4}
        CourtsMarkers={courtsList.map((court) => ( // renderizar listado de canchas
          <Marker
            key={court.court_id}
            position={court.coordinates}
            icon={CourtMarkerIcon}
            eventHandlers={{
              click: (e) => {handleMarkerClick(court.court_id); console.log(e)},
            }}
          >
            <Popup minWidth={350} >
            {courtSelected ? (
        
          <CourtCard
            courtData={courtSelected}
            showDeleteButton={false}
            showCloseButton={false}
          />
        
      ) : <Loader/>}
            </Popup>
          </Marker>
        ))}
        singleMarker={user.location && (<UserPositionMarker markerPosition={user.location}/>)}
      />
      <Btn text={"mi ubicacion"} variant={"btn--primary btn--map"} onClick={()=>{userLocation();}}/>
    </div>
  );
};

export default MapPage;

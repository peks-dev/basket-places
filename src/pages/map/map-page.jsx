import React, { useContext, useState, useRef, useEffect } from "react";
import "./map-page.css";

// Context
import UserContext from "../../context/user/userContext";

// leaflet
import { Marker, Popup } from "react-leaflet";

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
import { HandleMapMovement } from "../../components/map/utilities/safe-map-position.utility";

// hooks
import { useLocationsCourtsList } from "./hooks/locations-courts-list.hook";
import { useLocalStorage } from "../../hooks/use-local-storage.hook";

const MapPage = () => {
  const { user, userLocation } = useContext(UserContext);
  const {
    courtsList,
    loading: markersLoading,
    error: markersError,
    fetchLocationCourts,
  } = useLocationsCourtsList();
  const [courtSelected, setCourtSelected] = useState(null);
  const defaultMapPosition = [23.305952, -102.542565];
  const [mapPosition, setMapPosition] = useLocalStorage(
    "mapPosition",
    defaultMapPosition
  );
  const [mapZoom, setMapZoom] = useLocalStorage("mapZoom", 13);
  const mapRef = useRef();

  const handleMarkerClick = async (courtId) => {
    if (courtId) {
      const adaptCourtData = await prepareCourtData(courtId);
      setCourtSelected(adaptCourtData);
    }
  };

  const handleReloadCourtsList = async () => {
    try {
      localStorage.removeItem("courtCoordinates");
      await fetchLocationCourts();
    } catch (error) {
      throw error;
    }
  };

  const getUserLocation = () => {
    userLocation()
      .then((coordinates) => {
        mapRef.current.flyTo(coordinates, 13, { animate: true });
        setMapPosition(coordinates);
      })
      .catch((error) => {
        alert("hubo un error" + error);
      });
  };

  // Restablecer posicion del mapa
  useEffect(() => {
    if (
      // verification on localStorage
      localStorage.getItem("mapPosition") &&
      localStorage.getItem("mapZoom")
    ) {
      // Position
      const mapPositionItem = localStorage.getItem("mapPosition");
      const mapPositionParced = JSON.parse(mapPositionItem);
      setMapPosition(mapPositionParced);

      // zoom
      const mapZoomItem = localStorage.getItem("mapZoom");
      const mapZoomParsed = JSON.parse(mapZoomItem);
      setMapZoom(mapZoomParsed);
    }
  }, []);

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
        mapPosition={mapPosition}
        mapPositionSave={
          <HandleMapMovement
            changePosition={setMapPosition}
            changeZoom={setMapZoom}
          />
        }
        zoomLevel={mapZoom}
        CourtsMarkers={courtsList.map(
          (
            court // renderizar listado de canchas
          ) => (
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
          )
        )}
        singleMarker={
          user.location && <UserPositionMarker markerPosition={user.location} />
        }
      />
      <Btn
        text={"actualizar ubi"}
        variant={"btn--primary btn--map"}
        onClick={getUserLocation}
      />
    </div>
  );
};

export default MapPage;

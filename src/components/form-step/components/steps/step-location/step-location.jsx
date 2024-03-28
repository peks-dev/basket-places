import React, { useContext, useEffect, useState } from "react";
import "./step-location.css";

// Context
import UserContext from "@/context/user/userContext";

// Component
import Map from "@/components/map/map";
import Loader from "@/components/loader/loader";
import CourtMarker from "@/components/court-marker/court-marker";
// context
import { useStepFormStore } from "@/context/stepFormStore";
import { useMapStore } from "@/context/mapStore";

// Services
import { reverseGeocoding } from "@/services/geoapify/reverse-geocoding";

const StepLocation = () => {
  const { user } = useContext(UserContext);
  const [loadingMap, setLoadingMap] = useState(true);
  const {
    formData,
    updateCoordinates,
    updateCountry,
    updateState,
    updateCity,
  } = useStepFormStore();
  const {
    mapStepFormPosition,
    updateMapStepFormCenter,
    updateMapStepFormZoom,
  } = useMapStore();

  async function handleMarkerDragEnd(newPosition, newZoom) {
    updateCoordinates(newPosition);
    updateMapStepFormCenter(newPosition);
    updateMapStepFormZoom(newZoom);
    // reverse geocoding logic

    if (!formData.location.city) {
      const { lat, lng } = newPosition;
      const res = await reverseGeocoding(lat, lng);
      updateCountry(res.features[0].properties.country);
      updateState(res.features[0].properties.state);
      updateCity(res.features[0].properties.county);
      console.log("solicitud api realizada");
    }
  }
  // set coordinates to global state court
  useEffect(() => {
    if (!mapStepFormPosition.coordinates) {
      if (user.location) {
        updateCoordinates(user.location);
        updateMapStepFormCenter(user.location);
      }
    } else {
      setLoadingMap(false);
    }
  }, [mapStepFormPosition.coordinates, user.location]);

  return (
    <div className="map-selector">
      {loadingMap ? (
        <Loader />
      ) : (
        <Map
          mapPosition={
            mapStepFormPosition.coordinates && mapStepFormPosition.coordinates
          }
          zoomLevel={mapStepFormPosition.zoom ? mapStepFormPosition.zoom : 14}
        >
          <CourtMarker
            markerPosition={mapStepFormPosition.coordinates}
            isDraggable={true}
            onDragEnd={handleMarkerDragEnd}
          />
        </Map>
      )}
    </div>
  );
};

export default StepLocation;

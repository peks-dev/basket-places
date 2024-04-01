import React, { useEffect, useState } from "react";
import "./step-location.css";

// Component
import Map from "@/components/map/map";
import Loader from "@/components/loader/loader";
import CourtMarker from "@/components/court-marker/court-marker";
// context
import { useStepFormStore } from "@/context/stepFormStore";
import { useUserStore } from "@/context/userStore";
import { useMapStore } from "@/context/mapStore";

// Services
import { reverseGeocoding } from "@/services/geoapify/reverse-geocoding";

const StepLocation = () => {
  const { profile } = useUserStore();
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
  // set coordinates on map
  useEffect(() => {
    if (!mapStepFormPosition.coordinates) {
      if (profile.location) {
        updateCoordinates(profile.location);
        updateMapStepFormCenter(profile.location);
      }
    } else {
      setLoadingMap(false);
    }
  }, [mapStepFormPosition.coordinates, profile.location]);

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

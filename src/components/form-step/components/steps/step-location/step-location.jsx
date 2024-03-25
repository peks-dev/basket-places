import React, { useContext, useEffect, useState } from "react";
import "./step-location.css";

// Context
import UserContext from "@/context/user/userContext";

// Component
import Map from "@/components/map/map";
import DraggableMarker from "@/components/map/components/dragg-marker";
import Loader from "@/components/loader/loader";

import { useStepFormStore } from "@/context/stepFormStore";
import { useMapStore } from "@/context/mapStore";

const StepLocation = () => {
  const { user } = useContext(UserContext);
  const [loadingMap, setLoadingMap] = useState(true);
  const { updateCoordinates } = useStepFormStore();
  const {
    mapStepFormPosition,
    updateMapStepFormCenter,
    updateMapStepFormZoom,
  } = useMapStore();

  function handleMarkerDragEnd(newPosition, newZoom) {
    updateCoordinates(newPosition);
    updateMapStepFormCenter(newPosition);
    updateMapStepFormZoom(newZoom);
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
          <DraggableMarker
            position={mapStepFormPosition.coordinates}
            onDragEnd={handleMarkerDragEnd}
          />
        </Map>
      )}
    </div>
  );
};

export default StepLocation;

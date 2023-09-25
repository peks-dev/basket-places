import React, { useContext, useEffect, useState } from "react";
import "./map-selector.css";

// Context
import UserContext from "../../../../../../../context/user/userContext";
import CourtContext from "../../../../../../../context/court/court-context";

// Component
import Map from "../../../../../../../components/map/map";
import DraggableMarker from "../../../../../../../components/map/components/dragg-marker";
import Btn from "../../../../../../../components/layout/button/button";
import Loader from "../../../../../../loader/loader";

const MapSelector = ({ setTerritorySelected }) => {
  const { user } = useContext(UserContext);
  const { updateCoordinates, courtState } = useContext(CourtContext);
  const [loadingMap, setLoadingMap] = useState(true);

  const handleMarkerDragEnd = (newPosition) => {
    updateCoordinates(newPosition);
  };
  // set coordinates to global state court
  useEffect(() => {
    if (
      !courtState.location.coordinates ||
      Object.keys(courtState.location.coordinates).length === 0
    ) {
      if (user.location) {
        updateCoordinates(user.location);
      }
    } else {
      setLoadingMap(false);
    }
  }, [courtState.location.coordinates]);

  return (
    <div className="map-selector">
      {loadingMap ? (
        <Loader />
      ) : (
        <Map
          mapPosition={courtState.location.coordinates}
          zoomLevel={14}
          singleMarker={
            <DraggableMarker
              position={courtState.location.coordinates}
              onDragEnd={handleMarkerDragEnd}
            />
          }
        />
      )}
      <Btn
        text={"volver"}
        variant={"btn--primary"}
        onClick={() => {
          setTerritorySelected(false);
        }}
      />
    </div>
  );
};

export default MapSelector;

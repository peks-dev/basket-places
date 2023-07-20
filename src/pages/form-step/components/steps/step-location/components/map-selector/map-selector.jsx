import React, { useContext, useEffect, useState } from "react";
import "./map-selector.css";

// Context
import UserContext from "../../../../../../../context/user/userContext";
import CourtContext from "../../../../../../../context/court/court-context";

// Component
import Map from "../../../../../../../components/map/map";
import DraggableMarker from "../../../../../../../components/map/components/dragg-marker";
import Btn from "../../../../../../../components/layout/button/button";

const MapSelector = ({ setTerritorySelected }) => {
  const { user } = useContext(UserContext);
  const { updateCoordinates, courtState } = useContext(CourtContext);
  const [isLoading, setIsLoading] = useState(true);

  const handleMarkerDragEnd = (newPosition) => {
    updateCoordinates(newPosition);
  };

  useEffect(() => {
    if (Object.keys(courtState.location.coordinates).length === 0) {
      updateCoordinates(user.location);
    } else {
      setIsLoading(false);
    }
  }, [user.location, courtState.location.coordinates]);

  if (isLoading) {
    return <div className="cargando">Cargando...</div>;
  }

  console.log(courtState.location.coordinates);
  console.log(user.id);

  return (
    <div className="map-selector">
      <Map
        userLocation={courtState.location.coordinates}
        DraggMarker={
          <DraggableMarker
            position={courtState.location.coordinates}
            onDragEnd={handleMarkerDragEnd}
          />
        }
      />
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

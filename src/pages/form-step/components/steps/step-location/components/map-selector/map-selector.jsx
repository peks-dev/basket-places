import React, { useContext, useEffect } from "react";
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

  const handleMarkerDragEnd = (newPosition) => {
    updateCoordinates(newPosition);
  };

  useEffect(() => {
    if (!Object.keys(courtState.location.coordinates).length) {
      updateCoordinates(user.location);
    }
  }, []);

  // Verificar si courtState.location.coordinates tiene valores
  const hasCoordinates =
    Object.keys(courtState.location.coordinates).length > 0;

  if (!hasCoordinates) {
    return <div className="cargando">Cargando...</div>;
  }

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

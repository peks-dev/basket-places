import React, { useContext } from "react";

// Context
import CourtContext from "../../../../../context/court/court-context";

// Components
import PlaceTypeSelector from "./components/place-type-selector";
import RoofSelector from "./components/roof-selector";
import FloorTypeSelector from "./components/floor-type-selector";

const StepCourt = () => {
  const { courtState, updatePlaceType, updateRoof, updateFloorType } =
    useContext(CourtContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "place_type":
        updatePlaceType(value);
        break;
      case "roof":
        updateRoof(value);
        break;
      case "floor_type":
        updateFloorType(value);
        break;
    }
  };
  return (
    <>
      <PlaceTypeSelector
        state={courtState.place_type}
        handleInputChange={handleInputChange}
      />
      <RoofSelector
        state={courtState.roof}
        handleInputChange={handleInputChange}
      />
      <FloorTypeSelector
        state={courtState.floor_type}
        handleInputChange={handleInputChange}
      />
    </>
  );
};

export default StepCourt;

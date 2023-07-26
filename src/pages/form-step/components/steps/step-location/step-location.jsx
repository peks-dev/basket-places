import React, { useState } from "react";

// Components
import TerritorySelector from "./components/territory-selector/territory-selector";
import MapSelector from "./components/map-selector/map-selector";

const StepLocation = () => {
  const [territorySelected, setTerritorySelected] = useState(false);

  switch (territorySelected) {
    case true:
      return <MapSelector setTerritorySelected={setTerritorySelected} />;
    default:
      return <TerritorySelector setTerritorySelected={setTerritorySelected} />;
  }
};

export default StepLocation;

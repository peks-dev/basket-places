import React, { useContext } from "react";

// Context
import CourtContext from "../../../../../context/court/court-context";

// Components
import Selector from "./components/selector";

const StepCourt = () => {
  const { courtState, updatePlaceType, updateRoof, updateFloorType } =
    useContext(CourtContext);

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    switch (name) {
      case "place_type":
        updatePlaceType(value);
        break;
      case "roof":
        updateRoof(checked);
        break;
      case "floor_type":
        updateFloorType(value);
        break;
    }
  };
  const selectors = [
    {
      type: "radio",
      name: "place_type",
      title: "tipo de lugar",
      options: [
        { key: "deportivo", value: "deportivo" },
        { key: "parque", value: "parque" },
      ],
      selected: courtState.place_type,
    },
    {
      type: "checkbox",
      name: "roof",
      title: "¿Esta techado?",
      options: [{ key: "si", value: true }],
      selected: courtState.roof,
    },
    {
      type: "radio",
      name: "floor_type",
      title: "tipo de suelo",
      options: [
        { key: "duela", value: "duela" },
        { key: "cemento", value: "cemento" },
        { key: "otro", value: "otro" },
      ],
      selected: courtState.floor_type,
    },
  ];
  return (
    <div className="step-court">
      {selectors.map((selector, index) => (
        <Selector
          key={index}
          title={selector.title}
          type={selector.type}
          name={selector.name}
          options={selector.options}
          selected={selector.selected}
          handleInputChange={handleInputChange}
        />
      ))}
    </div>
  );
};

export default StepCourt;

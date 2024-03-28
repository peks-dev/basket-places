import React from "react";

// Context
import { useStepFormStore } from "@/context/stepFormStore";

// Components
import Selector from "./components/selector";

const StepCourt = () => {
  const { formData, updatePlaceType, updateRoof, updateFloorType } =
    useStepFormStore();

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
      selected: formData.place_type,
    },
    {
      type: "checkbox",
      name: "roof",
      title: "tiene techo",
      options: [{ key: "si", value: true }],
      selected: formData.roof,
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
      selected: formData.floor_type,
    },
  ];
  return (
    <div
      className="step-court"
      style={{ width: "100%", height: "100%", padding: "2.5rem" }}
    >
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

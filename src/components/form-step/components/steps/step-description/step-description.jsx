import React from "react";
import "./step-description.css";

// Context
import { useStepFormStore } from "@/context/stepFormStore";

// Components
import FormField from "@/components/form/form-field/form-field";
import StepDescriptionTextArea from "./components/step-description-text-area";

const StepDescription = () => {
  const { formData, updateName, updateDescription, updateGameLevel } =
    useStepFormStore();

  const niveles = ["bajo", "medio", "alto"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Nueva logica con el estado global
    switch (name) {
      case "nombre":
        updateName(value);
        break;
      case "descripcion":
        updateDescription(value);
        break;
      case "game_level":
        updateGameLevel(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="step-description">
      <FormField
        inputType={"text"}
        inputValue={formData.name || ""}
        handleInputChange={handleInputChange}
        inputName={"nombre"}
      />

      <StepDescriptionTextArea
        handleValue={formData.description || ""}
        handleInputChange={handleInputChange}
      />

      <div className="form__fields-wrap">
        <h3 className={"form__label"}>nivel de juego</h3>
        {niveles.map((level, index) => (
          <FormField
            key={index}
            inputName={"game_level"}
            inputType={"radio"}
            inputValue={level}
            inputId={`nivel-${level}`}
            inputChecked={formData.game_level === level}
            handleInputChange={handleInputChange}
            legendText={level}
          />
        ))}
      </div>
    </div>
  );
};

export default StepDescription;

import React, { useContext } from "react";

// Context
import CourtContext from "@/context/court/court-context";

// Components
import FormField from "@/components/form/form-field/form-field";
import Title from "@/components/layout/title/title";

const StepDescription = () => {
  const niveles = ["bajo", "medio", "alto"];

  const { courtState, updateName, updateDescription, updateGameLevel } =
    useContext(CourtContext);
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
        inputValue={courtState.name || ""}
        handleInputChange={handleInputChange}
        inputName={"nombre"}
      />
      <FormField
        inputType={"text"}
        inputValue={courtState.description || ""}
        handleInputChange={handleInputChange}
        inputName={"descripcion"}
      />

      <div className="form__fields-wrap">
        <Title tag={"h3"} text={"nivel de juego"} style={"title--label"} />
        {niveles.map((level, index) => (
          <FormField
            key={index}
            inputName={"game_level"}
            inputType={"radio"}
            inputValue={level}
            inputId={`nivel-${level}`}
            inputChecked={courtState.game_level === level}
            handleInputChange={handleInputChange}
            legendText={level}
          />
        ))}
      </div>
    </div>
  );
};

export default StepDescription;

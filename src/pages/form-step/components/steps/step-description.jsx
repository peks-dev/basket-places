import React, { useContext } from "react";

// Context
import CourtContext from "../../../../context/court/court-context";

const StepDescription = () => {
  const niveles = ["bajo", "medio", "alto"];

  const { courtState, updateName, updateDescription, updateGameLevel } =
    useContext(CourtContext);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Nueva logica con el estado global
    switch (name) {
      case "name":
        updateName(value);
        break;
      case "description":
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
    <>
      <div className="form__group">
        <label className="form__field-name" htmlFor="name">
          Nombre
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={courtState.name || ""}
          onChange={handleInputChange}
          className="form__input"
        />
      </div>
      <div className="form__group">
        <label className="form__field-name" htmlFor="description">
          Descripción
        </label>
        <input
          type="text"
          id="description"
          name="description"
          onChange={handleInputChange}
          value={courtState.description || ""}
          className="form__input"
        />
      </div>
      <div className="form__group">
        Nivel
        <ul className="form__inputs-wrap">
          {niveles.map((level, index) => (
            <li key={level} className="form__input-group">
              <label htmlFor={`nivel-${level}`}>{level}</label>
              <input
                className={"form__input"}
                type={"radio"}
                name={"game_level"}
                value={level}
                checked={courtState.game_level === level}
                id={`nivel-${level}`}
                onChange={handleInputChange}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default StepDescription;

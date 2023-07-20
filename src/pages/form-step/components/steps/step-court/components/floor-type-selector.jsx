import React from "react";

const FloorTypeSelector = ({ handleInputChange, state }) => {
  const floorTypes = ["duela", "cemento", "otro"];

  return (
    <div className="form__group">
      Tipo de suelo
      <ul className="form__inputs-wrap">
        {floorTypes.map((floor, index) => (
          <li key={index} className="form__input-group">
            <label htmlFor={floor}>{floor}</label>
            <input
              className="form__input"
              type="radio"
              name="floor_type"
              value={floor}
              id={floor}
              checked={state === floor}
              onChange={handleInputChange}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
export default FloorTypeSelector;

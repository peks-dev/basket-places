import React from "react";

const PlaceTypeSelector = ({ handleInputChange, state }) => {
  const placeTypes = ["deportivo", "parque"];
  return (
    <div className="form__group">
      tipo de lugar
      <ul className="form__inputs-wrap">
        {placeTypes.map((place, index) => (
          <li key={index} className="form__input-group">
            <label htmlFor={place}>{place}</label>
            <input
              className="form__input"
              type="radio"
              name="place_type"
              value={place}
              id={place}
              checked={state === place}
              onChange={handleInputChange}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaceTypeSelector;

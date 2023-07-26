import React, { useContext } from "react";

// Contexto
import CourtContext from "../../../../../../../../../context/court/court-context";

const DropdownSelector = ({
  options,
  name,
  selectedOption,
  setSelectedOption,
}) => {
  const { updateCountry, updateState, updateCity } = useContext(CourtContext);

  // Actualizar estado local y global del componente padre
  const handleSelection = (e) => {
    e.preventDefault();
    setSelectedOption(e.target.value);

    if (name === "country") {
      updateCountry(e.target.value);
    }
    if (name === "state") {
      updateState(e.target.value);
    }
    if (name === "city") {
      updateCity(e.target.value);
    }
  };

  return (
    <select
      value={selectedOption ? selectedOption : ""}
      className="territory-selector__input"
      name={name}
      onChange={handleSelection}
    >
      <option>--seleccionar--</option>
      {options.map((option, index) => (
        <option
          className="territory-selector__option"
          key={`${name}-${index}`}
          value={option[`${name}_name`]}
        >
          {option[`${name}_name`]}
        </option>
      ))}
    </select>
  );
};

export default DropdownSelector;

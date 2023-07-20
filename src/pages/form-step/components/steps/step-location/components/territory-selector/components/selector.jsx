import React, { useState } from "react";

const Selector = ({ options, name }) => {
  const [selectorValue, setSelectorValue] = useState("selecciona");

  const handleValue = (e) => {
    e.preventDefault();
    setSelectorValue(e.target.value);
  };

  return (
    <select className="territory-selector__input" name={name}>
      {options.map((option) => (
        <option
          className="territory-selector__option"
          key={option.id}
          onClick={handleValue}
          value={selectorValue}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Selector;

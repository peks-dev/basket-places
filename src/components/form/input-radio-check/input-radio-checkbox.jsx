import React from "react";
import "./input-radio-checkbox.css";

const InputRadioCheckbox = ({ type, name, value, id, handleChange }) => {
  return (
    <div className="inputRadioCheckbox">
      <input
        type={type}
        name={name}
        value={value}
        id={id}
        onChange={handleChange}
      />
      <label htmlFor={id} className="labelRadioCheckbox">
        {value}
      </label>
    </div>
  );
};

export default InputRadioCheckbox;

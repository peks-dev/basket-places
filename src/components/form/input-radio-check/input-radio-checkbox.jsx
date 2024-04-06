import React from "react";

const InputRadioCheckbox = ({ type, name, value, id, handleChange }) => {
  return (
    <label htmlFor={id} className="labelRadioCheckbox">
      <input
        type={type}
        name={name}
        value={value}
        id={id}
        onChange={handleChange}
        className="inputRadioCheckbox"
      />
    </label>
  );
};

export default InputRadioCheckbox;

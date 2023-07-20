import React from "react";

const RoofSelector = ({ handleInputChange, state }) => {
  const roof = [
    { key: "si", value: true },
    { key: "no", value: false },
  ];

  return (
    <div className="form__group">
      ¿Esta techado?
      <ul className="form__inputs-wrap">
        {roof.map((item, index) => (
          <li key={index} className="form__input-group">
            <label htmlFor={item.key}>{item.key}</label>
            <input
              className="form__input"
              type="radio"
              name="roof"
              value={item.value.toString()}
              checked={state === item.value.toString()}
              id={item.key}
              onChange={handleInputChange}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
export default RoofSelector;

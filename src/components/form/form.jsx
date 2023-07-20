import React from "react";
import "./form.css";
import Btn from "../layout/button/button";

const Form = ({ campos, buttons, formValues, handleInputChange, style }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes llamar a la función onSubmit si es necesario
  };

  return (
    <form className={`form ${style}`} onSubmit={handleSubmit}>
      {campos.map((campo) => (
        <div className="form__group" key={campo.name}>
          <label className="form__field-name" htmlFor={campo.name}>
            {campo.name}
          </label>
          <input
            className="form__input"
            type={campo.type}
            id={campo.name}
            name={campo.name}
            value={formValues[campo.name] || ""}
            onChange={handleInputChange}
          />
        </div>
      ))}
      <div className="form__btns-wrap">
        {buttons.map((button, index) => (
          <Btn
            key={index}
            text={button.text}
            type={button.type}
            onClick={button.onClick}
            variant={button.className}
          />
        ))}
      </div>
    </form>
  );
};

export default Form;

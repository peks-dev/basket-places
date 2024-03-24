import React from "react";

import "./button.css";

const Button = ({ type, onClick, variant, customStyle, disable, children }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn ${customStyle}`}
      data-variant={variant}
      disabled={disable}
    >
      {children}
    </button>
  );
};
export default Button;

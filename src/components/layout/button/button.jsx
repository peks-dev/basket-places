import React from "react";
import "./button.css";

const Btn = ({ text, onClick, variant, disabled, type }) => {
  return (
    <>
      <button
        className={`btn ${variant}`}
        onClick={onClick}
        type={type}
        disabled={disabled}
      >
        {text}
      </button>
    </>
  );
};
export default Btn;

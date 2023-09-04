import React from "react";
import "./form-step-header.css";

// Components
import ProgressBar from "./progress-bar/progress-bar";

const FormStepHeader = ({ step }) => {
  return (
    <header className="form-step__header">
      <ProgressBar step={step} />
    </header>
  );
};

export default FormStepHeader;

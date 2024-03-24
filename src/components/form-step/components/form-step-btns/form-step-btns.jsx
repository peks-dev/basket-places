import React from "react";
import "./form-step-btns.css";

// utilities
import { useStepFormStore } from "@/context/stepFormStore";

// Components
import Button from "@/components/button/button";
import ArrowIcon from "@/components/icons/arrow-icon";

const FormStepBtns = ({ onSend }) => {
  // states
  const { formData, nextStep, prevStep, currentStep } = useStepFormStore();

  const handleSendFormData = (e) => {
    e.preventDefault();
    onSend();
  };

  // render element
  return (
    <ul className="form-step__btns-wrap">
      <li>
        <Button onClick={prevStep} variant={"arrow"}>
          {currentStep === 0 ? "" : <ArrowIcon />}
        </Button>
      </li>
      <li>
        <Button
          onClick={currentStep === 5 ? handleSendFormData : nextStep}
          variant={currentStep === 5 ? "primary" : "arrow"}
          customStyle={"rotate"}
        >
          {currentStep === 5 ? "enviar" : <ArrowIcon rotate={true} />}
        </Button>
      </li>
    </ul>
  );
};

export default FormStepBtns;

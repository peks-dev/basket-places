import React, { useContext } from "react";
import "./form-step-btns.css";

// context
import CourtContext from "../../../../context/court/court-context";

// utilities
import { nextStep, prevStep } from "../../utilities/manipulation-steps";

// Components
import Btn from "../../../layout/button/button";

const FormStepBtns = ({ step, setStep, onSend }) => {
  // states
  const { courtState } = useContext(CourtContext);

  // Btn functions
  const handleNext = (e) => {
    e.preventDefault();
    nextStep(step, setStep);
  };

  const handlePrev = (e) => {
    e.preventDefault();
    prevStep(step, setStep);
  };
  const handleSendFormData = (e) => {
    e.preventDefault();
    onSend();
  };

  // render element
  return (
    <ul className="form-step__btns-wrap">
      <li>
        <Btn
          onClick={handlePrev}
          text={step === 0 ? "" : "atras"}
          variant={"btn--secundary"}
        />
      </li>
      <li>
        {courtState.location.coordinates.lat && (
          <Btn
            onClick={step === 5 ? handleSendFormData : handleNext}
            text={step === 5 ? "enviar" : "siguiente"}
            variant={step === 5 ? "btn--primary" : "btn--ternary"}
          />
        )}
      </li>
    </ul>
  );
};

export default FormStepBtns;

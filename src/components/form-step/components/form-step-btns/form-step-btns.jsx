import React, { useContext } from "react";
import "./form-step-btns.css";

// context
import CourtContext from "../../../../context/court/court-context";
import UserContext from "../../../../context/user/userContext";

// utilities
import { nextStep, prevStep } from "../../utilities/manipulation-steps";

// Components
import Btn from "../../../layout/button/button";

const FormStepBtns = ({ step, setStep, registerCourt }) => {
  // states
  const { courtState } = useContext(CourtContext);
  const { user } = useContext(UserContext);

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
    registerCourt(courtState, user.id);
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
            text={step === 5 ? "registrar" : "siguiente"}
            variant={step === 5 ? "btn--primary" : "btn--ternary"}
          />
        )}
      </li>
    </ul>
  );
};

export default FormStepBtns;

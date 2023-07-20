import React, { useState } from "react";
import "./form-step.css";

// Context
import CourtProvier from "../../context/court/court-provider";

//utilities
import nextStep from "./utilities/next-step";
import prevStep from "./utilities/prev-step";

// Componentes
import Btn from "../../components/layout/button/button";
import Instructions from "./components/instructions/instructions";
import HeaderFormStep from "./components/header/header";
import RenderStepContent from "./components/render-step-content";

const FormStep = () => {
  const [step, setStep] = useState(0);
  const [start, setStart] = useState(false);

  // Avanzar y retroceder en el form
  const handleNext = () => {
    nextStep(step, setStep);
  };
  const handlePrev = () => {
    prevStep(step, setStep);
  };

  const handleSendFormData = () => {
    // sendFormData();
    console.log("enviar data");
  };

  // Componente a renderizar
  return (
    <div className="form-step">
      {<HeaderFormStep start={start} step={step} />}
      <div className="form-step__box">
        {start ? (
          <div className="form-step__box-container">
            <form className="form-step__data">
              <ul className="form-step__steps-wrap">
                <li className={"form-step__active"}>
                  {
                    <CourtProvier>
                      <RenderStepContent stepToRender={step} />
                    </CourtProvier>
                  }
                </li>
              </ul>
            </form>
            <div className="form-step__btns-wrap">
              <>
                <Btn
                  onClick={handlePrev}
                  text={step === 0 ? "" : "atras"}
                  variant={"btn--secundary"}
                />
                <Btn
                  onClick={step === 5 ? handleSendFormData : handleNext}
                  text={step === 5 ? "registrar" : "siguiente"}
                  variant={step === 5 ? "btn--primary" : "btn--ternary"}
                />
              </>
            </div>
          </div>
        ) : (
          <Instructions
            onClick={() => {
              setStart(true);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default FormStep;

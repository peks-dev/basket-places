import React, { useState, useContext, useEffect } from "react";
import "./form-step.css";

// Context
import CourtContext from "../../context/court/court-context";

//utilities
import nextStep from "./utilities/next-step";
import prevStep from "./utilities/prev-step";

// Hooks
import { useSendForm } from "./hooks/use-send-form";

// Componentes
import Btn from "../../components/layout/button/button";
import Instructions from "./components/instructions/instructions";
import HeaderFormStep from "./components/header/header";
import RenderStepContent from "./components/render-step-content";

const FormStep = () => {
  const [step, setStep] = useState(0);
  const [start, setStart] = useState(false);
  const { courtState } = useContext(CourtContext);
  const { message } = useSendForm(courtState);

  // Avanzar y retroceder en el form
  const handleNext = () => {
    nextStep(step, setStep);
  };
  const handlePrev = () => {
    prevStep(step, setStep);
  };

  const handleSendFormData = () => {
    console.log(message);
  };

  useEffect(() => {
    // Limpiar los datos del stepLocation - territorySelector
    return () => {
      if (localStorage.getItem("authToken")) {
        localStorage.removeItem("authToken");
      }
      if (localStorage.getItem("countries")) {
        localStorage.removeItem("countries");
      }
    };
  }, []);

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
                  {<RenderStepContent stepToRender={step} />}
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

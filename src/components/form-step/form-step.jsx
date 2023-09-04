import React, { useState, useEffect } from "react";
import "./form-step.css";

// hook
import { useSendFormData } from "./hooks/use-send-form-data.hook";

// Components
import FormStepHeader from "./components/form-step-header/form-step-header";
import FormStepBtns from "./components/form-step-btns/form-step-btns";
import RenderStepContent from "./components/step-to-render";
import Loader from "../loader/loader";
import Error from "../error/error";

const FormStep = () => {
  const [step, setStep] = useState(0);
  const { loading, error, success, courtId, registerCourt } = useSendFormData();

  useEffect(() => {
    // Limpiar los datos del stepLocation al desmontar componente
    return () => {
      if (localStorage.getItem("authToken")) {
        localStorage.removeItem("authToken");
      }
      if (localStorage.getItem("countries")) {
        localStorage.removeItem("countries");
      }
    };
  }, []);

  return (
    <div className="form-step">
      <FormStepHeader step={step} />
      <form className="form-step__body">
        <div className="form-step__active">
          {loading && <Loader />}
          {error && <Error />}
          {success && <div> cancha {courtId} registrada correctamente</div>}
          {!loading && !success && !error && (
            <RenderStepContent stepToRender={step} />
          )}
        </div>
        {!loading && !success && !error && (
          <FormStepBtns
            step={step}
            setStep={setStep}
            registerCourt={registerCourt}
          />
        )}
      </form>
    </div>
  );
};

export default FormStep;

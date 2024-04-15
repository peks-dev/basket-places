import React from "react";
import "./register-court.css";

// Context
import { useStepFormStore } from "@/context/stepFormStore";
// hooks
// hooks
import { useRegisterNewCourt } from "@/components/form-step/hooks/use-send-form-data.hook";

// components
import FormStep from "@/components/form-step/form-step";
import Onboarding from "./components/onboarding/onboarding";

const RegisterCourtPage = () => {
  const { isFormStarted } = useStepFormStore();
  const { loading, error, success, registerCourt, resetError } =
    useRegisterNewCourt();

  return (
    <section className="register-court-page">
      {isFormStarted ? (
        <FormStep
          loadingState={loading}
          errorState={error}
          successState={success}
          resetErrorFn={resetError}
          sendFormFn={registerCourt}
        />
      ) : (
        <Onboarding />
      )}
    </section>
  );
};

export default RegisterCourtPage;

import React from "react";
import "./register-court.css";

// Context
import { useStepFormStore } from "../../context/stepFormStore";

// components
import FormStep from "../../components/form-step/form-step";
import Onboarding from "./components/onboarding/onboarding";

// hooks
import { useSendFormData } from "@/components/form-step/hooks/use-send-form-data.hook";

const RegisterCourtPage = () => {
  const { isFormStarted } = useStepFormStore();
  const { loading, error, success, registerCourt } = useSendFormData();
  const { formData } = useStepFormStore();

  if (error) {
    console.log(error);
  }

  return (
    <section className="register-court-page">
      {isFormStarted ? (
        <FormStep
          sendFunction={() => {
            registerCourt(formData);
          }}
          loadingState={loading}
          errorState={error}
          successState={success}
        />
      ) : (
        <Onboarding />
      )}
    </section>
  );
};

export default RegisterCourtPage;

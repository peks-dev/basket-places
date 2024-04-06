import React from "react";
import "./register-court.css";

// Context
import { useStepFormStore } from "@/context/stepFormStore";

// components
import FormStep from "@/components/form-step/form-step";
import Onboarding from "./components/onboarding/onboarding";

const RegisterCourtPage = () => {
  const { isFormStarted } = useStepFormStore();

  return (
    <section className="register-court-page">
      {isFormStarted ? <FormStep /> : <Onboarding />}
    </section>
  );
};

export default RegisterCourtPage;

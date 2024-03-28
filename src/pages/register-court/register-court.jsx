import React, { useContext } from "react";
import "./register-court.css";

// Context
import UserContext from "../../context/user/userContext";
import { useStepFormStore } from "../../context/stepFormStore";

// components
import FormStep from "../../components/form-step/form-step";
import Onboarding from "./components/onboarding/onboarding";

// hooks
import { useSendFormData } from "@/components/form-step/hooks/use-send-form-data.hook";

const RegisterCourtPage = () => {
  const { isFormStarted } = useStepFormStore();
  const { loading, error, success, registerCourt } = useSendFormData();
  const { user } = useContext(UserContext);
  const { formData } = useStepFormStore();
  if (error) {
    console.log(error);
  }
  return (
    <section className="register-court-page">
      {isFormStarted ? (
        <FormStep
          sendFunction={() => {
            registerCourt(formData, user.id);
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

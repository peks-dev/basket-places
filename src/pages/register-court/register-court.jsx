import React, { useContext } from "react";
import "./register-court.css";

// Context
import UserContext from "../../context/user/userContext";
import CourtContext from "../../context/court/court-context";

// components
import FormStep from "../../components/form-step/form-step";
import Onboarding from "./components/onboarding/onboarding";

// hooks
import { useSendFormData } from "@/components/form-step/hooks/use-send-form-data.hook";
import { useStepFormStore } from "@/context/stepFormStore";

const RegisterCourtPage = () => {
  const { isFormStarted } = useStepFormStore();
  const { loading, error, success, registerCourt } = useSendFormData();
  const { courtState } = useContext(CourtContext);
  const { user } = useContext(UserContext);
  return (
    <section className="register-court-page">
      {isFormStarted ? (
        <FormStep
          sendFunction={() => {
            registerCourt(courtState, user.id);
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

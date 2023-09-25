import React, { useState, useContext } from "react";
import "./register-court.css";

// Context
import UserContext from "../../context/user/userContext";
import CourtContext from "../../context/court/court-context";

// components
import FormStep from "../../components/form-step/form-step";
import Instructions from "./components/instructions/instructions";

// hooks
import { useSendFormData } from "../../components/form-step/hooks/use-send-form-data.hook";

const RegisterCourtPage = () => {
  const [start, setStart] = useState(false);
  const { loading, error, success, courtId, registerCourt } = useSendFormData();
  const { courtState } = useContext(CourtContext);
  const { user } = useContext(UserContext);
  return (
    <section className="register-court-page">
      {start ? (
        <FormStep
          sendFunction={() => {
            registerCourt(courtState, user.id);
          }}
          loadingState={loading}
          errorState={error}
          successState={success}
        />
      ) : (
        <Instructions onClick={setStart} />
      )}
    </section>
  );
};

export default RegisterCourtPage;

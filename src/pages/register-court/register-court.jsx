import React, { useState } from "react";
import "./register-court.css";

import FormStep from "../../components/form-step/form-step";
import Instructions from "./components/instructions/instructions";

const RegisterCourtPage = () => {
  const [start, setStart] = useState(false);
  return (
    <section className="register-court-page">
      {start ? <FormStep /> : <Instructions onClick={setStart} />}
    </section>
  );
};

export default RegisterCourtPage;

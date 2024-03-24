import React from "react";
import "./onboarding.css";
// Components
import Title from "@/components/layout/title/title";
import Button from "@/components/button/button";
import AddBpIcon from "@/components/icons/add-bp-icon";

import { useStepFormStore } from "@/context/stepFormStore";

const Onboarding = () => {
  const { startRegister } = useStepFormStore();
  return (
    <div className="onboarding">
      <div className="onboarding__svg-container">
        <AddBpIcon />
      </div>
      <Title text={"registrar basket place"} tag={"h1"} size={"title--xlg"} />
      <p>
        Comparte tu cancha, crea encuentros memorables y forma parte de la
        comunidad que impulsa el juego en cada rincón.
      </p>
      <Button variant={"primary"} type={"button"} onClick={startRegister}>
        agregar
      </Button>
    </div>
  );
};

export default Onboarding;

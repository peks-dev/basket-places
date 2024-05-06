import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./onboarding.css";
// Components
import Title from "@/components/layout/title/title";
import Button from "@/components/button/button";
import AddBpIcon from "@/components/icons/add-bp-icon";

// context
import { useStepFormStore } from "@/context/stepFormStore";
import { useUserStore } from "@/context/userStore";

const Onboarding = () => {
  const { startRegister } = useStepFormStore();
  const { profile } = useUserStore();
  const location = useLocation();
  const navigate = useNavigate();

  function handleStartRegister() {
    if (!profile.id) {
      navigate("/login", { state: { path: location.pathname } });
    } else {
      startRegister();
    }
  }

  return (
    <div className="onboarding">
      <div className="onboarding__svg-container">
        <AddBpIcon />
      </div>
      <Title text={"registrar basket place"} tag={"h1"} size={"title--xlg"} />
      <p className="onboarding__text">
        Comparte tu cancha, crea encuentros memorables y forma parte de la
        comunidad que impulsa el juego en cada rincón.
      </p>
      <Button variant={"primary"} type={"button"} onClick={handleStartRegister}>
        agregar
      </Button>
    </div>
  );
};

export default Onboarding;

import React from "react";

//steps
import StepImgs from "./steps/step-img/step-img";
import StepDescription from "./steps/step-description/step-description";
import StepCourt from "./steps/step-court/step-court";
import StepSchedule from "./steps/step-schedules/step-schedule";
import StepServices from "./steps/step-services";
import StepLocation from "./steps/step-location/step-location";

// context
import { useStepFormStore } from "@/context/stepFormStore";

const RenderStepContent = () => {
  const { currentStep } = useStepFormStore();

  switch (currentStep) {
    case 0:
      return <StepLocation />;
    case 1:
      return <StepImgs />;
    case 2:
      return <StepDescription />;
    case 3:
      return <StepCourt />;
    case 4:
      return <StepSchedule />;
    case 5:
      return <StepServices />;
    default:
      return null;
  }
};

export default RenderStepContent;

import React from "react";

import Button from "@/components/button/button";

const ScheduleBuilderButtons = ({ saveFn, cancelFn }) => {
  return (
    <div className="step-time__btns-wrap">
      <Button variant={"primary"} onClick={saveFn}>
        guardar
      </Button>
      <Button
        variant={"secundary"}
        onClick={() => {
          cancelFn(false);
        }}
      >
        cancelar
      </Button>
    </div>
  );
};

export default ScheduleBuilderButtons;

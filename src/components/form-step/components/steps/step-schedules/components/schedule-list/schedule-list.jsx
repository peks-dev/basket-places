import React from "react";

// Components
import Button from "@/components/button/button";
import Schedules from "@/components/schedules/schedules";

// Context
import { useStepFormStore } from "@/context/stepFormStore";

const ScheduleList = ({ setBuildingSchedule }) => {
  const { formData, removeSchedule } = useStepFormStore();

  const handleDeleteSet = (event) => {
    event.preventDefault();
    removeSchedule();
  };
  return (
    <div className="schedule-list__sets">
      <Schedules schedules={formData.schedules} />
      <ul className="step-time__btns-wrap">
        <li>
          {formData.schedules.length < 5 && (
            <Button
              variant={"primary"}
              onClick={() => {
                setBuildingSchedule(true);
              }}
            >
              agregar
            </Button>
          )}
        </li>
        {formData.schedules.length > 0 && (
          <li>
            <Button variant={"secundary"} onClick={handleDeleteSet}>
              eliminar
            </Button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default ScheduleList;

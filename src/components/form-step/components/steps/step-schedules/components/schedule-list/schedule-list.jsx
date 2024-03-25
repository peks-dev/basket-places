import React, { useContext } from "react";

// Components
import Button from "@/components/button/button";
import Schedules from "../../../../../../../components/schedules/schedules";

// Context
import CourtContext from "../../../../../../../context/court/court-context";

const ScheduleList = ({ setBuildingSchedule }) => {
  const { courtState, removeSchedule } = useContext(CourtContext);

  const handleDeleteSet = (event) => {
    event.preventDefault();
    removeSchedule();
  };
  return (
    <div className="schedule-list__sets">
      <Schedules schedules={courtState.schedules} />
      <ul className="step-time__btns-wrap">
        <li>
          <Button
            variant={"primary"}
            onClick={() => {
              setBuildingSchedule(true);
            }}
          >
            agregar
          </Button>
        </li>
        {courtState.schedules.length > 0 && (
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

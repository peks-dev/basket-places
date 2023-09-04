import React, { useContext } from "react";

// Components
import Btn from "../../../../../../../components/layout/button/button";
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
          <Btn
            text={"Añadir"}
            variant={"btn--primary"}
            onClick={() => {
              setBuildingSchedule(true);
            }}
          />
        </li>
        {courtState.schedules.length > 0 && (
          <li>
            <Btn
              text={"Eliminar"}
              variant={"btn--secundary"}
              onClick={handleDeleteSet}
            />
          </li>
        )}
      </ul>
    </div>
  );
};

export default ScheduleList;

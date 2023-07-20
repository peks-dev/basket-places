import React, { useContext } from "react";
import "./schedule-list.css";

// Components
import Btn from "../../../../../../../components/layout/button/button";

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
      <div className="schedule-list__sets-list">
        {courtState.schedules.map((set, index) => (
          <div key={index} className="schedule-list__sets-item">
            <ul className="schedule-list__sets-days">
              {set.days.map((day, index) => (
                <li className="schedule-list__sets-day" key={index}>
                  <span>{day.slice(0, 2)}</span>
                </li>
              ))}
            </ul>
            <span className="schedule-list__sets-time">{set.time}</span>
          </div>
        ))}
      </div>
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

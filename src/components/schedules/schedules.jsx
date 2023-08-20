import React from "react";
import "./schedules.css";

import Txt from "../layout/text-body/text-body";

const Schedules = ({ schedules }) => {
  return (
    <ul className="schedules">
      {schedules.map((schedule, index) => (
        <li key={index} className="schedules__set">
          {
            <ul className="schedules__days-wrap">
              {schedule.days.map((day, index) => (
                <li key={index} className="schedules__day">
                  <span> {day.slice(0, 2)}</span>
                </li>
              ))}
            </ul>
          }
          {
            <Txt
              content={schedule.time.slice(0, 5)}
              style={"schedules__time"}
            />
          }
        </li>
      ))}
    </ul>
  );
};

export default Schedules;

import React from "react";
import "./schedules.css";

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
          {<p className={"schedules__time"}>{schedule.time.slice(0, 5)}</p>}
        </li>
      ))}
    </ul>
  );
};

export default Schedules;

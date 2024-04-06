import React from "react";
// Array
import { days } from "../../../const/days";

const ScheduleDaysSelector = ({ handleInputChange }) => {
  return (
    <>
      <h2 className={"form__label"}>elige los dias</h2>

      <ul className="schedule-builder__days-wrap">
        {days.map((day, index) => {
          return (
            <li key={index} className="schedule-builder__day">
              <label
                className="schedule-builder__day-label"
                htmlFor={`day-${day}`}
              >
                {day}
              </label>
              <input
                className="form__input"
                type="checkbox"
                name="days"
                id={`day-${day}`}
                value={day}
                onChange={handleInputChange}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ScheduleDaysSelector;

import React from "react";

const ScheduleTimeSelector = ({ handleInputChange }) => {
  return (
    <>
      <label className="schedule-builder__timer" htmlFor="time-picker">
        <h3 className={"form__label"}>horario</h3>
        <input
          className="form__input"
          name="time-picker"
          id="time-picker"
          type="time"
          onChange={handleInputChange}
        />
      </label>
    </>
  );
};

export default ScheduleTimeSelector;

import React, { useState, useEffect, useContext } from "react";
import "./schedule-builder.css";

// Components
import Title from "../../../../../../../components/layout/title/title";
import Button from "@/components/button/button";
import NotificationPopup from "../../../../../../../components/notification-popup/notification-popup";

//Context
import CourtContext from "../../../../../../../context/court/court-context";

// utilities
import { ResetNotification } from "../../../../../../../utilities/reset-notification.utilitie";
import { setScheduleStates } from "../../utilities/set-schedules-states";

// Array
import { days } from "../../const/days";

const ScheduleBuilder = ({ setBuildingSchedule }) => {
  // Nofitication states
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  // Schedules states
  const [selectedDays, setSelectedDays] = useState([]);
  const [time, setTime] = useState(null);
  const newSet = {
    days: selectedDays,
    time: time,
  };

  const { updateSchedule } = useContext(CourtContext);

  // Reset notification
  useEffect(() => {
    ResetNotification(setShowNotification);
  }, [showNotification]);

  // Main function
  const handleAddSet = (event) => {
    event.preventDefault();

    // 1.- No data error control
    if (selectedDays.length === 0 || !time) {
      setNotificationMessage("Selecciona minimo un día y una hora");
      setShowNotification(true);
      return;
    }
    // 2.- state change
    updateSchedule(newSet);

    // 3.- Reset states
    setSelectedDays([]);
    setTime(null);
    setBuildingSchedule(false);
  };

  // Rellenar los states con los inputs
  const handleInputChange = (e) => {
    setScheduleStates(e, setSelectedDays, setTime);
  };

  return (
    <>
      <div className="schedule-builder__set">
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
        <ul className="step-time__btns-wrap">
          <li>
            <Button variant={"primary"} onClick={handleAddSet}>
              guardar
            </Button>
          </li>
          <li>
            <Button
              variant={"secundary"}
              onClick={() => {
                setBuildingSchedule(false);
              }}
            >
              cancelar
            </Button>
          </li>
        </ul>
      </div>
      {showNotification ? (
        <NotificationPopup message={notificationMessage} />
      ) : (
        ""
      )}
    </>
  );
};

export default ScheduleBuilder;

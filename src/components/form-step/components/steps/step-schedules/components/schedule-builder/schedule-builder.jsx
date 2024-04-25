import React, { useState, useEffect } from "react";
import "./schedule-builder.css";
//Context
import { useStepFormStore } from "@/context/stepFormStore";
// utilities
import { ResetNotification } from "@/utilities/reset-notification.utilitie";
import { setScheduleStates } from "../../utilities/set-schedules-states";
import ScheduleBuilderButtons from "./components/schedule-builder-buttons";
// Components
import NotificationPopup from "@/components/notification-popup/notification-popup";
import ScheduleDaysSelector from "./components/schedule-days-selector";
import ScheduleTimeSelector from "./components/schedule-time-selector";

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

  const { updateSchedule } = useStepFormStore();

  // Reset notification
  useEffect(() => {
    ResetNotification(setShowNotification);
  }, [showNotification]);

  // Main function
  const handleAddSet = (event) => {
    event.preventDefault();

    // 1.- Error control
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
    // utilitie
    setScheduleStates(e, setSelectedDays, setTime);
  };

  return (
    <>
      <div className="schedule-builder__set">
        <ScheduleDaysSelector handleInputChange={handleInputChange} />
        <ScheduleTimeSelector handleInputChange={handleInputChange} />
        <ScheduleBuilderButtons
          saveFn={handleAddSet}
          cancelFn={setBuildingSchedule}
        />
      </div>
      {showNotification && <NotificationPopup message={notificationMessage} />}
    </>
  );
};

export default ScheduleBuilder;

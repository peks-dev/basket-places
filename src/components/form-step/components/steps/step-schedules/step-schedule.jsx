// Services
import React, { useState } from "react";
import "./step-schedule.css";

// Components
import ScheduleBuilder from "./components/schedule-builder/schedule-builder";
import ScheduleList from "./components/schedule-list/schedule-list";

const StepSchedule = () => {
  // Notification
  const [buildingSchedule, setBuildingSchedule] = useState(false);

  // Main component to render
  return (
    <div className="step-time">
      {buildingSchedule ? (
        <ScheduleBuilder setBuildingSchedule={setBuildingSchedule} />
      ) : (
        <ScheduleList setBuildingSchedule={setBuildingSchedule} />
      )}
    </div>
  );
};

export default StepSchedule;

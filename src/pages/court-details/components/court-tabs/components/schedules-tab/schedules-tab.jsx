import React from "react";

// Components
import Schedules from "../../../../../../components/schedules/schedules";

const SchedulesTab = ({ schedules }) => {
  return (
    <>
      <Schedules schedules={schedules} />
    </>
  );
};

export default SchedulesTab;

import React from "react";

// Components
import TabWrapper from "../tab-wrapper/tab-wrapper";
import Schedules from "@/components/schedules/schedules";

const SchedulesTab = ({ courtData }) => {
  return (
    <TabWrapper variant="tab-schedules">
      <Schedules schedules={courtData.schedules} />
    </TabWrapper>
  );
};

export default SchedulesTab;

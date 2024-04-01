import React from "react";
// context
import { useCourtDetailsStore } from "@/context/courtDetailsStore";
// Components
import TabWrapper from "../tab-wrapper/tab-wrapper";
import Schedules from "@/components/schedules/schedules";

const SchedulesTab = () => {
  const { courtData } = useCourtDetailsStore();
  return (
    <TabWrapper variant="tab-schedules">
      <Schedules schedules={courtData.schedules} />
    </TabWrapper>
  );
};

export default SchedulesTab;

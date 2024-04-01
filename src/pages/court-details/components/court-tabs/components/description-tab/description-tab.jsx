import React from "react";

// context
import { useCourtDetailsStore } from "@/context/courtDetailsStore";

// Components
import TabWrapper from "../tab-wrapper/tab-wrapper";
import CourtServices from "./components/court-services/court-services";
import CourtRoofFloor from "./components/court-roof-floor/court-roof-floor";

const DescriptionTab = () => {
  const { courtData } = useCourtDetailsStore();

  return (
    <TabWrapper variant="tab-description">
      <p>{courtData.description}</p>
      <CourtServices />
      <CourtRoofFloor />
    </TabWrapper>
  );
};

export default DescriptionTab;

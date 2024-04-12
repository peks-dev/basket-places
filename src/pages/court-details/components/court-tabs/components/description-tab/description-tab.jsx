import React from "react";

// Components
import TabWrapper from "../tab-wrapper/tab-wrapper";
import CourtServices from "./components/court-services/court-services";
import CourtRoofFloor from "./components/court-roof-floor/court-roof-floor";

const DescriptionTab = ({ courtData }) => {
  return (
    <TabWrapper variant="tab-description">
      <p>{courtData.description}</p>
      <CourtServices courtData={courtData} />
      <CourtRoofFloor courtData={courtData} />
    </TabWrapper>
  );
};

export default DescriptionTab;

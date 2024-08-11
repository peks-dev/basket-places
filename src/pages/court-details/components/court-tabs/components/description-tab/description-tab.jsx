import React from "react";

// Components
import TabWrapper from "../tab-wrapper/tab-wrapper";
import CourtServices from "./components/court-services/court-services";
import CourtRoofFloor from "./components/court-roof-floor/court-roof-floor";

const DescriptionTab = ({ courtData }) => {
  return (
    <TabWrapper variant="tab-description">
      <p>{courtData.description}</p>
      <div>
        <CourtServices courtData={courtData} />
        <CourtRoofFloor courtData={courtData} />
      </div>
    </TabWrapper>
  );
};

export default DescriptionTab;

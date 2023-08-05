import React from "react";
import "./description-tab.css";

// Components
import Txt from "../../../../../../components/layout/text-body/text-body";
import CourtServices from "./components/court-services/court-services";
import CourtRoofFloor from "./components/court-roof-floor/court-roof-floor";

const DescriptionTab = ({ description, services, floor_type, roof }) => {
  return (
    <>
      <Txt content={description} style={"txt--center"} />
      <CourtServices services={services} />
      <CourtRoofFloor floor_type={floor_type} roof={roof} />
    </>
  );
};

export default DescriptionTab;

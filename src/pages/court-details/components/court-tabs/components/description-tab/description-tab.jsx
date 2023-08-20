import React from "react";
import "./description-tab.css";

// Components
import Txt from "../../../../../../components/layout/text-body/text-body";
import CourtServices from "./components/court-services/court-services";
import CourtRoofFloor from "./components/court-roof-floor/court-roof-floor";

const DescriptionTab = ({ description, services, floor_type, roof }) => {
  return (
    <>
      <CourtServices services={services} />
      <div className="description-tab__txt-wrap">
        <Txt content={description} style={"txt--center"} />
      </div>
      <CourtRoofFloor floor_type={floor_type} roof={roof} />
    </>
  );
};

export default DescriptionTab;

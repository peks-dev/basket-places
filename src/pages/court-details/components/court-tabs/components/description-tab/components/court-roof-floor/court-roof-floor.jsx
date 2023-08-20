import React from "react";
import "./court-roof-floor.css";

// Components
import Txt from "../../../../../../../../components/layout/text-body/text-body";
import Title from "../../../../../../../../components/layout/title/title";

const CourtRoofFloor = ({ floor_type, roof }) => {
  return (
    <div className="roof-floor-container">
      <div>
        <Title text={"suelo"} tag={"h2"} style={"title--small"} />
        <Txt content={floor_type} style={"txt--center"} />
      </div>
      <div>
        <Title text={"techo"} tag={"h2"} style={"title--small"} />
        <Txt content={roof === true ? "si" : "no"} style={"txt--center"} />
      </div>
    </div>
  );
};

export default CourtRoofFloor;

import React from "react";
import "./court-roof-floor.css";

// Components
import Txt from "../../../../../../../../components/layout/text-body/text-body";

const CourtRoofFloor = ({ floor_type, roof }) => {
  return (
    <div className="roof-floor-container">
      <div>
        tipo de suelo
        <Txt content={floor_type} style={"txt--bolt"} />
      </div>
      <div>
        ¿Esta techado?
        <Txt content={roof === true ? "si" : "no"} style={"txt--bolt"} />
      </div>
    </div>
  );
};

export default CourtRoofFloor;

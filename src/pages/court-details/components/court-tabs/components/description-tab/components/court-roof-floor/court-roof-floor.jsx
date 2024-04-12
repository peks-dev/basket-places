import React from "react";
import "./court-roof-floor.css";

const CourtRoofFloor = ({ courtData }) => {
  return (
    <ul className="roof-floor-wrapper">
      <li>
        <p>
          <span>suelo</span>
          {courtData.floor_type}
        </p>
      </li>
      <li>
        <p>
          <span>techo</span>
          {courtData.roof ? "si" : "no"}
        </p>
      </li>
    </ul>
  );
};

export default CourtRoofFloor;

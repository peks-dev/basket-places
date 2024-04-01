import React from "react";
import "./court-roof-floor.css";

// context
import { useCourtDetailsStore } from "@/context/courtDetailsStore";
// components

const CourtRoofFloor = () => {
  const { courtData } = useCourtDetailsStore();

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

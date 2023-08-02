import React from "react";
import { useParams } from "react-router-dom";

// Components
import CourtSlider from "./components/court-slider/court-slider";
import CourtHeader from "./components/court-header/court-header";
import CourtBody from "./components/court-body/court-body";

const CourtDetails = () => {
  const courtPath = useParams();

  return (
    <div className="court-details-container">
      <CourtSlider />
      <CourtHeader />
      <CourtBody />
    </div>
  );
};

export default CourtDetails;

//

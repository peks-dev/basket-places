import React from "react";
import { useLocation } from "react-router-dom";
// components
import DescriptionTab from "../components/description-tab/description-tab";
import ReviewTab from "../components/reviews-tab/review-tab";
import LocationTab from "../components/location-tab/location-tab";
import SchedulesTab from "../components/schedules-tab/schedules-tab";

const ActiveTabRendered = ({ tabActive, courtData }) => {
  switch (tabActive) {
    case "descripcion":
      return <DescriptionTab courtData={courtData} />;
    case "horarios":
      return <SchedulesTab courtData={courtData} />;

    case "ubicacion":
      return <LocationTab courtData={courtData} />;
    case "comentarios":
      return <ReviewTab />;
  }
};

export default ActiveTabRendered;

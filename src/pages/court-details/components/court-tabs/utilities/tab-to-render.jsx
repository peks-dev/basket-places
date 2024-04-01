import React from "react";
// components
import DescriptionTab from "./components/description-tab/description-tab";
import ReviewTab from "./components/reviews-tab/review-tab";
import LocationTab from "./components/location-tab/location-tab";
import SchedulesTab from "./components/schedules-tab/schedules-tab";

const ActiveTabRendered = () => {
  switch (tabActive) {
    case "descripcion":
      return <DescriptionTab />;
    case "horarios":
      return <SchedulesTab />;

    case "ubicacion":
      return <LocationTab />;
    case "comentarios":
      return <ReviewTab />;
  }
};

export default ActiveTabRendered;

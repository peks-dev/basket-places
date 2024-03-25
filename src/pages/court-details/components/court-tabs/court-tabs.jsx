import React, { useState } from "react";
import "./court-tabs.css";

// components
import Button from "@/components/button/button";
import CourtMarkerIcon from "../../../../components/map/components/icons/court-marker-icon";
import { Marker } from "react-leaflet";
import CourtMarker from "@/components/court-marker/court-marker";

//Tabs components
import Map from "../../../../components/map/map";
import Schedules from "../../../../components/schedules/schedules";
import DescriptionTab from "./components/description-tab/description-tab";
import ReviewTab from "./components/reviews-tab/review-tab";

const CourtTabs = ({
  description,
  services,
  floor_type,
  roof,
  schedules,
  coordinates,
}) => {
  const [tabActive, setTabActive] = useState("descripcion");

  const tabsNames = ["descripcion", "horarios", "ubicacion", "reseñas"];

  const handleTabToRender = (e) => {
    e.preventDefault();
    const tabName = e.target.innerText;
    setTabActive(tabName);
  };

  const renderTab = () => {
    switch (tabActive) {
      case "descripcion":
        return (
          <DescriptionTab
            description={description}
            services={services}
            floor_type={floor_type}
            roof={roof}
          />
        );
      case "horarios":
        return <Schedules schedules={schedules} />;

      case "ubicacion":
        return (
          <Map mapPosition={coordinates} zoomLevel={13}>
            <CourtMarker markerPosition={coordinates} />
          </Map>
        );
      case "reseñas":
        return <ReviewTab />;
    }
  };
  return (
    <div className="court-tabs-container">
      <ul className="court-tabs__header">
        {tabsNames.map((tab, index) => {
          return (
            <li key={index}>
              <Button
                onClick={handleTabToRender}
                variant={
                  tab === tabActive ? "btn--tab btn--tab-active" : "btn--tab"
                }
              >
                tab
              </Button>
            </li>
          );
        })}
      </ul>
      <div className="court-tabs__content">{renderTab()}</div>
    </div>
  );
};

export default CourtTabs;

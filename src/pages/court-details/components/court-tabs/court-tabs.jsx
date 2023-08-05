import React, { useState } from "react";
import "./court-tabs.css";

// components
import Btn from "../../../../components/layout/button/button";
import Map from "../../../../components/map/map";
import UserMarker from "../../../../components/map/components/user-position-marker";
import Schedules from "../../../../components/schedules/schedules";
import DescriptionTab from "./components/description-tab/description-tab";

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
          <Map
            userLocation={coordinates}
            UserMarker={<UserMarker markerPosition={coordinates} />}
          />
        );
    }
  };
  return (
    <div className="court-tabs-container">
      <ul className="court-tabs__header">
        {tabsNames.map((tab, index) => {
          return (
            <li key={index}>
              <Btn
                text={tab}
                onClick={handleTabToRender}
                variant={
                  tab === tabActive ? "btn--tab btn--tab-active" : "btn--tab"
                }
              />
            </li>
          );
        })}
      </ul>
      <div className="court-tabs__content">{renderTab()}</div>
    </div>
  );
};

export default CourtTabs;

import React, { useState } from "react";
import "./court-tabs.css";

// components
import TabsButtons from "./components/tabs-buttons/tabs-buttons";

const CourtTabs = () => {
  const [currentTab, setCurrentTab] = useState("descripcion");
  return (
    <div className="court-details__tabs-wrap">
      <TabsButtons changeTabFn={setCurrentTab} tabState={currentTab} />
      <div className="court-details__tab-content"> tab content</div>
    </div>
  );
};

export default CourtTabs;

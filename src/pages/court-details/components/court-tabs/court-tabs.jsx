import React, { useState } from "react";
import "./court-tabs.css";

// components
import TabsButtons from "./components/tabs-buttons/tabs-buttons";
import ActiveTabRendered from "./utilities/tab-to-render";

const CourtTabs = () => {
  const [currentTab, setCurrentTab] = useState("descripcion");
  return (
    <div className="court-details__tabs-wrap">
      <TabsButtons changeTabFn={setCurrentTab} tabState={currentTab} />
      <div className="court-details__tab-content">
        <ActiveTabRendered tabActive={currentTab} />
      </div>
    </div>
  );
};

export default CourtTabs;

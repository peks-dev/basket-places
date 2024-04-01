import React from "react";

// components
import Button from "@/components/button/button";

const TabsButtons = ({ tabState, changeTabFn }) => {
  const tabsNames = ["descripcion", "horarios", "ubicacion", "comentarios"];

  return (
    <ul className="court-details__tabs-buttons">
      {tabsNames.map((tab, index) => (
        <Button
          key={index}
          onClick={() => changeTabFn(tab)}
          type={"button"}
          variant={"secundary"}
          customStyle={tabState === tab && "active"}
        >
          {tab}
        </Button>
      ))}
    </ul>
  );
};

export default TabsButtons;

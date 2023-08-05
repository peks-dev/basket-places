import React from "react";
import "./court-services.css";

import Title from "../../../../../../../../components/layout/title/title";
import ShopIcon from "./components/shop-icon";
import BathroomIcon from "./components/bathroom-icon";
import TransportIcon from "./components/transport-icon";
import WifiIcon from "./components/wifi-icon";

const CourtServices = ({ services }) => {
  return (
    <div className="services-container">
      <Title
        text={"servicios cercanos"}
        style={"title--center title--small"}
        tag={"h2"}
      />
      <ul className="services-icons">
        <li>
          <ShopIcon color={services.tienda === true ? "#c86804" : "#000000"} />
        </li>
        <li>
          <BathroomIcon
            color={services.bathroom === true ? "#c86804" : "#000000"}
          />
        </li>
        <li>
          <WifiIcon color={services.wifi === true ? "#c86804" : "#000000"} />
        </li>
        <li>
          <TransportIcon
            color={services.transporte === true ? "#c86804" : "#000000"}
          />
        </li>
      </ul>
    </div>
  );
};

export default CourtServices;

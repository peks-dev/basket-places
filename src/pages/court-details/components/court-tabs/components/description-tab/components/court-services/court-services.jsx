import React from "react";
import "./court-services.css";

import Title from "../../../../../../../../components/layout/title/title";
import ShopIcon from "./components/shop-icon";
import BathroomIcon from "./components/bathroom-icon";
import TransportIcon from "./components/transport-icon";
import WifiIcon from "./components/wifi-icon";
import Txt from "../../../../../../../../components/layout/text-body/text-body";

const CourtServices = ({ services }) => {
  return (
    <div className="services-container">
      <ul className="services__icons-wrap">
        <li>
          <Txt
            content={"tienda"}
            style={"txt--small txt--center txt--orange"}
          />
          <ShopIcon color={services.tienda === true ? "#c86804" : "#000000"} />
        </li>
        <li>
          <Txt content={"baños"} style={"txt--small txt--center txt--orange"} />
          <BathroomIcon
            color={services.bathroom === true ? "#c86804" : "#000000"}
          />
        </li>
        <li>
          <Txt content={"wifi"} style={"txt--small txt--center txt--orange"} />
          <WifiIcon color={services.wifi === true ? "#c86804" : "#000000"} />
        </li>
        <li>
          <Txt
            content={"transporte"}
            style={"txt--small txt--center txt--orange"}
          />
          <TransportIcon
            color={services.transporte === true ? "#c86804" : "#000000"}
          />
        </li>
      </ul>
    </div>
  );
};

export default CourtServices;

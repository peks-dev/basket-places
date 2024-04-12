import React from "react";
import "./court-services.css";

// components
import ShopIcon from "./components/shop-icon";
import BathroomIcon from "./components/bathroom-icon";
import TransportIcon from "./components/transport-icon";
import WifiIcon from "./components/wifi-icon";

const CourtServices = ({ courtData }) => {
  const servicesArr = [
    { name: "shop", icon: ShopIcon },
    { name: "bathroom", icon: BathroomIcon },
    { name: "wifi", icon: WifiIcon },
    { name: "transport", icon: TransportIcon },
  ];

  return (
    <ul className="services-wrapper">
      {servicesArr.map((service, index) => (
        <li key={index} className="services__icon-container">
          <service.icon
            color={
              courtData.services[service.name]
                ? "var(--secundary)"
                : "var(--ternary)"
            }
          />
        </li>
      ))}
    </ul>
  );
};

export default CourtServices;

import React from "react";
import "./territory-selector.css";

// Components
import Btn from "../../../../../../../components/layout/button/button";
import Title from "../../../../../../../components/layout/title/title";
import Selector from "./components/selector";

const TerritorySelector = ({ setTerritorySelected }) => {
  const paisList = [
    { id: 1, label: "México" },
    { id: 2, label: "Colombia" },
    { id: 3, label: "Argentina" },
  ];

  const estadoList = [
    { id: 1, label: "Yucatán" },
    { id: 2, label: "Veracruz" },
    { id: 3, label: "Monterrey" },
  ];

  const ciudadList = [
    { id: 1, label: "Mérida" },
    { id: 2, label: "San Francisco" },
    { id: 3, label: "Isla Mujeres" },
  ];

  return (
    <div className="territory-selector-container">
      <ul className="territory-selector__wrap">
        <li className="territory-selector__group">
          <Title
            text={"país"}
            style={"title--left title--form-sub"}
            tag={"h3"}
          />
          <Selector options={paisList} name="pais" />
        </li>
        <li className="territory-selector__group">
          <Title
            text={"estado"}
            style={"title--left title--form-sub"}
            tag={"h3"}
          />
          <Selector options={estadoList} name="estado" />
        </li>
        <li className="territory-selector__group">
          <Title
            text={"ciudad"}
            style={"title--left title--form-sub"}
            tag={"h3"}
          />
          <Selector options={ciudadList} name="ciudad" />
        </li>
      </ul>

      <Btn
        variant={"btn--primary"}
        text={"Ir a mapa"}
        onClick={() => {
          setTerritorySelected(true);
        }}
      />
    </div>
  );
};

export default TerritorySelector;

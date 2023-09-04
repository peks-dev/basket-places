import React from "react";
import "./progress-bar.css";

// Iconos
import MarkerIcon from "../../../../../assets/form-step/marker-icon";
import CourtIcon from "../../../../../assets/form-step/court-icon";
import DayIcon from "../../../../../assets/form-step/day-icon";
import DocumentIcon from "../../../../../assets/form-step/document-icon";
import ListIcon from "../../../../../assets/form-step/list-icon";
import ImgIcon from "../../../../../assets/form-step/img-icon";

// Componentes
import Title from "../../../../layout/title/title";

const ProgressBar = ({ step }) => {
  const icons = [
    MarkerIcon,
    ImgIcon,
    DocumentIcon,
    CourtIcon,
    DayIcon,
    ListIcon,
  ];
  const titlesProgres = [
    "ubicacion",
    "imagenes",
    "descripcion",
    "cancha",
    "días y horarios",
    "servicios",
  ];

  return (
    <>
      <ul className="form__progress-wrap">
        {icons.map((icon, index) => (
          <li
            key={index}
            className={`form__progress-item ${
              index <= step ? "form__progress-item--active" : ""
            }`}
          >
            {React.createElement(icon)}
          </li>
        ))}
      </ul>
      <Title text={titlesProgres[step]} tag={"h2"} style={"tittle--center"} />
    </>
  );
};

export default ProgressBar;

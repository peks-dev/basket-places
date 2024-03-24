import React from "react";
import "./form-step-header.css";

// Iconos
import MarkerIcon from "@/assets/form-step/marker-icon";
import CourtIcon from "@/assets/form-step/court-icon";
import DayIcon from "@/assets/form-step/day-icon";
import DocumentIcon from "@/assets/form-step/document-icon";
import ListIcon from "@/assets/form-step/list-icon";
import ImgIcon from "@/assets/form-step/img-icon";

// Componentes
import Title from "@/components/layout/title/title";

// Context
import { useStepFormStore } from "@/context/stepFormStore";

const FormStepHeader = () => {
  const { currentStep } = useStepFormStore();

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
    <header className="form-step__header">
      <ul className="form__progress-wrap">
        {icons.map((icon, index) => (
          <li
            key={index}
            className={`form__progress-item ${
              index <= currentStep ? "form__progress-item--active" : ""
            }`}
          >
            {React.createElement(icon)}
          </li>
        ))}
      </ul>
      <Title text={titlesProgres[currentStep]} tag={"h2"} size={"title--xlg"} />
    </header>
  );
};

export default FormStepHeader;

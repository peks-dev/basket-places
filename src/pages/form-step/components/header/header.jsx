import React from "react";
import logoSite from "../../../../assets/global/bp-logo.svg";

// Components
import Title from "../../../../components/layout/title/title";
import ProgressBar from "../progress-bar/progress-bar";

const HeaderFormStep = ({ start, step }) => {
  return (
    <header className="form-step__header">
      {start ? (
        <ProgressBar step={step} />
      ) : (
        <>
          {/* Header de las instrucciones*/}
          <img
            className="form-step__header-img"
            src={logoSite}
            alt="logo de basket places"
          />
          <Title text={"Registrar BP"} tag={"h1"} style={"tittle--center"} />
        </>
      )}
    </header>
  );
};

export default HeaderFormStep;

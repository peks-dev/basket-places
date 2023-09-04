import React from "react";
import "./loader.css";

import logoSite from "../../assets/global/bp-logo.svg";

const Loader = () => {
  return (
    <div className="loader">
      <img className="loader__img" src={logoSite} alt="logo de basket places" />
    </div>
  );
};

export default Loader;

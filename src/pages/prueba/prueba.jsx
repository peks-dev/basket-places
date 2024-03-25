import React, { useState } from "react";
import { useLocalStorage } from "../../hooks/use-local-storage.hook";
import "./prueba.css";

//Context
import CourtContext from "../../context/court/court-context";

// componnets
import Title from "../../components/layout/title/title";
import Txt from "../../components/layout/text-body/text-body";
import FormField from "../../components/form/form-field/form-field";
import Form from "../../components/form/form";

const MiComponente = () => {
  const handleInputChange = (e) => {
    console.log(e.target.checked);
  };

  return <div>prueba</div>;
};

export default MiComponente;

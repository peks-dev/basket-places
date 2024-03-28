import React from "react";
import "./prueba.css";

import Button from "@/components/button/button";
const MiComponente = () => {
  const handleInputChange = (e) => {
    console.log(e.target.checked);
  };

  return (
    <div style={{ height: "100dvh" }}>
      <p>hola</p>
      <Button variant={"primary"}>eliminar</Button>
    </div>
  );
};

export default MiComponente;

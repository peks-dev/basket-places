import React from "react";
import "./prueba.css";

import Button from "@/components/button/button";
import Loader from "../../components/loader/loader";

const MiComponente = () => {
  console.log("esto renderiza");
  return (
    <div style={{ height: "100dvh" }}>
      <p>hola</p>
      <Button variant={"primary"}>eliminar</Button>
      <Loader />
    </div>
  );
};

export default MiComponente;

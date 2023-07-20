import React from "react";
import "./viewport-blocker.css";

//Componentes
import Txt from "../layout/text-body/text-body";

const ViewportBlocker = () => {
  return (
    <div className="viewport-blocker">
      <Txt content={"Tamaño de pantalla muy pequeña"} />
    </div>
  );
};

export default ViewportBlocker;

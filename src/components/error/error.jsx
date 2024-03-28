import React from "react";
import "./error.css";

//Components
import Title from "../layout/title/title";
import Txt from "../layout/text-body/text-body";

const Error = ({ error }) => {
  return (
    <div className="error-container">
      <Title
        text={"Hubo un error"}
        tag={"h1"}
        style={"title--center title--acent title--small"}
      />
      <Txt content={error.message} style={"txt--center"} />
    </div>
  );
};

export default Error;

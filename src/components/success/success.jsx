import React from "react";
import "./success.css";

//components
import Button from "@/components/button/button";
import SuccessIcon from "@/components/icons/success-icon";

const Success = ({ title, btnFn, btnText }) => {
  return (
    <div className="success">
      <div className="success__icon-wrapper">
        <SuccessIcon />
      </div>
      <h3 className="success__title">{title}</h3>
      <Button type={"button"} onClick={btnFn}>
        {btnText}
      </Button>
    </div>
  );
};

export default Success;

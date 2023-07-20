import React from "react";
import "./text-body.css";

const Txt = ({ content, style }) => {
  return <p className={`txt ${style}`}>{content}</p>;
};

export default Txt;

import React from "react";
import "./tab-wrapper.css";

const TabWrapper = ({ children, variant }) => {
  return <div className={`tab-wrapper ${variant}`}>{children}</div>;
};

export default TabWrapper;

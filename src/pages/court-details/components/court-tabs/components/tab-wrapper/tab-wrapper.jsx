import React, { Suspense } from "react";
import "./tab-wrapper.css";
// components
import Loader from "@/components/loader/loader";

const TabWrapper = ({ children, variant }) => {
  return <div className={`tab-wrapper ${variant}`}>{children}</div>;
};

export default TabWrapper;

import React from "react";

const SvgWrapper = ({ viewBox, children, rotate }) => {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      style={{ transform: rotate && "rotate(180deg)" }}
    >
      {children}
    </svg>
  );
};

export default SvgWrapper;

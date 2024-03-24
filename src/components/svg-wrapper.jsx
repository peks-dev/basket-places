import React from "react";

const SvgWrapper = ({ viewBox, children }) => {
  return (
    <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox={viewBox}>
      {children}
    </svg>
  );
};

export default SvgWrapper;

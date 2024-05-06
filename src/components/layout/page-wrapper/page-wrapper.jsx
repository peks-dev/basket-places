import React from "react";
import "./page-wrapper.css";

const PageWrapper = ({ children, page, variant }) => {
  return (
    <section className={`page-wrapper ${variant}`} data-page={page}>
      {children}
    </section>
  );
};

export default PageWrapper;

import React from "react";
import "./comming-soon.css";
// components
import ComingSoonIcon from "@/components/icons/coming-soon-icon";

const ComingSoon = () => {
  return (
    <section className="coming-soon">
      <div className="coming-soon__icon">
        <ComingSoonIcon />
      </div>
      <h2>proximamente</h2>
    </section>
  );
};

export default ComingSoon;

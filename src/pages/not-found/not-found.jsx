import React from "react";
import "./not-found.css";
// components
import AlertIcon from "@/components/icons/alert-icon";

const NotFound = () => {
  return (
    <section className="not-found">
      <div className="not-found__icon">
        <AlertIcon />
      </div>
      <h2 className="not-found__title">pagina no encontrada</h2>
    </section>
  );
};

export default NotFound;

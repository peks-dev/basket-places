import React from "react";

const NotFoundCourt = ({ text }) => {
  return (
    <div className="not-found-court">
      <h2>no existe esta cancha</h2>
      <p>{text}</p>
    </div>
  );
};

export default NotFoundCourt;

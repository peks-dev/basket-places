import React from "react";
import { Link } from "react-router-dom";
import "./court-card-footer.css";

// Components
import Btn from "../../../layout/button/button";

const CourtCardFooter = ({ game_level, court_id }) => {
  return (
    <div className="court-card__footer">
      <p className="court-card__footer-text">
        nivel de juego <span>{game_level}</span>
      </p>
      <Link to={`/search/${court_id}`}>
        <Btn text={"ver detalles"} variant={"btn--secundary"} />
      </Link>
    </div>
  );
};

export default CourtCardFooter;

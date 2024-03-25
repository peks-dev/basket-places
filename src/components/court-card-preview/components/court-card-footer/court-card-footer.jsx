import React from "react";
import { Link } from "react-router-dom";
import "./court-card-footer.css";

// Components
import Button from "@/components/button/button";

const CourtCardFooter = ({ game_level, court_id }) => {
  return (
    <footer className="court-card__footer">
      <p className="court-card__footer-text">
        nivel de juego <span>{game_level}</span>
      </p>
      <Link to={`/search/${court_id}`}>
        <Button variant={"secundary"}>ver detalles</Button>
      </Link>
    </footer>
  );
};

export default CourtCardFooter;

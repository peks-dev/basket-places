import React from "react";
import "./court-card.css";

// hooks
import { useNavigate } from "react-router-dom";
// Components
import Button from "@/components/button/button";

const CourtCard = ({ courtData }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/search/${courtData.court_id}`);
  };
  console.log(courtData);
  return (
    <article className="court-card">
      <header className="court-card__header">
        <picture className="court-card__img-container">
          <img src={courtData.images[0].publicUrl} alt="court cover" />
        </picture>
        <div className="court-card__info-wrapper">
          <div className="court-card__text-wrapper">
            <h2 className="court-card__name">{courtData.name}</h2>
            <div className="court-card__location">
              <p>
                {courtData.country}, {courtData.state}
              </p>
            </div>
          </div>
          <div className="court-card__rating">4</div>
        </div>
      </header>
      <footer className="court-card__footer">
        <p className="court-card__level">
          nivel de juego: <span>{courtData.game_level}</span>
        </p>
        <Button variant={"secundary"} onClick={handleClick}>
          explorar
        </Button>
      </footer>
    </article>
  );
};

export default CourtCard;

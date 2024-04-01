import React from "react";
import "./court-card.css";

import { deleteCourt } from "@/pages/user-profile/components/user-courts/utilities/delete-court";
// hooks
import { useNavigate } from "react-router-dom";
// context
import { useCourtDetailsStore } from "@/context/courtDetailsStore";
import { useUserStore } from "@/context/userStore.js";
// Components
import Button from "@/components/button/button";

const CourtCard = ({ courtData }) => {
  const navigate = useNavigate();
  const { profile } = useUserStore();
  const { saveCourtData } = useCourtDetailsStore();

  const handleClick = () => {
    saveCourtData(courtData);
    navigate(`/courts/${courtData.id}`);
  };

  function handleDeleteCourt() {
    deleteCourt(profile.id, courtData.id, courtData.images);
  }

  return (
    <article className="court-card">
      <header className="court-card__header">
        <picture className="court-card__img-container">
          <img src={courtData.images[0]} alt="court cover" />
        </picture>
        <div className="court-card__info-wrapper">
          <div className="court-card__text-wrapper">
            <h2 className="court-card__name">{courtData.name}</h2>
            <div className="court-card__location">
              <p>
                {courtData.location.state}, {courtData.location.city}
              </p>
            </div>
          </div>
          <div className="court-card__rating">4</div>
          {/* <Button onClick={handleDeleteCourt} variant={"primary"}>
            eliminar
          </Button> */}
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

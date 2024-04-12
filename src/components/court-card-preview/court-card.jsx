import React from "react";
import "./court-card.css";

import { deleteCourt } from "@/pages/user-profile/components/user-courts/utilities/delete-court";
// hooks
import { useNavigate, useLocation } from "react-router-dom";
// context
import { useUserStore } from "@/context/userStore.js";
// Components
import Button from "@/components/button/button";
import EditCourtButton from "@/components/edit-court-button/edit-court-button";

const CourtCard = ({ courtData }) => {
  const navigate = useNavigate();
  const currentPath = useLocation().pathname;
  const { profile } = useUserStore();

  const handleClick = () => {
    navigate(`/courts/${courtData.id}`, { state: courtData });
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
          <div className="court-card__right">
            <div className="court-card__rating">4</div>
            {currentPath === "/profile" && (
              <EditCourtButton courtData={courtData} />
            )}
          </div>
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

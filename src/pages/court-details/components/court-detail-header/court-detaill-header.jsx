import React from "react";
import "./court-detail-header.css";

//components
import BasketballIcon from "@/components/icons/basketball-icon";

// context
import { useCourtDetailsStore } from "@/context/courtDetailsStore";

const CourtDetailHeader = () => {
  const { courtData } = useCourtDetailsStore();
  const rating = 5;
  const stars = [];

  for (let i = 0; i < rating; i++) {
    stars.push(
      <div key={i} className="court-detail__icon-container">
        <BasketballIcon />
      </div>
    );
  }

  return (
    <header className="court-detail-header">
      <div className="court-detail-header__wrapper">
        <h1 className="court-detail__name">{courtData.name}</h1>
        <div className="court-detail__rating">{stars}</div>
      </div>
      <div className="court-detail__game-level">
        <p>
          nivel de juego <span>{courtData.game_level}</span>
        </p>
      </div>
    </header>
  );
};

export default CourtDetailHeader;

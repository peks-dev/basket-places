import React from "react";
import "./court-header.css";

import { useNavigate } from "react-router-dom";
// components
import Button from "@/components/button/button";
// Icons
import StarIcon from "../../../../assets/bp-details/components/star-icon";
import ArrowIcon from "@/components/icons/arrow-icon";
import ShareIcon from "@/components/icons/share-icon";

// context
import { useCourtDetailsStore } from "@/context/courtDetailsStore";

const CourtHeader = ({ game_level, courtName, images, owner }) => {
  const userRating = 3; // Valoracion simulacion
  const navigate = useNavigate();
  const { courtData, emptyGlobalCourtData } = useCourtDetailsStore();

  function handleBack() {
    emptyGlobalCourtData();
    navigate(-1);
  }

  return (
    <header className="court-header">
      <div className="court-header__btns-wrap">
        <Button variant={"back"} onClick={handleBack}>
          <ArrowIcon />
        </Button>
        <Button variant={"secundary"} customStyle={"btn--icon"}>
          <ShareIcon />
        </Button>
      </div>
      <picture className="court-header__image-container">
        <img src={courtData.images[0]} alt="" />
      </picture>
      <p>{courtData.name}</p>
    </header>
  );
};

export default CourtHeader;

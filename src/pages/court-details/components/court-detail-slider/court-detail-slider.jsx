import React from "react";
import "./court-detail-slider.css";

import { useNavigate } from "react-router-dom";
// components
import Button from "@/components/button/button";
// Icons
import StarIcon from "../../../../assets/bp-details/components/star-icon";
import ArrowIcon from "@/components/icons/arrow-icon";
import ShareIcon from "@/components/icons/share-icon";

// context
import { useCourtDetailsStore } from "@/context/courtDetailsStore";
import { useUserStore } from "@/context/userStore";

const CourtDetailSlider = () => {
  const userRating = 3; // Valoracion simulacion
  const navigate = useNavigate();
  const { courtData, emptyGlobalCourtData } = useCourtDetailsStore();
  const { profile } = useUserStore();

  function handleBack() {
    emptyGlobalCourtData();
    navigate(-1);
  }

  return (
    <div className="court-details__slider">
      <div className="court-details__buttons-wrap">
        <Button variant={"back"} onClick={handleBack}>
          <ArrowIcon />
        </Button>
        <Button variant={"secundary"} customStyle={"no-padding"}>
          <ShareIcon />
        </Button>
      </div>
      <picture className="court-details__image-container">
        <img src={courtData.images[0]} alt="" />
      </picture>
      <div className="court-details__slider-wrap">
        <div className="owner">
          <picture className="owner__avatar">
            <img src={profile.avatar_url} alt="" />
          </picture>
          <p className="owner__name">peks</p>
        </div>
        <div className="court-details__slider-dots">
          {courtData.images.map((img, index) => (
            <Button variant={"secundary"} type={"button"}>
              <div className="dot"></div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourtDetailSlider;

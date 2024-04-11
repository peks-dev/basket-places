import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./court-detail-slider.css";

// utilities
import shareContent from "@/utilities/share-content.utility";

// components
import Button from "@/components/button/button";
// Icons
import ArrowIcon from "@/components/icons/arrow-icon";
import ShareIcon from "@/components/icons/share-icon";

// context
import { useCourtDetailsStore } from "@/context/courtDetailsStore";
import { useUserStore } from "@/context/userStore";

const CourtDetailSlider = () => {
  const location = useLocation();
  const userRating = 3; // Valoracion simulacion
  const navigate = useNavigate();
  const { courtData, emptyGlobalCourtData } = useCourtDetailsStore();
  const { profile } = useUserStore();

  function handleBack() {
    emptyGlobalCourtData();
    navigate(-1);
  }

  function handleShare() {
    shareContent(courtData.name, courtData.description, location.pathname);
  }

  return (
    <div className="court-details__slider">
      <div className="court-details__buttons-wrap">
        <Button variant={"back"} onClick={handleBack}>
          <ArrowIcon />
        </Button>
        <Button
          variant={"secundary"}
          customStyle={"no-padding"}
          onClick={handleShare}
        >
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
            <Button variant={"secundary"} type={"button"} key={index}>
              <div className="dot"></div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourtDetailSlider;

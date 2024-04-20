import React from "react";
import "./court-detail-slider.css";

// components
import Button from "@/components/button/button";
import ShareButton from "@/components/share-button/share-button";
import BackButton from "@/components/back-button";
import OwnerBadge from "@/components/owner-badge/owner-badge";

const CourtDetailSlider = ({ courtData }) => {
  return (
    <div className="court-details__slider">
      <div className="court-details__buttons-wrap">
        <BackButton />
        <ShareButton currentCourt={courtData} />
      </div>
      <picture className="court-details__image-container">
        <img src={courtData.images[0]} alt="" />
      </picture>
      <div className="court-details__slider-wrap">
        <OwnerBadge ownerId={courtData.owner} />
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

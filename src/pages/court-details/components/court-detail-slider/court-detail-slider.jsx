import React from "react";
import "./court-detail-slider.css";

// components
import Button from "@/components/button/button";
import ShareButton from "@/components/share-button/share-button";
import BackButton from "@/components/back-button";
// context
import { useUserStore } from "@/context/userStore";

const CourtDetailSlider = ({ courtData }) => {
  const { profile } = useUserStore();

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

import React from "react";
import "./court-detail-slider.css";

import { useSwiperSlide } from "swiper/react";

// components
import Button from "@/components/button/button";
import ShareButton from "@/components/share-button/share-button";
import BackButton from "@/components/back-button";
import OwnerBadge from "@/components/owner-badge/owner-badge";
import SliderImgsCourt from "@/components/slider/slider";

const CourtDetailSlider = ({ courtData }) => {
  const swiperSlide = useSwiperSlide();
  console.log(swiperSlide);
  return (
    <div className="court-details__slider">
      <div className="court-details__buttons-wrap">
        <BackButton />
        <ShareButton currentCourt={courtData} />
      </div>
      <SliderImgsCourt imgs={courtData.images} />
      <OwnerBadge ownerId={courtData.owner} variant={"court-details"} />
    </div>
  );
};

export default CourtDetailSlider;

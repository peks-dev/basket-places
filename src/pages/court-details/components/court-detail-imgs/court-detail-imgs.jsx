import React from "react";
import "./court-detail-imgs.css";

// components
import ShareButton from "@/components/share-button/share-button";
import BackButton from "@/components/back-button";
import OwnerBadge from "@/components/owner-badge/owner-badge";
import SliderImgsCourt from "@/components/slider/slider";

const CourtDetailImgs = ({ courtData }) => {
  return (
    <div className="court-details__imgs">
      <div className="court-details__imgs-buttons">
        <BackButton />
        <ShareButton currentCourt={courtData} />
      </div>
      <SliderImgsCourt imgs={courtData.images} />
      <OwnerBadge ownerId={courtData.owner} variant={"court-details"} />
    </div>
  );
};

export default CourtDetailImgs;

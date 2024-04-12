import React from "react";
import { useLocation } from "react-router-dom";
// utils
import shareContent from "@/utilities/share-content.utility";
//components
import ShareIcon from "@/components/icons/share-icon";
import Button from "@/components/button/button";

const ShareButton = ({ currentCourt }) => {
  const location = useLocation();

  function handleShare() {
    shareContent(
      currentCourt.name,
      currentCourt.description,
      location.pathname
    );
  }

  return (
    <Button
      variant={"secundary"}
      customStyle={"no-padding"}
      onClick={handleShare}
    >
      <ShareIcon />
    </Button>
  );
};

export default ShareButton;

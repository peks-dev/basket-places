import React from "react";
import "./court-card.css";

// Components
import CourtCardHeader from "./components/court-card-header/court-card-header";
import CourtCardFooter from "./components/court-card-footer/court-card-footer";

// iconos
import TrashIcon from "./components/icons/delete-icon";
import { deleteCourt } from "../../pages/user-profile/utils/delete-court";

const CourtCard = ({ courtData, showDeleteButton }) => {
  // Prepar datos para distribuirlos en los componentes
  const { name, game_level, images, country, state, city, court_id, owner } =
    courtData;
  const headerData = { name, country, state, city };

  const handleDeleteCourt = async () => {
    await deleteCourt(owner, "37", imagenesPro);
  };

  return (
    <div key={court_id} className="court-card">
      <CourtCardHeader data={headerData} />
      <div className="court-card__img-wrap">
        <img src={images[0].publicUrl} alt="imagen de la cancha" />
      </div>
      <CourtCardFooter game_level={game_level} court_id={court_id} />
      {showDeleteButton && (
        <button className="court-card__delete-btn" onClick={handleDeleteCourt}>
          <TrashIcon color={"#FAFAFF"} />
        </button>
      )}
    </div>
  );
};

export default CourtCard;

import React from "react";
import "./court-card.css";



// Components
import CourtCardHeader from "./components/court-card-header/court-card-header";
import CourtCardFooter from "./components/court-card-footer/court-card-footer";

import { Link } from "react-router-dom";

// iconos
import TrashIcon from "./components/icons/delete-icon";
import CloseIcon from "./components/icons/close-icon";

const CourtCard = ({
  courtData,
  showDeleteButton,
  handleDeleteCourt,
  showCloseButton,
  handleCloseButton,
}) => {
  // Prepar datos para distribuirlos en los componentes
  const { name, game_level, images, country, state, city, court_id, owner } =
    courtData;
  const headerData = { name, country, state, city };



  return (
    <Link to={`/search/${court_id}`}>
    <article className="court-card" >
      <CourtCardHeader data={headerData} />
      <figure className="court-card__img-wrap">
        <img src={images[0].publicUrl} alt="imagen de la cancha" />
      </figure>
      <CourtCardFooter game_level={game_level} court_id={court_id} />
      {showDeleteButton && (
        <button
          className="court-card__delete-btn"
          onClick={() => handleDeleteCourt(court_id)}
        >
          <TrashIcon color={"#FAFAFF"} />
        </button>
      )}
      {showCloseButton && (
        <button
          className="court-card__close-btn"
          onClick={() => handleCloseButton()}
        >
          <CloseIcon color={"#FAFAFF"} />
        </button>
      )}
    </article>
    </Link>
  );
};

export default CourtCard;

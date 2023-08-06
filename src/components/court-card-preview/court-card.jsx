import React from "react";
import "./court-card.css";

// Components
import CourtCardHeader from "./components/court-card-header/court-card-header";
import CourtCardFooter from "./components/court-card-footer/court-card-footer";

const CourtCard = ({ courtData }) => {
  const { name, game_level, images, country, state, city, court_id } =
    courtData;
  const headerData = { name, country, state, city };
  return (
    <div key={court_id} className="court-card">
      <CourtCardHeader data={headerData} />
      <img src={images[0].publicUrl} alt="imagen de la cancha" />
      <CourtCardFooter game_level={game_level} court_id={court_id} />
    </div>
  );
};

export default CourtCard;

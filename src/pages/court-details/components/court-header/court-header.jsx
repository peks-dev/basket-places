import React from "react";
import "./court-header.css";

import Title from "../../../../components/layout/title/title";
import Txt from "../../../../components/layout/text-body/text-body";

// Icons
import StarIcon from "../../../../assets/bp-details/components/star-icon";
import DivisorIcon from "../../../../assets/bp-details/components/divisor-icon";

const CourtHeader = ({ game_level, courtName }) => {
  const userRating = 3; // Valor de la valoración del usuario (puedes cambiarlo según sea necesario)

  const renderStars = (totalStars, filledStars) => {
    const stars = [];

    for (let i = 1; i <= totalStars; i++) {
      const color = i <= filledStars ? "#DE9E36" : "#252422";
      stars.push(<StarIcon key={i} color={color} />);
    }

    return stars;
  };
  return (
    <div className="court-header">
      <Title text={courtName} tag={"h1"} />
      <div className="court-header__columns">
        <div className="court-header__details">
          <ul className="court-header__stars">{renderStars(5, userRating)}</ul>
          <div className="court-header__game-level">
            Nivel de juego:
            <Txt content={game_level} style={"txt--bolt"} />
          </div>
        </div>
        <div className="court-header__author">
          <img
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.7zHY0kwvS1sAWPfs3IPAsgHaFj%26pid%3DApi&f=1&ipt=13f98e2c6a76556fce2fadfefba87e65d68644d347d0d7a94a523c350793a237&ipo=images"
            alt="imagen de perfil"
          />
          <div className="court-header__author-name">
            <span>Autor</span>
            <Title
              text={"peks"}
              style={"title--small title--yellow"}
              tag={"h2"}
            />
          </div>
        </div>
      </div>
      <DivisorIcon />
    </div>
  );
};

export default CourtHeader;

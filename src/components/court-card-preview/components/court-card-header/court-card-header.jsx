import React from "react";
import "./court-card-header.css";

// Components
import Title from "../../../layout/title/title";
import Txt from "../../../layout/text-body/text-body";
import LocationIcon from "../location-icon";

const CourtCardHeader = ({ data }) => {
  return (
    <div className="court-card__header">
      <Title text={data.name} tag={"h3"} style={"title--left"} />
      <div className="court-card__header-location">
        <LocationIcon />
        <Txt content={data.country} style={"txt--small"} />
        <Txt content={data.state} style={"txt--small"} />
        <Txt content={data.city} style={"txt--small"} />
      </div>
    </div>
  );
};

export default CourtCardHeader;

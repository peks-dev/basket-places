import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./court-details.css";

// hooks
import { useGetDataCourt } from "./hooks/use-get-data-court.hook";

// Components
import CourtSlider from "./components/court-slider/court-slider";
import CourtHeader from "./components/court-header/court-header";
import CourtTabs from "./components/court-tabs/court-tabs";
import Btn from "../../components/layout/button/button";
import Loader from "../../components/loader/loader";
import Error from "../../components/error/error";

const CourtDetails = () => {
  const courtPath = useParams();
  const courtId = courtPath.courtId;
  const { allDataCourt, loading, error } = useGetDataCourt(courtId);
  const navigate = useNavigate();

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error />;
  }

  if (!allDataCourt) {
    return <div>No existe este Basket Place</div>;
  }

  return (
    <div className="court-details-container">
      <Btn
        text={"atras"}
        variant={"btn--primary btn--absolute"}
        onClick={() => {
          navigate(-1);
        }}
      />
      <CourtSlider images={allDataCourt.images} />
      <CourtHeader
        game_level={allDataCourt.game_level}
        courtName={allDataCourt.name}
      />
      <CourtTabs
        description={allDataCourt.description}
        services={allDataCourt.services}
        floor_type={allDataCourt.floor_type}
        roof={allDataCourt.roof}
        schedules={allDataCourt.schedules}
        coordinates={allDataCourt.location.coordinates}
      />
    </div>
  );
};

export default CourtDetails;

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

const CourtDetails = () => {
  const courtPath = useParams();
  const courtId = courtPath.courtId;
  const { allDataCourt, loading, error } = useGetDataCourt(courtId);
  const navigate = useNavigate();

  if (loading) {
    // Muestra un componente de carga mientras se obtienen los datos
    return <div>Loading...</div>;
  }

  if (error) {
    // Muestra un mensaje de error en caso de que haya ocurrido un error
    return <div>Error: {error.message}</div>;
  }

  if (!allDataCourt) {
    // Muestra un mensaje o componente alternativo si no hay datos de la corte
    return <div>No existe este Basket Place</div>;
  }

  const goBack = () => {
    navigate(-1);
  };
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

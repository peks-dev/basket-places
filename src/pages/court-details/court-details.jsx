import React, { useEffect, useState } from "react";

import "./court-details.css";

// hooks
import { useFetchCourtData } from "@/lib/court-data-fetch";
import { useCourtDetailsStore } from "@/context/courtDetailsStore";
import { useParams } from "react-router-dom";
// Components
import CourtSlider from "./components/court-slider/court-slider";
import CourtHeader from "./components/court-header/court-header";
import CourtTabs from "./components/court-tabs/court-tabs";
import Loader from "../../components/loader/loader";
import Error from "../../components/error/error";

const CourtDetails = () => {
  const courtPath = useParams();
  const courtId = courtPath.courtId;
  const { loading, fetchAllCourtData, courtInfo, error } = useFetchCourtData();
  const { courtData, emptyGlobalCourtData, saveCourtData } =
    useCourtDetailsStore();
  const [loadingPage, setLoadingPage] = useState(true);

  useEffect(() => {
    if (!courtData.id) {
      fetchAllCourtData(courtId);
      if (!loading) {
        saveCourtData(courtInfo);
      }
    } else {
      setLoadingPage(false);
    }
  }, [courtId]);

  if (loadingPage) {
    return <Loader />;
  }

  if (error) {
    return <Error />;
  }

  if (!courtData) {
    return <div>No existe este Basket Place</div>;
  }

  return (
    <article className="court-details-container">
      <CourtHeader />
      <div className="court-tabsPro">hola</div>
    </article>
  );
};

export default CourtDetails;

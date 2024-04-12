import React, { useEffect, useState } from "react";
import "./court-details.css";

// hooks
import { useFetchCourtData } from "@/lib/fetch-court-data";
import { useParams, useLocation } from "react-router-dom";
// Components
import CourtDetailHeader from "./components/court-detail-header/court-detaill-header";
import CourtDetailSlider from "./components/court-detail-slider/court-detail-slider";
import CourtTabs from "./components/court-tabs/court-tabs";
import ErrorDisplay from "@/components/errors/error-display/error-display";
import Loader from "@/components/loader/loader";

const CourtDetails = () => {
  const courtId = useParams().courtId;
  const state = useLocation().state;
  const { loading, fetchAllCourtData, courtInfo, error } = useFetchCourtData();
  const [courtData, setCourtData] = useState(null);
  const [loadingPage, setLoadingPage] = useState(true);

  useEffect(() => {
    if (!state.id) {
      fetchAllCourtData(courtId);
      setCourtData(courtInfo);
      console.log("hola");
    } else {
      setCourtData(state);
    }

    setLoadingPage(false);
  }, [courtId, state]);

  if (loadingPage || loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  if (!courtData) {
    return <div>No existe este Basket Place</div>;
  }

  return (
    <article className="court-details-container">
      <CourtDetailSlider courtData={courtData} />
      <CourtDetailHeader courtData={courtData} />
      <CourtTabs />
    </article>
  );
};

export default CourtDetails;

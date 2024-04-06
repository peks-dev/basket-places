import React, { useEffect, useState } from "react";

import "./court-details.css";

// hooks
import { useFetchCourtData } from "@/lib/fetch-court-data";
import { useCourtDetailsStore } from "@/context/courtDetailsStore";
import { useParams } from "react-router-dom";
// Components
import CourtDetailHeader from "./components/court-detail-header/court-detaill-header";
import CourtDetailSlider from "./components/court-detail-slider/court-detail-slider";
import CourtTabs from "./components/court-tabs/court-tabs";
import Loader from "@/components/loader/loader";
import Error from "@/components/errors/error";

const CourtDetails = () => {
  const courtPath = useParams();
  const courtId = courtPath.courtId;
  const { loading, fetchAllCourtData, courtInfo, error } = useFetchCourtData();
  const { courtData, saveCourtData } = useCourtDetailsStore();
  const [loadingPage, setLoadingPage] = useState(true);

  console.log("render");
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
      <CourtDetailSlider />
      <CourtDetailHeader />
      <CourtTabs />
    </article>
  );
};

export default CourtDetails;

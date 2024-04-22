import React, { useEffect, useState } from "react";
import "./court-details.css";
// context
import { useCommentStore } from "@/context/commentsStore.";
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
  const { loading, fetchAllCourtData, error } = useFetchCourtData();
  const [courtData, setCourtData] = useState(null);
  const [loadingPage, setLoadingPage] = useState(true);
  const { resetComments } = useCommentStore();

  useEffect(() => {
    // build fetch function
    const fetchData = async () => {
      try {
        const courtInfo = await fetchAllCourtData(courtId);
        setCourtData(courtInfo);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingPage(false);
      }
    };

    // verify if data exist
    if (!state) {
      fetchData();
    } else {
      setCourtData(state);
      setLoadingPage(false);
    }

    // On unmount component
    return () => {
      resetComments();
    };
  }, [courtId]);

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
      <CourtTabs courtData={courtData} />
    </article>
  );
};

export default CourtDetails;

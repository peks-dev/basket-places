import { useEffect, useState } from "react";
import "./court-details.css";

// context
import { useCommentStore } from "@/context/commentsStore.";
// hooks
import { useFetchCourtData } from "@/lib/fetch-court-data";
import { useParams, useLocation } from "react-router-dom";
// Components
import CourtDetailImgs from "./components/court-detail-imgs/court-detail-imgs";
import CourtDetailHeader from "./components/court-detail-header/court-detaill-header";
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
    // Build fetch function
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

    // Verify if data exist
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

  return (
    <article className="court-details-container">
      <div>
        <CourtDetailImgs courtData={courtData} />
        <CourtDetailHeader courtData={courtData} />
      </div>
      <CourtTabs courtData={courtData} />
    </article>
  );
};

export default CourtDetails;

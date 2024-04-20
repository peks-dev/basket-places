import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./review-tab.css";
// lib
import { useFetchComments } from "@/lib/fetch-comments-data";
// components
import TabWrapper from "../tab-wrapper/tab-wrapper";
import CommentsHeader from "./components/comments-header/comments-header";
import CommentsBox from "./components/comments-box/comments-box";
import Loader from "@/components/loader/loader";
import ErrorDisplay from "@/components/errors/error-display/error-display";

const ReviewTab = () => {
  const { loading, error, comments, getCommentsForCourt } = useFetchComments();
  const courtId = useParams().courtId;

  useEffect(() => {
    getCommentsForCourt(courtId);
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  return (
    <TabWrapper variant="tab-reviews">
      <CommentsHeader numberOfComments={comments.length} />
      <CommentsBox comments={comments} />
    </TabWrapper>
  );
};

export default ReviewTab;

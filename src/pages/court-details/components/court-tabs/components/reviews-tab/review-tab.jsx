import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./review-tab.css";
// lib
import { useFetchComments } from "@/lib/fetch-comments-data";
// context
import { useCommentStore } from "@/context/commentsStore.";
// components
import TabWrapper from "../tab-wrapper/tab-wrapper";
import CommentsHeader from "./components/comments-header/comments-header";
import CommentsBox from "./components/comments-box/comments-box";
import Loader from "@/components/loader/loader";
import ErrorDisplay from "@/components/errors/error-display/error-display";

const ReviewTab = () => {
  const { loading, error, getCommentsForCourt } = useFetchComments();
  const { commentsList } = useCommentStore();
  const courtId = useParams().courtId;

  useEffect(() => {
    if (commentsList.length < 1) {
      getCommentsForCourt(courtId);
      console.log("fetch ejecutado");
    }
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  return (
    <TabWrapper variant="tab-reviews">
      <CommentsHeader numberOfComments={commentsList.length} />
      <CommentsBox comments={commentsList} />
    </TabWrapper>
  );
};

export default ReviewTab;

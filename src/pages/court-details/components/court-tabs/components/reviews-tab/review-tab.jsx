import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./review-tab.css";
// lib
import useFetchComments from "@/lib/fetch-comments-data";
// context
import { useCommentStore } from "@/context/commentsStore.";
// components
import TabWrapper from "../tab-wrapper/tab-wrapper";
import CommentsHeader from "./components/comments-header/comments-header";
import CommentsBox from "./components/comments-box/comments-box";
import Loader from "@/components/loader/loader";
import ErrorDisplay from "@/components/errors/error-display/error-display";

const ReviewTab = () => {
  const { commentsList, commentsFetched } = useCommentStore();
  const { error, loading, fetchCommentsForCourt } = useFetchComments();
  const courtId = useParams().courtId;

  useEffect(() => {
    if (!commentsFetched) {
      fetchCommentsForCourt(courtId);
    }
  }, [commentsFetched, courtId]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  return (
    <TabWrapper variant="tab-reviews">
      <CommentsHeader numberOfComments={commentsList.length} />
      {commentsList.length > 0 ? <CommentsBox comments={commentsList} /> : null}
    </TabWrapper>
  );
};
export default ReviewTab;

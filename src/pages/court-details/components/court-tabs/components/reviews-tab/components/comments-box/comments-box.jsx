import React, { useEffect } from "react";
import "./comments-box.css";
import { useParams } from "react-router-dom";
// lib
import { useFetchComments } from "@/lib/fetch-comments-data";
// components
import Comment from "../comment/comment";
import Loader from "@/components/loader/loader";
import ErrorDisplay from "@/components/errors/error-display/error-display";

const CommentsBox = () => {
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
    <ul className="comments-box">
      {comments.length > 0 ? (
        comments.map((comment, index) => (
          <li key={index}>
            <Comment
              userId={comment.user_id}
              rating={comment.rating}
              comment={comment.comment}
            />
          </li>
        ))
      ) : (
        <div>no hay comentarios</div>
      )}
    </ul>
  );
};

export default CommentsBox;

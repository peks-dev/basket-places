import React from "react";
import "./comments-box.css";

// components
import Comment from "../comment/comment";

const CommentsBox = ({ comments }) => {
  return (
    <ul className="comments-box">
      {comments.map((comment, index) => (
        <li key={index}>
          <Comment
            userId={comment.user_id}
            rating={comment.rating}
            comment={comment.comment}
            courtId={comment.court_id}
          />
        </li>
      ))}
    </ul>
  );
};

export default CommentsBox;

import React from "react";
import "./comments-header.css";
// components
import CommentIcon from "@/components/icons/comment-icon";
import CommentButton from "@/components/comment-button";

const CommentsHeader = ({ numberOfComments }) => {
  return (
    <div className="comments-header">
      <div className="comments__counter">
        <div className="comments__counter-icon">
          <CommentIcon />
        </div>
        <p>
          <span>{numberOfComments}</span>comentarios
        </p>
      </div>
      <CommentButton />
    </div>
  );
};

export default CommentsHeader;

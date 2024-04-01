import React from "react";
import "./comments-counter.css";

// components
import Button from "@/components/button/button";
import CommentIcon from "@/components/icons/comment-icon";

const CommentsCounter = () => {
  return (
    <div className="comments-counter">
      <div className="comments-counter__wrapper">
        <div className="comments-counter__icon-container">
          <CommentIcon color={"var(--accent)"} />
        </div>
        <p>
          <span>33</span>comentarios
        </p>
      </div>
      <Button type={"button"}>comentar</Button>
    </div>
  );
};

export default CommentsCounter;

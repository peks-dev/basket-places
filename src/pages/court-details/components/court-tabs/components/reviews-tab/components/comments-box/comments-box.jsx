import React from "react";
import "./comments-box.css";

// components
import Comment from "../comment/comment";

const CommentsBox = () => {
  return (
    <ul className="comments-box">
      <li>
        <Comment />
      </li>
      <li>
        <Comment />
      </li>
      <li>
        <Comment />
      </li>
    </ul>
  );
};

export default CommentsBox;

import React from "react";
import "./review-tab.css";

// components
import TabWrapper from "../tab-wrapper/tab-wrapper";
import CommentsCounter from "./components/comments-counter/comments-counter";
import CommentsBox from "./components/comments-box/comments-box";

const ReviewTab = () => {
  return (
    <TabWrapper variant="tab-reviews">
      <CommentsCounter />
      <CommentsBox />
    </TabWrapper>
  );
};

export default ReviewTab;

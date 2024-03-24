import React from "react";
import "./review-tab.css";
import Comment from "./components/comment/comment";

// components
import Btn from "../../../../../../components/layout/button/button";
import CommentIcon from "./components/comment-icon";

function hola() {
  console.log("boton oprimido");
}

const ReviewTab = () => {
  return (
    <div className="review-container">
      <div className="review__absolute">
        <div className="review__icon-wrap">
          <div className="review__icon">
            <CommentIcon color={"#DE9E36"} />
          </div>
          <p className="txt txt--small">comentarios</p>
        </div>
        <Btn text={"dejar reseña"} variant={"btn--primary"} onClick={hola} />
      </div>
      <ul className="review__comments-container">
        <li>
          <Comment />
        </li>
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
    </div>
  );
};

export default ReviewTab;

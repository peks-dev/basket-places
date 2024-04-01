import React from "react";
import "./comment.css";
//components
import BasketballIcon from "@/components/icons/basketball-icon";

const Comment = () => {
  return (
    <article className="comment">
      <header className="comment__header">
        <picture className="comment__avatar">
          <img
            src="https://assets.onlinelabels.com/images/clip-art/GDJ/Male%20Avatar-277081.png"
            alt="user avatar"
          />
        </picture>
        <div className="comment__header-wrapper">
          <p className="comment__user">peks</p>
          <ul className="comment__rating">
            <li>
              <BasketballIcon />
            </li>
            <li>
              <BasketballIcon />
            </li>
            <li>
              <BasketballIcon />
            </li>
          </ul>
        </div>
      </header>
      <p className="comment__content">
        Cantan muchos fouls, eso hace que el juego no sea fluido y se pelean
        demasiado pero tengoq ue escrbir otra oracion para ver
      </p>
    </article>
  );
};
export default Comment;

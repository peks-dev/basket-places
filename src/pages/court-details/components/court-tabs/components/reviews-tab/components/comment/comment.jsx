import React from "react";
import "./comment.css";
import StarIcon from "../../../../../../../../assets/bp-details/components/star-icon";

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
        <p className="comment__user">peks</p>
        <ul className="comment__stars">
          <li>
            <StarIcon />
          </li>
          <li>
            <StarIcon />
          </li>
          <li>
            <StarIcon />
          </li>
        </ul>
      </header>
      <p className="comment__content">
        Cantan muchos fouls, eso hace que el juego no sea fluido y se pelean
        demasiado pero tengoq ue escrbir otra oracion para ver
      </p>
    </article>
  );
};
export default Comment;

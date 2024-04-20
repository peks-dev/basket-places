import React, { useEffect } from "react";
import "./comment.css";
// lib
import { useFetchUser } from "@/lib/fetch-user-data";
//components
import BasketballIcon from "@/components/icons/basketball-icon";
import defaultUserImg from "/images/user-profile.svg";

const Comment = ({ userId, comment, rating }) => {
  const { loading, error, user, getUser } = useFetchUser();

  useEffect(() => {
    getUser(userId);
  }, []);

  if (loading) {
    return <p>cargando comentario</p>;
  }

  if (error) {
    return <div>error</div>;
  }

  // Genera un array con la cantidad de elementos igual al rating
  const ratingIcons = Array.from({ length: rating }, (_, index) => (
    <li key={index}>
      <BasketballIcon />
    </li>
  ));

  return (
    <article className="comment">
      <header className="comment__header">
        <picture className="comment__avatar">
          <img
            src={user.avatar_url ? user.avatar_url : defaultUserImg}
            alt="user avatar"
          />
        </picture>
        <div className="comment__header-wrapper">
          <p className="comment__user">{user.apodo}</p>
          <ul className="comment__rating">{ratingIcons}</ul>
        </div>
      </header>
      <p className="comment__content">{comment}</p>
    </article>
  );
};
export default Comment;

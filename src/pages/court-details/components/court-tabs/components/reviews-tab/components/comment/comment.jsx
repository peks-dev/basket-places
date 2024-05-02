import React, { useEffect, useState } from "react";
import "./comment.css";
// context
import { useUserStore } from "@/context/userStore";
// lib
import { useFetchUser } from "@/lib/fetch-user-data";
//components
import BasketballIcon from "@/components/icons/basketball-icon";
import DeleteCommentButton from "@/components/delete-comment-button";
import UserAvatar from "@/components/user-avatar/user-avatar";
import AvatarSkeleton from "@/components/skeletons/avatar-skeleton/avatar-skeleton";
import ErrorComment from "@/components/errors/error-comment/error-comment";

const Comment = ({ userId, comment, rating, courtId }) => {
  const { loading, error, user, getUser } = useFetchUser();
  const { profile } = useUserStore();
  const [canDelete, setCanDelete] = useState(false);

  // pre-render raiting
  const ratingIcons = Array.from({ length: rating }, (_, index) => (
    <li key={index}>
      <BasketballIcon />
    </li>
  ));

  useEffect(() => {
    getUser(userId);
    if (profile.id === userId) {
      setCanDelete(true);
    }
  }, [userId]);

  if (error) {
    return <ErrorComment />;
  }

  return (
    <article className="comment">
      <header className="comment__header">
        {loading ? (
          <AvatarSkeleton variant={"comment__avatar"} />
        ) : (
          <UserAvatar imgUrl={user.avatar_url} variant={"comment__avatar"} />
        )}
        <div className="comment__header-wrapper">
          <p className="comment__user">
            {loading ? "...cargando" : user.apodo}
          </p>
          <ul className="comment__rating">{ratingIcons}</ul>
        </div>
      </header>
      <p className="comment__content">{comment}</p>
      {canDelete ? <DeleteCommentButton courtId={courtId} /> : null}
    </article>
  );
};
export default Comment;

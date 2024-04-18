import React, { useEffect, useState } from "react";
import "./comments-counter.css";
import { useParams } from "react-router-dom";

// service
import { fetchDataOnTable } from "@/services/supabase/table-operations.service";

// components
import CommentIcon from "@/components/icons/comment-icon";
import CommentButton from "@/components/comment-button";

const CommentsCounter = () => {
  const [commentCounter, setCommentCounter] = useState("cargando");
  const courtId = useParams().courtId;

  useEffect(() => {
    async function getNumberOfComments() {
      try {
        const data = await fetchDataOnTable("reviews", "court_id", courtId);
        setCommentCounter(data.length);
      } catch (error) {
        console.log(error);
      }
    }
    getNumberOfComments();
  }, []);

  return (
    <div className="comments-counter">
      <div className="comments-counter__wrapper">
        <div className="comments-counter__icon-container">
          <CommentIcon color={"var(--accent)"} />
        </div>
        <p>
          <span>{commentCounter}</span>comentarios
        </p>
      </div>
      <CommentButton />
    </div>
  );
};

export default CommentsCounter;

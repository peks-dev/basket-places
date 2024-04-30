import React from "react";
import "./error-comment.css";
// components
import AlertIcon from "@/components/icons/alert-icon";

const ErrorComment = () => {
  return (
    <div className="error-comment">
      <div className="error-comment__icon">
        <AlertIcon />
      </div>
      <p>error al cargar comentario</p>
    </div>
  );
};

export default ErrorComment;

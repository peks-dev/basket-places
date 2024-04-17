import React, { useState } from "react";

import StarsRating from "@/components/stars-rating/stars-rating";

const ReviewForm = () => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");

  function handleInputChange(e) {
    setComment(e.target.value);
  }

  return (
    <form className="form">
      <StarsRating rating={rating} setRating={setRating} />
      <fieldset className="form__field">
        <label className="form__label">comentario</label>
        <textarea
          className="form__input"
          type="text"
          name="comentario"
          value={comment}
          onChange={handleInputChange}
          id="comment"
          maxLength="135"
        />
      </fieldset>
    </form>
  );
};

export default ReviewForm;

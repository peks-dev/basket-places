import React from "react";
import "./stars-rating.css";
// components
import BasketballIcon from "@/components/icons/basketball-icon";

const StarsRating = ({ setRating, rating }) => {
  const handleRatingChange = (value) => {
    setRating(value); // Actualiza el estado de la valoración
  };

  return (
    <fieldset className="stars-rating">
      {[1, 2, 3, 4, 5].map((value) => (
        <input
          key={value}
          type="radio"
          name="rating"
          value={value}
          checked={value === rating}
          onChange={() => handleRatingChange(value)}
          className={"rating-input"}
          id={`rating-${value}`}
        />
      ))}

      {[1, 2, 3, 4, 5].map((value) => (
        <label
          key={value}
          className={`stars-rating__icon-container ${
            value <= rating ? "accent" : null
          }`}
          htmlFor={`rating-${value}`}
        >
          <BasketballIcon />
        </label>
      ))}
    </fieldset>
  );
};

export default StarsRating;

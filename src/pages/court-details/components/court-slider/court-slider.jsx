import React, { useState } from "react";
import "./court-slider.css";

const CourtSlider = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleThumbnailClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="court-slider">
      <img
        src={images[activeIndex]}
        alt={`Slide ${activeIndex + 1}`}
        className="court-slider__main-img"
      />
      <ul className="court-slider__thumbnails">
        {images.map((img, index) => (
          <li
            key={index}
            className={`court-slider__thumbnails-item ${
              index === activeIndex
                ? "court-slider__thumbnails-item--active"
                : ""
            }`}
            onClick={() => handleThumbnailClick(index)}
          >
            <img src={img} alt={`Thumbnail ${index + 1}`} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourtSlider;

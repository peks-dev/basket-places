import React from "react";
import "./title.css";
const Title = ({ tag, text, customStyle, size }) => {
  const Tag = tag; // Nivel de heading

  return (
    <Tag className={`title ${customStyle}`} data-size={size}>
      {text}
    </Tag>
  );
};

export default Title;

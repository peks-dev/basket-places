import React from "react";
import "./title.css";
const Title = ({ tag, text, style }) => {
  const Tag = tag; // El nombre de la etiqueta HTML se asigna a la constante Tag

  return <Tag className={`title ${style}`}>{text}</Tag>;
};

export default Title;

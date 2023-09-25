import React from "react";
import "./form.css";

const Form = (props) => {
  return <form className={"form"}>{props.children}</form>;
};

export default Form;

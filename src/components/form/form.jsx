import React from "react";
import "./form.css";

const Form = (props) => {
  return (
    <form className={"form"} onSubmit={props.submitFn} id={props.id}>
      {props.children}
    </form>
  );
};

export default Form;

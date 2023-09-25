import React from "react";

//components
import FormField from "../../../../../form/form-field/form-field";
import Title from "../../../../../layout/title/title";

const Selector = ({
  title,
  type,
  name,
  options,
  selected,
  handleInputChange,
}) => {
  return (
    <div className="form__fields-wrap">
      <Title tag={"h3"} text={title} style={"title--label"} />
      {options.map((option, index) => (
        <FormField
          key={index}
          inputType={type}
          inputName={name}
          inputId={option.key}
          inputValue={option.value}
          inputChecked={selected === option.value}
          handleInputChange={handleInputChange}
          legendText={option.key}
        />
      ))}
    </div>
  );
};

export default Selector;

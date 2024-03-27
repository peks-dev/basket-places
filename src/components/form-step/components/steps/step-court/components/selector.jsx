import React from "react";

//components
import FormField from "@/components/form/form-field/form-field";
import Title from "@/components/layout/title/title";

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
      <h3 className={"form__label"}>{title}</h3>
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

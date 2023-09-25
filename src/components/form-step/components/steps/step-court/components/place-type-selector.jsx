import React from "react";

//components
import FormField from "../../../../../form/form-field/form-field";
import Title from "../../../../../layout/title/title";

const PlaceTypeSelector = ({ handleInputChange, state }) => {
  const placeTypes = ["deportivo", "parque"];
  return (
    <div className="form__fields-wrap">
      <Title tag={"h3"} text={"tipo de lugar"} style={"title--label"} />
      {placeTypes.map((place, index) => (
        <FormField
          key={index}
          inputType={"radio"}
          inputName={"place_type"}
          inputId={place}
          inputValue={place}
          inputChecked={state === place}
          handleInputChange={handleInputChange}
          legendText={place}
        />
      ))}
    </div>
  );
};

export default PlaceTypeSelector;

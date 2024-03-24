import React, { useContext } from "react";

// utilities
import CourtContext from "@/context/court/court-context";
// componentes
import Title from "@/components/layout/title/title";
import FormField from "@/components/form/form-field/form-field";

const StepServices = () => {
  const {
    courtState,
    updateWifi,
    updateTienda,
    updateTransporte,
    updateBaños,
  } = useContext(CourtContext);

  const serviceConfig = [
    { name: "wifi", updateFunction: updateWifi },
    { name: "tienda", updateFunction: updateTienda },
    { name: "transporte", updateFunction: updateTransporte },
    { name: "bathroom", updateFunction: updateBaños },
  ];

  const handleInputChange = (e, updateFunction) => {
    const { checked } = e.target;
    if (updateFunction) {
      updateFunction(checked);
    }
  };

  return (
    <div className="step-services">
      <div className="form__fields-wrap">
        <Title tag={"h3"} text={"servicios"} style={"title--label"} />
        {serviceConfig.map((service, index) => (
          <FormField
            key={index}
            inputName={"services"}
            inputType={"checkbox"}
            inputId={service.name}
            inputChecked={courtState.services[service.name] === true}
            handleInputChange={(e) =>
              handleInputChange(e, service.updateFunction)
            }
            legendText={service.name}
          />
        ))}
      </div>
    </div>
  );
};

export default StepServices;

import React from "react";

// componentes
import FormField from "@/components/form/form-field/form-field";
// Context
import { useStepFormStore } from "@/context/stepFormStore";

const StepServices = () => {
  const { formData, updateWifi, updateShop, updateTransport, updateBathroom } =
    useStepFormStore();

  const serviceConfig = [
    { name: "wifi", updateFunction: updateWifi },
    { name: "shop", updateFunction: updateShop },
    { name: "transport", updateFunction: updateTransport },
    { name: "bathroom", updateFunction: updateBathroom },
  ];

  const handleInputChange = (e, updateFunction) => {
    const { checked } = e.target;
    if (updateFunction) {
      updateFunction(checked);
    }
  };

  return (
    <div
      className="step-services"
      style={{ width: "100%", height: "100%", padding: "2.5rem" }}
    >
      <div className="form__fields-wrap">
        <h3 className={"form__label"}>servicios</h3>
        {serviceConfig.map((service, index) => (
          <FormField
            key={index}
            inputName={"services"}
            inputType={"checkbox"}
            inputId={service.name}
            inputChecked={formData.services[service.name] === true}
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

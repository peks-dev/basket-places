import React, { useContext } from "react";

// utilities
import CourtContext from "../../../../context/court/court-context";

const StepServices = () => {
  const services = ["wifi", "tienda", "transporte", "baños"];

  const {
    courtState,
    updateWifi,
    updateTienda,
    updateTransporte,
    updateBaños,
  } = useContext(CourtContext);

  const serviceUpdateMap = {
    wifi: updateWifi,
    tienda: updateTienda,
    transporte: updateTransporte,
    baños: updateBaños,
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    const updateFunction = serviceUpdateMap[id];
    if (updateFunction) {
      updateFunction(JSON.parse(value));
    }
  };

  return (
    <>
      <div className="form__group">
        <h4 className="form__field-name">¿Que hay cerca?</h4>
        <ul className="form__inputs-wrap">
          {services.map((service, index) => (
            <li key={index} className="form__input-group">
              <label htmlFor={service}>
                {service}
                <input
                  className="form__input"
                  type="checkbox"
                  name="services"
                  id={service}
                  value={courtState.services[service] ? false : true}
                  onChange={handleInputChange}
                  checked={courtState.services[service] === true}
                />
              </label>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default StepServices;

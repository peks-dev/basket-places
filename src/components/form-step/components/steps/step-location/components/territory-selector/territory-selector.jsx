import React, { useEffect, useState, useContext } from "react";
import "./territory-selector.css";

// Services
import {
  fetchAuthToken,
  fetchCountries,
  fetchStates,
  fetchCities,
} from "../../../../../../../services/universal/territories.service";

// context
import CourtContext from "../../../../../../../context/court/court-context";
// hooks
import { useLocalStorage } from "../../../../../../../hooks/use-local-storage.hook";

// Components
import Btn from "../../../../../../../components/layout/button/button";
import Title from "../../../../../../../components/layout/title/title";
import DropdownSelector from "./components/dropdown-sector/dropdown-selector";
import Loader from "../../../../../../../components/loader/loader";
import Error from "../../../../../../../components/error/error";

const TerritorySelector = ({ setTerritorySelected }) => {
  // Global State
  const { courtState } = useContext(CourtContext);

  // token
  const [authToken, setAuthToken] = useLocalStorage("authToken", null);
  const [authTokenObtained, setAuthTokenObtained] = useState(false);

  // Options array
  const [countries, setCountries] = useState(null);
  const [states, setStates] = useState(null);
  const [cities, setCities] = useState(null);

  // selected Options
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCitie, setSelectedCitie] = useState(null);

  // Error controls
  const [status, setStatus] = useState("loading"); // loading, error, success

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedCountries = localStorage.getItem("countries");
        if (cachedCountries) {
          setCountries(JSON.parse(cachedCountries));
          setStatus("success");
        } else {
          if (!authTokenObtained) {
            const token = await fetchAuthToken();
            try {
              setAuthToken(token.auth_token);
              setAuthTokenObtained(true);
              if (token) {
                const countriesList = await fetchCountries(token.auth_token);
                setCountries(countriesList);
                localStorage.setItem(
                  "countries",
                  JSON.stringify(countriesList)
                );
                setStatus("success");
              }
            } catch (error) {
              setStatus("error");
            }
          }
        }
      } catch (error) {
        setStatus("error");
      }
    };
    fetchData();

    // Recuperar selecciones en caso de retroceso
    if (courtState.location.country) {
      setSelectedCountry(courtState.location.country);
    }

    if (courtState.location.state) {
      setSelectedState(courtState.location.state);
    }
    if (courtState.location.city) {
      setSelectedCitie(courtState.location.city);
    }
  }, []);

  // obtener lista estados cuando se elija un país
  useEffect(() => {
    if (selectedCountry) {
      const getStates = async () => {
        try {
          const statesList = await fetchStates(authToken, selectedCountry);
          setStates(statesList);
        } catch (error) {
          setStatus("error");
        }
      };
      getStates();
    }
  }, [authToken, selectedCountry]);

  // Obtener lista de ciudades cuando se elija un estado
  useEffect(() => {
    if (selectedState) {
      const getCities = async () => {
        try {
          const citiesList = await fetchCities(authToken, selectedState);
          setCities(citiesList);
        } catch (error) {
          setStatus("error");
        }
      };
      getCities();
    }
  }, [authToken, selectedState]);

  // Esperar a que los datos estén listos
  if (status === "loading") {
    return <Loader />;
  }

  // Mostrar mensaje de error en caso de error
  if (status === "error") {
    return <Error />;
  }

  return (
    <div className="territory-selector-container">
      <ul className="territory-selector__wrap">
        <li className="territory-selector__group">
          <Title
            text={"país"}
            style={"title--left title--form-sub"}
            tag={"h3"}
          />
          <DropdownSelector
            options={countries}
            name="country"
            selectedOption={selectedCountry}
            setSelectedOption={setSelectedCountry}
          />
        </li>
        {selectedCountry && states && (
          <li className="territory-selector__group">
            <Title
              text={"estado"}
              style={"title--left title--form-sub"}
              tag={"h3"}
            />
            <DropdownSelector
              options={states}
              name="state"
              selectedOption={selectedState}
              setSelectedOption={setSelectedState}
            />
          </li>
        )}
        {selectedState && cities && (
          <li className="territory-selector__group">
            <Title
              text={"ciudad"}
              style={"title--left title--form-sub"}
              tag={"h3"}
            />
            <DropdownSelector
              options={cities}
              name="city"
              selectedOption={selectedCitie}
              setSelectedOption={setSelectedCitie}
            />
          </li>
        )}
      </ul>
      {selectedState && (
        <Btn
          variant={"btn--primary"}
          text={"Ir a mapa"}
          onClick={() => {
            setTerritorySelected(true);
          }}
        />
      )}
    </div>
  );
};

export default TerritorySelector;

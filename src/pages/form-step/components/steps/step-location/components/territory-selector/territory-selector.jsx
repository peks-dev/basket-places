import React, { useEffect, useState, useContext } from "react";
import "./territory-selector.css";

// Services
import {
  fetchAuthToken,
  fetchCountries,
  fetchStates,
  fetchCities,
} from "../../../../../../../services/universal.service";

// context
import CourtContext from "../../../../../../../context/court/court-context";

// hooks
import { useLocalStorage } from "../../../../../../../hooks/use-local-storage.hook";

// Components
import Btn from "../../../../../../../components/layout/button/button";
import Title from "../../../../../../../components/layout/title/title";
import DropdownSelector from "./components/dropdown-sector/dropdown-selector";

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if data is available in localStorage
        const cachedCountries = localStorage.getItem("countries");
        if (cachedCountries) {
          setCountries(JSON.parse(cachedCountries));
          setLoading(false);
        } else {
          if (!authTokenObtained) {
            const token = await fetchAuthToken();
            try {
              setAuthToken(token.auth_token);
              setAuthTokenObtained(true);
              if (token) {
                // obtain countries to API
                const countriesList = await fetchCountries(token.auth_token);
                setCountries(countriesList);

                // Save data to localStorage
                localStorage.setItem(
                  "countries",
                  JSON.stringify(countriesList)
                );
              }
            } catch (error) {
              setError(error);
            }
          }
          setLoading(false);
        }
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);

  // obtener lista estados cuando se eliga un pais
  useEffect(() => {
    if (selectedCountry) {
      const getStates = async () => {
        try {
          const statesList = await fetchStates(authToken, selectedCountry);
          setStates(statesList);
        } catch (error) {
          setError(error);
        }
      };
      getStates();
    }
  }, [selectedCountry]);

  // obtener lista ciudades cuando se eliga un estado
  useEffect(() => {
    if (selectedState) {
      const getCities = async () => {
        try {
          const citiesList = await fetchCities(authToken, selectedState);
          setCities(citiesList);
        } catch (error) {
          setError(error);
        }
      };
      getCities();
    }
  }, [selectedState]);

  // Recuperar selecciones en caso de retroceso o recarga
  useEffect(() => {
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

  // Esperar a que los datos esten listos
  if (loading) {
    return <div>Cargando la data...</div>;
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
      {selectedCitie && cities && (
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

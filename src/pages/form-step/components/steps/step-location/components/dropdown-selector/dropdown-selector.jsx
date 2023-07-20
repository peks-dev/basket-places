import React, { Suspense, useEffect, useState } from "react";
import {
  fetchAuthToken,
  fetchCountries,
} from "../../../../../../../services/universal.service";

const DropdownSelector = () => {
  const [countries, setCountries] = useState(null);
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = await fetchAuthToken();
      setAuthToken(token);
      const countriesList = await fetchCountries(token);
      setCountries(countriesList);
    };
    fetchData();
  }, []);

  console.log(authToken);
  console.log(countries);

  return (
    <Suspense fallback={<div>loading...</div>}>
      <div className="dropdown-container">
        {countries &&
          countries.map((country, index) => (
            <li key={country.country_short_name}>
              <p>{country.country_name}</p>
            </li>
          ))}
      </div>
    </Suspense>
  );
};

export default DropdownSelector;

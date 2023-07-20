export async function fetchAuthToken() {
  const API_TOKEN =
    "glOWp2X8UnB6vIKt2ye346rehV06EUAy42tIq9hvRFNlH-_WHSeIgEuX2CFTJgrknyY";

  const headers = {
    Accept: "application/json",
    "api-token": API_TOKEN,
    "user-email": "peks@criptext.com",
  };

  const authToken = await fetch(
    "https://www.universal-tutorial.com/api/getaccesstoken",
    { headers }
  )
    .then((res) => res.json())
    .then((res) => res);

  return authToken.auth_token.toString();
}

export async function fetchCountries(authToken) {
  const url = "https://www.universal-tutorial.com/api/countries";

  const headers = {
    authorization: `Bearer ${authToken}`,
    Accept: "application/json",
  };
  const contries = await fetch(url, { headers })
    .then((res) => res.json())
    .then((data) => data);

  return contries;
}

export async function fetchStates(country, authToken) {
  const url = `https://www.universal-tutorial.com/api/states/${country}`;

  const headers = {
    authorization: `Bearer ${authToken}`,
    Accept: "application/json",
  };
  const states = await fetch(url, { headers })
    .then((res) => res.json())
    .then((data) => data);

  return states;
}

export async function fetchCities(state, authToken) {
  const url = `https://www.universal-tutorial.com/api/states/${state}`;

  const headers = {
    authorization: `Bearer ${authToken}`,
    Accept: "application/json",
  };
  const cities = await fetch(url, { headers })
    .then((res) => res.json())
    .then((data) => data);

  return cities;
}

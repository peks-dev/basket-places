import axios from "axios";

const API_TOKEN =
  "glOWp2X8UnB6vIKt2ye346rehV06EUAy42tIq9hvRFNlH-_WHSeIgEuX2CFTJgrknyY";

const API_URL = "https://www.universal-tutorial.com/api";

const headers = {
  Accept: "application/json",
  "api-token": API_TOKEN,
  "user-email": "peks@criptext.com",
};

export async function fetchAuthToken() {
  try {
    const response = await axios.get(`${API_URL}/getaccesstoken`, {
      headers: headers,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch users");
  }
}

export async function fetchCountries(authToken) {
  try {
    const headers = {
      authorization: `Bearer ${authToken}`,
      Accept: "application/json",
    };

    const response = await axios.get(`${API_URL}/countries`, {
      headers: headers,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function fetchStates(authToken, countrie) {
  try {
    const headers = {
      authorization: `Bearer ${authToken}`,
      Accept: "application/json",
    };

    const response = await axios.get(`${API_URL}/states/${countrie}`, {
      headers: headers,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function fetchCities(authToken, state) {
  try {
    const headers = {
      authorization: `Bearer ${authToken}`,
      Accept: "application/json",
    };

    const response = await axios.get(`${API_URL}/cities/${state}`, {
      headers: headers,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

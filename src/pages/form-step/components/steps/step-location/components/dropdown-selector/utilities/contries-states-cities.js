import { FetchData } from "../../../../../../../../utilities/fetch-data.utilities";

const API_TOKEN =
  "glOWp2X8UnB6vIKt2ye346rehV06EUAy42tIq9hvRFNlH-_WHSeIgEuX2CFTJgrknyY";

function getAuthToken() {
  const headers = {
    Accept: "application/json",
    "api-token": API_TOKEN,
    "user-email": "peks@criptext.com",
    method: "GET",
  };

  const data = FetchData(
    "https://www.universal-tutorial.com/api/getaccesstoken",
    headers
  );

  const dataRead = data.read();

  return dataRead;
}

export async function reverseGeocoding(lat, lng) {
  var requestOptions = {
    method: "GET",
  };

  return fetch(
    `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=${
      import.meta.env.VITE_GEOAPIFY_KEY
    }`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => console.log("error", error));
}

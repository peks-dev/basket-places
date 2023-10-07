const locationAdapter = (location) => {
  const { coordinates, country, city, state } = location;
  const locationWithValues = {};

  if (coordinates) {
    locationWithValues.lng = coordinates.lng;
    locationWithValues.lat = coordinates.lat;
  }

  if (country) {
    locationWithValues.country = country;
  }

  if (city) {
    locationWithValues.city = city;
  }

  if (state) {
    locationWithValues.state = state;
  }

  return locationWithValues;
};

export default locationAdapter;

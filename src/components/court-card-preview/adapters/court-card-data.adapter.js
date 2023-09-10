export function courtCardDataAdapter(courtData, locationData, images) {
  const { name, game_level, id, owner } = courtData[0];
  const { country, state, city,lat, lng } = locationData[0];
  const dataAdapted = {
    court_id: id,
    name,
    game_level,
    country,
    state,
    city,
    images,
    owner,
    coordinates: [lat,lng],
  };

  return dataAdapted;
}

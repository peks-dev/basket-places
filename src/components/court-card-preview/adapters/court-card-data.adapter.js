export function courtCardDataAdapter(courtData, locationData, images) {
  const { name, game_level, id } = courtData[0];
  const { country, state, city } = locationData[0];
  const dataAdapted = {
    court_id: id,
    name,
    game_level,
    country,
    state,
    city,
    images,
  };

  return dataAdapted;
}
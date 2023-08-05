export function adaptFetchedData(
  courtData,
  urlImgs,
  locationData,
  schedulesData,
  serviceData
) {
  const { owner, name, description, game_level, floor_type, place_type, roof } =
    courtData[0];
  const { lng, lat, country, state, city } = locationData[0];
  const { transporte, wifi, tienda, bathroom } = serviceData[0];

  const imgs = urlImgs.map((e) => {
    return e.publicUrl;
  });

  const dataAdapted = {
    owner,
    name,
    description,
    game_level,
    floor_type,
    place_type,
    roof,
    images: imgs,
    location: {
      coordinates: {
        lat,
        lng,
      },
      country,
      state,
      city,
    },
    schedules: schedulesData,
    services: {
      transporte,
      wifi,
      tienda,
      bathroom,
    },
  };

  return dataAdapted;
}

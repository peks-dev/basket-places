class CourtModel {
  constructor(
    name = null,
    description = null,
    game_level = null,
    place_type = null,
    floor_type = null,
    roof = false,
    coordinates = null,
    state = null,
    city = null,
    country = null,
    images = [],
    schedules = [],
    services = { wifi: false, shop: false, transport: false, bathroom: false },
    owner = null,
    id = null
  ) {
    this.id = id;
    this.owner = owner;
    this.name = name;
    this.description = description;
    this.game_level = game_level;
    this.place_type = place_type;
    this.floor_type = floor_type;
    this.roof = roof;
    this.location = {
      coordinates: coordinates,
      country: country,
      state: state,
      city: city,
    };
    this.images = images;
    this.schedules = schedules;
    this.services = services;
  }
}

export default CourtModel;

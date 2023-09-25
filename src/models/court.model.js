class CourtModel {
  constructor(
    name,
    description,
    game_level,
    place_type,
    floor_type,
    roof,
    ubi,
    images,
    schedules,
    services
  ) {
    this.name = name;
    this.description = description;
    this.game_level = game_level;
    this.place_type = place_type;
    this.floor_type = floor_type;
    this.roof = undefined;
    this.location = {
      coordinates: {},
      country: null,
      state: null,
      city: null,
    };
    this.images = images;
    this.schedules = [];
    this.services = {
      wifi: false,
      tienda: false,
      transporte: false,
      bathroom: false,
    };
  }
}

export default CourtModel;

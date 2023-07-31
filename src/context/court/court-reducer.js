import CourtModel from "../../models/court.model";
import {
  SET_COORDINATES,
  SET_DESCRIPTION,
  SET_FLOOR_TYPE,
  SET_GAME_LEVEL,
  SET_IMAGES,
  SET_NAME,
  SET_PLACE_TYPE,
  SET_ROOF,
  SET_SCHEDULE,
  REMOVE_LAST_SCHEDULE,
  SET_WIFI,
  SET_TRANSPORTE,
  SET_TIENDA,
  SET_BAÑOS,
  SET_COUNTRY,
  SET_STATE,
  SET_CITY,
} from "./types";

const initialCourt = new CourtModel();

const courtReducer = (state, action) => {
  const { payload, type } = action;

  switch (type) {
    case SET_COORDINATES:
      return {
        ...state,
        location: {
          ...state.location,
          coordinates: payload,
        },
      };
    case SET_IMAGES:
      return {
        ...state,
        images: payload,
      };
    case SET_NAME:
      return {
        ...state,
        name: payload,
      };
    case SET_DESCRIPTION:
      return {
        ...state,
        description: payload,
      };
    case SET_GAME_LEVEL:
      return {
        ...state,
        game_level: payload,
      };
    case SET_PLACE_TYPE:
      return {
        ...state,
        place_type: payload,
      };
    case SET_ROOF:
      return {
        ...state,
        roof: payload,
      };
    case SET_FLOOR_TYPE:
      return {
        ...state,
        floor_type: payload,
      };
    case SET_SCHEDULE:
      return {
        ...state,
        schedules: [...state.schedules, payload],
      };
    case REMOVE_LAST_SCHEDULE:
      return {
        ...state,
        schedules: state.schedules.slice(0, -1), // Eliminar el último elemento del array
      };
    case SET_WIFI:
      return {
        ...state,
        services: {
          ...state.services,
          wifi: payload,
        },
      };
    case SET_TRANSPORTE:
      return {
        ...state,
        services: {
          ...state.services,
          transporte: payload,
        },
      };
    case SET_BAÑOS:
      return {
        ...state,
        services: {
          ...state.services,
          bathroom: payload,
        },
      };
    case SET_TIENDA:
      return {
        ...state,
        services: {
          ...state.services,
          tienda: payload,
        },
      };
    case SET_COUNTRY:
      return {
        ...state,
        location: {
          ...state.location,
          country: payload,
        },
      };
    case SET_STATE:
      return {
        ...state,
        location: {
          ...state.location,
          state: payload,
        },
      };
    case SET_CITY:
      return {
        ...state,
        location: {
          ...state.location,
          city: payload,
        },
      };
  }
};

export { initialCourt, courtReducer };

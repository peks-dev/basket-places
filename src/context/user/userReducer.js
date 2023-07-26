import { SET_USER_DATA, GET_USER_LOCATION, USER_LOGOUT } from "./types";
import UserModel from "../../models/user.model";

const inicialUser = new UserModel(); // Crea una instancia vacía de UserModel

const userReducer = (state, action) => {
  const { payload, type } = action;
  switch (type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...payload, // Actualiza el estado con los datos del usuario recibidos en payload
      };
    case USER_LOGOUT:
      return inicialUser;
    case GET_USER_LOCATION:
      return {
        ...state,
        location: payload,
      };
    default:
      return state;
  }
};

export { inicialUser, userReducer };

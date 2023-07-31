import React, { useEffect, useReducer } from "react";
import { SET_USER_DATA } from "./types";

// Context
import UserContext from "../user/userContext";
import { userReducer, inicialUser } from "./userReducer";

// services
import { getSession, logout, login } from "../../services/auth.service";
import getUser from "../../services/user.service";
import useGeolocation from "../../hooks/useGeolocation.hook";

const UserProvider = (props) => {
  const fetchProfile = async () => {
    try {
      const session = await getSession();
      if (session?.user?.id) {
        const profile = await getUser(session.user.id);
        dispatch({ type: SET_USER_DATA, payload: profile });
      }
      throw new Error("No hay session iniciada");
    } catch (error) {
      throw error;
    }
  };

  const userLocation = async () => {
    try {
      const getUserLocation = useGeolocation();
      const coordinates = await getUserLocation();
      if (coordinates) {
        dispatch({ type: "GET_USER_LOCATION", payload: coordinates });
      }
      throw error;
    } catch (error) {
      return error;
    }
  };

  const userLogin = async (userEmail, userPassword) => {
    try {
      await login(userEmail, userPassword);
      await Promise.all([fetchProfile(), userLocation()]);
    } catch (error) {
      throw error;
    }
  };

  const userLogout = async () => {
    try {
      await logout();
      dispatch({ type: "USER_LOGOUT" });
      localStorage.removeItem("user");
    } catch (error) {
      throw error;
    }
  };

  const [user, dispatch] = useReducer(userReducer, inicialUser);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      dispatch({ type: SET_USER_DATA, payload: JSON.parse(storedUser) });
    } else {
      fetchProfile();
      userLocation();
    }
  }, []);

  // Almacenar el usuario en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const values = {
    user,
    userLogout,
    userLogin,
  };

  return (
    <UserContext.Provider value={values}>{props.children}</UserContext.Provider>
  );
};

export default UserProvider;

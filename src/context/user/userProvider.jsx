import React, { useEffect, useReducer } from "react";
import { SET_USER_DATA } from "./types";

// Context
import UserContext from "../user/userContext";
import { userReducer, inicialUser } from "./userReducer";

// services
import {
  getSession,
  logout,
  login,
} from "../../services/supabase/auth.service";
import { fetchDataOnTable } from "../../services/supabase/table-operations.service";
import geolocation from "../../hooks/useGeolocation.hook";

const UserProvider = (props) => {
  const fetchProfile = async () => {
    try {
      const session = await getSession();
      if (session?.user?.id) {
        const profile = await fetchDataOnTable(
          "profiles",
          "id",
          session.user.id
        );
        dispatch({ type: SET_USER_DATA, payload: profile[0] });
      }
      throw new Error("No hay session iniciada");
    } catch (error) {
      throw error;
    }
  };

  const userLocation = async () => {
    try {
      const getUserLocation = geolocation();
      const coordinates = await getUserLocation();
      if (coordinates) {
        dispatch({ type: "GET_USER_LOCATION", payload: coordinates });
        console.log(coordinates);
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
    userLocation,
  };

  return (
    <UserContext.Provider value={values}>{props.children}</UserContext.Provider>
  );
};

export default UserProvider;

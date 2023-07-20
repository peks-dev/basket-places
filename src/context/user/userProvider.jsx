import React, { useEffect, useReducer } from "react";

// Context
import UserContext from "../user/userContext";
import { userReducer, inicialUser } from "./userReducer";

// services
import { getSession, logout, login } from "../../services/auth.service";
import getUser from "../../services/user.service";
import useGeolocation from "../../hooks/useGeolocation.hook";

const UserProvider = (props) => {
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      dispatch({ type: "GET_USER_DATA", payload: JSON.parse(storedUser) });
    } else {
      fetchProfile();
      userLocation();
    }
  }, []);

  const fetchProfile = async () => {
    try {
      const session = await getSession();
      if (session?.user?.id) {
        const profile = await getUser(session.user.id);
        dispatch({ type: "GET_USER_DATA", payload: profile });
      }
      throw error;
    } catch (error) {
      console.log(error);
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

  const userLogin = async (userEmail, userPassword) => {
    try {
      await login(userEmail, userPassword);
      fetchProfile();
      if (error) {
        throw error;
      }
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

  const [user, dispatch] = useReducer(userReducer, inicialUser);

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

import React, { useReducer } from "react";

import { courtReducer, initialCourt } from "./court-reducer";
import CourtContext from "./court-context";

const CourtProvier = (props) => {
  const updateCoordinates = (coordinates) => {
    dispatch({ type: "SET_COORDINATES", payload: coordinates });
  };
  const updateImages = (images) => {
    dispatch({ type: "SET_IMAGES", payload: images });
  };

  const updateName = (name) => {
    dispatch({ type: "SET_NAME", payload: name });
  };

  const updateDescription = (description) => {
    dispatch({ type: "SET_DESCRIPTION", payload: description });
  };

  const updateGameLevel = (gameLevel) => {
    dispatch({ type: "SET_GAME_LEVEL", payload: gameLevel });
  };

  const updatePlaceType = (placeType) => {
    dispatch({ type: "SET_PLACE_TYPE", payload: placeType });
  };

  const updateRoof = (roof) => {
    dispatch({ type: "SET_ROOF", payload: roof });
  };

  const updateFloorType = (floorType) => {
    dispatch({ type: "SET_FLOOR_TYPE", payload: floorType });
  };

  const updateSchedule = (schedule) => {
    dispatch({ type: "SET_SCHEDULE", payload: schedule });
  };

  const removeSchedule = () => {
    dispatch({ type: "REMOVE_LAST_SCHEDULE:" });
  };

  const updateWifi = (wifi) => {
    dispatch({ type: "SET_WIFI", payload: wifi });
  };

  const updateTransporte = (transporte) => {
    dispatch({ type: "SET_TRANSPORTE", payload: transporte });
  };

  const updateBaños = (baños) => {
    dispatch({ type: "SET_BAÑOS", payload: baños });
  };

  const updateTienda = (tienda) => {
    dispatch({ type: "SET_TIENDA", payload: tienda });
  };

  const updateCountry = (country) => {
    dispatch({ type: "SET_COUNTRY", payload: country });
  };
  const updateState = (state) => {
    dispatch({ type: "SET_STATE", payload: state });
  };

  const updateCity = (city) => {
    dispatch({ type: "SET_CITY", payload: city });
  };

  const [courtState, dispatch] = useReducer(courtReducer, initialCourt);

  const values = {
    courtState,
    updateCoordinates,
    updateImages,
    updateName,
    updateDescription,
    updateGameLevel,
    updatePlaceType,
    updateRoof,
    updateFloorType,
    updateSchedule,
    removeSchedule,
    updateWifi,
    updateBaños,
    updateTransporte,
    updateTienda,
    updateCountry,
    updateState,
    updateCity,
  };

  return (
    <CourtContext.Provider value={values}>
      {props.children}
    </CourtContext.Provider>
  );
};

export default CourtProvier;

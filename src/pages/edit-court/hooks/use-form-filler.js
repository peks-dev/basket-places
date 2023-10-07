import React, { useState, useEffect, useContext } from "react";

// Context
import UserContext from "../../../context/user/userContext";
import CourtContext from "../../../context/court/court-context";

// Hooks
import { useGetDataCourt } from "../../court-details/hooks/use-get-data-court.hook";

export function useFormFiller(courtId) {
  const {
    allDataCourt,
    loading: dataLoading,
    error: dataError,
  } = useGetDataCourt(courtId);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext);
  const {
    courtState,
    updateCountry,
    updateState,
    updateCity,
    updateCoordinates,
    updateImages,
    updateName,
    updateDescription,
    updateGameLevel,
    updatePlaceType,
    updateRoof,
    updateFloorType,
    updateSchedule,
    updateWifi,
    updateBaños,
    updateTransporte,
    updateTienda,
  } = useContext(CourtContext);

  function fillCourtState(data) {
    // Territoy selection
    updateCountry(data.location.country);
    updateState(data.location.state);
    updateCity(data.location.city);
    // Map selection
    updateCoordinates(data.location.coordinates);
    // imgs step
    updateImages(data.images);
    // Description step
    updateName(data.name);
    updateDescription(data.description);
    updateGameLevel(data.game_level);
    // cancha Step
    updatePlaceType(data.place_type);
    updateRoof(data.roof);
    updateFloorType(data.floor_type);
    // schedules step
    data.schedules.map((schedule) => {
      updateSchedule(schedule);
    });
    // services step
    updateWifi(data.services.wifi);
    updateBaños(data.services.bathroom);
    updateTransporte(data.services.transporte);
    updateTienda(data.services.tienda);
  }

  useEffect(() => {
    if (!dataLoading) {
      if (allDataCourt.owner !== user.id) {
        setError("No eres dueño de este Basket Place");
        setLoading(false);
      } else {
        // Ejecuta la función fillCourtState solo una vez cuando se cumplan las condiciones
        fillCourtState(allDataCourt);
        setLoading(false);
      }
    }

    if (dataError) {
      setError(dataError);
      setLoading(false);
    }
  }, [courtId, dataLoading]);

  return { loading, error };
}

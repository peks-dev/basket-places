import React, { useState, useContext } from "react";

// context
import CourtContext from "../../../context/court/court-context";

// hooks
import { useGetDataCourt } from "../../court-details/hooks/use-get-data-court.hook";

export function useUpdateCourt(courtId) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { courtState } = useContext(CourtContext);
  const {
    allDataCourt,
    loading: loadingData,
    error: errorData,
  } = useGetDataCourt(courtId);

  const updateCourt = async () => {
    try {
      if (!allDataCourt) {
        // Muestra un mensaje o componente alternativo si no hay datos de la corte
        console.log("cargando");
      }
      setLoading(true);
      console.log("Se ejecuta funcion para actualizar cancha");
      console.log(courtState);
      console.log(allDataCourt);
      setSuccess(true);
    } catch (error) {
      setError("hubo un error al actualizar la cancha: " + error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, success, updateCourt };
}

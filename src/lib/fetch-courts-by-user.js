import { useState } from "react";
// services
import { fetchDataOnTable } from "@/services/supabase/table-operations.service";
// context
import { useUserCourtsRegisteredStore } from "@/context/userCourtsRegisteredStore";
// models
import { ConnectionError } from "@/models/errors.model";
// lib
import { consolidateCourtData } from "@/adapters/court-data.adapter";

export function useFetchCourtsByOwner() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { saveUserCourtsRegistered } = useUserCourtsRegisteredStore();

  async function fetchCourtsByOwner(userId) {
    if (userId) {
      try {
        let courts = [];
        setLoading(true);
        const data = await fetchDataOnTable("courts", "owner", userId);
        for (const court of data) {
          const courtDataComplete = await consolidateCourtData(court);
          courts.push(courtDataComplete);
        }
        saveUserCourtsRegistered(courts);
      } catch (error) {
        if (error.message === "TypeError: Failed to fetch") {
          console.log("conexion");
          setError(new ConnectionError("no tienes conexión"));
        } else {
          setError(new Error("hubo un problema al recuperar tus canchas"));
        }
      } finally {
        setLoading(false);
      }
    } else {
      setError(new Error("no has iniciado session"));
    }
  }

  return { loading, error, fetchCourtsByOwner };
}

import React, { useEffect, useState } from "react";
// services
import { fetchDataOnTable } from "@/services/supabase/table-operations.service";
// models
import { ConnectionError } from "@/models/errors.model";
// context
import { useUserStore } from "@/context/userStore";
// hooks
import { consolidateCourtData } from "@/adapters/court-data.adapter";
// components
import CourtCard from "@/components/court-card-preview/court-card";
import { ErrorBoundary } from "@/utilities/error-boundaries";
import CloseIcon from "@/components/icons/close-icon";
import Loader from "@/components/loader/loader";

const UserCourtsRegistered = () => {
  const [courts, setCourts] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { profile } = useUserStore();

  // traer todas las canchas relacionadas con el usuario
  async function fetchCourtsData() {
    try {
      let courtsAdapted = [];
      const res = await fetchDataOnTable("courts", "owner", `${profile.id}`);
      for (const court of res) {
        const dataAdapted = await consolidateCourtData(court);
        courtsAdapted.push(dataAdapted);
      }
      // guardar en local storage
      const courtsJSON = JSON.stringify(courtsAdapted);
      localStorage.setItem("registered-user-courts", courtsJSON);
      // guardar en estado
      setCourts(courtsAdapted);
      setLoading(false);
    } catch (error) {
      if (error.message === "TypeError: Failed to fetch") {
        setError(new ConnectionError("revisa tu conexion a internet"));
      } else {
        setError(new Error("algo salio mal, intentalo mas tarde"));
      }
      setLoading(false);
    }
  }

  useEffect(() => {
    // verificar si ya se hizo el fetch
    if (!localStorage.getItem("registered-user-courts")) {
      fetchCourtsData();
    } else {
      const fetchedCourts = JSON.parse(
        localStorage.getItem("registered-user-courts")
      );
      setCourts(fetchedCourts);
      setLoading(false);
    }
  }, [profile.id]);

  // Verificar si todavía se están cargando los datos
  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <ErrorBoundary error={error}>
        {courts.length > 0 ? (
          courts.map((courtData, index) => (
            <li key={index} className="user-courts__item">
              <CourtCard courtData={courtData} />
            </li>
          ))
        ) : (
          <div className="user-courts__empty">
            <div className="user-courts__icon">
              <CloseIcon />
            </div>
            <p>aun no tienes canchas registradas</p>
          </div>
        )}
      </ErrorBoundary>
    </>
  );
};

export default UserCourtsRegistered;

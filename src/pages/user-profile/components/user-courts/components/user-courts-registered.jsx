import React, { useEffect } from "react";
// services
import { fetchDataOnTable } from "@/services/supabase/table-operations.service";
// models
import { ConnectionError } from "@/models/errors.model";
// context
import { useUserStore } from "@/context/userStore";
import { useUserCourtsRegisteredStore } from "@/context/userCourtsRegisteredStore";
// hooks
import { consolidateCourtData } from "@/adapters/court-data.adapter";
import { useFetchCourtData } from "@/lib/fetch-court-data";
// components
import CourtCard from "@/components/court-card-preview/court-card";
import { ErrorBoundary } from "@/utilities/error-boundaries";
import CloseIcon from "@/components/icons/close-icon";
import Loader from "@/components/loader/loader";

const UserCourtsRegistered = () => {
  const { profile } = useUserStore();
  const { saveUserCourtsRegistered, userCourtsList } =
    useUserCourtsRegisteredStore();
  const { loading, error, fetchAllCourtData } = useFetchCourtData();

  // traer todas las canchas relacionadas con el usuario
  async function fetchUserCourts() {
    try {
      let courtsAdapted = [];
      const res = await fetchDataOnTable("courts", "owner", `${profile.id}`);
      for (const court of res) {
        const dataAdapted = await fetchAllCourtData(court.id);
        courtsAdapted.push(dataAdapted);
      }
      saveUserCourtsRegistered(courtsAdapted);
    } catch (error) {
      console.log(error.name);
      throw error;
    }
  }

  useEffect(() => {
    if (userCourtsList.length < 1) {
      fetchUserCourts();
    }
  }, [profile.id, userCourtsList]);

  // Verificar si todavía se están cargando los datos
  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <ErrorBoundary error={error}>
        {userCourtsList.length > 0 ? (
          userCourtsList.map((courtData, index) => (
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

import React, { useEffect, useState } from "react";
// services
import { fetchDataOnTable } from "@/services/supabase/table-operations.service";
// context
import { useUserStore } from "@/context/userStore";
// hooks
import { consolidateCourtData } from "@/adapters/court-data.adapter";
// components
import CourtCard from "@/components/court-card-preview/court-card";

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
      setError(error);
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

  // verificar si no hay errores
  if (error) {
    console.log(error);
    return <div>hubo un error</div>;
  }
  // Verificar si todavía se están cargando los datos
  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      {courts.map((courtData, index) => (
        <li key={index} className="user-courts__item">
          <CourtCard courtData={courtData} />
        </li>
      ))}
    </>
  );
};

export default UserCourtsRegistered;

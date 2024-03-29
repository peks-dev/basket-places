import React, { useEffect, useState, useContext } from "react";

// services
import { fetchDataOnTable } from "@/services/supabase/table-operations.service";
// context
import UserContext from "@/context/user/userContext";
// hooks
import { consolidateCourtData } from "@/adapters/court-data.adapter";
// components
import CourtCard from "@/components/court-card-preview/court-card";

const UserCourtsRegistered = () => {
  const [courts, setCourts] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const { user } = useContext(UserContext);
  // realizar el fetch a la tabla courts y filtrando por id la columna owner
  async function fetchCourtsData() {
    try {
      const res = await fetchDataOnTable("courts", "owner", `${user.id}`);
      let courtsAdapted = [];
      res.map(async (court) => {
        const dataAdapted = await consolidateCourtData(court);
        courtsAdapted.push(dataAdapted);
      });
      setCourts(courtsAdapted);
      console.log(courtsAdapted);
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  }
  useEffect(() => {
    fetchCourtsData();
  }, [user]);
  // Pasar esa lista de courts_ids a cardDataAdapter
  // Añadirlas al estado
  // quitar el estado de carga
  // renderizar un courtCard por cada cancha

  if (error) {
    return <div>hubo un error</div>;
  }
  // Verificar si todavía se están cargando los datos
  if (loading) {
    return <div>Cargando...</div>;
  }
  console.log(courts);
  return (
    <>
      {courts.map((courtData) => (
        <li key={courtData.court_id} className="user-courts__item">
          <p>hola</p>
          <CourtCard courtData={courtData} />
        </li>
      ))}
    </>
  );
};

export default UserCourtsRegistered;

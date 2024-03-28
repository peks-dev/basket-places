import React, { useContext, useState, useEffect } from "react";
import "./user-courts.css";

// Hooks
import { useCourtsData } from "../../../../hooks/use-courts-data.hook";
import useCourtDeletion from "./hooks/use-court-deletion.hook";

// context
import UserContext from "../../../../context/user/userContext";

// Components
import CourtCard from "../../../../components/court-card-preview/court-card";
import Title from "../../../../components/layout/title/title";
import Modal from "../../../../components/modal/modal";
import Loader from "../../../../components/loader/loader";
import Error from "../../../../components/error/error";

const UserCourts = () => {
  const { user } = useContext(UserContext);
  const { canchasData, loading, error } = useCourtsData("owner", user.id);
  const [courts, setCourts] = useState([]);

  // realizar el fetch a la tabla courts y filtrando por id la columna owner
  // Pasar esa lista de courts_ids a cardDataAdapter
  // Añadirlas al estado
  // quitar el estado de carga
  // renderizar un courtCard por cada cancha

  useEffect(() => {
    if (!loading && !error) {
      setCourts(canchasData);
    }
  }, [loading, error, canchasData]);

  return (
    <div className="user-courts">
      <Title text={"BP registrados"} style={"title--center"} tag={"h2"} />

      <ul className="user-courts__wrap">
        {loading && <Loader />}
        {error ? <Error /> : null}
        {courts.map((courtData) => (
          <li key={courtData.court_id} className="user-courts__item">
            <CourtCard courtData={courtData} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserCourts;

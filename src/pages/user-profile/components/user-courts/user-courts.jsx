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

const UserCourts = () => {
  const { user } = useContext(UserContext);
  const { canchasData, loading, error } = useCourtsData("owner", user.id);
  const [courts, setCourts] = useState([]);
  const {
    showModal,
    courtToDelete,
    deleteError,
    handleDeleteButtonClick,
    handleConfirmDelete,
    handleCancelDelete,
  } = useCourtDeletion(user.id, courts, setCourts);

  useEffect(() => {
    if (!loading && !error) {
      setCourts(canchasData);
    }
  }, [loading, error, canchasData]);

  if (error) {
    console.log(error);
  }

  if (loading) {
    return <div>cargando data...</div>;
  }

  return (
    <div className="user-courts">
      <Title text={"BP registrados"} tag={"h2"} />
      <ul className="user-courts__wrap">
        {courts.map((courtData, index) => (
          <li key={courtData.court_id} className="user-courts__item">
            <CourtCard
              courtData={courtData}
              showDeleteButton={true}
              handleDeleteCourt={handleDeleteButtonClick}
            />
          </li>
        ))}
      </ul>
      {showModal && (
        <Modal
          title="Confirmar Eliminación"
          message={`¿Estás seguro de que deseas eliminar la cancha ${courtToDelete.name}?`}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default UserCourts;

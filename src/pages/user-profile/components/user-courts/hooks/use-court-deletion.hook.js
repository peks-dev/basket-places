import { useState } from "react";

// utilities
import { deleteCourt } from "../utilities/delete-court";

const useCourtDeletion = (userId, courts, setCourts) => {
  const [showModal, setShowModal] = useState(false);
  const [courtToDelete, setCourtToDelete] = useState(null);
  const [deleteError, setDeleteError] = useState(null);

  const handleDeleteButtonClick = (courtId) => {
    const searchedCourt = courts.find((court) => court.court_id === courtId);
    setCourtToDelete(searchedCourt);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteCourt(userId, courtToDelete.court_id, courtToDelete.images);
      setCourts((prevCourts) =>
        prevCourts.filter((court) => court.court_id !== courtToDelete.court_id)
      );
    } catch (error) {
      setDeleteError(error);
    }
    setShowModal(false);
  };

  const handleCancelDelete = () => {
    setCourtToDelete(null);
    setShowModal(false);
  };

  return {
    showModal,
    courtToDelete,
    deleteError,
    handleDeleteButtonClick,
    handleConfirmDelete,
    handleCancelDelete,
  };
};

export default useCourtDeletion;

import React, { useEffect } from "react";
// lib
import { useFetchCourtsByOwner } from "@/lib/fetch-courts-by-user";
// context
import { useUserCourtsRegisteredStore } from "@/context/userCourtsRegisteredStore";
import { useUserStore } from "@/context/userStore";
// components
import Loader from "@/components/loader/loader";
import CourtCard from "@/components/court-card-preview/court-card";
import CloseIcon from "@/components/icons/close-icon";
import ErrorDisplay from "@/components/errors/error-display/error-display";

const UserCourtsRegistered = () => {
  const { loading, error, fetchCourtsByOwner } = useFetchCourtsByOwner();
  const { profile } = useUserStore();
  const { userCourtsList, courtsFetched } = useUserCourtsRegisteredStore();

  useEffect(() => {
    if (!courtsFetched) {
      fetchCourtsByOwner(profile.id);
    }
  }, [profile.id, courtsFetched]);

  if (loading) {
    return <Loader />; // sustituir por skeleton
  }

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  return (
    <>
      {userCourtsList.length > 0 ? (
        userCourtsList.map((court) => (
          <li key={court.id} className="user-courts__item">
            <CourtCard courtData={court} />
          </li>
        ))
      ) : (
        <div className="user-courts__empty">
          <div className="user-courts__icon">
            <CloseIcon />
          </div>
          <p className="user-courts__text">sin canchas registradas</p>
        </div>
      )}
    </>
  );
};

export default UserCourtsRegistered;

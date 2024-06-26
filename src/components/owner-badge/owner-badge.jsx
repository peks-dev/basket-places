import React, { useEffect } from "react";
import "./owner-badge.css";
import defaultUserImg from "/images/user-profile.svg";
// lib
import { useFetchOwnerBadge } from "@/lib/fetch-owner-badge-data";
// components
import OwnerBadgeSkeleton from "@/components/skeletons/owner-badge-skeleton/owner-badge-skeleton";

const OwnerBadge = ({ ownerId, variant }) => {
  const { loading, error, ownerData, getOwnerBadgeData } = useFetchOwnerBadge();

  useEffect(() => {
    getOwnerBadgeData(ownerId);
  }, [ownerId]);

  if (loading) {
    return <OwnerBadgeSkeleton />;
  }

  if (error) {
    return <div>salio un error</div>;
  }

  return (
    <div className="owner" data-variant={variant}>
      <picture className="owner__avatar">
        <img
          src={loading || error ? defaultUserImg : ownerData.avatar_url}
          alt=""
        />
      </picture>
      <p className="owner__name">{ownerData.apodo}</p>
    </div>
  );
};

export default OwnerBadge;

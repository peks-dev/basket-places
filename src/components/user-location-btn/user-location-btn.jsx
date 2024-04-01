import React from "react";

// context
import { useUserStore } from "@/context/userStore";

import Button from "../button/button";
import LocationIcon from "@/components/icons/location-icon";
import geolocation from "@/utilities/geolocation.utility";

const UserLocationBtn = ({ mapRef }) => {
  const { profile, updateUserLocation } = useUserStore();

  function handleUserLocation() {
    geolocation()
      .then((coordinates) => {
        mapRef.current.flyTo(coordinates, 13, { animate: true });
        updateUserLocation(coordinates);
      })
      .catch((error) => {
        alert("hubo un error" + error);
      });
  }

  return (
    <Button
      variant={`map-control`}
      onClick={handleUserLocation}
      customStyle={profile.location ? "active" : "inactive"}
    >
      <LocationIcon />
    </Button>
  );
};

export default UserLocationBtn;

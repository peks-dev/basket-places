import UserContext from "@/context/user/userContext";
import { useContext } from "react";

import Button from "../button/button";
import LocationIcon from "@/components/icons/location-icon";

const UserLocationBtn = ({ mapRef }) => {
  const { user, userLocation } = useContext(UserContext);

  function getUserLocation() {
    userLocation()
      .then((coordinates) => {
        mapRef.current.flyTo(coordinates, 13, { animate: true });
      })
      .catch((error) => {
        alert("hubo un error" + error);
      });
  }

  return (
    <Button
      variant={`map-control`}
      onClick={getUserLocation}
      customStyle={user.location ? "active" : "inactive"}
    >
      <LocationIcon />
    </Button>
  );
};

export default UserLocationBtn;

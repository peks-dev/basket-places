import React, { useContext } from "react";
import Map from "../../components/map/map";
import UserContext from "../../context/user/userContext";
import "./map-page.css";
import UserMarker from "../../components/map/components/user-position-marker";

const MapPage = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="map-wrap">
      {user.location ? (
        <Map
          userLocation={user.location}
          UserMarker={<UserMarker markerPosition={user.location} />}
        />
      ) : (
        <div>..cargando</div>
      )}
    </div>
  );
};

export default MapPage;

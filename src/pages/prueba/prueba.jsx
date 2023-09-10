import React , {useContext, useState}from "react";
import MapLeaflet from "../../components/map-leaflet/map-leaflet";
import "./prueba.css"

// Context
import UserContext from "../../context/user/userContext";

// Utilities
import Btn from "../../components/layout/button/button";

const Prueba=()=>{

    const {user} = useContext(UserContext)
    const countryLocation = [20.97974498745322, -89.6202153569469];
    const defaultLocation = user.location ? user.location : countryLocation;
    const [flyTo, setFlyTo] = useState(false)



    const handleUserLocation = () => {
        setFlyTo(true)
    }

    return <div className="prueba-container">
        <MapLeaflet center={defaultLocation} zoom={13} userLocation={user.location} flyTo={flyTo}/>
        <Btn text={"ubicacion"} variant={"btn--primary btn--map"} onClick={handleUserLocation}/>
    </div>
}

export default Prueba;
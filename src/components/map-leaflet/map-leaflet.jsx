import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./map-leaflet.css"

// utilities
import { flyToLocation } from "./utilities/fly-to.utility";

const MapLeaflet = ({ center, zoom, flyTo, userLocation }) => {
    const mapRef = useRef(null);

    const handleFlyTo = ()=>{
        flyToLocation(mapRef, userLocation,13,true)
    }

    {flyTo ? handleFlyTo(): null}

    useEffect(() => {
      // Create the map instance
      mapRef.current = L.map("map-leaflet", {
        center,
        zoom,
      });

      // Add a tile layer to the map
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);

      return () => {
        // Clean up the map instance when the component is unmounted
        mapRef.current.remove();
      };
    }, [center, zoom]);

    L.marker([-37.699450, 176.279420]).addTo(mapRef.current);
    return <div id="map-leaflet"></div>;
  };

  export default MapLeaflet;
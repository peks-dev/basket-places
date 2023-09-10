import L from "leaflet";

export const flyToLocation = (mapRef, location, zoom, animate) => {
  if (mapRef.current && location) {
    mapRef.current.flyTo(location, zoom, {
      animate: animate,
    });
  }
};
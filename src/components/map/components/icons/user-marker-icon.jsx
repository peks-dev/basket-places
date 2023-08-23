import L from "leaflet";

import userLocationIcon from "../../../../assets/map/user-location-icon.svg";

export const UserMarkerIcon = L.icon({
  iconUrl: userLocationIcon,
  iconRetinaUrl: userLocationIcon,
  iconAnchor: null,
  shadowAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  iconSize: [35],
  className: "icono-masiso",
});

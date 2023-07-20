import L from "leaflet";

import locationIcon from "../../../assets/global/location.svg";

export const IconMarker = L.icon({
  iconUrl: locationIcon,
  iconRetinaUrl: locationIcon,
  iconAnchor: null,
  shadowAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  iconSize: [35, 35],
  className: "icono-masiso",
});

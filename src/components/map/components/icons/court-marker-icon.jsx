import L from "leaflet";

import locationIcon from "../../../../assets/global/location.svg";

export const CourtMarkerIcon = L.icon({
  iconUrl: locationIcon,
  iconRetinaUrl: locationIcon,
  iconAnchor: null,
  shadowAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  iconSize: [40, 40],
  className: "icono-masiso",
});

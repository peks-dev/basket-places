import { useState, useEffect } from "react";

// adapter
import { markerDataAdapter } from "../../../components/map/adapters/marker-data.adapter";
// services
import { fetchDataOnTable } from "../../../services/supabase/table-operations.service";

export function useLocationsCourtsList() {
  const [courtsList, setCourtsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLocationCourts = async () => {
    try {
      // Intenta obtener las coordenadas desde localStorage
      const storedCoords = localStorage.getItem("courtCoordinates");

      if (storedCoords) {
        // Si las coordenadas están almacenadas, utiliza esas coordenadas
        const parsedCoords = JSON.parse(storedCoords);
        setCourtsList(parsedCoords);
        setLoading(false);
      } else {
        // Si no están almacenadas, realiza la petición
        const locationCourts = await fetchDataOnTable(
          "locations",
          null,
          null,
          "court_id,lat,lng"
        );
        const adaptedMarkersData = markerDataAdapter(locationCourts);

        // Guarda las coordenadas en localStorage para futuras visitas
        localStorage.setItem(
          "courtCoordinates",
          JSON.stringify(adaptedMarkersData)
        );

        setCourtsList(adaptedMarkersData);
        setLoading(false);
      }
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchLocationCourts();
  }, []);
  return { courtsList, loading, error, fetchLocationCourts };
}

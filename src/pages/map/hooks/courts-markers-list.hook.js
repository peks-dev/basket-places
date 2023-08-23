import { useState, useEffect } from "react";

// adapter
import { markerDataAdapter } from "../../../components/map/adapters/marker-data.adapter";
// services
import { fetchDataOnTable } from "../../../services/supabase/table-operations.service";

export function useCourtsMarkersList() {
  const [markersData, setMarkersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocationCourts = async () => {
      try {
        const locationCourts = await fetchDataOnTable(
          "locations",
          null,
          null,
          "court_id,lat,lng"
        );
        const adaptedMarkersData = markerDataAdapter(locationCourts);
        setMarkersData(adaptedMarkersData);
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    };

    fetchLocationCourts();
  }, []);
  return { markersData, loading, error };
}

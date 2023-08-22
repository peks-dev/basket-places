// hooks/use-canchas-data.hook.js
import { useState, useEffect } from "react";
import { fetchDataOnTable } from "../services/supabase/table-operations.service";
import { prepareCourtData } from "../utilities/prepare-court-data";

export function useCourtsData(filter = null, filterValue = null) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [canchasData, setCanchasData] = useState([]);

  async function fetchData() {
    try {
      let courts;

      if (filter && filterValue) {
        courts = await fetchDataOnTable("courts", filter, filterValue);
      } else {
        courts = await fetchDataOnTable("courts");
      }
      const dataPromises = courts.map((court) => prepareCourtData(court.id));

      const courtsDataList = await Promise.all(dataPromises);

      setCanchasData(courtsDataList);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return { canchasData, loading, error };
}

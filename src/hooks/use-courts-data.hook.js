// hooks/use-canchas-data.hook.js
import { useState, useEffect } from "react";
import { fetchCourtsList } from "../services/court/fetch-data.service";
import { dataCourtCard } from "../utilities/data-court-card";

export function useCourtsData() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [canchasData, setCanchasData] = useState([]);

  async function fetchData() {
    try {
      const courts = await fetchCourtsList();
      const dataPromises = courts.map((court) => dataCourtCard(court.id));

      const courtDataList = await Promise.all(dataPromises);

      setCanchasData(courtDataList);
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

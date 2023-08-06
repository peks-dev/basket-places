import { useState, useEffect } from "react";

// services
import { fetchDataOnTable } from "../services/court/fetch-data.service";
import { createImgUrl } from "../services/court/create-url.service";
import { courtCardDataAdapter } from "../components/court-card-preview/adapters/court-card-data.adapter";

export function useGetDataCard(courtId) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  async function fetchData() {
    try {
      const courtData = await fetchDataOnTable("courts", "id", courtId);

      const locationData = await fetchDataOnTable(
        "locations",
        "court_id",
        courtId
      );

      const imagesNames = await fetchDataOnTable("images", "court_id", courtId);

      console.log(courtData[0].owner);

      const urlsPromises = imagesNames.map((imgName) => {
        return createImgUrl(courtData[0].owner, courtId, imgName.file_name);
      });

      const urlImgs = await Promise.all(urlsPromises);

      if (courtData && locationData && urlImgs) {
        console.log("hola");
        const dataAdapted = courtCardDataAdapter(
          courtData,
          locationData,
          urlImgs
        );

        setData(dataAdapted);
        setLoading(false);
      }
    } catch (error) {
      setError(error);
    }
  }
  useEffect(() => {
    fetchData();
  }, [courtId]);

  return { data, loading, error };
}

import { useState, useEffect } from "react";
//services
import { fetchDataOnTable } from "../../../services/supabase/table-operations.service";
import { createImgUrl } from "../../../services/supabase/create-url.service";

//adapters
import { adaptFetchedData } from "../adapters/fetched-data.adapter";

export function useGetDataCourt(courtId) {
  const [error, setError] = useState(null);
  const [allDataCourt, setAllDataCourt] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const courtData = await fetchDataOnTable("courts", "id", courtId);
      const locationData = await fetchDataOnTable(
        "locations",
        "court_id",
        courtId
      );
      const serviceData = await fetchDataOnTable(
        "services",
        "court_id",
        courtId
      );
      const schedulesData = await fetchDataOnTable(
        "schedules",
        "court_id",
        courtId
      );

      // obtain imgs
      const imagesNames = await fetchDataOnTable("images", "court_id", courtId);
      const urlsPromises = imagesNames.map((imgName) => {
        return createImgUrl(courtData[0].owner, courtId, imgName.file_name);
      });

      console.log(imagesNames);

      // Wait for all promises to resolve
      const urlImgs = await Promise.all(urlsPromises);

      if (
        courtData &&
        locationData &&
        urlImgs &&
        serviceData &&
        schedulesData
      ) {
        const dataAdapted = adaptFetchedData(
          courtData,
          urlImgs,
          locationData,
          schedulesData,
          serviceData
        );
        setAllDataCourt(dataAdapted);
        setLoading(false);
      } else {
        setError(new Error("Error fetching court data"));
      }
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [courtId]); // Add user.id as a dependency

  return { allDataCourt, loading, error };
}

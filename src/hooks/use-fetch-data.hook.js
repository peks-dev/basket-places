import React, { useEffect, useState } from "react";

export function useFetchData(url, headers) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(url, { headers })
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => {
        setError(err);
      })
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}

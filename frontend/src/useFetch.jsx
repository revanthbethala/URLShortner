import React, { useEffect, useState } from "react";
import axios from "axios";
function useFetch(path) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);
  useEffect(() => {
    async function fetchData() {
      setError("");
      setData(null);
      try {
        setIsLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/${path}`
        );
        setData(res?.data);
      } catch (err) {
        setError(err?.response?.data?.message || "failed to fetch");
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [path]);
  return { data, isLoading, error };
}

export default useFetch;

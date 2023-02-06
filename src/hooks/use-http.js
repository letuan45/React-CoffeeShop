import { useState, useCallback } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchHandler = useCallback(async (fetchConfig, applyData) => {
    setIsLoading(true);
    try {
      const response = await fetch(fetchConfig.url, {
        method: fetchConfig.method ? fetchConfig.method : "GET",
        body: fetchConfig.body ? JSON.stringify(fetchConfig.body) : null,
        header: fetchConfig.header ? fetchConfig.header : null,
      });
      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();
      applyData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    fetchHandler,
  };
};

export default useHttp;

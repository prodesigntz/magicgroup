import { getSingleDocByFieldName } from "@/firebase/databaseOperations";
import { useState, useEffect } from "react";

function useFetchByFieldName(cln, userFilters, orderByData = null) {
  const [data, setData] = useState(null);
  const [didSucceed, setDidSucceed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const controller = new AbortController(); // Add AbortController for cleanup

    const fetchData = async () => {
      try {
        const rs = await getSingleDocByFieldName(
          cln,
          userFilters,
          orderByData,
          { signal: controller.signal }
        ); // Pass the signal to the fetch function

        if (rs.didSucceed) {
          setData(rs.document);
          setDidSucceed(true);
        } else {
          setError("Failed to fetch the document");
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    // Cleanup function to abort fetch on unmount
    return () => {
      controller.abort();
    };
  }, [cln, userFilters, orderByData]); // Add dependencies

  return { isLoading, didSucceed, data, error }; // Return error state as well
}

export default useFetchByFieldName;

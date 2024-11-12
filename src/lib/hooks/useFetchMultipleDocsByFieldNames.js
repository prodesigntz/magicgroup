import { useState, useEffect } from "react";
import { getMultipleDocsByFieldNames } from "@/firebase/databaseOperations";

function useFetchMultipleDocsByFieldNames(cln, userFilters, orderByData) {
  const [data, setData] = useState(null);
  const [didSucceed, setDidSucceed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const controller = new AbortController(); // Initialize AbortController

    const fetchData = async () => {
      try {
        const rs = await getMultipleDocsByFieldNames(
          cln,
          userFilters,
          orderByData,
          { signal: controller.signal }
        ); // Pass signal for aborting

        if (rs.didSucceed) {
          setData(rs.documents);
          setDidSucceed(true);
        } else {
          setError("Failed to fetch documents");
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message); // Capture the error message
        }
      } finally {
        setIsLoading(false); // Ensure loading is set to false
      }
    };

    fetchData();

    return () => {
      controller.abort(); // Cleanup to abort fetch
    };
  }, [cln, userFilters, orderByData]); // Add dependencies

  return { isLoading, didSucceed, data, error }; // Return error state as well
}

export default useFetchMultipleDocsByFieldNames;

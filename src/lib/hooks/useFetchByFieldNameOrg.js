import { getSingleDocByFieldNameOrg } from "@/firebase/databaseOperations";
import { useState, useEffect } from "react";

function useFetchByFieldNameOrg(cln, { fieldName, fieldValue }) {
  const [data, setData] = useState(null);
  const [didSucceed, setDidSucceed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const controller = new AbortController(); // Initialize AbortController

    const fetchData = async () => {
      try {
        const rs = await getSingleDocByFieldNameOrg(
          cln,
          fieldName,
          fieldValue,
          { signal: controller.signal }
        ); // Pass signal for aborting

        if (rs.didSucceed) {
          setData(rs.document);
          setDidSucceed(true);
        } else {
          setError("Failed to fetch the document");
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
  }, [cln, fieldName, fieldValue]); // Add dependencies

  return { isLoading, didSucceed, data, error }; // Return error state as well
}

export default useFetchByFieldNameOrg;

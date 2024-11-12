"use client";

import { fetchDocuments } from "@/firebase/databaseOperations";
import { useState, useEffect } from "react";

function useFetchAll(cln) {
  const [data, setData] = useState([]);
  const [didSucceed, setDidSucceed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const { didSucceed, items } = await fetchDocuments(cln, {
          signal: controller.signal,
        }); // Pass the signal to the fetch

        if (didSucceed) {
          setData(items);
          setDidSucceed(true);
        } else {
          setError("Failed to fetch data");
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          // Only set errors that are not related to aborting
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort(); // Cleanup to abort the request on unmount
    };
  }, [cln]);

  return { isLoading, didSucceed, data, error }; // Return error state as well
}

export default useFetchAll;

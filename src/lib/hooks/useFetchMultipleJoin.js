"use client"

import { useState, useEffect } from "react";
import { fetchDocuments } from "@/firebase/databaseOperations";

function useFetchMultipleJoin(collections) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [didSucceed, setDidSucceed] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await Promise.all(
          collections.map((collection) => fetchDocuments(collection))
        );
        const combinedData = results.flatMap((result) => result.items);
        setData(combinedData);
        setDidSucceed(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [collections]);

  return { isLoading, didSucceed, data };
}

export default useFetchMultipleJoin;

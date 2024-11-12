import { getSingleDocument } from "@/firebase/databaseOperations";
import { useState, useEffect } from "react";

function useFetchSingleDoc(cln, docId) {
  const [data, setData] = useState(null);
  const [didSucceed, setDidSucceed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const rs = await getSingleDocument(cln, docId);
      if (rs.didSucceed) {
        setData(rs.document);
        setDidSucceed(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [cln, docId]);

  return { isLoading, didSucceed, data };
}

export default useFetchSingleDoc;

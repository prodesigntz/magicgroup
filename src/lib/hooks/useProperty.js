"use client";

import { useState, useEffect, useCallback } from "react";
import { getSingleDocByFieldNameOrg, updateDocumentArrayOrg } from "@/firebase/databaseOperations";

export function useProperty(slug) {
  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRetrying, setIsRetrying] = useState(false);

  const fetchProperty = useCallback(async (isRetry = false) => {
    if (!slug) {
      setError("No property slug provided");
      setIsLoading(false);
      return;
    }

    try {
      if (isRetry) {
        setIsRetrying(true);
      } else {
        setIsLoading(true);
      }
      
      setError(null);

      const { didSucceed, document } = await getSingleDocByFieldNameOrg(
        "Properties",
        "slug",
        slug
      );

      if (didSucceed && document) {
        setProperty(document);
      } else {
        throw new Error("Property not found");
      }
    } catch (err) {
      console.error("Error fetching property:", err);
      setError(err.message || "Failed to load property");
    } finally {
      setIsLoading(false);
      setIsRetrying(false);
    }
  }, [slug]);

  const retry = useCallback(() => {
    fetchProperty(true);
  }, [fetchProperty]);

  const reset = useCallback(() => {
    setProperty(null);
    setError(null);
    setIsLoading(true);
  }, []);

  useEffect(() => {
    fetchProperty();
  }, [fetchProperty]);

  return {
    property,
    isLoading,
    error,
    isRetrying,
    retry,
    reset,
    refetch: fetchProperty
  };
}

// Enhanced hook with optimistic updates for property operations
export function usePropertyOperations(propertyId) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  const updateProperty = useCallback(async (updates, optimisticUpdate) => {
    setIsUpdating(true);
    setUpdateError(null);

    try {
      // Apply optimistic update immediately
      if (optimisticUpdate) {
        optimisticUpdate();
      }

      // Perform actual update
      const result = await updateDocumentArrayOrg(
        "Properties",
        propertyId,
        updates
      );

      if (!result.didSucceed) {
        throw new Error(result.message || "Update failed");
      }

      return result;
    } catch (error) {
      setUpdateError(error.message);
      // Revert optimistic update if provided
      if (optimisticUpdate && optimisticUpdate.revert) {
        optimisticUpdate.revert();
      }
      throw error;
    } finally {
      setIsUpdating(false);
    }
  }, [propertyId]);

  return {
    updateProperty,
    isUpdating,
    updateError
  };
}
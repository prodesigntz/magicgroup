"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Skeleton } from './ui/skeleton';

// Progressive loader that loads content as it comes into view
export function ProgressiveLoader({ 
  children, 
  fallback, 
  delay = 0, 
  threshold = 0.1,
  rootMargin = '50px',
  className = ''
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [isVisible, delay]);

  return (
    <div ref={elementRef} className={className}>
      {isLoaded ? children : (fallback || <DefaultSkeleton />)}
    </div>
  );
}

// Default skeleton for progressive loading
function DefaultSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
}

// Specific skeleton for property sections
export function PropertySectionSkeleton({ type = 'default' }) {
  switch (type) {
    case 'rooms':
      return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-48 w-full rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      );
    
    case 'gallery':
      return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full rounded-lg" />
          ))}
        </div>
      );
    
    case 'features':
      return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-40 w-full rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          ))}
        </div>
      );
    
    case 'faqs':
      return (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="border rounded-lg p-4">
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      );
    
    default:
      return <DefaultSkeleton />;
  }
}

// Hook for progressive loading state
export function useProgressiveLoading(dependencies = [], delay = 100) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedSections, setLoadedSections] = useState(new Set());

  const markSectionLoaded = (sectionId) => {
    setLoadedSections(prev => new Set([...prev, sectionId]));
  };

  const isSectionLoaded = (sectionId) => {
    return loadedSections.has(sectionId);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, dependencies);

  return {
    isLoading,
    loadedSections,
    markSectionLoaded,
    isSectionLoaded
  };
}
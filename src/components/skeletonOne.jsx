import React from 'react'
import { Skeleton } from './ui/skeleton';

export default function SkeletonOne() {
  return (
    <section className="space-y-5">
      <Skeleton className="h-32 w-auto rounded-lg" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-auto" />
        <Skeleton className="h-4 w-auto" />
      </div>
    </section>
  );
}

import React from 'react';
import { Skeleton } from '../ui/skeleton';

export default function PropertyPageSkeleton() {
  return (
    <main className="">
      {/* Hero section skeleton */}
      <div className="relative p-5">
        <Skeleton className="w-full h-[560px] rounded-md" />
        <div className="absolute bottom-0 left-0 right-0 md:mx-10">
          <div className="psektion respons">
            <div className="respons sektion md:grid-cols-5 text-white">
              <div className="col-span-3 mb-10">
                <div className="space-y-4">
                  <Skeleton className="h-8 w-48 bg-white/20" />
                  <Skeleton className="h-12 w-80 bg-white/20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb skeleton */}
      <div className="psektion respons">
        <div className="flex items-center space-x-2 py-4">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>

      {/* Content sections skeleton */}
      <div className="space-y-8">
        {/* Property intro skeleton */}
        <div className="psektion respons">
          <div className="sektion md:grid-cols-5">
            <div className=""></div>
            <div className="col-span-3 space-y-4">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-3/4" />
            </div>
            <div className=""></div>
          </div>
        </div>

        {/* Property rooms skeleton */}
        <div className="psektion respons">
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <Skeleton className="h-6 w-32 mx-auto" />
              <Skeleton className="h-10 w-48 mx-auto" />
            </div>
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
          </div>
        </div>

        {/* Gallery skeleton */}
        <div className="psektion respons">
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <Skeleton className="h-6 w-24 mx-auto" />
              <Skeleton className="h-10 w-40 mx-auto" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <Skeleton key={i} className="h-32 w-full rounded-lg" />
              ))}
            </div>
          </div>
        </div>

        {/* Unique features skeleton */}
        <div className="psektion respons">
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <Skeleton className="h-6 w-40 mx-auto" />
              <Skeleton className="h-10 w-56 mx-auto" />
            </div>
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
          </div>
        </div>

        {/* FAQs skeleton */}
        <div className="psektion respons">
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <Skeleton className="h-6 w-48 mx-auto" />
              <Skeleton className="h-10 w-64 mx-auto" />
            </div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="border rounded-lg p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact skeleton */}
        <div className="psektion respons">
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <Skeleton className="h-6 w-32 mx-auto" />
              <Skeleton className="h-10 w-48 mx-auto" />
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-40" />
                </div>
              </div>
              <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-10 w-32" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
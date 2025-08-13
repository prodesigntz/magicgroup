"use client";

import { HeaderTitle, HomeParagraph, Title } from "@/components/texties";
import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Slash, AlertCircle, RefreshCw, Home } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
//import AccomodationBookForm from "@/components/accomodation/singleAccomodation/accomodationBookForm";
import PropertyIntro from "@/components/accomodation/singleAccomodation/propertyIntro";
//import PropertyAmenities from "@/components/accomodation/singleAccomodation/propertyAmenities";
import PropertyContact from "@/components/accomodation/singleAccomodation/propertyContact";
//import Gallery from "@/components/content/gallery";
import PropertyRooms from "@/components/accomodation/singleAccomodation/propertyRooms";
//import PropertyActivities from "@/components/accomodation/singleAccomodation/propertyActivities";
import PropertyFAQs from "@/components/accomodation/singleAccomodation/propertyFAQs";
import PropertyUnique from "@/components/accomodation/singleAccomodation/propertyUnique";
import {
  getSingleDocByFieldNameOrg,
  updateDocumentArrayOrg,
} from "@/firebase/databaseOperations";
import DashboardDataLoader from "@/components/dashboard/dashboard-data-loader";
import PropertyPageSkeleton from "@/components/skeletons/PropertyPageSkeleton";
import ErrorBoundary, { useErrorHandler } from "@/components/ErrorBoundary";
import { ProgressiveLoader, PropertySectionSkeleton, useProgressiveLoading } from "@/components/ProgressiveLoader";
import { useProperty } from "@/lib/hooks/useProperty";

import PropertyGalleryCloud from "@/components/accomodation/singleAccomodation/propertyGalleryCloud";
import { ButtonOne } from "@/components/buttons";
import { Button } from "@/components/ui/button";

function PropertyPageContent() {
  const params = useParams();
  const { slug } = params;
  const { property, isLoading, error, isRetrying, retry } = useProperty(slug);
  const { error: handlerError, handleError, resetError } = useErrorHandler();
  const { markSectionLoaded, isSectionLoaded } = useProgressiveLoading([property]);
  const router = useRouter();
  const pathname = usePathname();

  // Extract the page name from the pathname and format it
  const pageName = pathname.split("/").pop();
  const formattedPageName = pageName
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Log errors for debugging
  useEffect(() => {
    if (error && !isRetrying) {
      console.error('Property loading error:', error);
    }
  }, [error, isRetrying]);

  // Loading state with enhanced skeleton
  if (isLoading && !property) {
    return <PropertyPageSkeleton />;
  }

  // Error state with better UX
  if ((error || handlerError) && !property) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center space-y-6 max-w-md">
          <div className="flex justify-center">
            <AlertCircle className="h-16 w-16 text-red-500" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">Oops! Something went wrong</h2>
            <p className="text-gray-600">
              {error || handlerError || "We couldn't load the property details."}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() => {
                retry();
                resetError();
              }}
              disabled={isRetrying}
              className="flex items-center gap-2"
            >
              {isRetrying ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              {isRetrying ? "Retrying..." : "Try Again"}
            </Button>
            <Button variant="outline" onClick={() => router.push("/companies")} className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Back to Properties
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Property Not Found</h2>
          <p className="text-gray-600">The property you're looking for doesn't exist.</p>
          <Button onClick={() => router.push("/companies")}>Browse All Properties</Button>
        </div>
      </div>
    );
  }

  // Extract propertyID from the fetched property
  //const propertyID = property?.id;
  //console.log("property id ", propertyID);

  return (
    <main className="">
      {/* hero section */}
      <div className="relative p-5">
        <Image
          src={property?.img}
          alt="Magic Group"
          width={2000}
          height={440}
          style={{
            maxWidth: "100%",
            height: "560px",
            objectFit: "cover",
          }}
          // className="h-96 md:h-[560px] justify-center object-cover object-top rounded-md border border-prosecondary"
          className="max-w-full max-h-50 rounded-md"
        />
        <div className="absolute bottom-0 left-0 right-0 md:mx-10 ">
          <div className="psektion respons ">
            <div className="">
              <div className="respons sektion md:grid-cols-5 text-white">
                <div className="col-span-3 mb-10">
                  <HeaderTitle
                    className="uppercase md:text-start drop-shadow-md"
                    // subHeading="Luxury Camps & Lodges"
                    first={formattedPageName}
                  />
                  <div className="flex justify-center md:justify-start  drop-shadow-md ">
                    <Breadcrumb>
                      <BreadcrumbList>
                        <BreadcrumbItem>
                          <BreadcrumbLink
                            href="/"
                            className="text-white hover:text-white"
                          >
                            Home
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator>
                          <Slash className="text-white" />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem>
                          <BreadcrumbPage className="text-white capitalize">
                            {formattedPageName}
                          </BreadcrumbPage>
                        </BreadcrumbItem>
                      </BreadcrumbList>
                    </Breadcrumb>
                  </div>
                  <div></div>
                </div>
                <div></div>
                <div className=""></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* booking form - pass propertyID to AccomodationBookForm */}
      {/* <AccomodationBookForm propertyID={propertyID} /> */}

      {/* Property Intro - Load immediately */}
      <div className="">
        <PropertyIntro property={property} />
      </div>

      <div className="bg-gradient-to-tr from-slate-950 to-yellow-400 psektion ">
        <div className="respons sektion md:grid-cols-8  md:content-center">
          <div className="col-span-6"> <Title
            className="md:text-start text-white"
            first="Your Trusted Partner"
          /></div>
          <div className="col-span-2"> <div className="flex md:justify-end md:content-center">
            <Button
              asChild
              variant="pro-primary"
              className=" bg-proprimary rounded-none text-white"
            >
              
               <ButtonOne
                                       name="Contact Us Now"
                                       onClick={() =>
                                         router.push(`/contact`)
                                       }
                                       className="justify-center  mt-5"
                                     />
            </Button>
          </div></div>        </div>
      </div>

      {/* Property Features - Progressive loading */}
      <ProgressiveLoader
        fallback={<PropertySectionSkeleton type="features" />}
        delay={100}
        className="mb-16"
      >
        <PropertyUnique property={property} />
      </ProgressiveLoader>

      {/* Property Rooms - Progressive loading */}
      <ProgressiveLoader
        fallback={<PropertySectionSkeleton type="rooms" />}
        delay={200}
        className="mb-16"
      >
        <PropertyRooms property={property} />
      </ProgressiveLoader>

      {/* Property FAQs - Progressive loading */}
      <ProgressiveLoader
        fallback={<PropertySectionSkeleton type="faqs" />}
        delay={300}
        className="mb-16"
      >
        <PropertyFAQs property={property} />
      </ProgressiveLoader>

      {/* Property Contact - Load immediately for accessibility */}
      <PropertyContact property={property} />
    </main>
  );
}

export default function Page() {
  return (
    <ErrorBoundary>
      <PropertyPageContent />
    </ErrorBoundary>
  );
}

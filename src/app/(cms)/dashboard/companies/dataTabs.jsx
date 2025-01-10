"use client"
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from 'next/navigation';
import { AllProperties } from "./allProperties";
import { AllRooms } from "./allRooms";
import { AllGallery } from "./allGallery";
import { AllFaqs } from "./allFaqs";
import { AllHighlights } from "./allHighlights";
import DashboardDataLoader from "@/components/dashboard/dashboard-data-loader";
import useFetchAll from "@/lib/hooks/useFetchAll";
import { getSingleDocument } from "@/firebase/databaseOperations";
import { getSlug } from "@/lib/utils";
import PropertyImageGalleryCloudinary from "@/components/cloudinaryComponents/propertyImageGalleryCloudinary";

export const DataTabs = ({ propertyID, data }) => {
  const router = useRouter();
  //   const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const slug = getSlug(data.name);

  console.log("Data reached data tabs", data);
  console.log("Slug  reached data tabs", slug);

  console.log("Rooms:", data.rooms);

  // useEffect(() => {
  //   if (propertyID) {
  //     const fetchProperty = async () => {
  //       setIsLoading(true);
  //       try {
  //         const { didSucceed, document } = await getSingleDocument(
  //           "Properties",
  //           propertyID
  //         );
  //         if (didSucceed) {
  //           setFormData({
  //             ...document,
  //           });
  //         } else {
  //           setError("Failed to fetch Property data.");
  //         }
  //       } catch (fetchError) {
  //         setError(`Error fetching Property data: ${fetchError.message}`);
  //       }
  //       setIsLoading(false);
  //     };

  //     fetchProperty();
  //   }
  // }, [propertyID]);

  //console.log("Data from tabs in property", document);

  return (
    <div className="">
      <Tabs defaultValue="Rooms">
        <TabsList className="bg-pamojatertiary rounded-none">
          <TabsTrigger value="Rooms" className="">
            Products
          </TabsTrigger>

          {/* <TabsTrigger value="Gallery">Gallery </TabsTrigger> */}
          <TabsTrigger value="Faqs">Faqs</TabsTrigger>
          <TabsTrigger value="Highlights">Highlights </TabsTrigger>
        </TabsList>

        {isLoading ? (
          <DashboardDataLoader />
        ) : (
          <>
            <TabsContent value="Rooms">
              <AllRooms propertyID={propertyID} data={data} />
            </TabsContent>

            {/* <TabsContent value="Gallery">
              <PropertyImageGalleryCloudinary slug={slug} />
            </TabsContent> */}
            <TabsContent value="Faqs">
              <AllFaqs propertyID={propertyID} data={data?.faq} />
            </TabsContent>
            <TabsContent value="Highlights">
              <AllHighlights propertyID={propertyID} data={data?.highlights} />
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  );
};

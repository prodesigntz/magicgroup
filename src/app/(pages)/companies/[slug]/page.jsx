"use client";

import { HeaderTitle, HomeParagraph, Title } from "@/components/texties";
import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Slash } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import AccomodationBookForm from "@/components/accomodation/singleAccomodation/accomodationBookForm";
import PropertyIntro from "@/components/accomodation/singleAccomodation/propertyIntro";
import PropertyAmenities from "@/components/accomodation/singleAccomodation/propertyAmenities";
import PropertyContact from "@/components/accomodation/singleAccomodation/propertyContact";
import Gallery from "@/components/content/gallery";
import PropertyRooms from "@/components/accomodation/singleAccomodation/propertyRooms";
import PropertyActivities from "@/components/accomodation/singleAccomodation/propertyActivities";
import PropertyFAQs from "@/components/accomodation/singleAccomodation/propertyFAQs";
import PropertyUnique from "@/components/accomodation/singleAccomodation/propertyUnique";
import {
  getSingleDocByFieldNameOrg,
  updateDocumentArrayOrg,
} from "@/firebase/databaseOperations";
import DashboardDataLoader from "@/components/dashboard/dashboard-data-loader";
import PropertyGalleryCloud from "@/components/accomodation/singleAccomodation/propertyGalleryCloud";
import { ButtonOne } from "@/components/buttons";
import { Button } from "@/components/ui/button";

export default function Page({ params }) {
  const { slug } = useParams();
  const router = useRouter();
  const pathname = usePathname();

  const [property, setProperty] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Extract the page name from the pathname and format it
  const pageName = pathname.split("/").pop();
  const formattedPageName = pageName
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Fetch property data by slug
  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!slug) {
        console.error("No slug provided");
        return;
      }

      try {
        const { didSucceed, document } = await getSingleDocByFieldNameOrg(
          "Properties",
          "slug",
          slug
        );

        if (didSucceed) {
          setProperty(document);
        } else {
          console.error("Failed to fetch property post");
        }
      } catch (error) {
        console.error("Error fetching property post:", error);
      }
    };

    fetchPropertyData();
  }, [slug]);

  if (!property) {
    return (
      <div>
        <DashboardDataLoader />
      </div>
    ); // Add a loading spinner or message if needed
  }

  // Extract propertyID from the fetched property
  const propertyID = property?.id;
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
                    subHeading="Luxury Camps & Lodges"
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

      {/* intro */}
      {/* <div className="md:pt-10"> */}
      <div className="">
      <PropertyIntro property={property} />
      </div>
      {/* amenities and reviews - bg overlay */}
      {/* <PropertyAmenities property={property} /> */}

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
              <ButtonOne name="Contact Us Now" />
            </Button>
          </div></div>        </div>
      </div>

      {/* unique features - bg overlay */}
      <PropertyUnique property={property} />


      {/* rooms */}
      <PropertyRooms property={property} />

      {/* activities */}
      {/* <div className="text-white bg-[url('/images/accomodations/oleaout.jpeg')] bg-cover bg-center bg-slate-700 bg-blend-overlay bg-no-repeat">
        <PropertyActivities  />
      </div> */}

     

      {/* frequent asked questions */}
      <PropertyFAQs property={property} />

      {/* gallery */}
      <div className="psektion">
        <div className="respons sektion md:grid-cols-5">
          <div></div>
          <div className="col-span-3">
            <Title place="" subHeading="Gallery" first="Shared Memories" />
            <HomeParagraph
              className="md:text-center"
              content="On these sweet mornings, hearing the sounds of birds and wild animals, a wonderful serenity will take possession of your entire soul, which you will enjoy with all your heart. In this spot, you can be close to nature and feel the allure of life."
            />
          </div>
          <div></div>
        </div>
        {/* <Gallery /> */}
        <PropertyGalleryCloud property={property} />
      </div>

      {/* contact */}
      <PropertyContact property={property} />
    </main>
  );
}

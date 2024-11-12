"use client";
import { HomeParagraph, Title } from "@/components/texties";
import { getSingleDocByFieldNameOrg } from "@/firebase/databaseOperations";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";

export default function Page({ params }) {
  const { slug } = useParams();
  const [destination, setDestination] = useState(null);

  // Fetch destination data by slug
  useEffect(() => {
    const fetchDestinationData = async () => {
      if (!slug) {
        console.error("No slug provided");
        return;
      }

      try {
        const { didSucceed, document } = await getSingleDocByFieldNameOrg(
          "Destinations",
          "slug",
          slug
        );

        if (didSucceed) {
          setDestination(document);
        } else {
          console.error("Failed to fetch destination post");
        }
      } catch (error) {
        console.error("Error fetching destination post:", error);
      }
    };

    fetchDestinationData();
  }, [slug]);

  console.log("Destination Details", destination);

  return (
    <div className="">
      <div className="psektion respons">
        <div className="relative">
          <Image
            width={2000}
            height={520}
            src={destination?.img}
            alt="CEO Pamoja Olea"
            className="h-[620px] w-full rounded object-cover"
          />
          <div className="absolute -mt-10 p-5 left-10 right-10 bg-pamojasecondary">
         
            <Title className="" first={destination?.title} />
          </div>
        </div>
      </div>
      <div className="psektion respons">
        <HomeParagraph content={destination?.desc} />
      </div>
    </div>
  );
}

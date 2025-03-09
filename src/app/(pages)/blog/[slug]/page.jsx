"use client"
import { HomeParagraph, Title } from '@/components/texties';
import { getSingleDocByFieldNameOrg } from '@/firebase/databaseOperations';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useState, useEffect } from "react";

export default function Page({params}) {
  const { slug } = useParams();
  const [property, setProperty] = useState(null);

  // Fetch property data by slug
  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!slug) {
        console.error("No slug provided");
        return;
      }

      try {
        const { didSucceed, document } = await getSingleDocByFieldNameOrg(
          "Blogposts",
          "slug",
          slug
        );

        if (didSucceed) {
          setProperty(document);
        } else {
          console.error("Failed to fetch blog post");
        }
      } catch (error) {
        console.error("Error fetching blog post:", error);
      }
    };

    fetchPropertyData();
  }, [slug]);

  console.log("",property);

  return (
    <div className="">
      <div className="psektion respons">
        <div className="relative border rounded-md overflow-hidden">
          <Image
              width={2000}
              height={520}
              src={property?.img}
              alt="CEO Pamoja Olea"
              className="h-96 w-full rounded object-cover"
          />
          <div className="absolute bottom-4 p-3 left-10 right-10 bg-black/40">
            <Title className="text-white" first={property?.title}/>
          </div>
        </div>
        <div className="psektion respons">

          <HomeParagraph className="text-black" content={property?.desc}/>
        </div>
      </div>

    </div>
  );
}

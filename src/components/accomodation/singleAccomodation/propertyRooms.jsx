"use client";

import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ProductCard } from "@/components/cards";
import { Title } from "@/components/texties";
import SkeletonOne from "@/components/skeletonOne";

export default function PropertyRooms({ property }) {
  const data = property.rooms;
  console.log("Rooms data:",data);

  const [isLoading,setIsLoading]=useState(false);
  const [didSucceed, setDidSucceed] = useState(true);
  const settings = {
    dots: true,
    autoplay: true,
    arrows: false,
    draggable: true,
    pauseOnHover: true,
    infinite: false,
    speed: 2000,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
        },
      },
    ],
  };

  return (
    <section className="psektion bg-pamojaaccent space-y-5">
      <div className="respons">
        {/* top column */}
        <div className="sektion md:grid-cols-2">
          <div className="flex md:justify-start">
            <Title
              className="md:text-start text-white"
              subHeading="We provide the best"
              first="Our Products"
            />
          </div>
          <div className="flex md:justify-end">
           
          </div>
        </div>


        {/* bottom column */}
        <div className="">
          <Slider {...settings}>
            {isLoading ? (
              // Render 3 skeletons
              Array.from({ length: 4 }).map((_, index) => (
                <SkeletonOne key={index} />
              ))
            ) : !didSucceed ? (
              <p className="text-center py-5">
                Something went wrong, please contact admin.
              </p>
            ) : property?.products?.length < 1 ? (
              <p className="text-center py-5">No Products found.</p>
            ) : (
              property?.products?.map((room) => (
                <ProductCard
                  key={room.id}
                  src={room.img[0]}
                  name={room.name}
                />

             
              ))
            )}
          </Slider>
        </div>
      </div>
    </section>
  );
}

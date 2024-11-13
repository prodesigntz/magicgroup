"use client";
import React, { useRef, useEffect } from "react";
import Slider from "react-slick";
import { HomeParagraph, Title } from "../texties";
import { DestinationCard } from "../cards";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import { destinationData } from "@/data/destiantionData";
import useFetchAll from "@/lib/hooks/useFetchAll";
import SkeletonOne from "../skeletonOne";
import { truncateDescription, truncateDescriptionNew } from "@/lib/utils";
import { team } from "@/data/team";
//import { destinationData } from "@/data/destinationData";


export default function Destinations() {
  const {isLoading,didSucceed,error, data} = useFetchAll("Destinations");

  const settings = {
    dots: true,
    autoplay: true,
    arrows: false,
    draggable: true,
    pauseOnHover: true,
    infinite: false,
    speed: 2000,
    autoplaySpeed: 2000,
    slidesToShow: 4,
    slidesToScroll: 4,
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
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
          arrows: false,
        },
      },
    ],
  };

  return (
    <section className="psektion md:pt-32 space-y-5">
      <div className="respons">
        <div className="sektion md:grid-cols-5">
          <div></div>
          <div className="col-span-3">
            <Title place="" subHeading="The Heart" first="Our Team" />
            {/* <HomeParagraph
              className="text-center"
              content="
            On these sweet mornings, hearing the sounds of birds and wild animals, a wonderful serenity will take possession of your entire soul, which you will enjoy with all your heart. In this spot, you can be close to nature and feel the allure of life. "
            /> */}
          </div>
          <div></div>
        </div>

        <div className="">
          <Slider {...settings}>
            {isLoading ? (
              // Render 3 skeletons
              Array.from({ length: 4 }).map((_, index) => (
                <SkeletonOne key={index} />
              ))
            ) : !didSucceed ? (
              <p className="text-center py-5">
                Something went wrong, please contact admins
              </p>
            ) : team?.length < 1 ? (
              <p className="text-center py-5">No Team found.</p>
            ) : (
              team?.map((destination, id) => (
                <DestinationCard
                  key={destination.id}
                  src={destination.src}
                  alt={destination.title}
                  name={destination.name}
                  title={destination.title}
                />
              ))
            )}
          </Slider>
        </div>
      </div>
    </section>
  );
}

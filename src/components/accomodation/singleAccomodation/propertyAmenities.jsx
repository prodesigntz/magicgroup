"use client";
import React, { useRef, useEffect } from "react";
import { HomeParagraph, Title } from "@/components/texties";
import Image from "next/image";
import { ReviewsCard } from "@/components/cards";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { destinationData } from "@/data/destiantionData";
import { Button } from "@/components/ui/button";
import { ButtonOne } from "@/components/buttons";
import { FaWifi } from "react-icons/fa6";
import { renderIcon } from "@/data/iconOptions";

export default function PropertyAmenities({ property }) {
 

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
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
          arrows: true,
        },
      },
    ],
  };

  return (
    <section className="respons">
      {/* bottom collumn */}
      <div className="sektion md:grid-cols-3">
        <div className="content-center bg-pamojaprimary p-5  text-pamojaaccent">
          <Title className="" first="Our Amenities" />
          <HomeParagraph
            className="md:text-center"
            content="Experience comfort in our spacious, modern lodges with plush bedding and stunning wilderness views."
          />

          <div className="flex space-x-1 space-y-1 flex-wrap">
            {property.amenities.map((amenity) => (
              <Button
                key={amenity.id}
                className="flex items-center space-x-2 rounded-none bg-pamojadark hover:bg-pamojaprimary hover:border hover:border-"
              >
                <span>{renderIcon(amenity.icon)}</span>
                <span>{amenity.value}</span>
              </Button>
            ))}
          </div>
        </div>
        <div className="col-span-2">
          <div className="psektion">
            <div className="sektion md:grid-cols-2">
              <div>
                <h1 className="font-bold gilda_display text-center text-2xl  md:text-4xl pb-4 md:text-start ">
                  Satisfied Customers
                </h1>
              </div>
              <div className="flex md:justify-end">
                <Button
                  asChild
                  variant="pro-primary"
                  className=" bg-proprimary rounded-none text-white"
                >
                  <ButtonOne name="Write Us" />
                </Button>
              </div>
            </div>
            <Slider {...settings}>
              {destinationData.map((tour) => (
                <ReviewsCard
                  key={tour.id}
                  href={tour.href}
                  icon={tour.icon}
                  type={tour.type}
                  amount={tour.amount}
                />
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
}

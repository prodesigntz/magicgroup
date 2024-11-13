"use client";
import React, { useRef, useEffect } from "react";
import { Title } from "../texties";
import Image from "next/image";
import { ReviewsCard } from "../cards";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { destinationData } from "@/data/destiantionData";

export default function Testimonials() {
  const sliderRef = useRef(null);

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
    <section className="psektion respons space-y-10">
      {/* top column */}
      <div className="sektion md:grid-cols-3">
        <div></div>
        <div>
          <Title
            place=""
            subHeading="Testimonials"
            first="Satisfied Customers"
          />
          {/* <HomeParagraph place="center" content=" 
            Lorem ipsum dolor sit amet consectetur adipisicing elit."/> */}
        </div>
        <div></div>
      </div>

      {/* bottom collumn */}
      <div className="">
        <div>
          <Slider {...settings} ref={sliderRef}>
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
    </section>
  );
}

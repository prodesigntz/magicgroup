"use client";
import React, { useRef, useEffect } from "react";
import { HomeParagraph, Title } from "@/components/texties";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { destinationData } from "@/data/destiantionData";
import { ExperiencesCard } from "@/components/cards";
import { ButtonOne } from "@/components/buttons";

export default function PropertyActivities({property}) {
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
          arrows: false,
        },
      },
    ],
  };

  return (
    <section className="psektion ">
      <div className="respons sektion md:grid-cols-3">
        <div className="md:px-5 md:grid md:content-center">
          <Title
            className="md:text-start"
            subHeading="Adventures"
            first="Experiences"
          />
          <HomeParagraph
            className=" "
            content="Our company name “Pamoja” is derived from the Kiswahili word “As One,” and it is the spirit and understanding of this concept that drives our company philosophy to make."
          />
          <div className=" flex justify-center md:justify-start ">
            <ButtonOne name="Explore More" href="" />
          </div>
        </div>
        <div className="col-span-2 ">
          {/* <div className="md:pt-10"></div> */}
          <Slider {...settings} >
            {destinationData.map((tour) => (
              <ExperiencesCard
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

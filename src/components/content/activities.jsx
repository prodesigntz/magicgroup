"use client";
import React, { useRef, useEffect } from "react";
import { HomeParagraph, Title } from "../texties";
//import ExperiencesCard from "../chatGPP/experiencesCard";
import { ButtonOne } from "../buttons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//import { destinationData } from "@/data/destiantionData";
import { ExperiencesCard } from "../cards";
import useFetchAll from "@/lib/hooks/useFetchAll";
import SkeletonOne from "../skeletonOne";
import Link from "next/link";

export default function Activities() {
 
   const { isLoading, data, error,didSucceed } = useFetchAll("Properties");

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
      <div className="respons sektion md:gap-0 md:grid-cols-6">
        <div className=""></div>
        <div className="col-span-2 md:px-5 md:grid md:content-center bg-pamojasecondary p-10 content-center">
          <Title
            className="md:text-start text-pamojaprimary"
            subHeading="Sustainability"
            first="Committed to keep people healthy & safe"
          />
          <HomeParagraph
            className="text-white "
            content="Benefit of the socie where we operate. A success website obusly needs great design to be one"
          />
          <div className=" flex justify-center md:justify-start ">
            <Link
              href="/contact"
              className="py-3 px-5 bg-pamojaprimary text-pamojasecondary"
            >
              Work With Us
            </Link>
          </div>
        </div>
        <div className="col-span-2 bg-pamojaprimary p-10 content-center ">
          <Title
            className="md:text-start text-pamojasecondary"
            // subHeading="Sustainability"
            first="We are best in the field"
          />
          <HomeParagraph
            className="text-pamojasecondary "
            content="Benefit of the socie where we operate. A success website obusly needs great design to be one"
          />

          <h5>List of company categories</h5>
        </div>
        <div className=""></div>
      </div>
    </section>
  );
}

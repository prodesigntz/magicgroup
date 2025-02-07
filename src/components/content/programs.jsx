"use client"
import React, {  } from "react";
import { Title } from '@/components/texties'
import AccommodationCard from "@/components/chatGPP/accomodationCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useFetchAll from "@/lib/hooks/useFetchAll";
import SkeletonOne from "../skeletonOne";
import { truncateDescription } from "@/lib/utils";
//import DemoSlider from "../framerComponents/demoSlider";

export default function Programs() {
   const { isLoading, data } = useFetchAll("Properties");
   //console.log("Companies details here", data);

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
      //  slidesPerRow: 2,
      // centerPadding: "60px",
      // className: "center",
      // cssEase: "linear",
      
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
    <section className="psektion bg-white">
      {/* bg-[#ffefe2] */}
      <div className="respons space-y-10">
        {/* top column */}
        <div className="sektion md:grid-cols-3">
          <div></div>
          <div>
            <Title place="" subHeading="Our Keys" first="Companies" />
            {/* <HomeParagraph place="center" content="Lorem ipsum dolor sit amet consectetur adipisicing elit."/> */}
          </div>
          <div></div>
        </div>

        {/* bottom column */}
        <div className="hidden md:flex flex-col space-y-10">
          <div className="sektion md:grid-cols-3">
            {isLoading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <SkeletonOne key={index} />
                ))
              : data?.map((property) => (
                  // <AccommodationCard
                  //   key={property?.id}
                  //   img={property?.img}
                  //   address={property?.address}
                  //   locate={property?.location}
                  //   title={property?.name}
                  //   desc={truncateDescription(property?.desc, 10)}
                  //   logo={property?.logo}
                  //   href={`/companies/${property?.slug}`}
                  // />

                  <AccommodationCard
                  key={property?.id}
                  img={property?.img}
                  address={property?.address}
                  locate={property?.location}
                  title={property?.name}
                  logo={property?.logo || ""}
                  desc={truncateDescription(property?.desc, 10)}
                  href={`/companies/${property?.slug}`}
                />
                ))}
          </div>
        </div>

        <div className="md:hidden slider-container">
          <Slider {...settings}>
            {data?.map((property) => (
              <AccommodationCard
                key={property?.id}
                img={property?.img}
                address={property?.address}
                locate={property?.location}
                title={property?.name}
                logo={property?.logo || ""}
                desc={truncateDescription(property?.desc, 16)}
                href={`/companies/${property?.slug}`}
              />
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useRef, useEffect } from "react";
import { HeaderTitle, HomeParagraph } from "../texties";
import NavBar from "../navbar";
import { ButtonOne } from "../buttons";
import { useRouter } from "next/navigation";
import { heroslideData } from "@/data/herosliderData";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Hero() {
  const router = useRouter();

   const sliderRef = useRef(null);

   const settings = {
     dots: false,
     autoplay: true,
     arrows: false,
     draggable: true,
     pauseOnHover: true,
     infinite: true,
     speed: 3000,
     autoplaySpeed: 3000,
     slidesToShow: 1,
     slidesToScroll: 1,
     initialSlide: 0,

   };

  return (
    <section className=" text-white bg-[url('/images/accomodations/oleaout.jpeg')] bg-cover bg-center  bg-slate-700 bg-blend-overlay bg-no-repeat">
      <NavBar />
      <div className="respons sektion md:grid-cols-5 md:py-10">
        <div className=""></div>
        <div className="col-span-3  space-y-5">
            <Slider {...settings} ref={sliderRef}>          
              { heroslideData.map((slide)=>(
                  <div key={slide.id} className="">
                      <HeaderTitle
                      className="md:text-center"
                      subHeading="Luxury Camps & Lodges"
                      first={slide.title}
                      />
                      <HomeParagraph
                        className="md:text-center"
                        content={slide.content} />
                  </div>
               ))}
            </Slider>

            <ButtonOne
              name="Get In Touch"
              onClick={() => router.push("/contact")}
              className="justify-center"
            />
        </div>

        <div></div>
      </div>
    </section>
  );
}

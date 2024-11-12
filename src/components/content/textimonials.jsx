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
      <div className="sektion md:grid-cols-3">
        {/* card sectrion */}
        {/* <div className='shadow-md flex flex-col p-5 space-y-5 text-center hover:text-white hover:bg-prosecondary transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:rounded-md duration-300 '>
             <div>   
               <Image
                    src="/images/heros/bghero.jpg"
                    alt="blog"
                    width={1000}
                    height={240}
                    style={{
                      maxWidth: "100%",
                      height: "220px",
                      objectFit: "cover",
                    }}
                    className=" max-w-full max-h-50 rounded-md"
                  /></div>
              <div>
                <h3 className='font-semibold fredoka text-xl '>Healthy Foods</h3>
              </div>
              <div>
                <p className=''>Lorem spatum sed pulvar gravida hendrerit lectusa. Sed nisi lacus sed viverra.</p>
              </div> 
        </div> */}

        <div className="">
          <div className="relative">
            <Image
              src="/images/pamoja/bornfire.jpeg"
              alt="Pamoja Ole Farm Lodge"
              className=""
              width={1000}
              height={240}
              style={{
                maxWidth: "100%",
                height: "230px",
                objectFit: "cover",
              }}
            />
            <div className="absolute inset-0 bg-black space-y-5 bg-opacity-10 flex flex-col justify-center items-center text-white text-center ">
              {/* <h2 className="text-2xl babylonica ">Karatu</h2>
              <h3 className="text-2xl gilda_display font-bold">Pamoja Ole Farm Lodge</h3> */}
            </div>
          </div>
        </div>
        <div className="col-span-2">
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
          {/* <div className="sektion md:grid-cols-3 md:content-center">
            <ReviewsCard />
            <ReviewsCard />
            <ReviewsCard />
          </div> */}
        </div>
      </div>
    </section>
  );
}

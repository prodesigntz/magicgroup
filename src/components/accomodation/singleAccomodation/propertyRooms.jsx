"use client";

import React, { useState, useRef, useEffect } from "react";
//import { Title } from "@components/texties";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//import { Button } from "@components/ui/button";
//import { blogData } from "@/data/blog";
import { RoomCard } from "@/components/cards";
import { Title } from "@/components/texties";
import { Button } from "@/components/ui/button";
import { ButtonOne } from "@/components/buttons";
import { blogData } from "@/data/blog";
import SkeletonOne from "@/components/skeletonOne";
//import { useState } from "react/cjs/react.production.min";

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
    <section className="psektion ">
      <div className="respons">
        {/* top column */}
        <div className="sektion md:grid-cols-2">
          <div className="flex md:justify-start">
            <Title
              className="md:text-start"
              subHeading="Accomodation"
              first="Our Rooms"
            />
          </div>
          <div className="flex md:justify-end">
            <Button
              asChild
              variant="pro-primary"
              className=" bg-proprimary rounded-none text-white"
            >
              <ButtonOne name="Book Now" />
            </Button>
          </div>
        </div>

        {/* bottom column */}
        {/* <div>
          <Slider {...settings}>
            {blogData.map((blog) => (
              <RoomCard
                key={blog.id}
                href={`blog/${blog.slug}`}
                type={blog.tags[0]}
                src={blog.image}
                title={blog.title}
              />
            ))}
          </Slider>
        </div> */}

        {/* <div>
          <Slider {...settings}>
            {data?.map((blog) => (
              <RoomCard
                key={blog.id}
                href={`blog/${blog.slug}`}
                type={blog.tags[0]}
                src={blog.image}
                title={blog.title}
              />
            ))}
          </Slider>
        </div> */}

        {/* bottom column */}
        <div>
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
            ) : property?.rooms?.length < 1 ? (
              <p className="text-center py-5">No Blogs found.</p>
            ) : (
              property?.rooms?.map((room) => (
                <RoomCard
                  key={room.id}
                  //href={`blog/${blog.slug}`}
                 // type={room.tags[0]}
                  src={room.img[0]}
                  name={room.name}
                  price={room.price}
                  level={room.level}
                />
              ))
            )}
          </Slider>
        </div>
      </div>
    </section>
  );
}

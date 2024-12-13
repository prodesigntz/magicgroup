"use client";

import React, { useRef, useEffect } from "react";
import { Title } from "../texties";
import { BlogCard } from "../cards";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import { destinationData } from "@/data/destiantionData";
// import { Button } from "../ui/button";
// import { blogData } from "@/data/blog";
import useFetchAll from "@/lib/hooks/useFetchAll";
import SkeletonOne from "../skeletonOne";

export default function BlogSection() {
 const {isLoading,didSucceed,error, data} = useFetchAll("Blogposts");

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

  // const formattedDate = date.toLocaleString("en-US", {
  //   year: "numeric",
  //   month: "long", // e.g., September
  //   day: "numeric",
  //   hour: "2-digit",
  //   minute: "2-digit",
  //   second: "2-digit",
  //   hour12: false, // Use 24-hour format
  // });
  return (
    <section className="psektion ">
      <div className="respons">
        {/* top column */}
        <div className="sektion md:grid-cols-3">
          <div></div>
          <div>
            <Title place="" subHeading="Blogs" first="Get Updates" />
            {/* <HomeParagraph place="center" content=" 
                    Lorem ipsum dolor sit amet consectetur adipisicing elit."/> */}
          </div>
          <div></div>
        </div>

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
            ) : data.length < 1 ? (
              <p className="text-center py-5">No Blogs found.</p>
            ) : (
              data.map((blog) => (
                <BlogCard
                  key={blog.id}
                  href={`blog/${blog.slug}`}
                  type={blog.category}
                  src={blog.img}
                  title={blog.title}
                  desc={blog.desc}
                 // date={blog.createdAt}
                />
              ))
            )}
          </Slider>
        </div>
      </div>
    </section>
  );
}

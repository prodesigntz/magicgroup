"use client";
import React, { useRef } from "react";
import { Title } from "../texties";
import { ReviewsCard } from "../cards";
import useFetchAll from "@/lib/hooks/useFetchAll";
import SkeletonOne from "../skeletonOne";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Testimonials() {
  const sliderRef = useRef(null);
  const { isLoading, data, error, didSucceed } = useFetchAll("Reviews");

 console.log(data);

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
        </div>
        <div></div>
      </div>

      {/* bottom collumn */}
      <div className="">
        <div>
          <Slider {...settings} ref={sliderRef}>
            {isLoading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <SkeletonOne key={index} />
              ))
            ) : !didSucceed ? (
              <p className="text-center py-5">
                Something went wrong, please contact admin.
              </p>
            ) : data.length < 1 ? (
              <p className="text-center py-5">No reviews found.</p>
            ) : (
              data.map((review) => (
                <ReviewsCard
                  key={review.id}
                  title={review.title}
                  icon={review.img}
                  name={review.name}
                  desc={review.desc}
                />
              ))
            )}
          </Slider>
        </div>
      </div>
    </section>
  );
}

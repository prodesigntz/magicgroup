"use client";
import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button } from "./ui/button";


export default function PamojaSlider({ paSliders }) {
  const sliderRef = useRef(null);

  const next = () => {
    sliderRef.slickNext();
  };

  const previous = () => {
    sliderRef.slickPrev();
  };

  const settings = {
    dots: true,
    autoplay: true,
    arrows: false,
    draggable: true,
    pauseOnHover: true,
    infinite: false,
    speed: 2000,
    autoplaySpeed: 2000,
    slidesToShow: 4,
    slidesToScroll: 4,
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
    <div className="slider-container">
      <Slider {...settings}>{paSliders}</Slider>
      <div className="mt-10">
        {/* <ButtonOne className="" name="Previous" onClick={previous} />
            <ButtonOne className="" name="Next" onClick={next} /> */}

        <Button
          onClick={previous}
          className="button rounded-none text-center text-lg px-5 py-1.5  bg-pamojaprimary hover:bg-pamojadark gilda_display"
        >
          Previous
        </Button>
        <Button
          onClick={next}
          className="button rounded-none text-center text-lg px-5 py-1.5  bg-pamojaprimary hover:bg-pamojadark gilda_display"
        >
          Next
        </Button>
      </div>
    </div>
  );
}

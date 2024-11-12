"use client"

import React, { useRef } from "react";
import { GalleryImage } from '../galleryImage'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { galleryData } from '@/data/galleryData';
import { GalleryCloudinary } from "./galleryCloudinary";
import ImageGalleryCloudinary from "../cloudinaryComponents/imageGallerySelectionFolderCloudinary";

export default function Gallery() {
 
    const settings = {
      dots: true,
      autoplay: true,
      arrows: false,
      draggable: true,
      pauseOnHover: true,
      infinite: false,
      speed: 2000,
      autoplaySpeed: 2000,
      slidesToShow: 5,
      slidesToScroll: 5,
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
    <section className="bg-black space-y-5">
     
      <div className="">
      <Slider {...settings} >
        {galleryData.map((gallery) => (
          <GalleryImage
            key={gallery.id}
            image={gallery.img}
            locate={gallery.locate}
            alt={gallery.alt}
            src={gallery.img}
            activity={gallery.activity}
          />
        ))}
      </Slider>
      </div>
    </section>
    // <section className='sektion md:grid-cols-5 bg-black'>
    //      <GalleryImage alt="Olea Pamoja" src="/images/accomodations/olearoom.jpeg" locate="Karatu" activity="Olea Single Room"/>
    //      <GalleryImage alt="Olea Pamoja" src="/images/accomodations/olea.jpeg" locate="Karatu" activity="Olea Swimming Pool"/>
    //      <GalleryImage alt="Olea Pamoja" src="/images/accomodations/serengeti.jpeg" locate="Serengeti" activity="Pamoja Serengeti"/>
    //      <GalleryImage alt="Olea Pamoja" src="/images/accomodations/olea.jpeg" locate="Karatu" activity="Olea Swimming Pool"/>
    //      <GalleryImage alt="Olea Pamoja" src="/images/accomodations/olea.jpeg" locate="Karatu" activity="Olea Swimming Pool"/>
    // </section>
  );
}

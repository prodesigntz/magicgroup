"use client"
import { DestinationCard } from '@/components/cards';
import SkeletonOne from '@/components/skeletonOne';
import useFetchAll from '@/lib/hooks/useFetchAll';
import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//import DemoSlider from '@/components/framerComponents/demoSlider';
import { Title } from '@/components/texties';
import { truncateDescriptionNew } from '@/lib/utils';
// import DemoSlider from '@/components/framerComponents/demoSlider';

export default function Page() {
  const { isLoading, didSucceed, error, data } = useFetchAll("Destinations");
 
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
         arrows: false,
       },
     },
   ],
 };
  return (
    <main className="psektion">
      {/* <div className="respons">
      <Slider {...settings}>
        {isLoading ? (
          // Render 3 skeletons
          Array.from({ length: 4 }).map((_, index) => (
            <SkeletonOne key={index} />
          ))
        ) : !didSucceed ? (
          <p className="text-center py-5">
            Something went wrong, please contact admins
          </p>
        ) : data.length < 1 ? (
          <p className="text-center py-5">No Destiantions found.</p>
        ) : (
          data.map((destination, id) => (
            <DestinationCard
              key={destination.id}
              src={destination.img[0]}
              alt={destination.alt}
              name={destination.name}
              brief={destination.description}
              href={`/destination/${destination.slug}`}
            />
          ))
        )}
      </Slider>
    </div> */}

      {/* testing a newslidr */}
      {/* <DemoSlider/> */}

      <div className="respons space-y-10">
        {/* top column */}
        <div className="sektion md:grid-cols-3">
          <div></div>
          <div>
            <Title
              place=""
              subHeading="OUR DESTINATIONS"
              first="Experience Nature "
            />
            {/* <HomeParagraph place="center" content=" 
            Lorem ipsum dolor sit amet consectetur adipisicing elit."/> */}
          </div>
          <div></div>
        </div>
        
        <div className="">
          <Slider {...settings}>
            {isLoading ? (
              // Render 3 skeletons
              Array.from({ length: 4 }).map((_, index) => (
                <SkeletonOne key={index} />
              ))
            ) : !didSucceed ? (
              <p className="text-center py-5">
                Something went wrong, please contact admins
              </p>
            ) : data.length < 1 ? (
              <p className="text-center py-5">No Destiantions found.</p>
            ) : (
              data.map((destination, id) => (
                <DestinationCard
                  key={destination.id}
                  src={destination.img}
                  alt={destination.title}
                  name={destination.title}
                  brief={truncateDescriptionNew(destination.desc, 20)}
                  href={`/destinations/${destination.slug}`}
                />
              ))
            )}
          </Slider>
        </div>
      </div>
    </main>
  );
}

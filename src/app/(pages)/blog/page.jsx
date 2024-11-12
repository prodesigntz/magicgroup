"use client";
import { Title } from '@/components/texties';
import useFetchAll from '@/lib/hooks/useFetchAll';
import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BlogCard } from '@/components/cards';
import SkeletonOne from '@/components/skeletonOne';

export default function Blog() {
   const { isLoading, didSucceed, error, data } = useFetchAll("Blogposts");

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
    <main className="psektion ">
      {/* top column */}
      <div className="respons space-y-10">
        <div className="sektion md:grid-cols-3">
          <div></div>
          <div>
            <Title place="" subHeading="OUR BLOG" first="Get Updated" />
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
                  // date={blog.createdAt}
                />
              ))
            )}
          </Slider>
        </div>
      </div>
    </main>
  );
}

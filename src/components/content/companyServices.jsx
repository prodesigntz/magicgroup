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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import AccommodationServiceCard from "../chatGPP/accomodationServiceCard";
import DashboardDataLoader from "../dashboard/dashboard-data-loader";
//import DemoSlider from "../framerComponents/demoSlider";

export default function CompanyServices() {
   const { isLoading, data } = useFetchAll("Properties");
   //console.log("Companies data section", data);
  //const sliderRef = useRef(null);


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
    <section className="psektion bg-white md:pb-32 ">
      {/* bg-[#ffefe2] */}
      <div className="respons space-y-10">
        {/* top column */}
        <div className="sektion md:grid-cols-3">
          <div></div>
          <div>
            <Title place="" subHeading="Our Keys" first="Services" />
            {/* <HomeParagraph place="center" content="Lorem ipsum dolor sit amet consectetur adipisicing elit."/> */}
          </div>
          <div></div>
        </div>

        <div className="respons  ">
          <div className="md:flex md:items-center md:justify-center">
          <Tabs>
             <TabsList  className="bg-pamojatertiary space-x-5 py-4 rounded-none">
              {data?.map((company) => (
                <TabsTrigger  key={company?.id} value={company?.slug}>
                  {company?.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {isLoading ? (
            <DashboardDataLoader />
          ) : (
            <>
            {
              data?.map((company) => (
                <TabsContent key={company?.id} value={company?.slug}>
                   <div className="hidden md:flex flex-col space-y-10">
                      <div className="sektion md:grid-cols-3">
                        {company?.highlights?.length >= 0 ? <>{company?.highlights.map((item, index) => (
                          <AccommodationServiceCard
                            key={index}
                            img={item?.img}
                            title={item?.title}
                            desc={truncateDescription(item?.desc, 10)}
                          />

                        
                        ))}</>:<h1>No Services</h1>}
                      </div>
                  </div>

                  <div className="md:hidden slider-container">
                    <Slider {...settings}>
                      {company?.highlights?.length >= 0 ? <>{company?.highlights.map((item, index) => (
                        <AccommodationServiceCard
                          key={index}
                          img={item?.img}
                          title={item?.title}
                          desc={truncateDescription(item?.desc, 10)}
                        />


                      ))}</>:<h1>No Services</h1>}
                    </Slider>
                  </div>
                </TabsContent>
              ))
            }
            </>
          )}
          </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
}

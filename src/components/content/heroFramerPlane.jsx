"use client";

import React, { useState, useEffect } from "react";
import { HeaderTitle } from "../texties";
import NavBar from "../navbar";
import { ButtonOne } from "../buttons";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight, FaEnvelope, FaMapLocationDot, FaPhone } from "react-icons/fa6";
import useFetchAll from "@/lib/hooks/useFetchAll";
import SkeletonOne from "../skeletonOne";
import Socialmedias from "../socialmedias";

export default function HeroFramerPlane() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Fetch data
  const { isLoading, data } = useFetchAll("Properties");

  const getVisibleCards = 3; // Always show 3 cards

  // Auto-slide functionality (pauses on hover)
  useEffect(() => {
    if (isHovered || isLoading || !data || data.length === 0) return; // Stop auto-slide when hovered or loading
    const interval = setInterval(() => {
      handleNext();
    }, 5000); // Auto-slides every 5 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, [isHovered, isLoading, data]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (data.length || 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? (data.length || 1) - 1 : prevIndex - 1
    );
  };

  // Calculate displayed slides
  const displayedSlides =
    data && data?.length > 0
      ? [
          ...data.slice(currentIndex, currentIndex + getVisibleCards),
          ...data.slice(
            0,
            Math.max(0, currentIndex + getVisibleCards - data.length)
          ),
        ]
      : [];

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="text-white bg-cover bg-top bg-slate-700/40 bg-blend-overlay bg-no-repeat min-h-40"
        style={{
          backgroundImage: `url(${
            data && data.length > 0 ? data[currentIndex]?.img : ""
          })`,
        }}
      >
        {/* <NavBar /> */}
        <div className="">
          <div className="hidden sektion respons md:grid-cols-5 py-4">
            <div className="col-span-2">
              <Socialmedias />
            </div>

            <div className="flex items-center space-x-2">
              <div className="">
                <FaPhone />
              </div>
              <div className="flex-col">
                <div className="text-sm text-white">+255 657 442 123</div>
                <div className="text-xs text-slate-300">Call for help</div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="">
                <FaEnvelope />
              </div>
              <div className="flex-col">
                <div className="text-sm text-white">info@magicgroup.co.tz</div>
                <div className="text-xs text-slate-300">Drop us a line</div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="">
                <FaMapLocationDot />
              </div>
              <div className="flex-col">
                <div className="text-sm text-white">Tanzania</div>
                <div className="text-xs text-slate-300">Get Direction</div>
              </div>
            </div>
          </div>

          <div className="respons py-5 px-2 bg-black/40">
            <NavBar />
          </div>
        </div>
        {isLoading ? (
          <div className="psektion respons">
            <SkeletonOne />
          </div>
        ) : (
          <div className="psektion md:py-32 respons sektion md:grid-cols-5 items-center">
            <div className=""></div>
            <div className="col-span-3 content-center">
              <HeaderTitle
                className=""
                subHeading={data[currentIndex]?.slogan || ""}
                first={data[currentIndex]?.name || ""}
              />
              <ButtonOne
                name="Get In Touch"
                onClick={() =>
                  router.push(`/accomodations/${data[currentIndex]?.slug}`)
                }
                className="justify-center  mt-5"
              />
              {/* Buttons for previous/next */}
              <div className="flex items-center justify-center  space-x-4 mt-20">
                <button
                  onClick={handlePrev}
                  className="bg-pamojaprimary text-pamojaaccent p-2 rounded-full hover:bg-opacity-80 transition"
                >
                  <FaArrowLeft size={20} />
                </button>
                <button
                  onClick={handleNext}
                  className="bg-pamojaprimary text-pamojaaccent p-2 rounded-full hover:bg-opacity-80 transition"
                >
                  <FaArrowRight size={20} />
                </button>
              </div>
            </div>

            <div className=" flex flex-col space-y-10">
              <div className="hidden md:flex items-center overflow-hidden flex-col">
                {/* <div
                  className="flex  transition-transform duration-500"
                  style={{
                    transform: `translateX(-${
                      currentIndex * (100 / getVisibleCards)
                    }%)`,
                  }}
                >
                  {data.map((slide, i) => (
                    <motion.div
                      key={slide.id}
                      className="w-12 h-12 relative bg-pamojaaccent mx-2  rounded-full shadow-md"
                      initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 + i * 0.1 }}
                    >
                      <Image
                        src={slide?.img}
                        alt={slide?.name}
                        width={400}
                        height={400}
                        priority
                        className="w-12 h-12 border border-pamojaaccent object-cover rounded-full"
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-5 bg-black bg-opacity-30">
                        <h3 className="mt-2 text-md font-semibold gilda_display">
                          {slide.name}
                        </h3>
                      </div>
                    </motion.div>
                  ))}
                </div> */}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

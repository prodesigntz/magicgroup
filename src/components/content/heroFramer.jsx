"use client";

import React, { useState, useEffect } from "react";
import { HomeParagraph, Title } from "../texties";
import NavBar from "../navbar";
import { ButtonOne } from "../buttons";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { truncateDescription } from "@/lib/utils";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import useFetchAll from "@/lib/hooks/useFetchAll";
import Image from "next/image";
import SkeletonOne from "../skeletonOne";

export default function HeroFramer() {
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
    data && data.length > 0
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
        className="text-white bg-cover bg-top bg-slate-700 bg-blend-overlay bg-no-repeat min-h-screen md:min-h-[520px]"
        style={{
          backgroundImage: `url(${
            data && data.length > 0 ? data[currentIndex]?.img : ""
          })`,
        }}
      >
        <NavBar />
        {isLoading ? (
          <div className="psektion respons">
            <SkeletonOne />
          </div>
        ) : (
          <div className="psektion md:py-48 respons sektion md:grid-cols-5 items-center">
            <div className="col-span-2 space-y-5 content-center">
              <Title
                className="md:text-start"
                subHeading="Luxury Camps & Lodges"
                first={data[currentIndex]?.name || ""}
              />
              <ButtonOne
                name="Get In Touch"
                onClick={() =>
                  router.push(`/accomodations/${data[currentIndex]?.slug}`)
                }
                className="justify-start"
              />
            </div>

            <div className="col-span-3 flex flex-col space-y-10">
              <div className="hidden md:flex items-center overflow-hidden">
                {/* Cards slider showing 3 cards at a time */}
                <div
                  className="flex transition-transform duration-500"
                  style={{
                    transform: `translateX(-${
                      currentIndex * (100 / getVisibleCards)
                    }%)`,
                  }}
                >
                  {data.map((slide, i) => (
                    <motion.div
                      key={slide.id}
                      className="w-full md:w-1/3 relative bg-pamojaaccent mx-2 p-1 rounded-md shadow-md"
                      initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 + i * 0.1 }}
                    >
                      <Image
                        src={slide?.img}
                        alt={slide?.name}
                        width={400}
                        height={600}
                        priority
                        className="w-full h-60 object-cover rounded-md"
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-5 bg-black bg-opacity-30">
                        <h3 className="mt-2 text-md font-semibold gilda_display">
                          {slide.name}
                        </h3>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Buttons for previous/next */}
              <div className="flex items-center justify-center md:justify-end space-x-4">
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
          </div>
        )}
      </motion.div>
    </div>
  );
}

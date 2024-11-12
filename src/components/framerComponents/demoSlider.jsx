import React, { useState } from "react";
import { motion } from "framer-motion";

const sliderData = [
  {
    id: 1,
    title: "Adventure in the Wild",
    image: " url('/images/destinations/manyara.jpg')",
  },
  {
    id: 2,
    title: "Serene Beach Retreat",
    image: "url('/images/destinations/ruaha.jpg')",
  },
  {
    id: 3,
    title: "Mountain Escapade",
    image: "url('/images/destinations/manyara.jpg')",
  },
];

const DemoSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderData.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? sliderData.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full h-80 overflow-hidden bg-black">
      <motion.div
        className="flex items-center justify-center w-full h-full text-white text-3xl bg-cover bg-center"
        style={{
          backgroundImage: sliderData[currentIndex].image,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>{sliderData[currentIndex].title}</h2>
        {/* <p>{sliderData[currentIndex].description}</p> */}
        <h1 className="text-4xl text-red-500"> This is Framer Motion</h1>
      </motion.div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <button
          onClick={handlePrev}
          className="px-4 py-2 bg-black bg-opacity-50 text-white rounded-lg hover:bg-opacity-70 transition"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-black bg-opacity-50 text-white rounded-lg hover:bg-opacity-70 transition ml-2"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DemoSlider;

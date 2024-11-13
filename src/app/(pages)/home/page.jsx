import Activities from "@/components/content/activities";
import BlogSection from "@/components/content/blogsection";
import Contact from "@/components/content/contact";
import Destinations from "@/components/content/destinations";
import Intro from "@/components/content/intro";
import Programs from "@/components/content/programs";
import Testimonials from "@/components/content/textimonials";
import React from "react";
// import Gallery from "@/components/content/gallery";
// import Hero from "@/components/content/hero";
import ImageGallerySelectionCloudinary from "@/components/cloudinaryComponents/imageGallerySelectionCloudinary";
//import HeroFramer from "@/components/content/heroFramer";
import HeroFramerPlane from "@/components/content/heroFramerPlane";
import SuccessSection from "@/components/content/successSection";
//import SuccessSection from "@/components/content/successSection";
// import Hero2 from "@/components/content/hero2";

export default function Home() {
  return (
    <main>
      {/* <HeroOne/> */}
      {/* <Hero/> */}
      {/* <HeroFramer/> */}
      <HeroFramerPlane/>
      <SuccessSection/>
      <Intro/>
      <Programs/>
      <Activities/>
      <Contact/>
      {/* <Accomplishment/> */}
      <Testimonials/>    
      <Destinations/>
      <BlogSection/>
      <ImageGallerySelectionCloudinary/>
      {/* <Gallery/> */}
    </main>
    );
}

import Activities from "@/components/content/activities";
import BlogSection from "@/components/content/blogsection";
import Contact from "@/components/content/contact";
import Intro from "@/components/content/intro";
import Programs from "@/components/content/programs";
import Testimonials from "@/components/content/textimonials";
import React from "react";
import HeroFramerPlane from "@/components/content/heroFramerPlane";
import SuccessSection from "@/components/content/successSection";
import CompanyServices from "@/components/content/companyServices";


export default function Home() {
  return (
    <main>
      <HeroFramerPlane/>
      <SuccessSection/>
      <Intro/>
      <Programs/>
      <Activities/>
      <CompanyServices/>
      <Contact/>
    
      <Testimonials/>    
      <BlogSection/>
    
    </main>
    );
}

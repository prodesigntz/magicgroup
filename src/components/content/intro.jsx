import React from "react";
import { HomeParagraph, Title } from "../texties";
import { ButtonOne } from "../buttons";
// import Image from "next/image";
// import { Separator } from "../ui/separator";
// import Socialmedias from "../socialmedias";
// import { StarRating } from "../starRating";

export default function Intro() {
  return (
    <section className="psektion bg-gradient-to-t from-[#ffefe2] to-white">
      <div className="respons sektion md:grid-cols-5">
        {/* image introduction */}
        {/* <div className="content-center grid grid-cols-3">
          <div className="col-span-2">
            <Image
              src="/images/accomodations/oleaswimming.jpeg"
              alt="Pamoja Ole Farm Lodge"
              className=""
              width={1000}
              height={240}
              style={{
                maxWidth: "100%",
                height: "380px",
                objectFit: "cover",
              }}
            />
          </div>
          <div className="content-center grid -ml-12">
            <div className="h-80 p-2 bg-pamojasecondary flex flex-col justify-center">
              <div className="py-2 px-1 space-y-5 bg-opacity-30 border border-pamojadark flex flex-col justify-center  items-center  text-center ">
                <Image
                  src="/logo_black.png"
                  alt="Pamoja Ole Farm Lodge"
                  className=""
                  width={1000}
                  height={240}
                  style={{
                    maxWidth: "160px",
                    height: "80px",
                    objectFit: "cover",
                  }}
                />
                <h2 className="text-sm  gilda_display  ">
                  BEST LUXURY CAMPS & LODGES
                </h2>
                <StarRating />

                <Separator className="bg-black" />
                <Socialmedias />
                <h5 className="text-xl  babylonica">Asheri</h5>
              </div>
            </div>
          </div>
        </div> */}
       <div className=""></div>

        {/* Introduction about */}
        <div className="col-span-3 ">
          <Title
            className=""
            subHeading="Authentic Experiences, Positive Impacts"
            first="Magic Group of Companies"
          />
         
          <HomeParagraph
            className="md:text-center barlow"
            content=" Magic Group of Companies is a newly established Tanzanian conglomerate operating in chemicals, sports, mining, tours, and luxury services. With a vision for growth and innovation, the group focuses on industrial development, sports promotion, sustainable mining, and premium travel experiences. By integrating these diverse sectors, Magic Group aims to make a significant impact on Tanzania’s economy and global market presence."
          />
      
          <div className=" flex justify-center space-x-5">
           <ButtonOne
                         name="Explore More"
                         onClick={() =>
                           router.push(`/companies`)
                         }
                         className="justify-center  mt-5"
                       />
          </div>
        </div>
        <div className=""></div>
      </div>
    </section>
  );
}

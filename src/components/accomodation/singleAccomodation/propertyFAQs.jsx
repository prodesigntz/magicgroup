import Socialmedias from "@/components/socialmedias";
import { StarRating } from "@/components/starRating";
import { Title } from "@/components/texties";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function PropertyFAQs({property}) {
  return (
    <section className="psektion">
      <div className="respons sektion md:grid-cols-8">
         <div></div>
          <div className="content-center col-span-2">
            <Title
              className="md:text-start"
              subHeading="Know more"
              first="Frequent Asked Questions"
            />

            <div className="">
              <div className="content-center grid grid-cols-3">
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
              </div>
            </div>
          </div>

          <div className="md:ml-10 col-span-4 ">
            <div className="content-center">
              <Accordion type="single" collapsible className="">
                {property.faq.map((faq, i) => (
                  <AccordionItem value={faq} key={i} className="">
                    <AccordionTrigger className="font-semibold gilda_display  no-underline fredoka bg-pamojaprimary hover:bg-pamojasecondary text-white my-2 md:py-5 px-5 rounded-none">
                      {faq.title}
                    </AccordionTrigger>
                    <AccordionContent className="bg-slate-100/30">
                      <p className="space-y-10 p-2">{faq.desc}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>   
     <div></div>
      </div>
 
    </section>
  );
}

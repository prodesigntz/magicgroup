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
          
          <div className=" col-span-6 ">
          <Title
              className="md:text-start"
              subHeading="Know more"
              first="Frequent Asked Questions"
            />
            <div className="content-center">
              <Accordion type="single" collapsible className="">
                {property?.faq.map((faq, i) => (
                  <AccordionItem value={faq} key={i} className="">
                    <AccordionTrigger className="font-semibold gilda_display  no-underline fredoka bg-pamojaprimary hover:bg-pamojasecondary text-white my-2 md:py-5 px-5 rounded-none">
                      {faq?.title}
                    </AccordionTrigger>
                    <AccordionContent className="bg-slate-100/30">
                      <p className="space-y-10 p-2">{faq?.desc}</p>
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

import Socialmedias from '@/components/socialmedias';
import { StarRating } from '@/components/starRating';
import { HeaderTitle, HomeParagraph, Title } from '@/components/texties';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import React from 'react'

export default function About() {
  return (
    <main className="psektion ">
      <div className="respons psektion ">
        <HeaderTitle
          className="text-pamojadark"
          subHeading="Authentic, Positive and Positive Impact"
          first="Pamoja Africa "
        />
        <HomeParagraph
          className="md:text-center"
          content={`At Pamoja Africa, our ethos is built on the foundational pillars of Earth, Mankind, and Conservation. Anchored in the Kiswahili term "Pamoja," meaning "Together as One on the Planet," we are dedicated to responsible tourism that not only honors but also actively conserves the breathtaking natural beauty and rich cultural heritage of Tanzania.`}
        />
        <div className="space-y-3">
          <Title className="" first="Earth" />
          <HomeParagraph
            className="md:text-center"
            content="Our unwavering commitment to Earth ensures that every lodge and camp is thoughtfully designed and operated with environmental stewardship at the forefront. We blend seamlessly with Tanzania’s diverse landscapes, utilizing eco-friendly practices that minimize our ecological footprint. Our properties harness renewable energy, embrace sustainable resource management, and implement waste reduction strategies. By prioritizing sustainability, we create a welcoming environment where guests can immerse themselves in the wonders of nature while contributing to its preservation."
          />
        </div>
      </div>
      <div className="psektion bg-pamojaaccent ">
        <div className="respons sektion md:grid-cols-6">
          <div className=""></div>
          <div className="col-span-2">
            <Image
              width={1000}
              height={420}
              src="/images/accomodations/olea.jpeg"
              alt="CEO Pamoja Olea"
              className="h-96 w-full object-cover border border-pamojaprimary"
            />
          </div>
          <div className="col-span-2 space-y-5 md:text-start">
            {/* title */}
            <HomeParagraph content="Pamoja Africa allows you to reconnect with the planet's diversity. It allows you to escape to a place where the ancient rhythms of the seasons, rather than the clock and calendar, govern life. It presents a hopeful vision that combines conservation, research, and an unrivaled safari experience. Everything we do is guided by our mission statement: to leave the world in a better state than we found it." />
            {/* description */}
            <div className="space-y-3">
              <h2 className="text-sm  gilda_display  ">
                BEST LUXURY CAMPS & LODGES
              </h2>
              <StarRating />

              <Separator className="bg-black" />
              <Socialmedias />
              <h5 className="text-xl  babylonica">Asheri</h5>
            </div>
          </div>
          <div className=""></div>
        </div>
      </div>

      <div className="psektion respons">
        <div className="relative">
          <Image
            width={2000}
            height={420}
            src="/images/accomodations/olea.jpeg"
            alt="CEO Pamoja Olea"
            className="h-96 w-full object-cover"
          />
          <div className="absolute -mt-10 p-5 left-10 right-10 bg-pamojasecondary">
            <Title className="" first="We are a familly " />
            <HomeParagraph content="At Pamoja Africa, we envision a future where tourism serves as a catalyst for positive change. By standing Together as One on the Planet, we invite each guest to experience the magic of Tanzania and to join us in conserving its treasures for generations to come. Together, we can create a legacy of environmental stewardship, cultural appreciation, and sustainable growth that benefits all." />
          </div>
        </div>
      </div>
    </main>
  );
}

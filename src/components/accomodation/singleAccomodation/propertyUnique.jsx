import { DestinationCard, RoomCard, UniqueCard } from '@/components/cards';
import { HomeParagraph, Title } from '@/components/texties';
import Image from 'next/image';
import React from 'react'

export default function PropertyUnique({property}) {

  return (
    <section className="psektion  space-y-5">
      <div className="respons">
        <div className="sektion md:grid-cols-5">
          <div></div>
          <div className="col-span-3">
            <Title place="" subHeading="Our Services" first="What is Unique?" />
            <HomeParagraph
              className="md:text-center"
              content="By delivering distinctive value that meets or exceeds customer expectations in ways competitors cannot replicate."
            />
          </div>
          <div></div>
        </div>

        <div className="sektion md:grid-cols-3">
          {property?.highlights.length >= 0 ? <>{property?.highlights.map((item, index) => (
            <UniqueCard
              key={index}
              src={item?.img}
              desc={item?.desc}
              subTitle={item?.subTitle}
              title={item?.title}
            />

           
          ))}</>:<h1>No Services</h1>}
        </div>
      </div>
    </section>
  );
}

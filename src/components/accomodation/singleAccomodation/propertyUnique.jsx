import { DestinationCard, RoomCard, UniqueCard } from '@/components/cards';
import { HomeParagraph, Title } from '@/components/texties';
import Image from 'next/image';
import React from 'react'

export default function PropertyUnique({property}) {
  
//   const settings = {
//     dots: true,
//     autoplay: true,
//     arrows: false,
//     draggable: true,
//     pauseOnHover: true,
//     infinite: false,
//     speed: 2000,
//     autoplaySpeed: 2000,
//     slidesToShow: 4,
//     slidesToScroll: 4,
//     initialSlide: 0,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 3,
//           infinite: true,
//           dots: true,
//         },
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 2,
//           initialSlide: 2,
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//           dots: false,
//           arrows: false,
//         },
//       },
//     ],
//   };

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
          {property?.highlights.length >= 1 ? <>{property?.highlights.map((item, index) => (
            <UniqueCard
              key={index}
              src={item.img}
              desc={item.desc}
              subTitle={item.subTitle}
              title={item.title}
            />

           
          ))}</>:<h1>No <Services></Services></h1>}
        </div>
      </div>
    </section>
  );
}

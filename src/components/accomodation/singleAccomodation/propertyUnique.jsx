import { DestinationCard, UniqueCard } from '@/components/cards';
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
    <section className="psektion bg-pamojaaccent space-y-5">
      <div className="respons">
        <div className="sektion md:grid-cols-5">
          <div></div>
          <div className="col-span-3">
            <Title place="" subHeading="Special" first="What is Unique?" />
            <HomeParagraph
              className="md:text-center"
              content="On these sweet mornings, hearing the sounds of birds and wild animals, a wonderful serenity will take possession of your entire soul, which you will enjoy with all your heart. In this spot, you can be close to nature and feel the allure of life."
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
          ))}</>:<h1>No Highlights</h1>}
        </div>
      </div>
    </section>
  );
}

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { StarRating } from "./starRating";
import { FaBed, FaHeart, FaPlus, FaWifi } from "react-icons/fa6";
import Link from "next/link";
import { Separator } from "./ui/separator";
import Image from "next/image";
import { ButtonOne } from "./buttons";
import { HomeParagraph } from "./texties";
import { FaConciergeBell, FaParking, FaSwimmingPool } from "react-icons/fa";
import { Button } from "./ui/button";

export const ReviewsCard = () => {
  return (
    <div className="bg-pamojatertiary rounded-none space-y-4 p-5 mx-2 ">
      {/* start rating */}

      {/* title */}
      <h3 className="gilda_display text-lg font-bold"> Best Suppliers.</h3>

      {/* content */}
      <h5 className="barlow">
        It was the best place i could recomdend tto anyone heading to ngorongoro
        and all over the world.
      </h5>
      <Separator className="bg-pamojaprimary" />
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="flex flex-col space-y-1">
            <h5 className="gilda_display text-sm"> George P.</h5>
            <StarRating />
          </div>
        </div>
      </div>
    </div>
  );
};

export const ServiceCard = ({ href, src, type, title, date }) => {
  return (
    <div className="relative  drop-shadow-md border border-pamojaprimary mx-2">
      <Image
        src={src}
        alt="Pamoja Bornfire"
        className=""
        width={1000}
        height={240}
        style={{
          maxWidth: "100%",
          height: "480px",
          objectFit: "cover",
        }}
      />
      <div className=" bg-black space-y-5 bg-opacity-30 flex flex-col  text-pamojadark ">
        {/* <p className="absolute p-5 bg-pamojaaccent flex flex-col left-5 top-0">
          <span className="gilda_display">DEC</span>
          <span className="gilda_display text-3xl">25</span>
          <span className="gilda_display text-3xl">{date}</span>
        </p> */}

        <div className="absolute bg-black/40 p-5 left-5 right-5 bottom-5 ">
          <h2 className="text-2xl babylonica ">{type}</h2>
          <Link href={href}>
            <h3 className="text-2xl gilda_display font-bold">{title}</h3>
          </Link>
        </div>
      </div>
    </div>
  );
};
export const BlogCard = ({ href, src, type, title, date }) => {
  return (
    <div className="relative  drop-shadow-md border border-pamojaprimary mx-2">
      <Image
        src={src}
        alt="Pamoja Bornfire"
        className=""
        width={1000}
        height={240}
        style={{
          maxWidth: "100%",
          height: "480px",
          objectFit: "cover",
        }}
      />
      <div className=" bg-black space-y-5 bg-opacity-30 flex flex-col  text-pamojadark ">
        {/* <p className="absolute p-5 bg-pamojaaccent flex flex-col left-5 top-0">
          <span className="gilda_display">DEC</span>
          <span className="gilda_display text-3xl">25</span>
          <span className="gilda_display text-3xl">{date}</span>
        </p> */}

        <div className="absolute bg-black/40 p-5 left-5 right-5 bottom-5 ">
          <h2 className="text-2xl babylonica ">{type}</h2>
          <Link href={href}>
            <h3 className="text-2xl gilda_display font-bold">{title}</h3>
          </Link>
        </div>
      </div>
    </div>
  );
};

export const UniqueCard = ({ src, desc, subTitle, title }) => {
  return (
    <div className=" border border-pamojaprimary">
      <div className="relative text-white">
        <Image
          src={src}
          alt="Pamoja Bornfire"
          className=""
          width={1000}
          height={240}
          style={{
            maxWidth: "100%",
            height: "380px",
            objectFit: "cover",
          }}
        />
        <div className="absolute bg-slate-900/30 bottom-0 left-0 right-0 p-5 space-y-4">
          <h3 className="text-2xl gilda_display font-bold drop-shadow-lg">
            {title}
          </h3>
          <h3 className="text-sm gilda_display font-bold  drop-shadow-lg">
            {subTitle}
          </h3>
        </div>
      </div>
      <div className="p-5">
        <HomeParagraph className="text-pamojadark" content={desc} />
      </div>
    </div>
  );
};

export const ProductCard = ({ src, name, level, price }) => {
  return (
    <div className="relative  drop-shadow-md border border-pamojaprimary mx-2">
      <Image
        src={src}
        alt="Pamoja Bornfire"
        className=""
        width={1000}
        height={240}
        style={{
          maxWidth: "100%",
          height: "480px",
          objectFit: "cover",
        }}
      />
      <div className=" bg-black space-y-5 bg-opacity-30 flex flex-col  text-pamojadark ">
       

        <div className="absolute bg-slate-800/40 p-5 left-5 right-5 bottom-5 ">
          <div className="flex items-center justify-between">
            <div className="text-pamojaaccent ">
            
              <h3 className="text-2xl gilda_display font-semibold text-slate-100">{name}</h3>
            </div>
          
          </div>
        </div>
      </div>
    </div>
  );
};

export const DestinationCard = ({ src, alt, name,title }) => {
  return (
    <div className="relative mx-2">
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={260}
        style={{
          maxWidth: "100%",
          height: "260px",
          objectFit: "cover",
        }}
        className=" max-w-full rounded-none"
      />

      <div className=" inset-0 p-5 bg-black space-y-5 bg-opacity-40 flex flex-col justify-center items-center text-white text-center ">
        <h3 className="text-lg gilda_display font-bold">
         {name}
        </h3>

        <p className="text-xs text-pamojatertiary">{title}</p>
        {/* <ButtonLink className={"rounded-none text-center text-lg px-5 py-1.5  bg-pamojaprimary hover:bg-pamojadark gilda_display"} href={href}  name="Explore"  /> */}
      </div>
    </div>
  );
};

// export const DestinationCard = () => {
//   return (
//     <div className="relative">
//       <Image
//         src="/images/pamoja/migration.jpeg"
//         alt="Pamoja Ole Farm Lodge"
//         width={1200}
//         height={340}
//         style={{
//           maxWidth: "100%",
//           height: "360px",
//           objectFit: "cover",
//         }}
//         className=" max-w-full rounded-none"
//       />
//       <div className="absolute inset-0 p-5 bg-black space-y-5 bg-opacity-40 flex flex-col justify-center items-center text-white text-center ">
//         <h3 className="text-2xl gilda_display font-bold">
//           <Link href=""> Serengeti National Park </Link>
//         </h3>

//         <p className="text-sm text-pamojatertiary">
//           Which you will enjoy with all your heart. In this spot, you can be
//           close to nature and feel the allure of life.{" "}
//         </p>
//         <ButtonOne name="Explore" href="" />
//       </div>
//     </div>
//   );
// };

export const ExperiencesCard = () => {
  return (
    <div className="bg-pamojaprimary rounded-none shadow-lg max-w-md  mx-2">
      <div className="relative">
        <Image
          src="/images/pamoja/bornfire.jpeg"
          alt="Pamoja Ole Farm Lodge"
          className=""
          width={1000}
          height={240}
          style={{
            maxWidth: "100%",
            height: "230px",
            objectFit: "cover",
          }}
        />
        <div className="absolute inset-0 bg-black space-y-5 bg-opacity-10 flex flex-col justify-center items-center text-white text-center ">
          {/* <h2 className="text-2xl babylonica ">Karatu</h2>
        <h3 className="text-2xl gilda_display font-bold">Pamoja Ole Farm Lodge</h3> */}
        </div>
      </div>
      <div className="mt-4 mb-4 mx-4 space-y-4">
        <Link href="" alt="">
          <h3 className="text-2xl gilda_display font-bold text-white">
            Coffee Farm Tour
          </h3>
        </Link>
        <p className="text-md barlow text-white text-justify tracking-tight">
          All 14 Cottages Overlook Beautiful Active Farm, And The Ngorongoro
          Forest...
        </p>

        {/* <div className=" flex flex-wrap gap-2">
        <span className="px-3 py-1 bg-pamojadark gilda_display text-white text-sm ">Wildlife Adventure</span>
        <span className="px-3 py-1 bg-pamojadark gilda_display text-white text-sm ">Walks & Hikes</span>
        <span className="px-3 py-1 bg-pamojadark gilda_display text-white text-sm ">Cultural Visits</span>
      </div> */}

        <Separator />

        <div className="flex justify-between items-center">
          <Link
            href="#"
            className="text-white gilda_display text-xl border hover:border-pamojaprimary"
          >
            <ButtonOne name="Explore" href="" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export const AccomodationCard = ({
  src,
  className,
  href,
  alt,
  address,
  name,
  brief,
  activities,
  amenities,
}) => {
  return (
    <div className="bg-pamojaprimary rounded-none shadow-lg max-w-md mx-auto">
      <div className="relative">
        <Image
          src={src}
          alt={alt}
          className={` ${className}`}
          width={1000}
          height={240}
          style={{
            maxWidth: "100%",
            height: "280px",
            objectFit: "cover",
          }}
        />
        <div className="absolute inset-0 bg-black space-y-5 bg-opacity-30 flex flex-col justify-center items-center text-white text-center ">
          <h2 className="text-2xl babylonica ">{address || " "}</h2>
          <h3 className="text-2xl gilda_display font-bold">{name}</h3>
        </div>
      </div>
      <div className="my-4 mx-4 space-y-4">
        <p className="text-md barlow text-white">{brief}</p>

        <div className=" flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-pamojadark gilda_display text-white text-sm ">
            Wildlife Adventure
          </span>
          <span className="px-3 py-1 bg-pamojadark gilda_display text-white text-sm ">
            Walks & Hikes
          </span>
          <span className="px-3 py-1 bg-pamojadark gilda_display text-white text-sm ">
            Cultural Visits
          </span>
        </div>

        <Separator />

        <div className="mx-4 flex justify-between items-center">
          <div className="flex space-x-2">
            <FaParking className="text-white" size={24} />
            <FaWifi className="text-white" size={24} />
            <FaSwimmingPool className="text-white" size={24} />
            <FaConciergeBell className="text-white" size={24} />
            <FaBed className="text-white" size={24} />
          </div>

          <Link href="#" className="text-white gilda_display md:text-2xl">
            More Details
          </Link>
        </div>
      </div>
    </div>
  );
};

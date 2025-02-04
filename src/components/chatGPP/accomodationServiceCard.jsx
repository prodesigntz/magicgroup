import Image from 'next/image';
import { FaConciergeBell, FaParking, FaSwimmingPool } from 'react-icons/fa';
import { FaBed,  FaWifi } from 'react-icons/fa6';
import { Separator } from '../ui/separator';
import Link from 'next/link';

const AccommodationServiceCard = ({ img,logo, address, title, desc, href }) => (
  <div className="bg-white rounded-none shadow-lg max-w-md mx-auto">
    <div className="relative bg-black bg-opacity-40">
      <Image
        src={img}
        alt="Pamoja Ole Farm Lodge"
        className=""
        width={1000}
        height={240}
        style={{
          maxWidth: "100%",
          height: "280px",
          objectFit: "cover",
        }}
      />
      {/* <div className="absolute left-5 bottom-5 right-5 space-y-5  flex items-center justify-between  text-white text-start ">
    
        <div className="border border-pamojaprimary bg-white shadow-lg">
        <Image
          src={logo}
          alt={title}
          className=""
          width={100}
          height={100}
          style={{
            maxWidth: "100px",
            height: "100px",
            objectFit: "cover",
          }}
        /></div>
      </div> */}
    </div>
    <div className="my-4 mx-4 space-y-4">
      <h3 className="text-xl gilda_display font-bold">
        <Link href={href}>{title || ""}</Link>
      </h3>
      <p className="text-md barlow ">{desc}</p>

      {/* <div className=" flex flex-wrap gap-2">
        <span className="px-3 py-1 bg-pamojadark gilda_display text-white text-xs ">
          Company Category
        </span>
      </div> */}

      {/* <Separator /> */}

      {/* <div className="mx-4 flex justify-between items-center">
        <div className="flex space-x-2">
          <FaParking className="text-white" size={24} />
          <FaWifi className="text-white" size={24} />
          <FaSwimmingPool className="text-white" size={24} />
          <FaConciergeBell className="text-white" size={24} />
          <FaBed className="text-white" size={24} />
        </div>

        <Link href={href} className="text-white gilda_display md:text-2xl">
          More Details
        </Link>
      </div> */}
    </div>
  </div>
);

export default AccommodationServiceCard;

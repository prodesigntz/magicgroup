import Image from 'next/image';
import { Separator } from '../ui/separator';
import Link from 'next/link';
import {  ButtonOne } from '../buttons';

const ExperiencesCard = () => (
 
  <div className="bg-pamojaprimary rounded-none shadow-lg max-w-md mx-auto">
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
    <div className="my-4 mx-4 space-y-4">
      <Link href="" alt=""><h3 className="text-2xl gilda_display font-bold text-white">Coffee Farm Tour</h3></Link>
      <p className="text-md barlow text-white text-justify tracking-tight"> All 14 Cottages Overlook Beautiful Active Farm, And The Ngorongoro Forest... </p>

      {/* <div className=" flex flex-wrap gap-2">
        <span className="px-3 py-1 bg-pamojadark gilda_display text-white text-sm ">Wildlife Adventure</span>
        <span className="px-3 py-1 bg-pamojadark gilda_display text-white text-sm ">Walks & Hikes</span>
        <span className="px-3 py-1 bg-pamojadark gilda_display text-white text-sm ">Cultural Visits</span>
      </div> */}

      <Separator/>
      
      <div className="flex justify-between items-center">
       
       <Link href="#" className="text-white gilda_display text-xl border hover:border-pamojaprimary"><ButtonOne name="Explore"  href=""/></Link>
      </div>
    </div>
  </div>
);

export default ExperiencesCard;

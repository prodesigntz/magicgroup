import Link from "next/link";
import React from "react";
import { MobileNav } from "./mobilenav";
import { menuData } from "@/data/menuData";
import { Button } from "./ui/button";
import Socialmedias from "./socialmedias";
import { FaPhone, FaPhoneAlt } from "react-icons/fa";

export default function NavBarBar() {
  return (
    <nav className="bg-transparent shadow-md">
      {/* <div className="py-2 bg-proprimary text-white">
        <div className="hidden md:flex md:items-center md:justify-between respons">
          <div className="text-sm">info@prohomeacademy.sc.tz</div>
          <div className="text-sm"> 
            <Link href="/" className="flex items-center space-x-2 font-semibold"> 
                <FaPhoneAlt className="text-xl" /> <p>+255 755 902 861</p>    
            
            </Link>
          </div>
          <div className="text-sm"> <Socialmedias/></div>
        </div>
      </div> */}
      <div className=" py-5 md:py-8 px-5 ">
        <div className="respons flex items-center justify-between">
          {/* logo  */}
          <div className="font-bold"> Magic Group</div>
          {/* webHeader  */}
          <div className="hidden md:block">
            <ul className="flex items-center space-x-3">
              {menuData.map((menus, i) => (
                <Link
                  key={i}
                  href={menus.link}
                  className="font-medium hover:bg-irisonp/5 "
                >
                  <li className="p-2"> {menus.name}</li>
                </Link>
              ))}
            </ul>
          </div>

          {/* button */}
          <div className="hidden md:block">
            <Button
              asChild
              variant="pro-primary"
              className="rounded-full bg-proprimary text-white"
            >
              <Link href="/inquiry" className="">
                {" "}
                Book Now
              </Link>
            </Button>
          </div>
          <MobileNav />
        </div>
      </div>
    </nav>
  );
}

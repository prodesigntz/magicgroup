import Link from "next/link";
import React from "react";
import { MobileNav } from "./mobilenav";
import { menuData } from "@/data/menuData";
import { Button } from "./ui/button";
import Image from "next/image";
import { ButtonOne } from "./buttons";

export default function NavBar() {
  return (
    <nav className="bg-transparent ">
     
      <div className="">
        <div className="respons flex items-center justify-between">
          {/* logo  */}
          <Link href="/" className="font-bold ">
            <Image
              src="/logo.png"
              alt="blog"
              width={1200}
              height={1200}
              // style={{
              //   maxWidth: "120px",
              //   height: "60px",
              //   objectFit: "cover",
              // }}
              className=" max-w-40 max-h-20 rounded-md relative"
            />
          </Link>
          {/* webHeader  */}
          <div className="hidden md:block text-white">
            <ul className="flex items-center space-x-3">
              {menuData.map((menus, i) => (
                <Link
                  key={i}
                  href={menus.link}
                  className="font-medium hover:bg-irisonp/5 "
                >
                  <li className="p-2 gilda_display"> {menus.name}</li>
                </Link>
              ))}
            </ul>
          </div>

          {/* button */}
          <div className="hidden md:block">
            <Button
              asChild
              variant="pamoja-primary"
              className=" bg-pamojaprimary hover:bg-pamojadark rounded-none text-pamojasecondary"
            >
               <ButtonOne
                              name="Get In Touch"
                              onClick={() =>
                                router.push(`/contact`)
                              }
                              className="justify-center  mt-5"
                            />
            </Button>
          </div>
          <MobileNav />
        </div>
      </div>
    </nav>
  );
}

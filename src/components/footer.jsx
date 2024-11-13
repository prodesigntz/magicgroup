import { footerData } from "@/data/footerData";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import Socialmedias from "./socialmedias";
import { Input } from "./ui/input";
import { FaEnvelope, FaPhone } from "react-icons/fa6";
import Image from "next/image";

export const Footer = () => {
  return (
    <section className="psektion bg-pamojadark ">
      <div className="respons sektion md:grid-cols-6">
        <div className="text-slate-200 col-span-2 space-y-2 ">
          {/* logo  */}
          <Link href="/" className="font-bold">
            <Image
              src="/logo.png"
              alt="blog"
              width={1200}
              height={1200}
              style={{
                maxWidth: "120px",
                height: "60px",
                objectFit: "cover",
              }}
              className=" max-w-full max-h-50 rounded-md relative"
            />
          </Link>
          {/* <h5 className="font-bold">Magic Group</h5> */}
          <h5 className="text-sm ">
            We are firm believers in the preservation of the land and its value
            as a home for future generations.
          </h5>
          <h5 className="pt-2 text-sm  ">
            {new Date().getFullYear()} © Copyright{" "}
            <Link href="https://magicgroup.com">Magic Group</Link>. By
            <Link href="https://prodesign.co.tz" className="pl-1 text-red-500">
              Pro Design
            </Link>
          </h5>
        </div>
        <div className="text-slate-200 text-sm ">
          <h5 className="font-bold text-xl pb-3">{footerData[0].title}</h5>
          {footerData[0].links.map((comp, i) => (
            <ul key={i} className="space-y-2">
              <Link href={comp.link}>{comp.name}</Link>
            </ul>
          ))}
        </div>

        <div className="text-slate-200 text-sm ">
          <h5 className="font-bold text-xl pb-3">{footerData[1].title}</h5>
          {footerData[1].links.map((imp, i) => (
            <ul key={i} className="space-y-2">
              <Link href={imp.link}>{imp.name}</Link>
            </ul>
          ))}
        </div>
        <div className="text-slate-200 space-y-3 col-span-2">
          <h5 className="font-bold text-xl ">Get in Touch</h5>
          <div className="sektion md:grid-cols-2 text-sm ">
            <div className="">
              <div className="flex-col">
                <span className="flex items-center  space-x-2">
                  <FaPhone className="text-md" />
                  <h5 className="">+255 767 465 557</h5>
                </span>
                <span className="flex items-center  space-x-2">
                  <FaPhone className="text-md" />
                  <h5 className="">+255 753 287 802</h5>
                </span>
              </div>
            </div>
            <div className="">
              <div className="flex-col">
                <span className="flex items-center  space-x-2">
                  <FaPhone className="text-md" />
                  <h5 className=""> +255 786 707 931</h5>
                </span>
                <span className="flex items-center  space-x-2">
                  <FaPhone className="text-md" />
                  <h5 className=""> +255 717 693 363 </h5>
                </span>
              </div>
            </div>
          </div>

          <h4>Subscribe our Newsletter</h4>
          <div className="flex items-center justify-between space-x-2">
            <Input
              type="email"
              placeholder="Email"
              className="w-full max-w-sm"
            />
            <Button
              type="submit"
              className="bg-prohomeacademy flex items-center space-x-2 bg-white hover:bg-pamojatertiary text-pamojadark"
            >
              <FaEnvelope />
              <span>Subscribe</span>
            </Button>
          </div>
          {/* <Socialmedias /> */}
        </div>
      </div>
      {/* <div className="respons sektion md:grid-cols-3 space-y-2 text-xs">
        <div className></div>
        <div></div>
        <div></div>
      </div> */}
    </section>
  );
};

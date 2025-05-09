"use client"
import { footerData } from "@/data/footerData";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";
import Socialmedias from "./socialmedias";
import { Input } from "./ui/input";
import { FaArrowLeftLong, FaArrowRightLong, FaEnvelope, FaPhone } from "react-icons/fa6";
import Image from "next/image";
import { Title } from "./texties";
import { createDocument } from "@/firebase/databaseOperations";

export const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    // Basic validation
    if (
      !formData.name ||
      !formData.email
    ) {
      setLoading(false);
      setErrorMessage("Please fill out all fields.");
      return;
    }

    try {
      // Add form data to Firebase Firestore
      await createDocument( formData, "Subscribers");
      setSuccessMessage("Your message has been sent successfully!");
      setFormData({
        name: "",
        email: "",
      });
    } catch (error) {
      setErrorMessage("Error sending message. Please try again.");
      console.error("Error adding document: ", error);
    }

    setLoading(false);
  };

  return (
    <section className="bg-[url('/images/dar.jpg')] bg-black/80 bg-blend-overlay bg-cover bg-no-repeat  ">
      <div className="psektion respons sektion md:grid-cols-6">
        <div className="text-slate-200 col-span-2 space-y-2 ">
          {/* logo  */}
          <Link href="/" className="font-bold">
            <Image
              src="/logo.png"
              alt="blog"
              width={1200}
              height={1200}
              style={{
                maxWidth: "240px",
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
          <div className="">
            <h5 className="font-bold text-xl ">Get in Touch</h5>
            <div className="sektion md:grid-cols-2 text-sm ">
              <div className="">
                <div className="flex-col">
                  <span className="flex items-center  space-x-2">
                    <FaPhone className="text-md" />
                    <h5 className=""> +255 222 701 285</h5>
                  </span>
                  <span className="flex items-center  space-x-2">
                    <FaEnvelope className="text-md" />
                    <h5 className="">info@magicgroup.co.tz</h5>
                  </span>
                </div>
              </div>
            </div>
          </div>
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
        <div className="bg-pamojaprimary rounded-tl-3xl md:-mb-20 md:-mt-40 p-10 text-slate-200 space-y-3 col-span-2">
          <Title
            className="text-start text-pamojasecondary"
            first="Subscribe our Newsletter"
          />

          <form className="flex flex-col items-center  space-y-5" onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Name"
              className="w-full max-w-sm rounded-none"
              value={formData.name}
              onChange={handleChange}
            />
            <Input
              type="email"
              placeholder="Email"
              className="w-full max-w-sm rounded-none hover:ring-0 hover:ring-offset-0 hover:outline-0 hover:outline-offset-0"
              value={formData.email}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="w-full max-w-sm ring-0 ring-offset-0 outline-0 outline-offset-0 flex items-center hover:bg-pamojadark space-x-2 bg-white text-pamojasecondary rounded-none"
            >
              <span>Subscribe</span>
              <FaArrowRightLong />
            </button>
          </form>
          {/* <Socialmedias /> */}
        </div>
      </div>
      <div className="bg-black py-3">
        <div className="respons sektion md:grid-cols-2 space-y-2 text-xs">
          <div className>
            <h5 className="pt-2 text-white text-sm  ">
              {new Date().getFullYear()} © Copyright{" "}
              <Link href="https://magicgroup.com">Magic Group</Link>. By
              <Link
                href="https://prodesign.co.tz"
                className="pl-1 text-red-500"
              >
                Pro DesignTZ
              </Link>
            </h5>
          </div>
          <div className="text-white flex justify-center md:justify-end">
            <Socialmedias />
          </div>
        </div>
      </div>
    </section>
  );
};

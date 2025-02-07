"use client";

import "../globals.css";
import { Footer } from "@/components/footer";

import NavBar from "@/components/navbar";

export default function RootLayout({ children }) {

  return (
    <div>
      <section className=" text-white bg-[url('/images/accomodations/oleaout.jpeg')] bg-cover bg-center  bg-slate-700 bg-blend-overlay bg-no-repeat">
       
      </section>
      <div className="bg-pamojasecondary py-5">
        <NavBar />
      </div>
      {children}
      <Footer />
    </div>
  );
}

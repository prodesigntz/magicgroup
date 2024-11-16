"use client";

import "../globals.css";
//import NavBar from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Title } from "@/components/texties";
import { Slash } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname, useRouter } from "next/navigation";
import NavBar from "@/components/navbar";

export default function RootLayout({ children }) {

  return (
    <div>
      <section className=" text-white bg-[url('/images/accomodations/oleaout.jpeg')] bg-cover bg-center  bg-slate-700 bg-blend-overlay bg-no-repeat">
       
      </section>
      <div className="bg-pamojasecondary">
        <NavBar />
      </div>
      {children}
      <Footer />
    </div>
  );
}

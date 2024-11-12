// "use client"

import NavBar from "@/components/navbar";
import Landing from "./(pages)/home/page";
import { Footer } from "@/components/footer";



export const metadata = {
  title: "Pamoja Africa",
  description:
    "Where Nature Meets Luxury, Best Luxurious Safari accomodations in Tanzania",
  //charset="UTF-8",
};

export default function Home() {

  return (
    <main className="">
      <div className="bg-pamojadark">
           <NavBar />
      </div>
      <Landing />
      <Footer />
    </main>
  );
}

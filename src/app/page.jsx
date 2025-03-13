// "use client"

import TawtoMessenger from "@/components/tawtoMessenger";
import Landing from "./(pages)/home/page";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "Magic Group",
  description: "",
};

export default function Home() {
  return (
    <main className="">
    
      <Landing />
      <TawtoMessenger/>
      <Footer />
    </main>
  );
}

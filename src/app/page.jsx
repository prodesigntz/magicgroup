// "use client"

import Landing from "./(pages)/home/page";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "Magic Group",
  description: "",
  //charset="UTF-8",
};

export default function Home() {
  return (
    <main className="">
    
      <Landing />
      <Footer />
    </main>
  );
}

import { Footer } from "@/components/footer";
import NavBar from "@/components/navbar";
import React from "react";

export default function NotFound() {
  return (
    <section className="bg-pamojaaccent">
      <div className="pamojaprimary">
        <NavBar />
      </div>
      <div className="psektion flex items-center justify-center">
        <h1 className="text-4xl">
          No Page Found
        </h1>
      </div>
      <Footer />
    </section>
  );
}

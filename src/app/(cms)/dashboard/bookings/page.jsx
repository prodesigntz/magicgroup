"use client";

import React from "react";
import useFetchAll from "@/lib/hooks/useFetchAll";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardDataLoader from "@/components/dashboard/dashboard-data-loader";
import PropertyContactDetails from "@/components/contactus/propertyContactDetails";

export default function Page() {
  const { data, isLoading } = useFetchAll("Properties");

  console.log("Booking data", data[3]?.bookings);

  return (
    <div>
      <section className="psektion">
        {data && data.length > 0 && (
          <Tabs
            defaultValue="pamoja-farm-villa"
            className="respons sektion md:grid-cols-3"
          >
            <div className="relative bg-pamojaaccent md:col-span-1 md:p-5">
              <TabsList className=" rounded-none sektion  ">
                {data.map((property) => (
                  <TabsTrigger
                    key={property.id}
                    value={property.slug}
                    className="rounded-none text-center text-white text-lg px-5 py-1.5 bg-pamojaprimary hover:bg-pamojadark gilda_display"
                  >
                    {property.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            {isLoading ? (
              <DashboardDataLoader />
            ) : (
              <div className="col-span-2">
                {/* {data.bookings.map((bookings) => (
                  <div key={bookings.id} ></div>
                ))} */}
              </div>
            )}
          </Tabs>
        )}
      </section>
    </div>
  );
}

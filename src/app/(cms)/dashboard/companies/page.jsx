"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
//import { AllAccomodations } from "./allAccomodations";
import { SharedDashHeader } from "@/components/dashboard/sharedDashHeader";
import { useRouter } from "next/navigation";
import useFetchAll from "@/lib/hooks/useFetchAll";
import DashboardDataLoader from "@/components/dashboard/dashboard-data-loader";
import { AllProperties } from "./allProperties";

export default function Page() {
  const router = useRouter();
  //state.............................
  const [published, setPublished] = useState([]);
  const [drafts, setDrafts] = useState([]);
  //fetch accommodations..............
  const { data, isLoading } = useFetchAll("Properties");

  console.log("Propeties: ", data);


  useEffect(() => {
    const drf = [];
    const pbd = [];

    if (data.length > 0) {
      data.forEach((element) => {
        if (element.isPublished==true) {
          pbd.push(element);
        } else {
          drf.push(element);
        }
      });

      setPublished(pbd);
      setDrafts(drf);
    }
  }, [data]);

  return (
    <main>
      {/* title & add destination button */}

      <SharedDashHeader
        title="Properties"
        btnTitle="New Property"
        onClick={() => router.push("/dashboard/companies/add")}
      />
      {/* tabs */}
      <div className="">
        <Tabs defaultValue="Properties">
          <TabsList className="bg-pamojatertiary rounded-none">
            <TabsTrigger value="Properties" className="">
              All
            </TabsTrigger>
            <TabsTrigger value="Published">Pushlished</TabsTrigger>
            <TabsTrigger value="Drafts">Drafts </TabsTrigger>
          </TabsList>
          {isLoading ? (
            <DashboardDataLoader />
          ) : (
            <>
              <TabsContent value="Properties">
                <AllProperties data={data} />
              </TabsContent>
              <TabsContent value="Published">
                <AllProperties data={published} />
              </TabsContent>
              <TabsContent value="Drafts">
                <AllProperties data={drafts} />
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
    </main>
  );
}

"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SharedDashHeader } from "@/components/dashboard/sharedDashHeader";
import { useRouter } from "next/navigation";
import useFetchAll from "@/lib/hooks/useFetchAll";
import DashboardDataLoader from "@/components/dashboard/dashboard-data-loader";
import { AllStaff } from "./allStaff";

export default function Page() {
  const router = useRouter();
  //state.............................
  const [published, setPublished] = useState([]);
  const [drafts, setDrafts] = useState([]);
  //fetch accommodations..............
  const { data, isLoading } = useFetchAll("Staffs");

  console.log("Propeties: ", data);

  useEffect(() => {
    const drf = [];
    const pbd = [];

    if (data.length > 0) {
      data.forEach((element) => {
        if (element.isPublished == true) {
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
        btnTitle="New Staff"
        onClick={() => router.push("/dashboard/staffs/add")}
      />
      {/* tabs */}
      <div className="">
        <Tabs defaultValue="Properties">
          <TabsList className="bg-pamojaaccent rounded-none">
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
                <AllStaff data={data} />
              </TabsContent>
              <TabsContent value="Published">
                <AllStaff data={published} />
              </TabsContent>
              <TabsContent value="Drafts">
                <AllStaff data={drafts} />
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
    </main>
  );
}

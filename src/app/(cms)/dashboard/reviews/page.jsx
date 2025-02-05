"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SharedDashHeader } from "@/components/dashboard/sharedDashHeader";
import { useRouter } from "next/navigation";
import useFetchAll from "@/lib/hooks/useFetchAll";
import DashboardDataLoader from "@/components/dashboard/dashboard-data-loader";
import { AllPosts } from "./allPosts";

export default function Page() {
  const router = useRouter();
  //state.............................
  const [published, setPublished] = useState([]);
  const [drafts, setDrafts] = useState([]);
  //fetch accommodations..............
  const { data, isLoading } = useFetchAll("Reviews");

  useEffect(() => {
    const drf = [];
    const pbd = [];

    if (data.length > 0) {
      data.forEach((element) => {
        if (element.isPublished) {
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
        title="Reviews Posts"
        btnTitle="New Review"
        onClick={() => router.push("/dashboard/reviews/add")}
      />

      {/* tabs */}
      <div className="">
        <Tabs defaultValue="Published">
          <TabsList className="bg-pamojatertiary rounded-none">
            <TabsTrigger value="Properties" className="">
              All
            </TabsTrigger>
            <TabsTrigger value="Published">Published</TabsTrigger>
            <TabsTrigger value="Drafts">Drafts </TabsTrigger>
          </TabsList>
          {isLoading ? (
            <DashboardDataLoader />
          ) : (
            <>
              <TabsContent value="Properties">
                <AllPosts data={data} />
              </TabsContent>
              <TabsContent value="Published">
                <AllPosts data={published} />
              </TabsContent>
              <TabsContent value="Drafts">
                <AllPosts data={drafts} />
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
    </main>
  );
}

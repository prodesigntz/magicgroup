"use client";

import "../globals.css";
import PageWrapper from "@/components/dashboard/pageWrapper";
import DashboardHeader from "@/components/dashboard/dashboardHeader";
import SideBar from "@/components/dashboard/sideBar";
import { useAppContext } from "@/context/AppContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardDataLoader from "@/components/dashboard/dashboard-data-loader";

// export const metadata = {
//   title: "Napanda Safaris",
//   description: "Your Gateway to Extraordinary African Adventures",
// };

export default function RootLayout({ children }) {
  const router = useRouter();
  const { authUser, isFetchingAuthUser } = useAppContext();

  useEffect(() => {
    if (!authUser && !isFetchingAuthUser) {
      router.replace("/login");
    }
  }, [authUser, router, isFetchingAuthUser]);

  if (isFetchingAuthUser) {
    return <DashboardDataLoader />;
  }

  if (!isFetchingAuthUser && authUser) {
    return (
      <div className="flex ">
        <div className=" w-64 space-y-5 p-5 hidden md:block max-h-full bg-pamojatertiary">
          <div className="bg-pamojaprimary p-5  rounded-lg  sticky top-0 z-20 shadow-md ">
            <h1 className="gilda_display text-lg font-bold antialiased">
              PAMOJA
            </h1>
          </div>
          <SideBar />
        </div>
        <div className="flex-1  p-5  ">
          <DashboardHeader />
          <PageWrapper>{children}</PageWrapper>
        </div>
      </div>
    );
  }

  return <DashboardDataLoader />;
}

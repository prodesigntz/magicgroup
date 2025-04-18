"use client";

import "../globals.css";
import PageWrapper from "@/components/dashboard/pageWrapper";
import DashboardHeader from "@/components/dashboard/dashboardHeader";
import SideBar from "@/components/dashboard/sideBar";
import { useAppContext } from "@/context/AppContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardDataLoader from "@/components/dashboard/dashboard-data-loader";

export default function RootLayout({ children }) {
  const router = useRouter();
  const { authUser, isFetchingAuthUser } = useAppContext();

  useEffect(() => {
    if (!authUser && !isFetchingAuthUser) {
      router.replace('/login');
    }
  }, [authUser, isFetchingAuthUser, router]);

  if (isFetchingAuthUser) {
    return <DashboardDataLoader />;
  }

  if (!authUser) {
    return null;
  }

  return (
    <div className="h-screen bg-gray-100">
      <DashboardHeader />
      <div className="flex h-[calc(100vh-80px)]">
        <SideBar />
        <main className="flex-1 overflow-y-auto p-4">
          <PageWrapper>{children}</PageWrapper>
        </main>
      </div>
      <footer className="fixed bottom-0 w-full bg-white shadow-lg p-4 text-center text-gray-600">
        © {new Date().getFullYear()} Magic Group. All rights reserved.
      </footer>
    </div>
  );
}

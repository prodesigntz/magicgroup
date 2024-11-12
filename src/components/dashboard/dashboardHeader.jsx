import React from "react";
import { AccountDash } from "./accountDash";
import Image from "next/image";

export default function DashboardHeader() {
  return (
    <div className="flex gilda_display items-center justify-between p-5  rounded-none bg-protertiary sticky top-0 z-20 shadow-md">
      <div className="flex items-center space-x-2">
        <Image src="/logo.png" width={100} height={50} alt="logo" />
      </div>
      <div className="hide md:block">Search</div>
      <div className="">
        <AccountDash />
      </div>
    </div>
  );
}

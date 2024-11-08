"use client"
import { SharedDashHeader } from "@/components/dashboard/sharedDashHeader";
import { useRouter } from "next/navigation";
import React from "react";

const QuotationsList = () => {
  const router = useRouter()
  return (
    <div>
      {" "}
      <SharedDashHeader
        title="Quotations List"
        btnTitle="New Quotation"
        onClick={() => router.push("/dashboard/quotations/add")}
      />
    </div>
  );
};

export default QuotationsList;

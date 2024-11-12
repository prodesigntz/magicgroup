import { AddFAQSheet } from "@/components/accomodation/addFaqsSheet";
import PaginationSet from "@/components/paginationSet";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import Image from "next/image";
// import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
// import { FaEdit } from "react-icons/fa";
// import { FaEye, FaTrash } from "react-icons/fa6";
// import { IoDuplicate } from "react-icons/io5";

export const AllFaqs = ({ data,propertyID }) => {
  const router = useRouter();
  //console.log("data in all faqs ", data.faq);

  // pagination data
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(15);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = data?.slice(firstPostIndex, lastPostIndex);

  if (data?.length < 1) {
    return (
      <div className="w-full h-60 flex justify-center items-center">
        <span>Property List Is Empty</span>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* <AddFAQSheet propertyID={propertyID} /> */}
      <Table className="">
        <TableCaption> List of Properties</TableCaption>

        {/* table header */}
        <TableHeader>
          <TableRow>
            <TableHead>Sno.</TableHead>
            <TableHead>Question</TableHead>
            <TableHead>Answer</TableHead>

            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        {/* table row */}
        <TableBody>
          {currentPosts?.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{++index}</TableCell>
              <TableCell>
                <h3 className="text-base">{item?.title}</h3>
              </TableCell>
              <TableCell className="">
                <h3 className="text-base">{item?.desc}</h3>
              </TableCell>

              <TableCell className=" items-center space-x-1">
                {/* <Button
                  onClick={() =>
                    router.push(`/dashboard/properties/${item?.id}`)
                  }
                  className="bg-pamojaprimary text-white hover:bg-pamojaaccent hover:text-pamojadark"
                >
                  <FaEdit />
                </Button> */}
                {/* <Button className="bg-prosecondary text-procolor hover:text-white hover:bg-proprimary">
                  <FaTrash />
                </Button> */}
                {/* <Button className="bg-prosecondary text-procolor hover:text-white hover:bg-proprimary">
                  <IoDuplicate />
                </Button>  */}
                {/* <Button
                  asChild
                  className="bg-pamojaprimary text-white hover:bg-pamojaaccent hover:text-pamojadark"
                >
                  <Link
                    href={`/dashboard/properties/viewProperty/${item?.id}`}
                  
                  >
                    <FaEye />
                  </Link>
                </Button> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Paginations */}
      <PaginationSet
        totalPosts={data?.length}
        postsPerPage={postsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

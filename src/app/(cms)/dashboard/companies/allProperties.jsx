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
import { deleteDocument } from "@/firebase/databaseOperations";
//import { deleteDocument } from "@/firebase/databaseOperations";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaEye, FaTrash } from "react-icons/fa6";

export const AllProperties = ({ data, postId }) => {
  const router = useRouter();
  console.log("data in all properties ", data);

  // pagination data
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(15);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = data.slice(firstPostIndex, lastPostIndex);

  if (data.length < 1) {
    return (
      <div className="w-full h-60 flex justify-center items-center">
        <span>Company List Is Empty</span>
      </div>
    );
  }

  const handleDelete = async (postId) => {
    const { didSucceed } = await deleteDocument("Properties", postId);
    if (didSucceed) {
      router.refresh();
      console.log("Company deleted successfully");
    } else {
      console.error("Failed to delete company");
    }
  };

  return (
    <>
      <Table className="">
        <TableCaption> List of Company</TableCaption>

        {/* table header */}
        <TableHeader>
          <TableRow>
            <TableHead>Sno.</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Title</TableHead>
            {/* <TableHead>Rooms</TableHead> */}
            <TableHead>Bookings</TableHead>

            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        {/* table row */}
        <TableBody>
          {currentPosts.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{++index}</TableCell>
              <TableCell>
                <Image
                  src={item?.img || ""}
                  alt="property"
                  width={80}
                  height={60}
                  style={{
                    maxWidth: "100%",
                    height: "60px",
                    objectFit: "cover",
                  }}
                  className="max-w-full max-h-50 rounded-md"
                />
              </TableCell>
              <TableCell className="">
                <h3 className="text-base">{item?.name}</h3>
              </TableCell>
            
              <TableCell className="">
                <h3>
                  {item?.bookings.length > 1 ? (
                    <>{item?.bookings.length}</>
                  ) : (
                    <>0 booking</>
                  )}
                </h3>
              </TableCell>

              <TableCell className="flex items-center space-x-1">
                <Button
                  onClick={() =>
                    router.push(`/dashboard/companies/${item?.id}`)
                  }
                  className="h-10 w-10 bg-pamojaprimary text-white hover:bg-pamojaaccent hover:text-pamojadark"
                >
                  <FaEdit size={10} className="h-10 w-10 text-white" />
                </Button>
               
                <Button
                  asChild
                  className="h-10 w-10 bg-pamojaprimary text-white hover:bg-pamojaaccent hover:text-pamojadark"
                >
                  <Link
                    href={`/dashboard/companies/viewProperty/${item?.id}`}
                    
                  >
                    <FaEye size={8} className="h-10 w-10 text-white" />
                  </Link>
                </Button>
           
              <Button
                className="h-10 w-10 bg-pamojaprimary text-white hover:bg-pamojaaccent hover:text-pamojadark"
                onClick={() => handleDelete(item?.id)}
              >
                  <FaTrash size={10} className="h-10 w-10 text-white"/>
              </Button>
              
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Paginations */}
      <PaginationSet
        totalPosts={data.length}
        postsPerPage={postsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

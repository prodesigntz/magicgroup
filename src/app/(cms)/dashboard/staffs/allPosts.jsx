"use client";
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
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
//import { IoDuplicate } from "react-icons/io5";

export const AllPosts = ({ data: initialData }) => {
  const router = useRouter();
  const [data, setData] = useState(initialData); // Manage the posts data with useState

  // pagination data
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(15);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = data.slice(firstPostIndex, lastPostIndex);

  const handleDelete = async (postId) => {
    const { didSucceed } = await deleteDocument("Staffs", postId);
    if (didSucceed) {
      setData((prevData) => prevData.filter((post) => post.id !== postId));
    } else {
      console.error("Failed to delete post");
    }
  };

  if (data.length < 1) {
    return (
      <div className="w-full h-60 flex justify-center items-center">
        <span>Blog Posts List Is Empty</span>
      </div>
    );
  }

  return (
    <>
      <Table className="">
        <TableCaption> List of Blogs</TableCaption>

        {/* table header */}
        <TableHeader>
          <TableRow>
            <TableHead>Sno.</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>State</TableHead>
            <TableHead>Category</TableHead>

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
                  src={item?.img}
                  alt="property"
                  width={80}
                  height={60}
                  style={{
                    maxWidth: "100%",
                    height: "60px",
                    objectFit: "cover",
                  }}
                  className=" max-w-full max-h-50 rounded-md"
                />
              </TableCell>
              <TableCell className="">
                <h3 className="text-base">{item.title}</h3>
              </TableCell>
              <TableCell className="">
                <h3>{item.isPublished ? "Published" : "Draft"}</h3>
              </TableCell>
              <TableCell className="">
                <h3>{item.category}</h3>
              </TableCell>

              <TableCell className=" items-center space-x-1">
                <Button
                  onClick={() => router.push(`/dashboard/staffs/${item.id}`)}
                  className="bg-pamojaprimary text-white hover:bg-pamojaaccent hover:text-pamojadark"
                >
                  <FaEdit />
                </Button>
                <Button
                  onClick={() => handleDelete(item.id)}
                   className="bg-pamojaprimary text-white hover:bg-pamojaaccent hover:text-pamojadark"
                >
                  <FaTrash />
                </Button>
            
                {/* <Button
                  asChild
                  className="bg-pamojaprimary text-white hover:bg-pamojaaccent hover:text-pamojadark"
                >
                  <Link
                    href={`/blog/${item.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
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
        totalPosts={data.length}
        postsPerPage={postsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

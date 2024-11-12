import PropertyImageGalleryCloudinary from "@/components/cloudinaryComponents/propertyImageGalleryCloudinary";
import ImgCloudinary from "@/components/imgCloudinary";
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
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaEye, FaTrash } from "react-icons/fa6";
import { IoDuplicate } from "react-icons/io5";

export const AllGallery = ({ data }) => {
  const router = useRouter();
  console.log("data in all gallery ", data);

  // pagination data
  // const [currentPage, setCurrentPage] = useState(1);
  // const [postsPerPage, setPostsPerPage] = useState(15);

  // const lastPostIndex = currentPage * postsPerPage;
  // const firstPostIndex = lastPostIndex - postsPerPage;
  // const currentPosts = data?.slice(firstPostIndex, lastPostIndex);

  // if (data.length < 1) {
  //   return (
  //     <div className="w-full h-60 flex justify-center items-center">
  //       <span>Gallery List Is Empty</span>
  //     </div>
  //   );
  // }

  //    const handleDelete = async (postId) => {
  //      const { didSucceed } = await deleteDocument("Blogpost", postId);
  //      if (didSucceed) {
  //        setData((prevData) => prevData.filter((post) => post.id !== postId));
  //      } else {
  //        console.error("Failed to delete post");
  //      }
  //    };
  return (
    <div className="">

      {/* <PropertyImageGalleryCloudinary /> */}

      {/* {currentPosts.map((item, index) => (
       
      ))} */}
      {/* <div className="sektion md:grid-cols-4">
        {[1, 2, 3, 4, 5].map((data, index) => (
          <div className="mt-5" key={index}>
            <ImgCloudinary />
          </div>
        ))}
      </div> */}

      {/* Paginations */}
      {/* <PaginationSet
        totalPosts={data.length}
        postsPerPage={postsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      /> */}
    </div>
  );
};

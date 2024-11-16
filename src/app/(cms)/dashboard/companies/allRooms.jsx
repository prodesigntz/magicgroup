import { AddRoomSheet } from "@/components/accomodation/addProductSheet";
import PaginationSet from "@/components/paginationSet";
import { Button } from "@/components/ui/button";
// import { Button } from "@/components/ui/button";
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
// import { FaEdit } from "react-icons/fa";
// import { FaEye, FaTrash } from "react-icons/fa6";
// import { IoDuplicate } from "react-icons/io5";

export const AllRooms = ({ propertyID, data }) => {
  const router = useRouter();
  console.log("data in all rooms ", data?.rooms);

  // pagination data
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(15);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = data?.rooms?.slice(firstPostIndex, lastPostIndex);

  /// state to handle edit
  const [selectedRoom, setSelectedRoom] = useState(null);
  const handleEditRoom = (room) => {
    setSelectedRoom(room); // Set the room to be edited
  };

  if (data?.rooms?.length < 1) {
    return (
      <div className="w-full h-60 flex justify-center items-center">
        <span>Property List Is Empty</span>
      </div>
    );
  }

  //    const handleDelete = async (postId) => {
  //      const { didSucceed } = await deleteDocument("Blogpost", postId);
  //      if (didSucceed) {
  //        setData((prevData) => prevData.filter((post) => post.id !== postId));
  //      } else {
  //        console.error("Failed to delete post");
  //      }
  //    };
  return (
    <div className="space-y-5">
      {/* <AddRoomSheet propertyID={propertyID} /> */}
      <Table className="">
        <TableCaption> List of Properties</TableCaption>

        {/* table header */}
        <TableHeader>
          <TableRow>
            <TableHead>Sno.</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Beds</TableHead>

            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        {/* table row */}
        <TableBody>
          {currentPosts?.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{++index}</TableCell>
              <TableCell>
                <Image
                  src={item?.img[0] || ""}
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
                <h3 className="text-base">{item?.name}</h3>
              </TableCell>
              <TableCell className="">
                <h3>{item?.beds}</h3>
              </TableCell>

              <TableCell className=" items-center space-x-1">
                <Button
                  onClick={() => handleEditRoom(item)}
                  className="bg-pamojaprimary text-white hover:bg-pamojaaccent hover:text-pamojadark"
                >
                  <FaEdit />
                </Button>
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
        totalPosts={data?.rooms?.length}
        postsPerPage={postsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

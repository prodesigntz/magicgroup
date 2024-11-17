"use client";

import React, { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { useParams, useRouter } from "next/navigation";
import {
  createDocument,
  updateDocument,
  getSingleDocument,
} from "@/firebase/databaseOperations";
import { imageUploadToFirebase } from "@/firebase/fileOperations";
import { getSlug, truncateDescription } from "@/lib/utils";
import Image from "next/image";
import SkeletonOne from "@/components/skeletonOne";
import Link from "next/link";
import { FaCircle, FaEnvelope, FaPlus } from "react-icons/fa6";
import { renderIcon } from "@/data/iconOptions";
import { Separator } from "@/components/ui/separator";
import { DataTabs } from "@/app/(cms)/dashboard/companies/dataTabs";
import { AddProductSheet } from "@/components/accomodation/addProductSheet";
import { AddHighlightSheet, AddServiceSheet } from "@/components/accomodation/addServiceSheet";
import { AddFAQSheet } from "@/components/accomodation/addFaqsSheet";
import { AddExperienceSheet } from "@/components/accomodation/addExperienceSheet ";
import UploadImagesCloudinaryForm from "@/components/cloudinaryComponents/uploadImagesCloudinary";
// import { Button } from "@/components/ui/button";
// import { PropertyBottomSheet } from "@/components/accomodation/propertyBottomSheet";
// import { RoomForm } from "@/components/accomodation/propertyExtrasFormTypes";
// import { PropertyBottomSheetNew } from "@/components/accomodation/propertyBottomSheetNew";
// import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@shadcn/ui-modal";

export default function ViewProperty({ params }) {
  const { propertyID } = useParams();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { authUser } = useAppContext();
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    slogan: "",
    phones: [],
    emails: [],
    /// amenities: [{ name: "", icon: "" }],
    socialMedias: [{ name: "", icon: "", link: "" }],
    departments: [],
    location: "",
    /// noRooms: "",
    rooms: [
      {
        name: "",
        price: "",
        desc: "",
        img: [],
        imgPreview: [],
        capacity: "",
        beds: "",
        available: "",
        facilities: [],
      },
    ],
    gallery: [{ img: null, imgPreview: null, title: "", dst: "", desc: "" }],
    faq: [{ title: "", desc: "" }],
    highlights: [
      { img: null, imgPreview: null, title: "", subTitle: "", desc: "" },
    ],
    img: null,
    imgPreview: null,
    isPublished: false,
    bookings: [],
  });

  const router = useRouter();

  // Fetch existing property data if propertyID is provided
  useEffect(() => {
    if (propertyID) {
      const fetchProperty = async () => {
        setIsLoading(true);
        try {
          const { didSucceed, document } = await getSingleDocument(
            "Properties",
            propertyID
          );
          if (didSucceed) {
            setFormData({
              ...document,
            });
          } else {
            setError("Failed to fetch Property data.");
          }
        } catch (fetchError) {
          setError(`Error fetching Property data: ${fetchError.message}`);
        }
        setIsLoading(false);
      };

      fetchProperty();
    }
  }, [propertyID]);

  const slug = getSlug(formData?.name);
  //console.log("Slug", Slug);

  // Handle change for dynamic form fields
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

  // Handle image change
  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const imgPreview = URL.createObjectURL(file);
  //     setFormData({ ...formData, img: file, imgPreview });
  //   }
  // };

  // Handle property save
  // const handlePropertySave = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   setError(null);

  //   try {
  //     let imageUrl = formData.img;

  //     if (formData.img && typeof formData.img !== "string") {
  //       imageUrl = await imageUploadToFirebase(formData.img, "propertyImages");
  //     }

  //     const slug = getSlug(formData.name);

  //     const propertyData = {
  //       ...formData,
  //       img: imageUrl,
  //       slug,
  //       updatedAt: new Date(),
  //     };

  //     let result;
  //     if (propertyID) {
  //       result = await updateDocument("Properties", propertyID, propertyData);
  //     } else {
  //       propertyData.createdAt = new Date().toISOString();
  //       result = await createDocument(propertyData, "Properties");
  //     }

  //     if (result.didSucceed) {
  //       router.push("/dashboard/properties/viewProperty/[propertyID]");
  //     } else {
  //       setError("Failed to save Property.");
  //     }
  //   } catch (error) {
  //     console.error("Property save error:", error.message);
  //     setError(error.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <main>
      <div className="bg-white shadow-lg rounded-lg p-8 w-full">
        {isLoading ? (
          <div className=" psektion sektion md:grid-cols-2 respons">
            <SkeletonOne />
          </div>
        ) : (
          <section className="respons space-y-5">
            {/* top pad */}
            <div className="sektion md:grid-cols-3">
              <div className="col-span-2 relative">
                <Image
                  src={formData?.img || ""}
                  alt="Current Featured Image"
                  width={2000}
                  height={260}
                  style={{
                    maxWidth: "100%",
                    height: "340px",
                    objectFit: "cover",
                  }}
                  className=" max-w-full max-h-50 rounded-md"
                />
                <div className="absolute top-5 left-5 right-0 flex items-center justify-between mb-4">
                  <button
                    asChild
                    className="bg-pamojaprimary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                    disabled={isLoading}
                  >
                    <Link href={`/dashboard/companies/${propertyID}`}>
                      Edit Property
                    </Link>
                  </button>
                </div>
                <div className="absolute bottom-5 left-5 right-5 bg-slate-700/25 p-2 space-y-3">
                  <h1 className="text-2xl drop-shadow-lg font-bold text-center md:text-start text-white ">
                    {formData?.name}
                  </h1>
                  <p className="text-lg drop-shadow-md font-semibold text-center md:text-start text-white">
                    {formData?.slogan}
                  </p>
                </div>
              </div>

              <div className="space-y-2 content-center">
                <p className="text-sm">
                  {truncateDescription(formData?.desc, 28)}
                </p>
                <p className="text-sm">
                  <span className="font-bold">Location</span>:{" "}
                  {formData?.address || " "}
                </p>
                {/* <p className="text-sm">
                  <span className="font-bold">Rooms</span>:{" "}
                  {formData?.noRooms || ""} Rooms
                </p> */}
                <div className="flex flex-col space-y-1">
                  <h1 className="text-lg drop-shadow-md font-semibold text-center md:text-start">
                    Phone Contacts:
                  </h1>
                  <ul className="">
                    {formData?.phones?.map((contact, index) => (
                      <li className="" key={index}>
                        {contact || ""}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            {/* top pad */}

            {/* center */}
            <div className="sektion md:grid-cols-4">
              {/* Amenities */}
              {/* <div className="bg-pamojatertiary shadow-sm rounded-xs p-2">
                <h1 className="text-lg drop-shadow-md font-semibold text-center md:text-start">
                  Property Amenites
                </h1>
                <ul className="">
                  {formData?.amenities?.map((data, index) => (
                    <li
                      className="text-sm flex items-center space-x-1"
                      key={index}
                    >
                      <span> {renderIcon(data?.icon)}</span>{" "}
                      <span> {data?.value || ""}</span>
                    </li>
                  ))}
                </ul>
              </div> */}

              {/* Social Media */}
              <div className="bg-pamojatertiary shadow-sm rounded-xs p-2">
                <h1 className="text-lg drop-shadow-md font-semibold text-center md:text-start">
                  Property Departments
                </h1>
                <ul className="">
                  {formData?.departments?.map((dept, index) => (
                    <li
                      className="text-sm space-x-2 flex items-center"
                      key={index}
                    >
                      <span>
                        <FaCircle size={8} />
                      </span>{" "}
                      <span>{dept || ""}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* emails */}
              <div className="bg-pamojatertiary shadow-sm rounded-xs p-2">
                <h1 className="text-lg drop-shadow-md font-semibold text-center md:text-start">
                  Property Emails
                </h1>
                <ul className="">
                  {formData?.emails?.map((email, index) => (
                    <li
                      className="text-sm flex items-center space-x-1"
                      key={index}
                    >
                      <span>
                        <FaEnvelope />
                      </span>
                      <span> {email || ""}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Deaprtmetns */}
              <div className="bg-pamojatertiary shadow-sm rounded-xs p-2">
                <h1 className="text-lg drop-shadow-md font-semibold text-center md:text-start">
                  Social Medias
                </h1>
                <ul className="flex flex-wrap">
                  {formData?.socialMedias?.map((social, index) => (
                    <Link href={`${social.link}`} className="p-1" key={index}>
                      <span> {renderIcon(social.icon)}</span>
                    </Link>
                  ))}
                </ul>
              </div>
            </div>
            {/* centre */}

            <Separator />
            <div className="py-5">
              <h3 className="text-lg font-bold mb-3">Add Property Features:</h3>
              <div className="flex items-center space-x-3">
                <AddProductSheet propertyID={propertyID} />
                <AddServiceSheet propertyID={propertyID} />
                <AddFAQSheet propertyID={propertyID} />
                <AddExperienceSheet propertyID={propertyID} />
              </div>
            </div>
            <Separator />

            {/* image gallery upload */}
            <div className="py-5">
              <h3 className="text-lg font-bold mb-3">Image Gallery Upload:</h3>
              <UploadImagesCloudinaryForm slug={slug} />
            </div>
            {/* image gallery upload */}

            {/* bottom pad */}
            <DataTabs propertyID={propertyID} data={formData} />
            {/* bottom pads */}
          </section>
        )}
      </div>
    </main>
  );
}

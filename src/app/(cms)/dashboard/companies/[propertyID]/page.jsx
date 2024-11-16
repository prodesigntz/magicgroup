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
import { getSlug } from "@/lib/utils";
import Image from "next/image";
import { AddHoldStateCard } from "@/components/accomodation/addHoldStateCard";
import { AddHoldStateWithIconCard } from "@/components/accomodation/AddHoldStateWithIconCard";
import { iconOptions } from "@/data/iconOptions";

export default function AddProperty({ params }) {
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
    address: "",
    destination: "",
    ///noRooms: "",
    rooms: [
      {
        name: "",
        price: "",
        desc: "",
        img: null,
        imgPreview: null,
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

  // temporary satte
  const [newEmail, setNewEmail] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newDepartment, setNewDepartment] = useState("");
  const [socialMediaInput, setSocialMediaInput] = useState("");
  //const [amenitiesInput, setAmenitiesInput] = useState("");

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
           // console.log("Fetched data", document);
            setFormData({ ...formData, ...document });
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

  // Handle change for dynamic form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imgPreview = URL.createObjectURL(file);
      setFormData({ ...formData, img: file, imgPreview });
    }
  };

  // Handle property save
  const handlePropertySave = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      let imageUrl = formData.img;

      if (formData.img && typeof formData.img !== "string") {
        imageUrl = await imageUploadToFirebase(formData.img, "propertyImages");
      }

      const slug = getSlug(formData.name);

      const propertyData = {
        ...formData,
        img: imageUrl,
        slug,
        updatedAt: new Date(),
      };

      let result;
      if (propertyID) {
        result = await updateDocument("Properties", propertyID, propertyData);
      } else {
        propertyData.createdAt = new Date();
        result = await createDocument(propertyData, "Properties");
      }

      if (result.didSucceed) {
        router.push("/dashboard/companies");
      } else {
        setError("Failed to save Property.");
      }
    } catch (error) {
      console.error("Property save error:", error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      <div className="bg-white shadow-lg rounded-lg p-8 w-full">
        <h1 className="text-2xl font-bold text-center text-slate-700 mb-6">
          {propertyID ? "Update Property" : "Create a Property"}
        </h1>
        <form onSubmit={handlePropertySave} className="space-y-5">
          {/* Add form fields for name, description, and other fields similarly */}
          <div className="bg-pamojatertiary shadow-sm rounded-xs p-5">
            <div className="sektion md:grid-cols-4">
              <div className="col-span-2 mb-4">
                <label
                  className="block text-slate-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Property Name
                </label>
                <input
                  className="shadow bg-white appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="Enter Property Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-slate-700 text-sm font-bold mb-2"
                  htmlFor="norooms"
                >
                  Property Location
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="location"
                  type="text"
                  placeholder="Enter Location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* <div className="mb-4">
                <label
                  className="block text-slate-700 text-sm font-bold mb-2"
                  htmlFor="norooms"
                >
                  No. Property Rooms
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="noRooms"
                  type="number"
                  placeholder="Enter No. Rooms"
                  name="noRooms"
                  value={formData.noRooms}
                  onChange={handleChange}
                  required
                />
              </div> */}
            </div>
          </div>

          <div className="bg-pamojatertiary shadow-sm rounded-xs p-5">
            <div className="sektion md:grid-cols-4">
              <AddHoldStateCard
                title="Property Emails"
                name="emails"
                valueState={newEmail}
                onChangeState={setNewEmail}
                formData={formData}
                setFormData={setFormData}
                field="emails"
                type="email" // Input type
              />
              <AddHoldStateCard
                title="Property Phone"
                name="phones"
                valueState={newPhone}
                onChangeState={setNewPhone}
                formData={formData}
                setFormData={setFormData}
                field="phones"
                type="number" // Input type
              />
              <AddHoldStateCard
                title="Propery Departments"
                name="departments"
                valueState={newDepartment}
                onChangeState={setNewDepartment}
                formData={formData}
                setFormData={setFormData}
                field="departments"
                type="text" // Input type
              />
            </div>
          </div>

          <div className="bg-pamojatertiary shadow-sm rounded-xs p-5">
            <div className="sektion md:grid-cols-6">
              <div className="col-span-2">
                <AddHoldStateWithIconCard
                  title="Social Media"
                  name="socialMedias"
                  valueState={socialMediaInput}
                  onChangeState={setSocialMediaInput}
                  formData={formData}
                  setFormData={setFormData}
                  field="socialMedias"
                  type="text" // Input type
                  iconOptions={iconOptions} // Pass the icon options here
                />
              </div>
              {/* <div className="col-span-2">
                <AddHoldStateWithIconCard
                  title="Property Amenities"
                  name="amenities"
                  valueState={amenitiesInput}
                  onChangeState={setAmenitiesInput}
                  formData={formData}
                  setFormData={setFormData}
                  field="amenities"
                  type="text" // Input type
                  iconOptions={iconOptions} // Pass the icon options here
                />
              </div> */}
              <div className="col-span-2"></div>
              {/* <div className="col-span-2 mb-4">
                <label
                  className="block text-slate-700 text-sm font-bold mb-2"
                  htmlFor="icons"
                >
                  Property Amenities
                </label>
                <div className="flex item-center space-x-1 shadow appearance-none border rounded  py-1 px-1 text-slate-700 leading-tight focus:outline-none focus:shadow-outline">
                  <select name="icons" id="icons">
                    <option value="wifi">Wifi</option>
                    <option value="instagram">Swimming Pool</option>
                    <option value="trip-advisor">Bed & Breakfst</option>
                    <option value="safari-booking">Massage</option>
                  </select>
                  <input
                    className="w-full appearance-none bg-slate-200 py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline rounded"
                    id="amenities"
                    type="text"
                    placeholder="Enter Property Amenities"
                    name="amenities"
                    value={formData.amenities}
                    onChange={handleChange}
                    required
                  />
                  <button className="bg-pamojaprimary hover:bg-pamojaaccent hover:text-pamojadark text-white font-bold py-2 px-4 rounded">
                    <FaPlus />
                  </button>
                </div>
              </div> */}
            </div>
          </div>

          <div className="sektion md:grid-cols-3 bg-pamojatertiary">
            <div className="mb-4  shadow-sm rounded-xs p-5">
              <label
                className="block text-slate-700 text-sm font-bold mb-2"
                htmlFor="slogan"
              >
                Property Slogan
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline"
                id="slogan"
                type="text"
                placeholder="Enter Property Slogan"
                name="slogan"
                value={formData.slogan}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4  shadow-sm rounded-xs p-5">
              <label
                className="block text-slate-700 text-sm font-bold mb-2"
                htmlFor="slogan"
              >
                Property Address
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline"
                id="address"
                type="text"
                placeholder="Enter Property Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="mb-4 bg-pamojatertiary shadow-sm rounded-xs p-5">
            <label
              className="block text-slate-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Property Description
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline"
              id="desc"
              type="text"
              placeholder="Enter Property Name"
              name="desc"
              value={formData.desc}
              onChange={handleChange}
              required
            />
          </div>

          {/* Single Image Upload*/}
          <div className="mb-4 bg-pamojatertiary shadow-sm rounded-xs p-5">
            <label
              className="block text-slate-700 text-sm font-bold mb-2"
              htmlFor="img"
            >
              Property Featured Image
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline"
              id="img"
              type="file"
              onChange={handleImageChange}
            />
            {formData.imgPreview && (
              <div className="mt-2">
                <Image
                  src={formData.imgPreview}
                  alt="Current Featured Image"
                  width={280}
                  height={260}
                  style={{
                    maxWidth: "100%",
                    height: "160px",
                    objectFit: "cover",
                  }}
                  className=" max-w-full max-h-50 rounded-md"
                />
              </div>
            )}
          </div>

          {/* Continue adding other input fields like price, desc, etc. */}
          {/* Add logic for handling dynamic fields like phones, rooms, etc. */}
          {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
          <div className="flex items-center justify-between mb-4">
            <button
              className="bg-pamojaprimary text-pamojasecondary font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={isLoading}
            >
              {isLoading
                ? propertyID
                  ? "Updating Property..."
                  : "Creating Property..."
                : propertyID
                ? "Update Property"
                : "Create Property"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

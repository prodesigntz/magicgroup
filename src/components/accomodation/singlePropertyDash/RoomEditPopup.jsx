"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { updateDocumentArray } from "@/firebase/databaseOperations";
import { useAppContext } from "@/context/AppContext";

export default function RoomEditPopup({ propertyID, existingRoom = null }) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    desc: "",
    img: null,
    imgPreview: null,
    capacity: "",
    beds: "",
    available: "",
    facilities: "",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { authUser } = useAppContext();

  // Load existing room data if editing
  useEffect(() => {
    if (existingRoom) {
      setFormData({
        name: existingRoom.name,
        price: existingRoom.price,
        desc: existingRoom.desc,
        img: existingRoom.img,
        imgPreview: existingRoom.img || null,
        capacity: existingRoom.capacity,
        beds: existingRoom.beds,
        available: existingRoom.available,
        facilities: existingRoom.facilities.join(", "),
      });
    }
  }, [existingRoom]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imgPreview = URL.createObjectURL(file);
      setFormData({ ...formData, img: file, imgPreview });
    }
  };

  // Save Product
  const handleRoomSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Here, you would upload the image if it's a new one and not just a string URL
      let imageUrl = formData.img;
      if (formData.img && typeof formData.img !== "string") {
        imageUrl = await imageUploadToFirebase(formData.img, "roomImages");
      }

      const newRoom = {
        name: formData.name,
        price: formData.price,
        desc: formData.desc,
        img: imageUrl,
        capacity: formData.capacity,
        beds: formData.beds,
        available: formData.available,
        facilities: formData.facilities.split(",").map((item) => item.trim()),
      };

      // Update Product array using the method
      const result = await updateDocumentArray(
        "Properties",
        propertyID,
        "products",
        newRoom
      );

      if (result.didSucceed) {
        setFormData({
          name: "",
          price: "",
          desc: "",
          img: null,
          imgPreview: null,
          capacity: "",
          beds: "",
          available: "",
          facilities: "",
        });
      } else {
        setError("Failed to save Product data.");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          {existingRoom ? "Edit Product" : "Add New Product"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>{existingRoom ? "Edit Product" : "Add New Product"}</DialogTitle>
        <form onSubmit={handleRoomSave}>
          <div className="mb-4">
            <Input
              label="Product Name"
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <Input
              label="Price"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <Textarea
              label="Product Description"
              name="desc"
              placeholder="Product Description"
              value={formData.desc}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <Input
              label="Capacity"
              name="capacity"
              placeholder="Product Capacity"
              value={formData.capacity}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <Input
              label="Beds"
              name="beds"
              placeholder="Number of Beds"
              value={formData.beds}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <Input
              label="Available"
              name="available"
              placeholder="Available"
              value={formData.available}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <Input
              label="Facilities"
              name="facilities"
              placeholder="Separate with commas"
              value={formData.facilities}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <Input
              type="file"
              label="Product Image"
              name="img"
              onChange={handleImageChange}
            />
            {formData.imgPreview && (
              <div className="mt-2">
                <img
                  src={formData.imgPreview}
                  alt="Product Image"
                  width={150}
                  height={100}
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading
                ? existingRoom
                  ? "Updating..."
                  : "Saving..."
                : "Save Product"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

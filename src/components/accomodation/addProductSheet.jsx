import React, { useState, useEffect } from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { updateDocumentArray } from "@/firebase/databaseOperations"; // Firebase function for updating documents
import { imageUploadToFirebase } from "@/firebase/fileOperations"; // Helper function for image upload
import { useRouter } from "next/navigation";

export const AddProductSheet = ({ propertyID, room = null, title = "Product" }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false); // State for managing sheet visibility

  // Initial room data state, use existing room data if editing
  const [roomData, setRoomData] = useState({
    name: room?.name || "",
    price: room?.price || "",
    desc: room?.desc || "",
    available: room?.available || "",
    img: null, // Image files for upload
    imgPreview: room?.img || [], // Array of image previews, use existing if editing
  });

  // Update state on input change
  const handleRoomChange = (e) => {
    const { name, value } = e.target;
    setRoomData((prevData) => ({ ...prevData, [name]: value }));
  };


  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to array
    const previewImages = files.map((file) => URL.createObjectURL(file)); // Create previews for each image
    setRoomData({
      ...roomData,
      img: files, // Store selected files
      imgPreview:
        previewImages.length > 0 ? previewImages : roomData.imgPreview, // Use new preview if available
    });
  };

  const handleRoomSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    handleSave();
  };

  // Save or update room data
  const handleSave = async () => {
    try {
      let uploadedImgUrls = roomData.imgPreview; // Use existing images if not updating
      if (roomData.img && roomData.img.length > 0) {
        // Upload each image and store the URLs
        uploadedImgUrls = await Promise.all(
          roomData.img.map(async (image) => {
            const imageUrl = await imageUploadToFirebase(image, "rooms");
            return imageUrl;
          })
        );
      }

      // Create or update room data
      const roomDataWithImages = {
        name: roomData.name,
        price: roomData.price,
        desc: roomData.desc,
        available: roomData.available,
        img: uploadedImgUrls,
        createdAt: room ? room.createdAt : new Date(), // Keep original createdAt if editing
      };

      // Save room data to Firestore
      if (propertyID) {
        await updateDocumentArray(
          "Properties",
          propertyID,
          "products",
          roomDataWithImages,
          room ? room.name : null // Use room name to update specific room if editing
        );
        console.log("Room and images saved successfully");
        setIsOpen(false); // Close the sheet after saving
        router.push(`/dashboard/companies/viewProperty/${propertyID}`);
      } else {
        console.error("Company ID is required to add or update a product");
      }
    } catch (error) {
      console.error("Error saving room and uploading images:", error);
    }
  };

  // Populate form fields with room data when editing
  useEffect(() => {
    if (room) {
      setRoomData({
        name: room.name,
        price: room.price,
        desc: room.desc,
        available: room.available,
        imgPreview: room.img, // Existing images when editing
      });
    }
  }, [room]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <button
          type="button"
          className="bg-pamojaprimary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {room ? `Edit ${title}` : `Add ${title}`} {/* Display Add/Edit */}
        </button>
      </SheetTrigger>

      <SheetContent side="bottom">
        <div className="p-5 respons space-y-5 overflow-y-scroll">
          <SheetHeader>
            <SheetTitle className="text-center">
              {room ? `Edit ${title}` : `Add ${title}`}
            </SheetTitle>
            <SheetDescription>Please fill in the room details</SheetDescription>
          </SheetHeader>
          <form onSubmit={handleRoomSubmit} className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              {/* Room Name */}
              <div>
                <label htmlFor="name">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={roomData.name}
                  onChange={handleRoomChange}
                  placeholder="Enter room name"
                  required
                  className="w-full px-4 py-2 border"
                />
              </div>

              {/* Room Price */}
              <div>
                <label htmlFor="price">Price </label>
                <input
                  type="number"
                  name="price"
                  value={roomData.price}
                  onChange={handleRoomChange}
                  placeholder="Enter  price"
                  required
                  className="w-full px-4 py-2 border"
                />
              </div>

              {/* Room Price */}
              <div>
                <label htmlFor="available">Available</label>
                <input
                  type="number"
                  name="available"
                  value={roomData.available}
                  onChange={handleRoomChange}
                  placeholder="Enter number of available "
                  className="w-full px-4 py-2 border"
                />
              </div>
            </div>

            {/* Room Description */}
            <div>
              <label htmlFor="desc">Description</label>
              <textarea
                name="desc"
                value={roomData.desc}
                onChange={handleRoomChange}
                placeholder="Enter description"
                className="w-full px-4 py-2 border"
              />
            </div>


            {/* Image Upload */}
            <div>
              <label htmlFor="img">Upload Images</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                multiple
                className="w-full px-4 py-2 border"
              />
              {roomData.imgPreview.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {roomData.imgPreview.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt="Preview"
                      className="w-full h-32 object-cover"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-pamojaprimary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {room ? "Update Product" : "Add Product"}
              </button>
            </div>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
};

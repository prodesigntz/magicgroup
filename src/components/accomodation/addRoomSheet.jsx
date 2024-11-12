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

export const AddRoomSheet = ({ propertyID, room = null, title = "Room" }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false); // State for managing sheet visibility

  // Initial room data state, use existing room data if editing
  const [roomData, setRoomData] = useState({
    name: room?.name || "",
    price: room?.price || "",
    desc: room?.desc || "",
    capacity: room?.capacity || "",
    beds: room?.beds || "",
    available: room?.available || "",
    facilities: room?.facilities || [], // Array for room facilities
    img: null, // Image files for upload
    imgPreview: room?.img || [], // Array of image previews, use existing if editing
  });

  // Update state on input change
  const handleRoomChange = (e) => {
    const { name, value } = e.target;
    setRoomData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFacilityChange = (index, value) => {
    const updatedFacilities = [...roomData.facilities];
    updatedFacilities[index] = value;
    setRoomData({ ...roomData, facilities: updatedFacilities });
  };

  const handleAddFacility = () => {
    setRoomData({
      ...roomData,
      facilities: [...roomData.facilities, ""],
    });
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
        capacity: roomData.capacity,
        beds: roomData.beds,
        available: roomData.available,
        facilities: roomData.facilities,
        img: uploadedImgUrls,
        createdAt: room ? room.createdAt : new Date(), // Keep original createdAt if editing
      };

      // Save room data to Firestore
      if (propertyID) {
        await updateDocumentArray(
          "Properties",
          propertyID,
          "rooms",
          roomDataWithImages,
          room ? room.name : null // Use room name to update specific room if editing
        );
        console.log("Room and images saved successfully");
        setIsOpen(false); // Close the sheet after saving
        router.push(`/dashboard/properties/viewProperty/${propertyID}`);
      } else {
        console.error("Property ID is required to add or update a room");
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
        capacity: room.capacity,
        beds: room.beds,
        available: room.available,
        facilities: room.facilities,
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
            <div className="grid md:grid-cols-2 gap-4">
              {/* Room Name */}
              <div>
                <label htmlFor="name">Room Name</label>
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
                <label htmlFor="price">Price (USD)</label>
                <input
                  type="number"
                  name="price"
                  value={roomData.price}
                  onChange={handleRoomChange}
                  placeholder="Enter room price"
                  required
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
                placeholder="Enter room description"
                className="w-full px-4 py-2 border"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {/* Room Capacity */}
              <div>
                <label htmlFor="capacity">Capacity</label>
                <input
                  type="number"
                  name="capacity"
                  value={roomData.capacity}
                  onChange={handleRoomChange}
                  placeholder="Enter room capacity"
                  className="w-full px-4 py-2 border"
                />
              </div>

              {/* Number of Beds */}
              <div>
                <label htmlFor="beds">Beds</label>
                <input
                  type="number"
                  name="beds"
                  value={roomData.beds}
                  onChange={handleRoomChange}
                  placeholder="Enter number of beds"
                  className="w-full px-4 py-2 border"
                />
              </div>

              {/* Room Availability */}
              <div>
                <label htmlFor="available">Available</label>
                <input
                  type="number"
                  name="available"
                  value={roomData.available}
                  onChange={handleRoomChange}
                  placeholder="Enter number of available rooms"
                  className="w-full px-4 py-2 border"
                />
              </div>
            </div>

            {/* Facilities */}
            <div>
              <label>Facilities</label>
              {roomData.facilities.map((facility, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={facility}
                    onChange={(e) =>
                      handleFacilityChange(index, e.target.value)
                    }
                    placeholder="Enter facility"
                    className="w-full px-4 py-2 border"
                  />
                  {index === roomData.facilities.length - 1 && (
                    <button
                      type="button"
                      onClick={handleAddFacility}
                      className="bg-pamojaprimary text-white font-bold py-2 px-4 rounded"
                    >
                      Add
                    </button>
                  )}
                </div>
              ))}
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
                {room ? "Update Room" : "Add Room"}
              </button>
            </div>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
};

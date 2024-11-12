import React, { useState } from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  updateDocumentArray,
  updateDocumentArrayOrg,
} from "@/firebase/databaseOperations"; // Firebase function for updating documents
import { imageUploadToFirebase } from "@/firebase/fileOperations"; // Import helper function

export const AddExperienceSheet = ({ propertyID, title = "Experience" }) => {
  const [isOpen, setIsOpen] = useState(false); // Manage sheet visibility
  const [experiences, setExperiences] = useState([
    { img: null, imgPreview: null, title: "", subTitle: "", desc: "" },
  ]);

  // Handle changes for text inputs (title, subTitle, desc)
  const handleExperienceChange = (index, e) => {
    const { name, value } = e.target;
    const updatedExperiences = [...experiences];
    updatedExperiences[index] = { ...updatedExperiences[index], [name]: value };
    setExperiences(updatedExperiences);
  };

  // Handle image uploads and preview
  const handleImageUpload = (index, e) => {
    const file = e.target.files[0]; // Only one image per experience
    if (file) {
      const updatedExperiences = [...experiences];
      updatedExperiences[index] = {
        ...updatedExperiences[index],
        img: file,
        imgPreview: URL.createObjectURL(file), // Create a preview URL for the image
      };
      setExperiences(updatedExperiences);
    }
  };

  // Add a new experience
  const handleAddExperience = () => {
    setExperiences([
      ...experiences,
      { img: null, imgPreview: null, title: "", subTitle: "", desc: "" },
    ]);
  };

  // Remove a experience
  const handleRemoveExperience = (index) => {
    const updatedExperiences = experiences.filter((_, i) => i !== index);
    setExperiences(updatedExperiences);
  };

  const handleExperienceSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    handleSave();
  };

  // Save the experiences to Firestore
  const handleSave = async () => {
    try {
      // Upload all images and store the URLs
      const uploadedImgUrls = await Promise.all(
        experiences.map(async (experience) => {
          if (experience.img) {
            const imageUrl = await imageUploadToFirebase(
              experience.img,
              "experiences"
            );
            return { ...experience, img: imageUrl }; // Return the experience object with the uploaded image URL
          }
          return experience;
        })
      );

      // Save experiences to Firestore
      if (propertyID) {
        const updateData = {
          experiences: uploadedImgUrls, // Store the updated experiences with image URLs
        };
        await updateDocumentArrayOrg("Properties", propertyID, updateData);
        console.log("experiences saved successfully");
        setIsOpen(false); // Close the sheet after saving
      } else {
        console.error("Property ID is required to add experiences");
      }
    } catch (error) {
      console.error("Error saving experiences:", error);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          onClick={() => setIsOpen(true)} // Open sheet when button is clicked
          className="bg-pamojaprimary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {title}
        </button>
      </SheetTrigger>

      <SheetContent side="bottom">
        <div className="p-5 respons space-y-5 overflow-y-scroll">
          <SheetHeader>
            <SheetTitle className="text-center">
              {propertyID ? `Edit ${title}` : `Add ${title}`}
            </SheetTitle>
            <SheetDescription>
              Please fill in the experience details
            </SheetDescription>
          </SheetHeader>
          <form onSubmit={handleExperienceSubmit} className="space-y-4">
            {experiences.map((experience, index) => (
              <div key={index} className="space-y-4 bg-pamojaaccent p-5">
                {/* Title */}
                <div>
                  <label htmlFor={`title-${index}`}>Title</label>
                  <input
                    type="text"
                    name="title"
                    value={experience.title}
                    onChange={(e) => handleExperienceChange(index, e)}
                    placeholder="Enter experience title"
                    required
                    className="w-full px-4 py-2 border"
                  />
                </div>

                {/* Subtitle */}
                <div>
                  <label htmlFor={`subTitle-${index}`}>Subtitle</label>
                  <input
                    type="text"
                    name="subTitle"
                    value={experience.subTitle}
                    onChange={(e) => handleExperienceChange(index, e)}
                    placeholder="Enter experience subtitle"
                    className="w-full px-4 py-2 border"
                  />
                </div>

                {/* Description */}
                <div>
                  <label htmlFor={`desc-${index}`}>Description</label>
                  <textarea
                    name="desc"
                    value={experience.desc}
                    onChange={(e) => handleExperienceChange(index, e)}
                    placeholder="Enter experience description"
                    className="w-full px-4 py-2 border"
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label htmlFor={`img-${index}`}>Upload experience Image</label>
                  <input
                    type="file"
                    onChange={(e) => handleImageUpload(index, e)}
                    className="w-full px-4 py-2"
                  />
                  {experience.imgPreview && (
                    <img
                      src={experience.imgPreview}
                      alt="experience Preview"
                      className="h-24 w-24 object-cover mt-2"
                    />
                  )}
                </div>

                {/* Remove experience Button */}
                <button
                  type="button"
                  onClick={() => handleRemoveExperience(index)}
                  className="text-red-500"
                >
                  Remove experience
                </button>
              </div>
            ))}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={handleAddExperience}
                className="bg-pamojaprimary text-white font-bold py-2 px-4 rounded"
              >
                Add Another experience
              </button>

              <button
                type="submit"
                className="bg-pamojaprimary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Save experiences
              </button>
            </div>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
};

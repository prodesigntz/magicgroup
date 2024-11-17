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

export const AddServiceSheet = ({ propertyID, title = "Service" }) => {
  const [isOpen, setIsOpen] = useState(false); // Manage sheet visibility
  const [highlights, setHighlights] = useState([
    { img: null, imgPreview: null, title: "", subTitle: "", desc: "" },
  ]);

  // Handle changes for text inputs (title, subTitle, desc)
  const handleHighlightChange = (index, e) => {
    const { name, value } = e.target;
    const updatedHighlights = [...highlights];
    updatedHighlights[index] = { ...updatedHighlights[index], [name]: value };
    setHighlights(updatedHighlights);
  };

  // Handle image uploads and preview
  const handleImageUpload = (index, e) => {
    const file = e.target.files[0]; // Only one image per highlight
    if (file) {
      const updatedHighlights = [...highlights];
      updatedHighlights[index] = {
        ...updatedHighlights[index],
        img: file,
        imgPreview: URL.createObjectURL(file), // Create a preview URL for the image
      };
      setHighlights(updatedHighlights);
    }
  };

  // Add a new highlight
  const handleAddHighlight = () => {
    setHighlights([
      ...highlights,
      { img: null, imgPreview: null, title: "", subTitle: "", desc: "" },
    ]);
  };

  // Remove a highlight
  const handleRemoveHighlight = (index) => {
    const updatedHighlights = highlights.filter((_, i) => i !== index);
    setHighlights(updatedHighlights);
  };

  const handleHighlightSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    handleSave();
  };

  // Save the highlights to Firestore
  const handleSave = async () => {
    try {
      // Upload all images and store the URLs
      const uploadedImgUrls = await Promise.all(
        highlights.map(async (highlight) => {
          if (highlight.img) {
            const imageUrl = await imageUploadToFirebase(
              highlight.img,
              "highlights"
            );
            return { ...highlight, img: imageUrl }; // Return the highlight object with the uploaded image URL
          }
          return highlight;
        })
      );

      // Save highlights to Firestore
      if (propertyID) {
        const updateData = {
          highlights: uploadedImgUrls, // Store the updated highlights with image URLs
        };
        await updateDocumentArrayOrg("Properties", propertyID, updateData);
        console.log("Highlights saved successfully");
        setIsOpen(false); // Close the sheet after saving
      } else {
        console.error("Property ID is required to add highlights");
      }
    } catch (error) {
      console.error("Error saving highlights:", error);
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
              Please fill in the highlight details
            </SheetDescription>
          </SheetHeader>
          <form onSubmit={handleHighlightSubmit} className="space-y-4">
            {highlights.map((highlight, index) => (
              <div key={index} className="space-y-4 bg-pamojaaccent p-5">
                {/* Title */}
                <div>
                  <label htmlFor={`title-${index}`}>Title</label>
                  <input
                    type="text"
                    name="title"
                    value={highlight.title}
                    onChange={(e) => handleHighlightChange(index, e)}
                    placeholder="Enter highlight title"
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
                    value={highlight.subTitle}
                    onChange={(e) => handleHighlightChange(index, e)}
                    placeholder="Enter highlight subtitle"
                    className="w-full px-4 py-2 border"
                  />
                </div>

                {/* Description */}
                <div>
                  <label htmlFor={`desc-${index}`}>Description</label>
                  <textarea
                    name="desc"
                    value={highlight.desc}
                    onChange={(e) => handleHighlightChange(index, e)}
                    placeholder="Enter highlight description"
                    className="w-full px-4 py-2 border"
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label htmlFor={`img-${index}`}>Upload Highlight Image</label>
                  <input
                    type="file"
                    onChange={(e) => handleImageUpload(index, e)}
                    className="w-full px-4 py-2"
                  />
                  {highlight.imgPreview && (
                    <img
                      src={highlight.imgPreview}
                      alt="Highlight Preview"
                      className="h-24 w-24 object-cover mt-2"
                    />
                  )}
                </div>

                {/* Remove Highlight Button */}
                <button
                  type="button"
                  onClick={() => handleRemoveHighlight(index)}
                  className="text-red-500"
                >
                  Remove Highlight
                </button>
              </div>
            ))}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={handleAddHighlight}
                className="bg-pamojaprimary text-white font-bold py-2 px-4 rounded"
              >
                Add Another Highlight
              </button>

              <button
                type="submit"
                className="bg-pamojaprimary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Save Highlights
              </button>
            </div>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
};

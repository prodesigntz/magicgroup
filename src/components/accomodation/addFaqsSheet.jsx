import React, { useState } from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { updateDocumentArrayOrg } from "@/firebase/databaseOperations"; // Firebase function for updating documents

export const AddFAQSheet = ({ propertyID, title = "FAQ" }) => {
  const [isOpen, setIsOpen] = useState(false); // Manage sheet visibility
  const [faqs, setFaqs] = useState([{ title: "", desc: "" }]); // Initialize FAQs

  // Handle changes for text inputs (title, desc)
  const handleFAQChange = (index, e) => {
    const { name, value } = e.target;
    const updatedFaqs = [...faqs];
    updatedFaqs[index] = { ...updatedFaqs[index], [name]: value };
    setFaqs(updatedFaqs);
  };

  // Add a new FAQ
  const handleAddFAQ = () => {
    setFaqs([...faqs, { title: "", desc: "" }]); // Add new FAQ entry
  };

  // Remove an FAQ
  const handleRemoveFAQ = (index) => {
    const updatedFaqs = faqs.filter((_, i) => i !== index); // Remove the FAQ at the specified index
    setFaqs(updatedFaqs);
  };

  const handleFAQSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    handleSave();
  };

  // Save the FAQs to Firestore
  const handleSave = async () => {
    try {
      if (propertyID) {
        const updateData = {
          faq: faqs, // Store the updated FAQs
        };
        await updateDocumentArrayOrg("Properties", propertyID, updateData);
        console.log("FAQs saved successfully");
        setIsOpen(false); // Close the sheet after saving
      } else {
        console.error("Property ID is required to add FAQs");
      }
    } catch (error) {
      console.error("Error saving FAQs:", error);
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
            <SheetDescription>Please fill in the FAQ details</SheetDescription>
          </SheetHeader>
          <form onSubmit={handleFAQSubmit} className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="space-y-4 bg-pamojaaccent p-5">
                {/* Title */}
                <div>
                  <label htmlFor={`faq-title-${index}`}>Question</label>
                  <input
                    type="text"
                    name="title"
                    value={faq.title}
                    onChange={(e) => handleFAQChange(index, e)}
                    placeholder="Enter FAQ question"
                    required
                    className="w-full px-4 py-2 border"
                  />
                </div>

                {/* Description */}
                <div>
                  <label htmlFor={`faq-desc-${index}`}>Answer</label>
                  <textarea
                    name="desc"
                    value={faq.desc}
                    onChange={(e) => handleFAQChange(index, e)}
                    placeholder="Enter FAQ answer"
                    className="w-full px-4 py-2 border"
                  />
                </div>

                {/* Remove FAQ Button */}
                <button
                  type="button"
                  onClick={() => handleRemoveFAQ(index)} // Remove the FAQ on button click
                  className="bg-red-500 text-white font-bold py-1 px-3 rounded"
                >
                  Remove FAQ
                </button>
              </div>
            ))}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={handleAddFAQ}
                className="bg-pamojaprimary text-white font-bold py-2 px-4 rounded"
              >
                Add Another FAQ
              </button>

              <button
                type="submit"
                className="bg-pamojaprimary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Save FAQs
              </button>
            </div>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
};

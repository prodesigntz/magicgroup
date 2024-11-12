"use client"; // Required for client-side code in the App Router
import Image from "next/image";
import { useState } from "react";
import { FaMinus } from "react-icons/fa6";

export default function UploadImagesCloudinaryForm({ slug }) {
  const [files, setFiles] = useState([]);
  const [folder, setFolder] = useState(`${slug}`);
  const [descriptions, setDescriptions] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previews, setPreviews] = useState([]);

  // Handle file selection and generate previews
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);

    const filePreviews = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviews((prevPreviews) => [...prevPreviews, ...filePreviews]);

    // Initialize descriptions for new files
    const newDescriptions = Array(selectedFiles.length).fill("");
    setDescriptions((prevDescriptions) => [
      ...prevDescriptions,
      ...newDescriptions,
    ]);
  };

  const handleRemovePreview = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setPreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
    setDescriptions((prevDescriptions) =>
      prevDescriptions.filter((_, i) => i !== index)
    );
  };

  const handleRemoveAllPreviews = () => {
    setFiles([]);
    setPreviews([]);
    setDescriptions([]);
  };

  const handleDescriptionChange = (index, value) => {
    const updatedDescriptions = [...descriptions];
    updatedDescriptions[index] = value;
    setDescriptions(updatedDescriptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (files.length === 0) {
      setError("Please select at least one file.");
      return;
    }

    const formData = new FormData();
    formData.append("folder", folder);

    files.forEach((file) => {
      formData.append("files", file);
    });

    // Add descriptions for each file
    files.forEach((file, index) => {
      formData.append(`context[custom][description]`, descriptions[index]); // Store descriptions in context
    });

    setIsLoading(true);
    try {
      const res = await fetch("/api/uploadImages", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      setIsLoading(false);

      if (data.success) {
        console.log("Files uploaded successfully:", data.results);
        handleRemoveAllPreviews();
      } else {
        console.error("Upload error:", data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="bg-pamojaaccent flex flex-col space-y-5 p-5 border border-pamojaprimary"
      >
        {error && <p className="text-red-500">{error}</p>}
        <div className="sektion md:grid-cols-3">
          <div>
            <label
              className="block text-slate-700 text-sm font-bold mb-2"
              htmlFor="file"
            >
              Select Images to Upload
            </label>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="shadow bg-white appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label
              className="block text-slate-700 text-sm font-bold mb-2"
              htmlFor="folder"
            >
              Gallery Folder
            </label>
            <input
              disabled
              type="text"
              value={folder}
              onChange={(e) => setFolder(e.target.value)}
              placeholder="Folder name"
              className="shadow bg-white appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label
              className="block text-slate-700 text-sm font-bold mb-2"
              htmlFor="file"
            >
              Upload to Gallery
            </label>
            <button
              type="submit"
              className="bg-pamojaprimary text-white font-bold py-2 px-4 rounded"
              disabled={isLoading}
            >
              {isLoading ? "Uploading..." : "Upload"}
            </button>
            <button
              type="button"
              onClick={handleRemoveAllPreviews}
              className="bg-red-600 text-white font-bold py-2 px-4 rounded ml-2"
            >
              Remove All
            </button>
          </div>
        </div>
      </form>

      {/* Display image previews */}
      {previews.length > 0 && (
        <div className="mt-5">
          <h3 className="text-lg font-bold mb-3">Image Previews:</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
            {previews.map((preview, index) => (
              <div key={index} className="relative">
                <Image
                  src={preview}
                  alt={`Selected file ${index + 1}`}
                  width={1000}
                  height={200}
                  className="w-full h-40 object-cover rounded-lg shadow-md"
                />
                <textarea
                  placeholder="Enter description"
                  value={descriptions[index]}
                  onChange={(e) =>
                    handleDescriptionChange(index, e.target.value)
                  }
                  className="mt-2 w-full border rounded p-2"
                />
                <button
                  onClick={() => handleRemovePreview(index)}
                  className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2 h-8 w-8 text-sm"
                >
                  <FaMinus />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

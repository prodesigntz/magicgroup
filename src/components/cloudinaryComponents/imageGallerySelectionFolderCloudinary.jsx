"use client";
import { CldImage } from "next-cloudinary";
import { useState, useEffect } from "react";

export default function ImageGallerySelectionFolderCloudinary() {
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch folders on component mount
  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const res = await fetch("/api/fetchFolders");
        const data = await res.json();

        if (data.success) {
          setFolders(data.folders); // Assuming API returns folders as objects
        } else {
          setError(data.error || "Failed to load folders.");
        }
      } catch (error) {
        setError("Error fetching folders.");
      }
    };

    fetchFolders();
  }, []);

  // Fetch images when a folder is selected
  useEffect(() => {
    if (selectedFolder) {
      const fetchImages = async () => {
        setLoading(true);
        setError(null);
        try {
          const res = await fetch(`/api/fetchImages?folder=${selectedFolder}`);
          const data = await res.json();

          if (data.success) {
            setImages(data.images);
          } else {
            setError(data.error || "Failed to load images.");
          }
        } catch (error) {
          console.error("Error fetching images:", error);
          setError("Failed to load images.");
        } finally {
          setLoading(false);
        }
      };

      fetchImages();
    }
  }, [selectedFolder]);

  return (
    <div>
      {/* Dropdown to select folder */}
      {folders.length > 0 ? (
        <div className="mb-4">
          <label htmlFor="folder-select" className="block mb-2 font-semibold">
            Select Folder:
          </label>
          <select
            id="folder-select"
            value={selectedFolder}
            onChange={(e) => setSelectedFolder(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">Select a folder</option>
            {folders.map((folder) => (
              <option key={folder.path} value={folder.path}>
                {folder.name}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <p>Loading folders...</p>
      )}

      {/* Display images */}
      {loading ? (
        <p>Loading images...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : images.length === 0 ? (
        <p className="text-center font-bold">No images found in this folder.</p>
      ) : (
        <div className="image-gallery grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image) => (
            <CldImage
              key={image.public_id}
              src={image.public_id}
              alt={image.public_id}
              width="500"
              height="500"
              crop="fill"
              gravity="auto"
              className="rounded shadow-lg"
            />
          ))}
        </div>
      )}
    </div>
  );
}

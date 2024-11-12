"use client";
import { CldImage } from "next-cloudinary";
import { useState, useEffect } from "react";

export default function PropertyImageGalleryCloudinary({ slug }) {
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(`${slug}`);
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
            setImages(data.images); // Assuming each image object contains a description field
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

  console.log("Images Property:", images);

  return (
    <div className="p-4">
      {/* Display images */}
      {loading ? (
        <p>Loading images...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : images.length === 0 ? (
        <p className="text-center font-bold">No images found in this folder.</p>
      ) : (
        <div className="image-gallery sektion md:grid-cols-5 gap-4">
          {images.map((image) => (
            <div key={image.public_id} className="relative group">
              <CldImage
                src={image.public_id}
                alt={image.description || image.public_id}
                width="500"
                height="500"
                crop="fill"
                gravity="auto"
                className="rounded shadow-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-sm p-2 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity">
                {image.description || "No description available."}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

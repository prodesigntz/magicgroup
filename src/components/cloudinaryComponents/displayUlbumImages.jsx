"use client";
import { CldImage } from "next-cloudinary";
import { useState, useEffect } from "react";

export default function ImageGallery({ folder }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(`/api/fetchImages?folder=${folder}`);
        const data = await res.json();

        if (data.success) {
          setImages(data.images);
        } else {
          setError(data.error || "Unknown error occurred.");
        }
      } catch (error) {
        console.error("Error fetching images:", error);
        setError("Failed to load images.");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [folder]);

  return (
    <div>
      {loading ? (
        <p>Loading images...</p>
      ) : images.length === 0 ? (
        <p className="text-center font-bold ">
          No images found in this folder.
        </p>
      ) : (
        <div className="image-gallery">
          {images.map((image) => (
            // <CldImage
            //   key={image.public_id}
            //   src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_fill,w_400/${image.public_id}`}
            //   alt={image.public_id}
            //   width="500" // Transform the image: auto-crop to square aspect_ratio
            //   height="500"
            //   crop={{
            //     type: "auto",
            //     source: true,
            //   }}
            // />
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

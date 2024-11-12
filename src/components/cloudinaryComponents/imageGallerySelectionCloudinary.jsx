"use client";
import { CldImage } from "next-cloudinary";
import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { HomeParagraph, Title } from "../texties";
import SkeletonOne from "../skeletonOne";

export default function ImageGallerySelectionCloudinary() {
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState(
    `pamoja-farm-villa || " "`
  );
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //Sliders
  const settings = {
    dots: true,
    autoplay: true,
    arrows: false,
    draggable: true,
    pauseOnHover: true,
    infinite: true,
    speed: 2000,
    autoplaySpeed: 2000,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
          arrows: true,
        },
      },
    ],
  };

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
      <div className="respons sektion md:grid-cols-5">
        <div className="col-span-4">
          <Title
            className="md:text-start "
            subHeading="Gallery"
            first="Memories from our Accommodations"
          />
        </div>
        <div>
          <div className="md:text-end">
            {folders.length > 0 ? (
              <div className="mb-4">
                <label
                  htmlFor="folder-select"
                  className="block mb-2 font-semibold  barlow_init  md:text-end"
                >
                  Select Property
                </label>
                <select
                  id="folder-select"
                  value={selectedFolder}
                  onChange={(e) => setSelectedFolder(e.target.value)}
                  className="p-2 border rounded bg-pamojaprimary md:text-end"
                >
                  <option value="">Choose accommodation</option>
                  {folders.map((folder) => (
                    <option key={folder.path} value={folder.path}>
                      {folder.name}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <p>Loading Property...</p>
            )}
          </div>
        </div>
      </div>

      <div className="">
        {/* Display images */}
        {loading ? (
          <div className="sektion ">
            <SkeletonOne />
          </div>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : images.length === 0 ? (
          <p className="text-center font-bold">
            No images found in this Property
          </p>
        ) : (
          <div className="">
            <Slider {...settings}>
              {images.map((image) => (
                <CldImage
                  key={image.public_id}
                  src={image.public_id}
                  alt={image.public_id}
                  width="500"
                  height="500"
                  crop="fill"
                  gravity="auto"
                  className="rounded shadow-lg border border-pamojaprimary"
                />
              ))}
            </Slider>
          </div>
        )}
      </div>
    </div>
  );
}

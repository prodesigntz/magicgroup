import React, { useEffect, useState } from "react";
import ImageCropper from "./image-cropper";
import {
  imageDeleteFromFirebase,
  imageUploadToFirebase,
} from "@/firebase/fileOperations";

const ImageUploader = ({ addImageToList, removeImageToList, imgs }) => {
  useEffect(() => {
    if (imgs) {
      setUploadedImages(imgs);
    }
  }, [imgs]);

  const [isImageCropperOpen, setIsImageCropperOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [isDeletingImg, setIsDeletingImg] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    handleSetImageInfo(file, url);
    setIsImageCropperOpen(true);
  };

  const handleSetImageInfo = (file, url) => {
    setImage(file);
    setImageUrl(url);
  };

  const handleUnSetImageInfo = () => {
    setImage(null);
    setImageUrl(null);
  };

  const handleUpload = async () => {
    if (!image) return;
    setUploading(true);

    try {
      const imgUrl = await imageUploadToFirebase(image);
      addImageToList(imgUrl);
      setUploadedImages((prevState) => [...prevState, imgUrl]);
      setImage(null);
    } catch (error) {
      window.alert("Image upload was unsuccessful");
    }

    setUploading(false);
  };

  const handleDeleteImage = (imgUrl) => {
    setIsDeletingImg(true);
    imageDeleteFromFirebase(imgUrl)
      .then(() => {
        setImage(null);
        setIsDeletingImg(false);
        removeImageToList(imgUrl);
        setUploadedImages((prevState) => {
          const updatedList = prevState.filter((img) => img !== imgUrl);
          return updatedList;
        });
      })
      .catch((error) => {
        console.error("Error deleting image:", error);
        setIsDeletingImg(false);
      });

    setImage(null);
  };

  return (
    <>
      {isImageCropperOpen && (
        <ImageCropper
          imgUrl={imageUrl}
          aspectRatio={2 / 1}
          onUnSetImageInfo={handleUnSetImageInfo}
          onSetImageInfo={handleSetImageInfo}
          onClose={() => setIsImageCropperOpen(false)}
        />
      )}

      <div className="my-4">
        <hr className="my-4" />
        <div className="max-w-7xl mx-auto my-4">
          <div className="p-4">
            <h6 className="text-xl mb-4">Tour Images</h6>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="col-span-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={uploading}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <div className="mt-4">
                  <button
                    className={`px-4 py-2 text-white bg-blue-500 rounded ${
                      uploading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={handleUpload}
                    disabled={!image || uploading}
                  >
                    {uploading ? (
                      <span className="loader"></span>
                    ) : (
                      "Upload Image"
                    )}
                  </button>
                </div>
              </div>

              <div className="col-span-1 md:col-span-3">
                {image && (
                  <>
                    <img
                      src={imageUrl}
                      alt="Blog"
                      className="max-w-full max-h-52 mt-4"
                    />
                    <button
                      className="text-red-500 mt-2"
                      onClick={() => setImage(null)}
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </>
                )}
              </div>

              <div className="col-span-1 md:col-span-4">
                {uploadedImages.length > 0 && (
                  <div className="mt-6 mb-2">
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {uploadedImages.map((img) => (
                        <div key={img} className="col-span-1">
                          <img
                            src={img}
                            alt="Blog"
                            className="max-w-full max-h-52"
                          />
                          <button
                            className="text-red-500 mt-2"
                            onClick={() => handleDeleteImage(img)}
                          >
                            <svg
                              className="w-6 h-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <hr className="my-4" />
      </div>
    </>
  );
};

export default ImageUploader;

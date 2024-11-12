"use client"
import { useState } from "react";
import Cropper from "react-easy-crop";
import cropImage from "../../lib/image-crop";

const ImageCropper = ({ imgUrl, onClose, onSetImageInfo, onUnSetImageInfo,aspectRatio }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedPixels, setCroppedPixels] = useState(null);
  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedPixels(croppedAreaPixels);
  };

  const handleCrop = async () => {
    if (croppedPixels) {
      const { file, url } = await cropImage(imgUrl, croppedPixels);
     
      onSetImageInfo(file, url);
      onClose();
    } else {
      window.alert("crop the image first");
    }
  };

  const handleCancel = () => {
    onUnSetImageInfo();
    onClose();
  };

  return (
    <div className="fixed  inset-0 w-screen h-screen bg-black bg-opacity-30 z-50 flex justify-center items-center">
      <div className="bg-white rounded shadow-md">
        <div className="relative w-[60vw] h-[60vh] p-4">
          <div className="flex justify-center items-center w-full h-full">
            <div className="w-full md:w-3/4 lg:w-2/3">
              <div>
                <Cropper
                  image={imgUrl}
                  crop={crop}
                  zoom={zoom}
                  aspect={aspectRatio}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  //   onZoomChange={setZoom}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-2 left-0 right-0">
        <div className="text-center">
          <button
            className="bg-blue-500 text-white py-1 px-3 rounded"
            onClick={handleCrop}
          >
            Crop
          </button>
          <button
            className="bg-yellow-500 text-white py-1 px-3 rounded ml-2"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropper;

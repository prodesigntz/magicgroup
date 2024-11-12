import Image from "next/image";
import React from "react";

const Backdrop = ({ onClose }) => {
  return (
    <div
      onClick={() => onClose()}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <Image src="/images/loaders/loader1.gif" height={100} width={100} alt="serengeti wildfile safari loader img" />
    </div>
  );
};

export default Backdrop;

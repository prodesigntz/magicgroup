"use client"; // Required for client-side code in the App Router
import { useState } from "react";

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [folder, setFolder] = useState("default-folder");
  const [error, setError] = useState(null);
  const [isloading, setIsLoading] = useState(true);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        console.log("File uploaded successfully:", data.result);
      } else {
        console.error("Upload error:", data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-pamojaaccent flex flex-col space-y-5 p-5 border border-pamojaprimary"
    >
      <input
        type="text"
        value={folder}
        onChange={(e) => setFolder(e.target.value)}
        placeholder="Folder name"
        className="w-full px-4 py-2 border"
      />
      <input type="file" onChange={handleFileChange} />
      <button
        type="submit"
        className="bg-pamojaprimary text-white font-bold py-2 px-4 rounded"
      >
        Upload
      </button>
    </form>
  );
}

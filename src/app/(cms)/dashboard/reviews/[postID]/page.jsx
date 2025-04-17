"use client";

import React, { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { useParams, useRouter } from "next/navigation";
import {
  createDocument,
  updateDocument,
  getSingleDocument,
} from "@/firebase/databaseOperations";
import { imageUploadToFirebase } from "@/firebase/fileOperations";
import { getSlug } from "@/lib/utils";
import Image from "next/image";
import { TextInput } from "@/components/textInput";
//import { Switch } from "@/components/ui/switch";

export default function EditPost({ params }) {
  ///const { postId } = useParams();

  const postId = params.postID;

  /// console.log("Post ID:...", postId);

  // console.log("Params:...", params);

  //console.log("Post ID:...", postId);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { authUser } = useAppContext();
  const [formData, setFormData] = useState({
    title: "",
    name: "",
    desc: "",
    img: null,
    imgPreview: null,
    isApproved: false,
    isPublished: false,
  });

  // Navigation
  const router = useRouter();

  // Fetch existing post data if postId is provided
  useEffect(() => {
    if (postId) {
      const fetchPost = async () => {
        setIsLoading(true);
        const { didSucceed, document } = await getSingleDocument(
          "Reviews",
          postId
        );

        console.log("Document Data.....:", document);

        if (didSucceed) {
          setFormData({
            title: document.title,
            desc: document.desc,
            name: document.name,
            img: document.img || null,
            imgPreview: document.img || null, // Added for image preview
          });
        } else {
          setError("Failed to fetch post data.");
        }
        setIsLoading(false);
      };

      fetchPost();
    }
  }, [postId]);

  // Handling data change on typing
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handling image upload and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imgPreview = URL.createObjectURL(file);
      setFormData({ ...formData, img: file, imgPreview });
    }
  };

  // Handle blog creation or update
  const handleBlogSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      let imageUrl = formData.img;

      if (formData.img && typeof formData.img !== "string") {
        imageUrl = await imageUploadToFirebase(formData.img, "blogImages");
      }

      const slug = getSlug(formData.title);

      const blogData = {
        title: formData.title,
        desc: formData.desc,
        name: formData.name,
        author: authUser?.username || "Anonymous",
        //category: formData.category,
        img: imageUrl,
        updatedAt: new Date(),
        // isPublished: formData.isPublished,
        isPublished:false,
        slug,
      };

      let result;
      if (postId) {
        result = await updateDocument("Reviews", postId, blogData);
      } else {
        blogData.createdAt = new Date();
        result = await createDocument(blogData, "Reviews");
      }

      if (result.didSucceed) {
        router.push("/dashboard/reviews"); // Replace with your CMS route
      } else {
        setError("Failed to save reviews post.");
      }
    } catch (error) {
      console.error("Reviews save error:", error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  //console.log("Form Data:", formData);

  return (
    <main>
      <div className="bg-white shadow-lg rounded-lg p-8 w-full">
        <h1 className="text-2xl font-bold text-center text-slate-700 mb-6">
          {postId ? "Update Blog Post" : "Create a Blog Post"}
        </h1>
        <form onSubmit={handleBlogSave}>
          <TextInput
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter Title Here"
            required
          />
          <TextInput
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Name Here"
            required
          />
          <div className="mb-4 relative">
            <label
              className="block text-slate-700 text-sm font-bold mb-2"
              htmlFor="desc"
            >
              Slug
            </label>
            <p className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline">
              {getSlug(formData.title)}
            </p>
          </div>
          <div className="mb-4">
            <label
              className="block text-slate-700 text-sm font-bold mb-2"
              htmlFor="desc"
            >
              Content
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline"
              id="desc"
              placeholder="Enter Content Here"
              name="desc"
              value={formData.desc}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-slate-700 text-sm font-bold mb-2"
              htmlFor="img"
            >
              Featured Image
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline"
              id="img"
              type="file"
              onChange={handleImageChange}
            />
            {formData.imgPreview && (
              <div className="mt-2">
                <Image
                  src={formData.imgPreview}
                  alt="Current Featured Image"
                  width={1000}
                  height={240}
                  style={{
                    maxWidth: "20%",
                    height: "220px",
                    objectFit: "cover",
                  }}
                  className=" max-w-full max-h-50 rounded-md"
                />
              </div>
            )}
          </div>
{/* 
          <div className="mb-4">
            <Switch
              checked={formData.isPublished}
              onCheckedChange={(value) =>
                setFormData({ ...formData, isPublished: value })
              }
              disabled={isLoading}
              aria-readonly={isLoading}
            />
            <label htmlFor="isPublished">Is Published</label>
          </div> */}

          {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}

          <div className="flex items-center justify-between mb-4">
            <button
              className="bg-pamojaprimary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={isLoading}
            >
              {isLoading
                ? postId
                  ? "Updating Post..."
                  : "Creating Post..."
                : postId
                ? "Update Post"
                : "Create Post"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

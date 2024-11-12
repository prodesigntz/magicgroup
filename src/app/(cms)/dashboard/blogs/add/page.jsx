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
import EditorComponent from "@/components/textEditor/EditorComponent";

export default function AddPost({ params }) {
  const { postId } = useParams();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { authUser } = useAppContext();
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    category: "",
    img: null,
    imgPreview: null,
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
          "Blogpost",
          postId
        );

        if (didSucceed) {
          setFormData({
            title: document.title,
            desc: document.desc,
            category: document.category,
            img: document.img || null,
            imgPreview: document.img || null,
          });
        } else {
          setError("Failed to fetch post data.");
        }
        setIsLoading(false);
      };

      fetchPost();
    }
  }, [postId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditorChange = (content) => {
    setFormData({ ...formData, desc: content });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imgPreview = URL.createObjectURL(file);
      setFormData({ ...formData, img: file, imgPreview });
    }
  };

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
        desc: formData.desc, // Save Lexical content here
        author: authUser?.username || "Anonymous",
        category: formData.category,
        img: imageUrl,
        updatedAt: new Date(),
        isPublished: formData.isPublished,
        slug,
      };

      let result;
      if (postId) {
        result = await updateDocument("Blogposts", postId, blogData);
      } else {
        blogData.createdAt = new Date();
        result = await createDocument(blogData, "Blogposts");
      }

      if (result.didSucceed) {
        router.push("/dashboard/blogs");
      } else {
        setError("Failed to save blog post.");
      }
    } catch (error) {
      console.error("Blogpost save error:", error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main>
      <div className="bg-white shadow-lg rounded-lg p-8 w-full">
        <h1 className="text-2xl font-bold text-center text-slate-700 mb-6">
          {postId ? "Update Blog Post" : "Create a Blog Post"}
        </h1>
        <form onSubmit={handleBlogSave}>
          <div className="mb-4">
            <label
              className="block text-slate-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              placeholder="Enter Title Here"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4 relative">
            <label
              className="block text-slate-700 text-sm font-bold mb-2"
              htmlFor="desc"
            >
              Content
            </label>
            <EditorComponent
              initialValue={formData.desc}
              onEditorChange={handleEditorChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-slate-700 text-sm font-bold mb-2"
              htmlFor="category"
            >
              Category
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-slate-700 leading-tight focus:outline-none focus:shadow-outline"
              id="category"
              type="text"
              placeholder="Category"
              name="category"
              value={formData.category}
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

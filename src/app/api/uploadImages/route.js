import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

// Allowed MIME types for image files
const allowedImageTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg+xml",
  "image/gif",
  "image/heic",
];

export async function POST(req) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files");
    const descriptions = formData.getAll("context[custom][description]"); // Get descriptions from context
    const folder = formData.get("folder") || "default-folder";

    if (!files || files.length === 0) {
      return NextResponse.json(
        { success: false, error: "No files uploaded" },
        { status: 400 }
      );
    }

    // Validate and upload each file
    const uploadPromises = files.map(async (file, index) => {
      const fileType = file.type;

      if (!allowedImageTypes.includes(fileType)) {
        throw new Error(
          `Unsupported file type: ${fileType}. Only image formats are allowed.`
        );
      }

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Prepare context metadata for the upload
      const context = {
        custom: {
          description: descriptions[index] || "", // Use description if provided
        },
      };

      // Upload to Cloudinary
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder, context },
          (error, result) => {
            if (error) {
              return reject(new Error(`Upload failed: ${error.message}`));
            }
            resolve(result);
          }
        );
        uploadStream.end(buffer);
      });
    });

    // Wait for all uploads to complete
    const uploadResults = await Promise.all(uploadPromises);

    return NextResponse.json({ success: true, results: uploadResults });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

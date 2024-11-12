import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req) {
  try {
    // Parse the incoming form data using the `formData()` method
    const formData = await req.formData();

    // Get the file and folder fields from the form data
    const file = formData.get("file");
    const folder = formData.get("folder") || "default-folder";

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file uploaded" },
        { status: 400 }
      );
    }

    // Convert the file to a Buffer so Cloudinary can process it
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) {
          throw new Error(error.message);
        }
        return result;
      }
    );

    // Stream the file buffer to Cloudinary
    result.end(buffer);

    return NextResponse.json({ success: true, result });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

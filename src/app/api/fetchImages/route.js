import cloudinary from "@/lib/cloudinary";

export async function GET(req) {
  const folder = req.nextUrl.searchParams.get("folder");

  try {
    const { resources } = await cloudinary.search
      .expression(`folder:${folder}`)
      .execute();

    const images = resources.map((resource) => ({
      public_id: resource.public_id,
      url: resource.secure_url,
      description:
        resource.context?.custom?.description || "No description available.", // Accessing the custom description if it exists
    }));

    return new Response(JSON.stringify({ success: true, images }), {
      status: 200,
    });
  } catch (error) {
    console.error("Cloudinary Error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}

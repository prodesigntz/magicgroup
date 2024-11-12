import cloudinary from "@/lib/cloudinary";

export async function GET(req) {
  try {
    const { folders } = await cloudinary.api.root_folders();
    return new Response(JSON.stringify({ success: true, folders }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 },
    );
  }
}

//any aditional

import connectDB from "@/app/lib/connectDB";
import Blog from "@/app/models/Crud";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    // Parse the request body
    const { blogId } = await req.json();

    // Validate required fields
    if (!blogId) {
      return NextResponse.json(
        {
          message: "Blog ID is required.",
          status: 400,
        },
        { status: 400 }
      );
    }

    // Find the blog by ID
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return NextResponse.json(
        {
          message: "Blog not found.",
          status: 404,
        },
        { status: 404 }
      );
    }

    // Increment the likes by 1
    blog.likes += 1;

    // Save the updated blog document
    await blog.save();

    return NextResponse.json(
      { message: "Blog liked successfully.", likes: blog.likes },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message, status: 500 },
      { status: 500 }
    );
  }
}

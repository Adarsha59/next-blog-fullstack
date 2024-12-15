import connectDB from "@/app/lib/connectDB";
import Blog from "@/app/models/Crud";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();

    // Extract blogId from the request URL
    const { blogId } = await req.json();

    // Validate if blogId is provided
    if (!blogId) {
      return NextResponse.json(
        {
          message: "Blog ID is required.",
          status: 400,
        },
        { status: 400 }
      );
    }

    // Find the blog by ID and populate the comments field
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

    // Return the blog with comments
    return NextResponse.json({ blog }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message, status: 500 },
      { status: 500 }
    );
  }
}

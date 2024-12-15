import connectDB from "@/app/lib/connectDB";
import Blog from "@/app/models/Crud";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    // Parse the request body
    const { blogId, user, comment } = await req.json();

    // Validate required fields
    if (!blogId || !user || !comment) {
      return NextResponse.json(
        {
          message: "Blog ID, user, and comment are required.",
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

    // Add the comment to the blog's comments array
    blog.comments.push({
      user,
      comment,
      commentedAt: new Date(),
    });

    // Save the updated blog document
    await blog.save();

    return NextResponse.json(
      { message: "Comment added successfully." },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message, status: 500 },
      { status: 500 }
    );
  }
}

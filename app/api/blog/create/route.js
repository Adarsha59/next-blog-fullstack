import connectDB from "@/app/lib/connectDB";
import Blog from "@/app/models/Crud";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    // Parse the request body
    const { title, description, content, author, tags, status, image } =
      await req.json();

    // Validate required fields
    if (!title || !description) {
      return NextResponse.json(
        {
          message: "Title and description are required.",
          status: 400,
        },
        { status: 400 }
      );
    }

    // Create a new blog document
    const newBlog = new Blog({
      title,
      description,
      content,
      author,
      tags,
      status, // Use the validated status
      image,
    });

    // Save the blog to the database
    await newBlog.save();

    return NextResponse.json(
      { message: "Blog created successfully." },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message, status: 500 },
      { status: 500 }
    );
  }
}

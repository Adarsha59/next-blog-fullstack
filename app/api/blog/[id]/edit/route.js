import connectDB from "@/app/lib/connectDB";
import Blog from "@/app/models/Crud";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    // Connect to the database
    await connectDB();
    const { id, title, description, content, tags, image } = await req.json();

    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    // Find and update the document by ID, including updatedAt field
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        title,
        description,
        content,
        tags,
        image,
        updatedAt: Date.now(),
      },
      { new: true, runValidators: true } // Ensure updated document is returned and validations are run
    );

    if (!updatedBlog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(updatedBlog, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

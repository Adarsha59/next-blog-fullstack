import connectDB from "@/app/lib/connectDB";
import Blog from "@/app/models/Crud";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    // Connect to the database
    await connectDB();

    // Extract ID from the URL parameters
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    // Find and delete the document by ID
    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Blog deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

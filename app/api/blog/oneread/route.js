import connectDB from "@/app/lib/connectDB";
import Blog from "@/app/models/Crud";
import { NextResponse } from "next/server";

// Fetch a blog post by ID using POST
export async function POST(req) {
  try {
    await connectDB();

    // Parse the JSON body of the request
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { message: "Blog ID is required." },
        { status: 400 }
      );
    }

    // Fetch the blog post with the corresponding ID
    const blogPost = await Blog.findById(id);

    if (!blogPost) {
      return NextResponse.json(
        { message: "Blog post not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: blogPost }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

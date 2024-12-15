import connectDB from "@/app/lib/connectDB";
import Blog from "@/app/models/Crud";
import { NextResponse } from "next/server";

export async function GET(res) {
  try {
    await connectDB();
    // Fetch data from the database
    const blogdata = await Blog.find();
    if (blogdata.length === 0) {
      return NextResponse.json(
        { message: "No blog posts found." },
        { status: 200 }
      );
    }
    return NextResponse.json({ blogdata }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message, status: 500 },
      { status: 500 }
    );
  }
}

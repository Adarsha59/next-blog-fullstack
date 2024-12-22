import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true, // Short summary of the blog
    trim: true,
  },
  content: {
    type: String,
    required: true, // Full content of the blog
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Tracks when the blog was last updated
  },
  author: {
    type: String,
    trim: true,
  },
  tags: {
    type: [String],
    default: [], // Tags related to the blog for categorization
  },
  image: {
    type: String,
    trim: true, // URL or file path for a blog image
  },
  author_image: {
    type: String,
    trim: true, // URL or file path for a blog image
  },
  likes: {
    type: Number,
    default: 0, // Number of likes the blog has received
  },
  comments: [
    {
      user: {
        type: String,
        required: true, // User who posted the comment
      },
      comment: {
        type: String,
        required: true, // Content of the comment
      },
      commentedAt: {
        type: Date,
        default: Date.now, // Timestamp for the comment
      },
    },
  ],

  status: {
    type: String,
    required: true, //
  },
});

const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);

export default Blog;

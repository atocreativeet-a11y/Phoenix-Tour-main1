import mongoose, { Schema, model, models } from 'mongoose';

// Define the schema for a blog post
const blogPostSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String },
  slug: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

// Check if the model already exists to prevent overwrite issues in dev/hot reload
const BlogPost = models.BlogPost || model('BlogPost', blogPostSchema);

// Export as default to match import style in your route files
export default BlogPost;
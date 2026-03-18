import mongoose, { Schema, model, models } from 'mongoose';

const blogPostSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export const BlogPost = models.BlogPost || model('BlogPost', blogPostSchema);
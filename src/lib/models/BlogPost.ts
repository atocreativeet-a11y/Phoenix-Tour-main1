import mongoose, { Schema, models, model } from 'mongoose';

export interface IBlogPost {
  title: string;
  content: string;
  category: string;
  published: boolean;
  publishedAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    published: { type: Boolean, default: false },
    publishedAt: { type: Date }
  },
  { timestamps: true }
);

// جلوگیری از overwrite در Next.js
export const BlogPost =
  models.BlogPost || model<IBlogPost>('BlogPost', BlogPostSchema);
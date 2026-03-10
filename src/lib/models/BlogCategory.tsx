// src/lib/models/BlogCategory.ts
import mongoose from 'mongoose';

const blogCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  description: String,
  color: {
    type: String,
    default: '#4F46E5'
  },
  icon: String,
  postCount: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export const BlogCategory = mongoose.models.BlogCategory || mongoose.model('BlogCategory', blogCategorySchema);
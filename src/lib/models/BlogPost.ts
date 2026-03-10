// src/lib/models/BlogPost.ts
import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Blog post title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  slug: {
    type: String,
    required: [true, 'Slug is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  excerpt: {
    type: String,
    required: [true, 'Excerpt is required'],
    maxlength: [300, 'Excerpt cannot exceed 300 characters']
  },
  content: {
    type: String,
    required: [true, 'Blog content is required']
  },
  featuredImage: {
    type: String,
    required: [true, 'Featured image is required']
  },
  images: [{
    url: String,
    alt: String,
    caption: String
  }],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  categories: [{
    type: String,
    enum: [
      'Ethiopian Culture',
      'Travel Tips',
      'History & Heritage',
      'Food & Coffee',
      'Nature & Wildlife',
      'Festivals & Events',
      'Photography',
      'Adventure',
      'Local Stories'
    ]
  }],
  tags: [{
    type: String,
    lowercase: true
  }],
  readTime: {
    type: Number,
    required: true,
    default: 5
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  shares: {
    type: Number,
    default: 0
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  metaTitle: String,
  metaDescription: String,
  seoKeywords: [String],
  relatedTours: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tour'
  }]
}, {
  timestamps: true
});

// Index for faster queries
blogPostSchema.index({ title: 'text', excerpt: 'text', content: 'text' });
blogPostSchema.index({ slug: 1 });
blogPostSchema.index({ categories: 1 });
blogPostSchema.index({ isFeatured: 1, createdAt: -1 });

export const BlogPost = mongoose.models.BlogPost || mongoose.model('BlogPost', blogPostSchema);
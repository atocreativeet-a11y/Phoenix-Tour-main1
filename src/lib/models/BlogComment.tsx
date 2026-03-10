// src/lib/models/BlogComment.ts
import mongoose from 'mongoose';

const blogCommentSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BlogPost',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  likes: {
    type: Number,
    default: 0
  },
  parentComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BlogComment'
  },
  replies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BlogComment'
  }]
}, {
  timestamps: true
});

export const BlogComment = mongoose.models.BlogComment || mongoose.model('BlogComment', blogCommentSchema);
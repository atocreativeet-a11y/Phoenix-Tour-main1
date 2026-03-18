import mongoose from 'mongoose';

const blogCommentSchema = new mongoose.Schema({
  postId: { type: String, required: true },
  user: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const BlogComment = mongoose.models.BlogComment || mongoose.model('BlogComment', blogCommentSchema);

export default BlogComment;
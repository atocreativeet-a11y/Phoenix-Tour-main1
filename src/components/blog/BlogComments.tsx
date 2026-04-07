// src/components/blog/BlogComments.tsx
'use client';

import { useState, useEffect } from 'react';
import * as Icons from "lucide-react";

const MessageCircle = (Icons as any).MessageCircle;
const Send = (Icons as any).Send;
const User = (Icons as any).User;
const Calendar = (Icons as any).Calendar;
const Heart = (Icons as any).Heart;
const MoreVertical = (Icons as any).MoreVertical;
const Edit = (Icons as any).Edit;
const Trash2 = (Icons as any).Trash2;
const Reply = (Icons as any).Reply;
const CheckCircle = (Icons as any).CheckCircle;
const AlertCircle = (Icons as any).AlertCircle;
const Loader = (Icons as any).Loader;

interface Comment {
  _id: string;
  user?: {
    _id: string;
    name: string;
    image?: string;
  };
  name: string;
  email: string;
  content: string;
  likes: number;
  createdAt: string;
  isApproved?: boolean;
  replies?: Comment[];
  parentComment?: string;
  isLiked?: boolean;
}

interface BlogCommentsProps {
  postId: string;
}

export default function BlogComments({ postId }: BlogCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [editingComment, setEditingComment] = useState<string | null>(null);
  const [commentForm, setCommentForm] = useState({
    name: '',
    email: '',
    content: '',
    parentComment: ''
  });

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/blog/comments?postId=${postId}`);
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setComments(data.comments || []);
        }
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!commentForm.name.trim() || !commentForm.email.trim() || !commentForm.content.trim()) {
      return;
    }
    
    try {
      setSubmitting(true);
      
      const response = await fetch('/api/blog/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          post: postId,
          name: commentForm.name,
          email: commentForm.email,
          content: commentForm.content,
          parentComment: replyingTo || undefined
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          // Reset form
          setCommentForm({
            name: '',
            email: '',
            content: '',
            parentComment: ''
          });
          setReplyingTo(null);
          setEditingComment(null);
          
          // Refresh comments
          fetchComments();
        }
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleLike = async (commentId: string) => {
    try {
      // Optimistic update
      setComments(prev => prev.map(comment => {
        if (comment._id === commentId) {
          return { ...comment, likes: comment.likes + 1, isLiked: true };
        }
        
        // Check replies
        if (comment.replies) {
          return {
            ...comment,
            replies: comment.replies.map(reply => 
              reply._id === commentId 
                ? { ...reply, likes: reply.likes + 1, isLiked: true }
                : reply
            )
          };
        }
        
        return comment;
      }));
      
      const response = await fetch(`/api/blog/comments/${commentId}/like`, {
        method: 'POST',
      });
      
      if (!response.ok) {
        // Revert optimistic update on error
        setComments(prev => prev.map(comment => {
          if (comment._id === commentId) {
            return { ...comment, likes: comment.likes - 1, isLiked: false };
          }
          
          if (comment.replies) {
            return {
              ...comment,
              replies: comment.replies.map(reply => 
                reply._id === commentId 
                  ? { ...reply, likes: reply.likes - 1, isLiked: false }
                  : reply
              )
            };
          }
          
          return comment;
        }));
      }
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  };

  const handleReply = (commentId: string, commenterName: string) => {
    setReplyingTo(commentId);
    setCommentForm(prev => ({
      ...prev,
      content: `@${commenterName} `,
      parentComment: commentId
    }));
  };

  const handleEdit = (comment: Comment) => {
    setEditingComment(comment._id);
    setReplyingTo(null);
    setCommentForm({
      name: comment.name,
      email: comment.email,
      content: comment.content,
      parentComment: comment.parentComment || ''
    });
  };

  const handleDelete = async (commentId: string) => {
    if (!confirm('Are you sure you want to delete this comment?')) return;
    
    try {
      const response = await fetch(`/api/blog/comments/${commentId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        fetchComments();
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const renderComment = (comment: Comment, isReply = false) => (
    <div key={comment._id} className={`${isReply ? 'ml-10 pl-4 border-l-2 border-gray-200' : ''}`}>
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4 hover:border-primary-200 transition-colors">
        {/* Comment Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-500 to-blue-500 flex items-center justify-center text-white font-semibold">
              {comment.user?.name?.charAt(0).toUpperCase() || comment.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="font-semibold text-gray-900">
                {comment.user?.name || comment.name}
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(comment.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
                {comment.isApproved && (
                  <span className="flex items-center gap-1 text-green-600">
                    <CheckCircle className="w-3 h-3" />
                    Approved
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleLike(comment._id)}
              className={`flex items-center gap-1 px-3 py-1 rounded-lg transition-colors ${
                comment.isLiked
                  ? 'bg-red-50 text-red-600'
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <Heart className={`w-4 h-4 ${comment.isLiked ? 'fill-red-600' : ''}`} />
              <span className="text-sm font-medium">{comment.likes}</span>
            </button>
            
            <div className="relative group">
              <button className="p-1 hover:bg-gray-100 rounded-lg">
                <MoreVertical className="w-4 h-4 text-gray-500" />
              </button>
              
              <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <button
                  onClick={() => handleReply(comment._id, comment.user?.name || comment.name)}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Reply className="w-4 h-4" />
                  Reply
                </button>
                <button
                  onClick={() => handleEdit(comment)}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(comment._id)}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Comment Content */}
        <div className="text-gray-700 mb-4 whitespace-pre-wrap">
          {comment.content}
        </div>
        
        {/* Reply Button */}
        <button
          onClick={() => handleReply(comment._id, comment.user?.name || comment.name)}
          className="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          <Reply className="w-4 h-4" />
          Reply
        </button>
      </div>
      
      {/* Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="space-y-4 mt-4">
          {comment.replies.map((reply) => renderComment(reply, true))}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <MessageCircle className="w-6 h-6 text-primary-500" />
        <h2 className="text-2xl font-heading font-bold text-gray-900">Comments & Discussion</h2>
        <span className="px-3 py-1 bg-primary-100 text-primary-600 text-sm font-medium rounded-full">
          {comments.reduce((total, comment) => 
            total + 1 + (comment.replies?.length || 0), 0
          )}
        </span>
      </div>

      {/* Comment Form */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {editingComment ? 'Edit Comment' : replyingTo ? 'Reply to Comment' : 'Leave a Comment'}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name *
              </label>
              <input
                type="text"
                value={commentForm.name}
                onChange={(e) => setCommentForm({...commentForm, name: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Your name"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                value={commentForm.email}
                onChange={(e) => setCommentForm({...commentForm, email: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Your email address"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Comment *
            </label>
            <textarea
              value={commentForm.content}
              onChange={(e) => setCommentForm({...commentForm, content: e.target.value})}
              className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              placeholder="Share your thoughts, experiences, or ask questions..."
              required
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              <AlertCircle className="w-4 h-4 inline-block mr-1" />
              Comments are moderated and will be approved within 24 hours.
            </div>
            
            <div className="flex items-center gap-3">
              {(replyingTo || editingComment) && (
                <button
                  type="button"
                  onClick={() => {
                    setReplyingTo(null);
                    setEditingComment(null);
                    setCommentForm({
                      name: '',
                      email: '',
                      content: '',
                      parentComment: ''
                    });
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                >
                  Cancel
                </button>
              )}
              
              <button
                type="submit"
                disabled={submitting}
                className="flex items-center gap-2 px-6 py-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {submitting ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    {editingComment ? 'Update Comment' : 'Post Comment'}
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Comments List */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Community Discussion
        </h3>
        
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader className="w-8 h-8 animate-spin text-primary-500" />
          </div>
        ) : comments.length > 0 ? (
          <div className="space-y-6">
            {comments.map((comment) => renderComment(comment))}
          </div>
        ) : (
          <div className="text-center py-12">
            <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-2">No comments yet</p>
            <p className="text-gray-400 text-sm">
              Be the first to share your thoughts!
            </p>
          </div>
        )}
      </div>
      
      {/* Comment Guidelines */}
      <div className="mt-8 pt-8 border-t border-gray-200">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Comment Guidelines</h4>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-start gap-2">
            <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <CheckCircle className="w-3 h-3 text-green-600" />
            </div>
            <span>Be respectful and constructive</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <CheckCircle className="w-3 h-3 text-green-600" />
            </div>
            <span>Share your personal experiences and insights</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <CheckCircle className="w-3 h-3 text-green-600" />
            </div>
            <span>Ask questions - our community loves to help!</span>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <CheckCircle className="w-3 h-3 text-green-600" />
            </div>
            <span>All comments are moderated to ensure quality discussion</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
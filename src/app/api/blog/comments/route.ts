// src/app/api/blog/comments/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { BlogComment } from '@/lib/models/BlogComment';
import { BlogPost } from '@/lib/models/BlogPost';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('postId');
    
    if (!postId) {
      return NextResponse.json(
        { success: false, error: 'Post ID is required' },
        { status: 400 }
      );
    }
    
    await connectDB();
    
    const comments = await BlogComment.find({
      post: postId,
      isApproved: true,
      parentComment: null
    })
    .populate('user', 'name image')
    .populate({
      path: 'replies',
      populate: {
        path: 'user',
        select: 'name image'
      }
    })
    .sort({ createdAt: -1 })
    .lean();
    
    return NextResponse.json({
      success: true,
      comments
    });
  } catch (error: any) {
    console.error('Error fetching comments:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch comments' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    await connectDB();
    
    // Verify post exists
    const post = await BlogPost.findById(data.post);
    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Blog post not found' },
        { status: 404 }
      );
    }
    
    const comment = await BlogComment.create(data);
    
    return NextResponse.json({
      success: true,
      comment
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating comment:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create comment' },
      { status: 500 }
    );
  }
}
// src/app/api/blog/posts/[slug]/like/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import BlogPost from '@/lib/models/BlogPost';
import mongoose from 'mongoose';

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    
    await connectDB();
    
    const post = await BlogPost.findOneAndUpdate(
      { slug },
      { $inc: { likes: 1 } },
      { new: true }
    );
    
    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Blog post not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      likes: post.likes
    });
  } catch (error: any) {
    console.error('Error liking blog post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to like blog post' },
      { status: 500 }
    );
  }
}
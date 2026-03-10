// src/app/api/blog/comments/[id]/like/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { BlogComment } from '@/lib/models/BlogComment';

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    
    await connectDB();
    
    const comment = await BlogComment.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    
    if (!comment) {
      return NextResponse.json(
        { success: false, error: 'Comment not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      likes: comment.likes
    });
  } catch (error: any) {
    console.error('Error liking comment:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to like comment' },
      { status: 500 }
    );
  }
}
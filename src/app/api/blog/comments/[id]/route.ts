// src/app/api/blog/comments/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth';
import connectDB from '@/lib/mongodb';
import { BlogComment } from '@/lib/models/BlogComment';

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    // Only allow admin or the comment owner to delete
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const { id } = await context.params;
    
    await connectDB();
    
    const comment = await BlogComment.findById(id);
    
    if (!comment) {
      return NextResponse.json(
        { success: false, error: 'Comment not found' },
        { status: 404 }
      );
    }
    
    // Check if user is admin or comment owner
    const isAdmin = session.user.role === 'admin';
    const isOwner = comment.user?.toString() === session.user.id;
    
    if (!isAdmin && !isOwner) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    await BlogComment.findByIdAndDelete(id);
    
    // If it's a reply, remove it from parent's replies array
    if (comment.parentComment) {
      await BlogComment.findByIdAndUpdate(
        comment.parentComment,
        { $pull: { replies: id } }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Comment deleted successfully'
    });
  } catch (error: any) {
    console.error('Error deleting comment:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete comment' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const { id } = await context.params;
    const data = await request.json();
    
    await connectDB();
    
    const comment = await BlogComment.findById(id);
    
    if (!comment) {
      return NextResponse.json(
        { success: false, error: 'Comment not found' },
        { status: 404 }
      );
    }
    
    // Check if user is admin or comment owner
    const isAdmin = session.user.role === 'admin';
    const isOwner = comment.user?.toString() === session.user.id;
    
    if (!isAdmin && !isOwner) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const updatedComment = await BlogComment.findByIdAndUpdate(
      id,
      { content: data.content },
      { new: true }
    );
    
    return NextResponse.json({
      success: true,
      comment: updatedComment
    });
  } catch (error: any) {
    console.error('Error updating comment:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update comment' },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import BlogComment from '@/lib/models/BlogComment';

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> } // <-- TS expects Promise
) {
  try {
    await connectDB();

    const { id } = await context.params; // <-- await the params
    if (!id) return NextResponse.json({ success: false, error: 'Comment ID required' }, { status: 400 });

    const comment = await BlogComment.findById(id);
    if (!comment) return NextResponse.json({ success: false, error: 'Comment not found' }, { status: 404 });

    comment.likes = (comment.likes || 0) + 1;
    await comment.save();

    return NextResponse.json({ success: true, likes: comment.likes });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Failed to like comment' }, { status: 500 });
  }
}
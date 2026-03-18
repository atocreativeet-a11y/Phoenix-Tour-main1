import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import BlogComment from '@/lib/models/BlogComment';

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await context.params;
    if (!id) return NextResponse.json({ success: false, error: 'Comment ID required' }, { status: 400 });

    await BlogComment.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Failed to delete comment' }, { status: 500 });
  }
}
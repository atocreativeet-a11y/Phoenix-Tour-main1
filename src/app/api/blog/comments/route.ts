import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import BlogComment from '@/lib/models/BlogComment';
import BlogPost from '@/lib/models/BlogPost'; // ✅ default import

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const postId = request.nextUrl.searchParams.get('postId');
    if (!postId) return NextResponse.json({ success: false, error: 'postId required' }, { status: 400 });

    const comments = await BlogComment.find({ postId }).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, comments });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch comments' }, { status: 500 });
  }
}
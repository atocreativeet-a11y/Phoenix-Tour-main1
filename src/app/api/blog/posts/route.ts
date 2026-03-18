import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import BlogPost from '@/lib/models/BlogPost';

export async function GET() {
  try {
    await connectDB();
    const posts = await BlogPost.find().sort({ createdAt: -1 }).select('-__v');
    return NextResponse.json({ success: true, posts });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch posts' }, { status: 500 });
  }
}
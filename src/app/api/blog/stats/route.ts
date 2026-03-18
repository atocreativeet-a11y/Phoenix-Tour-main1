import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import BlogPost from '@/lib/models/BlogPost'; // ✅ default import

export async function GET() {
  try {
    // Connect to MongoDB
    await connectDB();

    // Fetch all posts, sorted newest first, excluding __v
    const posts = await BlogPost.find().sort({ createdAt: -1 }).select('-__v');

    return NextResponse.json({ success: true, posts });
  } catch (error) {
    console.error(error); // optional: log the actual error for debugging
    return NextResponse.json(
      { success: false, error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}
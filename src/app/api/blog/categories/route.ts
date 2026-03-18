import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import BlogPost from '@/lib/models/BlogPost';

interface CategoryResult {
  _id: string;
  count: number;
}

export async function GET() {
  try {
    await connectDB();
    const categories: CategoryResult[] = await BlogPost.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
    ]);
    return NextResponse.json({ success: true, categories });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch categories' }, { status: 500 });
  }
}
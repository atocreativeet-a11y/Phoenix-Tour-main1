// src/app/api/blog/categories/route.ts - Categories API
import { NextRequest, NextResponse } from 'next/server';
import  connectDB  from '@/lib/mongodb';
import BlogPost from '@/lib/models/BlogPost';

export async function GET() {
  try {
    await connectDB();
    
    // Get all unique categories with counts
    const categories = await BlogPost.aggregate([
      { $match: { published: true } },
      { $group: {
        _id: '$category',
        count: { $sum: 1 },
        latest: { $max: '$publishedAt' }
      }},
      { $sort: { count: -1 } }
    ]);

    return NextResponse.json({
      success: true,
      categories: categories.map(cat => ({
        name: cat._id,
        count: cat.count,
        latest: cat.latest
      }))
    });
    
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}
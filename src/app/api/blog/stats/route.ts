// src/app/api/blog/stats/route.ts - Blog Statistics API
import { NextRequest, NextResponse } from 'next/server';
import  connectDB from '@/lib/mongodb';
import BlogPost from '@/lib/models/BlogPost';
export async function GET() {
  try {
    await connectDB();
    
    const [
      totalPosts,
      totalViews,
      totalLikes,
      totalComments,
      topCategories,
      popularPosts
    ] = await Promise.all([
      // Total published posts
      BlogPost.countDocuments({ published: true }),
      
      // Total views across all posts
      BlogPost.aggregate([
        { $match: { published: true } },
        { $group: { _id: null, total: { $sum: '$views' } } }
      ]),
      
      // Total likes across all posts
      BlogPost.aggregate([
        { $match: { published: true } },
        { $group: { _id: null, total: { $sum: '$likes' } } }
      ]),
      
      // Total comments across all posts
      BlogPost.aggregate([
        { $match: { published: true } },
        { $group: { _id: null, total: { $sum: '$comments' } } }
      ]),
      
      // Top 5 categories
      BlogPost.aggregate([
        { $match: { published: true } },
        { $group: { _id: '$category', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 }
      ]),
      
      // Top 3 popular posts
      BlogPost.find({ published: true })
        .sort({ views: -1 })
        .limit(3)
        .select('title slug views category publishedAt')
        .lean()
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        totalPosts,
        totalViews: totalViews[0]?.total || 0,
        totalLikes: totalLikes[0]?.total || 0,
        totalComments: totalComments[0]?.total || 0,
        topCategories,
        popularPosts
      }
    });
    
  } catch (error) {
    console.error('Error fetching blog stats:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch blog statistics' },
      { status: 500 }
    );
  }
}
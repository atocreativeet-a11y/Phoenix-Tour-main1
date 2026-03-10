
//src\app\api\tours\stats\route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Tour from '@/lib/models/Tour';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    // Get comprehensive stats
    const stats = await Tour.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: null,
          totalTours: { $sum: 1 },
          avgRating: { $avg: '$rating' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
          featuredTours: {
            $sum: { $cond: [{ $eq: ['$isFeatured', true] }, 1, 0] }
          }
        }
      },
      {
        $project: {
          _id: 0,
          totalTours: 1,
          avgRating: { $round: ['$avgRating', 1] },
          avgPrice: { $round: ['$avgPrice', 0] },
          minPrice: 1,
          maxPrice: 1,
          featuredTours: 1
        }
      }
    ]);
    
    // Get category counts
    const categoryStats = await Tour.aggregate([
      { $match: { isActive: true } },
      { 
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);
    
    // Get region counts
    const regionStats = await Tour.aggregate([
      { $match: { isActive: true } },
      { 
        $group: {
          _id: '$region',
          count: { $sum: 1 }
        }
      }
    ]);
    
    // Get difficulty distribution
    const difficultyStats = await Tour.aggregate([
      { $match: { isActive: true } },
      { 
        $group: {
          _id: '$difficulty',
          count: { $sum: 1 }
        }
      }
    ]);
    
    return NextResponse.json({
      success: true,
      stats: {
        ...stats[0],
        categories: categoryStats.reduce((acc, curr) => {
          acc[curr._id] = curr.count;
          return acc;
        }, {} as Record<string, number>),
        regions: regionStats,
        difficulties: difficultyStats
      }
    });
  } catch (error: any) {
    console.error('Fetch tour stats error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch tour statistics',
        message: error.message 
      },
      { status: 500 }
    );
  }
}
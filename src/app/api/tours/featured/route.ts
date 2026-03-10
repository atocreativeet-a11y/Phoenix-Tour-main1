//src\app\api\tours\featured\route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Tour from '@/lib/models/Tour';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit') || '6');
    
    // Build filter
    const filter: any = { isActive: true, isFeatured: true };
    
    if (category && category !== 'All Tours') {
      filter.category = category;
    }
    
    // Fetch featured tours
    const tours = await Tour.find(filter)
      .select('title slug description shortDescription duration difficulty price discountPrice rating region category tags highlight image iconName isFeatured')
      .sort({ rating: -1, createdAt: -1 })
      .limit(limit);
    
    // Get category stats
    const stats = await Tour.aggregate([
      { $match: { isActive: true } },
      { 
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);
    
    const categoryStats: Record<string, number> = {};
    stats.forEach((stat: { _id: string | number; count: number; }) => {
      categoryStats[stat._id] = stat.count;
    });
    
    // Get total count
    const total = await Tour.countDocuments({ isActive: true });
    categoryStats['All Tours'] = total;
    
    return NextResponse.json({
      success: true,
      tours,
      stats: {
        total,
        categories: categoryStats,
        featuredCount: await Tour.countDocuments({ isActive: true, isFeatured: true })
      }
    });
  } catch (error: any) {
    console.error('Fetch featured tours error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch featured tours',
        message: error.message 
      },
      { status: 500 }
    );
  }
}
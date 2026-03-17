import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { BlogPost } from '@/lib/models/BlogPost';

// ✅ Type for aggregation result
interface CategoryResult {
  _id: string;
  count: number;
  latest: Date;
}

export async function GET() {
  try {
    await connectDB();

    const categories: CategoryResult[] = await BlogPost.aggregate([
      { $match: { published: true, category: { $ne: null } } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          latest: { $max: '$publishedAt' }
        }
      },
      { $sort: { count: -1 } }
    ]);

    return NextResponse.json({
      success: true,
      categories: categories.map((cat: CategoryResult) => ({
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
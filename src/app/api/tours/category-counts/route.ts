import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Tour from '@/lib/models/Tour'; // Assuming you have a Tour model

export async function GET() {
  try {
    await connectDB();
    
    // Aggregate counts by category
    const categoryCounts = await Tour.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);
    
    // Convert to object format
    const counts: {[key: string]: number} = {};
    categoryCounts.forEach(item => {
      counts[item._id] = item.count;
    });
    
    // Add "All Tours" count (total tours)
    const totalTours = await Tour.countDocuments();
    counts['All Tours'] = totalTours;
    
    return NextResponse.json({
      success: true,
      counts
    });
    
  } catch (error) {
    console.error('Error fetching category counts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch category counts' },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth';
import connectDB from '@/lib/mongodb';
import Tour from '@/lib/models/Tour';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    
    const tours = await Tour.find().sort({ createdAt: -1 }).lean();
    
    return NextResponse.json({
      success: true,
      tours,
      count: tours.length
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to fetch tours', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    
    const data = await request.json();
    
    // Generate slug from title
    if (data.title && !data.slug) {
      data.slug = data.title
        .toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '-');
    }
    
    const tour = await Tour.create(data);
    
    return NextResponse.json({
      success: true,
      message: 'Tour created successfully',
      tour
    }, { status: 201 });
  } catch (error: any) {
    console.error('Create tour error:', error);
    return NextResponse.json(
      { error: 'Failed to create tour', details: error.message },
      { status: 500 }
    );
  }
}
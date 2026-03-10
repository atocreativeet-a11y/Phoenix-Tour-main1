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
    
    // Validate required fields
    const requiredFields = ['title', 'description', 'duration', 'price', 'category', 'region'];
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Generate slug from title if not provided
    if (!data.slug && data.title) {
      data.slug = data.title
        .toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '-');
    }

    // Ensure slug is unique
    let slug = data.slug;
    let counter = 1;
    let existingTour = await Tour.findOne({ slug });
    
    while (existingTour) {
      slug = `${data.slug}-${counter}`;
      existingTour = await Tour.findOne({ slug });
      counter++;
    }
    
    data.slug = slug;

    // Process available dates
    if (data.availableDates && Array.isArray(data.availableDates)) {
      data.availableDates = data.availableDates.map((date: string) => new Date(date));
    }

    // Process itinerary
    if (data.itinerary && Array.isArray(data.itinerary)) {
      data.itinerary = data.itinerary.map((day: any, index: number) => ({
        ...day,
        day: index + 1,
        meals: Array.isArray(day.meals) ? day.meals : [],
        activities: Array.isArray(day.activities) ? day.activities : []
      }));
    }

    // Set defaults
    data.country = data.country || 'Ethiopia';
    data.rating = data.rating || 4.5;
    data.isActive = data.isActive !== undefined ? data.isActive : true;
    data.isFeatured = data.isFeatured || false;
    data.maxParticipants = data.maxParticipants || 12;
    data.minParticipants = data.minParticipants || 2;
    data.iconName = data.iconName || 'Compass';
    data.tags = data.tags || [];
    data.included = data.included || [];
    data.excluded = data.excluded || [];
    data.images = data.images || [];

    const tour = await Tour.create(data);
    
    return NextResponse.json({
      success: true,
      message: 'Tour created successfully',
      tour
    }, { status: 201 });
  } catch (error: any) {
    console.error('Create tour error:', error);
    
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'A tour with this slug already exists' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create tour', details: error.message },
      { status: 500 }
    );
  }
}
//src\app\api\tours\available\route.ts

import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Tour from '@/lib/models/Tour';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const tours = await Tour.find({ isActive: true })
      .select('title slug duration price maxParticipants availableDates')
      .sort({ price: 1 });
    
    return NextResponse.json({
      tours: tours.map((tour: { _id: any; title: any; duration: any; price: any; maxParticipants: any; availableDates: any; }) => ({
        id: tour._id,
        name: tour.title,
        duration: tour.duration,
        price: tour.price,
        maxParticipants: tour.maxParticipants,
        availableDates: tour.availableDates
      }))
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to fetch tours'+error },
      { status: 500 }
    );
  }
}
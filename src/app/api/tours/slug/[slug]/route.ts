// src/app/api/tours/slug/[slug]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Tour from '@/lib/models/Tour';
import TourDetail from '@/lib/models/TourDetail';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    console.log('=== GET /api/tours/slug/[slug] ===');
    
    // Await the params to get the slug
    const { slug } = await context.params;
    
    console.log('Fetching tour by slug:', slug);
    
    if (!slug || slug === 'undefined' || slug === 'null') {
      console.error('Invalid slug:', slug);
      return NextResponse.json(
        { 
          success: false,
          error: 'Invalid slug' 
        },
        { status: 400 }
      );
    }
    
    await connectDB();
    console.log('MongoDB connected');
    
    // Find tour by slug
    const tour = await Tour.findOne({ slug, isActive: true }).lean();
    console.log('Tour found by slug:', tour ? 'Yes' : 'No');
    
    if (!tour) {
      console.log('Tour not found with slug:', slug);
      return NextResponse.json(
        { 
          success: false,
          error: 'Tour not found' 
        },
        { status: 404 }
      );
    }
    
    // Try to fetch tour details
    let tourDetail = null;
    try {
      tourDetail = await TourDetail.findOne({ tourId: tour._id })
        .populate('tourId', 'title slug price duration category region rating image description')
        .lean();
      console.log('Tour detail found:', tourDetail ? 'Yes' : 'No');
    } catch (detailError) {
      console.log('No tour details found or error:', detailError);
    }
    
    // Combine tour data with details
    const fullTourData = {
      ...tour,
      detail: tourDetail
    };
    
    console.log('Returning tour data for slug:', slug);
    return NextResponse.json({
      success: true,
      tour: fullTourData
    });
  } catch (error: any) {
    console.error('❌ Error in GET /api/tours/slug/[slug]:', error);
    console.error('Error stack:', error.stack);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch tour by slug', 
        details: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}
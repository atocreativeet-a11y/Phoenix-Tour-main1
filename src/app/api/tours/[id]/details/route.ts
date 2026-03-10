
//src\app\api\tours\[id]\details\route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth';
import connectDB from '@/lib/mongodb';
import TourDetail from '@/lib/models/TourDetail';
import Tour from '@/lib/models/Tour';
import mongoose from 'mongoose';

// Helper function to get the ID from params
async function getTourId(params: { id: string } | Promise<{ id: string }>): Promise<string> {
  const resolvedParams = await Promise.resolve(params);
  return resolvedParams.id;
}

export async function GET(
  request: NextRequest,
  context: { params: { id: string } | Promise<{ id: string }> }
) {
  try {
    console.log('=== GET /api/tours/[id]/details ===');
    
    // Await the params to get the ID
    const params = await Promise.resolve(context.params);
    const tourId = params.id;
    
    console.log('Fetching details for tour ID:', tourId);
    
    if (!tourId || tourId === 'undefined' || tourId === 'null') {
      console.error('Invalid tour ID:', tourId);
      return NextResponse.json(
        { 
          success: false,
          error: 'Invalid tour ID' 
        },
        { status: 400 }
      );
    }
    
    await connectDB();
    console.log('MongoDB connected');
    
    // Convert string ID to ObjectId if needed
    const tourDetail = await TourDetail.findOne({ tourId })
      .populate('tourId', 'title slug price duration category region rating image description')
      .lean();

    console.log('Tour detail found:', tourDetail ? 'Yes' : 'No');

    if (!tourDetail) {
      // Return basic info if no detail exists
      console.log('No detail found, fetching basic tour info...');
      const tour = await Tour.findById(tourId).lean();
      if (!tour) {
        console.log('Tour not found with ID:', tourId);
        return NextResponse.json(
          { 
            success: false,
            error: 'Tour not found' 
          },
          { status: 404 }
        );
      }
      
      console.log('Returning basic tour info');
      return NextResponse.json({
        success: true,
        detail: null,
        basicInfo: tour
      });
    }

    return NextResponse.json({
      success: true,
      detail: tourDetail
    });
  } catch (error: any) {
    console.error('❌ Error in GET /api/tours/[id]/details:', error);
    console.error('Error stack:', error.stack);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch tour details', 
        details: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  context: { params: { id: string } | Promise<{ id: string }> }
) {
  try {
    console.log('=== POST /api/tours/[id]/details ===');
    
    // Await the params to get the ID
    const params = await Promise.resolve(context.params);
    const tourId = params.id;
    
    console.log('POST request for tour ID:', tourId);
    
    if (!tourId || tourId === 'undefined' || tourId === 'null') {
      console.error('Invalid tour ID:', tourId);
      return NextResponse.json(
        { 
          success: false,
          error: 'Invalid tour ID' 
        },
        { status: 400 }
      );
    }
    
    // Check authentication
    const session = await getServerSession(authOptions);
    console.log('Session:', session ? 'Exists' : 'No session');
    
    if (!session) {
      console.error('No session found');
      return NextResponse.json(
        { 
          success: false,
          error: 'Unauthorized - No session' 
        },
        { status: 401 }
      );
    }
    
    if (session.user.role !== 'admin') {
      console.error('User is not admin. Role:', session.user.role);
      return NextResponse.json(
        { 
          success: false,
          error: 'Unauthorized - Admin only' 
        },
        { status: 401 }
      );
    }

    await connectDB();
    console.log('MongoDB connected for POST');
    
    // Check if tour exists
    console.log('Checking if tour exists with ID:', tourId);
    const tour = await Tour.findById(tourId);
    if (!tour) {
      console.error('Tour not found with ID:', tourId);
      return NextResponse.json(
        { 
          success: false,
          error: 'Tour not found' 
        },
        { status: 404 }
      );
    }
    console.log('Tour found:', tour.title);

    const data = await request.json();
    console.log('Received data for tour details, keys:', Object.keys(data));
    
    // Validate data
    if (!data.fullDescription || data.fullDescription.trim() === '') {
      console.warn('Warning: fullDescription is empty');
    }
    
    // Check if detail already exists
    const existingDetail = await TourDetail.findOne({ tourId });
    console.log('Existing detail found:', existingDetail ? 'Yes' : 'No');
    
    let tourDetail;
    if (existingDetail) {
      console.log('Updating existing tour detail');
      // Update existing
      tourDetail = await TourDetail.findOneAndUpdate(
        { tourId },
        { $set: data },
        { new: true, runValidators: true }
      );
      console.log('Detail updated successfully');
    } else {
      console.log('Creating new tour detail');
      // Create new
      tourDetail = await TourDetail.create({
        tourId,
        ...data
      });
      // console.log('Detail created successfully, ID:', tourDetail._id);
    }

    return NextResponse.json({
      success: true,
      message: 'Tour details saved successfully',
      detail: tourDetail
    }, { status: existingDetail ? 200 : 201 });
  } catch (error: any) {
    console.error('❌ Error in POST /api/tours/[id]/details:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors: Record<string, string> = {};
      Object.keys(error.errors).forEach((key) => {
        validationErrors[key] = error.errors[key].message;
      });
      
      return NextResponse.json(
        { 
          success: false,
          error: 'Validation failed',
          validationErrors,
          details: error.message 
        },
        { status: 400 }
      );
    }
    
    // Handle duplicate key errors
    if (error.code === 11000) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Duplicate key error',
          details: 'A detail for this tour already exists'
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to save tour details', 
        details: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } | Promise<{ id: string }> }
) {
  try {
    // Await the params to get the ID
    const params = await Promise.resolve(context.params);
    const tourId = params.id;
    
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { 
          success: false,
          error: 'Unauthorized' 
        },
        { status: 401 }
      );
    }

    await connectDB();
    
    const result = await TourDetail.findOneAndDelete({ tourId });
    
    if (!result) {
      return NextResponse.json({
        success: false,
        message: 'Tour details not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Tour details deleted successfully'
    });
  } catch (error: any) {
    console.error('Error in DELETE /api/tours/[id]/details:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to delete tour details', 
        details: error.message 
      },
      { status: 500 }
    );
  }
}
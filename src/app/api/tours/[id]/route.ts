// src\app\api\tours\[id]\route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/auth';
import connectDB from '@/lib/mongodb';
import Tour from '@/lib/models/Tour';

// GET single tour
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }  // Note: params is a Promise
) {
  try {
    // Await the params first!
    const { id } = await params;
    
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    
    const tour = await Tour.findById(id).lean();  // Use the unwrapped id
    
    if (!tour) {
      return NextResponse.json(
        { error: 'Tour not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      tour
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to fetch tour', details: error.message },
      { status: 500 }
    );
  }
}

// UPDATE tour
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Await the params first!
    const { id } = await params;
    
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

    // Update slug if title changed
    if (data.title) {
      const existingTour = await Tour.findById(id);  // Use unwrapped id
      if (existingTour && existingTour.title !== data.title) {
        data.slug = data.title
          .toLowerCase()
          .replace(/[^\w\s]/gi, '')
          .replace(/\s+/g, '-');
          
        // Ensure slug is unique
        let slug = data.slug;
        let counter = 1;
        let existingSlug = await Tour.findOne({ slug, _id: { $ne: id } });  // Use unwrapped id
        
        while (existingSlug) {
          slug = `${data.slug}-${counter}`;
          existingSlug = await Tour.findOne({ slug, _id: { $ne: id } });  // Use unwrapped id
          counter++;
        }
        
        data.slug = slug;
      }
    }

    const tour = await Tour.findByIdAndUpdate(
      id,  // Use unwrapped id
      { ...data, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
    
    if (!tour) {
      return NextResponse.json(
        { error: 'Tour not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Tour updated successfully',
      tour
    });
  } catch (error: any) {
    console.error('Update tour error:', error);
    
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'A tour with this slug already exists' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to update tour', details: error.message },
      { status: 500 }
    );
  }
}

// DELETE tour
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Await the params first!
    const { id } = await params;
    
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    
    const tour = await Tour.findByIdAndDelete(id);  // Use unwrapped id
    
    if (!tour) {
      return NextResponse.json(
        { error: 'Tour not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Tour deleted successfully'
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to delete tour', details: error.message },
      { status: 500 }
    );
  }
}
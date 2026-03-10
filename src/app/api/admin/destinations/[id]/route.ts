// src/app/api/admin/destinations/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Destination from '@/lib/models/Destination';

// GET single destination
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const destination = await Destination.findById(params.id).select('-__v');
    
    if (!destination) {
      return NextResponse.json(
        { success: false, error: 'Destination not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      destination,
    });
  } catch (error) {
    console.error('Error fetching destination:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch destination' },
      { status: 500 }
    );
  }
}

// UPDATE destination
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const data = await request.json();
    
    // Check if destination exists
    const existingDestination = await Destination.findById(params.id);
    if (!existingDestination) {
      return NextResponse.json(
        { success: false, error: 'Destination not found' },
        { status: 404 }
      );
    }

    // Check if slug is being changed and if new slug exists
    if (data.slug && data.slug !== existingDestination.slug) {
      const slugExists = await Destination.findOne({ 
        slug: data.slug,
        _id: { $ne: params.id }
      });
      if (slugExists) {
        return NextResponse.json(
          { success: false, error: 'Destination with this slug already exists' },
          { status: 400 }
        );
      }
    }

    // Update destination
    const destination = await Destination.findByIdAndUpdate(
      params.id,
      { ...data, updatedAt: new Date() },
      { new: true, runValidators: true }
    ).select('-__v');

    return NextResponse.json({
      success: true,
      destination,
      message: 'Destination updated successfully',
    });
  } catch (error) {
    console.error('Error updating destination:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update destination' },
      { status: 500 }
    );
  }
}

// DELETE destination
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    
    const destination = await Destination.findById(params.id);
    
    if (!destination) {
      return NextResponse.json(
        { success: false, error: 'Destination not found' },
        { status: 404 }
      );
    }

    // Check if destination has associated tours
    // You might want to add this check based on your schema
    // const tourCount = await Tour.countDocuments({ destinationId: params.id });
    // if (tourCount > 0) {
    //   return NextResponse.json(
    //     { success: false, error: 'Cannot delete destination with associated tours' },
    //     { status: 400 }
    //   );
    // }

    await destination.deleteOne();

    return NextResponse.json({
      success: true,
      message: 'Destination deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting destination:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete destination' },
      { status: 500 }
    );
  }
}
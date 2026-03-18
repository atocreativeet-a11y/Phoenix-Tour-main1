import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Destination from '@/lib/models/Destination';

// GET single destination
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await context.params;

    const destination = await Destination.findById(id).select('-__v');

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
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await context.params;
    const data = await request.json();

    const existingDestination = await Destination.findById(id);
    if (!existingDestination) {
      return NextResponse.json(
        { success: false, error: 'Destination not found' },
        { status: 404 }
      );
    }

    if (data.slug && data.slug !== existingDestination.slug) {
      const slugExists = await Destination.findOne({
        slug: data.slug,
        _id: { $ne: id },
      });

      if (slugExists) {
        return NextResponse.json(
          { success: false, error: 'Destination with this slug already exists' },
          { status: 400 }
        );
      }
    }

    const destination = await Destination.findByIdAndUpdate(
      id,
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
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await context.params;

    const destination = await Destination.findById(id);

    if (!destination) {
      return NextResponse.json(
        { success: false, error: 'Destination not found' },
        { status: 404 }
      );
    }

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
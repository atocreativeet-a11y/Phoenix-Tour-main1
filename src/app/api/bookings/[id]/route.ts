// src/app/api/bookings/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Booking from '@/lib/models/Booking';

// GET /api/bookings/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // FIX: params is a Promise
) {
  try {
    await connectDB();
    
    // Await the params Promise
    const { id } = await params;
    
    const booking = await Booking.findById(id);
    
    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }
    
    // Convert to plain object to avoid serialization issues
    const bookingObj = booking.toObject();
    
    return NextResponse.json({ booking: bookingObj });
  } catch (error: any) {
    console.error('Error fetching booking:', error);
    return NextResponse.json(
      { error: 'Failed to fetch booking' },
      { status: 500 }
    );
  }
}

// PUT /api/bookings/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // FIX: params is a Promise
) {
  try {
    await connectDB();
    
    // Await the params Promise
    const { id } = await params;
    const data = await request.json();
    
    const booking = await Booking.findByIdAndUpdate(
      id, // Use the awaited id
      { ...data, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
    
    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }
    
    // Convert to plain object
    const bookingObj = booking.toObject();
    
    return NextResponse.json({ 
      success: true, 
      message: 'Booking updated successfully',
      booking: bookingObj 
    });
  } catch (error: any) {
    console.error('Error updating booking:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to update booking' },
      { status: 500 }
    );
  }
}

// DELETE /api/bookings/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } // FIX: params is a Promise
) {
  try {
    await connectDB();
    
    // Await the params Promise
    const { id } = await params;
    
    const booking = await Booking.findByIdAndDelete(id);
    
    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Booking deleted successfully'
    });
  } catch (error: any) {
    console.error('Error deleting booking:', error);
    return NextResponse.json(
      { error: 'Failed to delete booking' },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Booking from '@/lib/models/Booking';
import { sendBookingConfirmation } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const data = await request.json();
    
    // Validate required fields
    const requiredFields = ['customerName', 'email', 'phone', 'tourName', 'tourDate', 'groupSize', 'totalAmount'];
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }
    
    // Convert tourDate string to Date object if needed
    if (data.tourDate && typeof data.tourDate === 'string') {
      data.tourDate = new Date(data.tourDate);
    }
    
    // Ensure participants array is properly formatted
    if (data.participants && Array.isArray(data.participants)) {
      data.participants = data.participants.map((p: any) => ({
        name: p.name || '',
        age: parseInt(p.age) || 18,
        gender: p.gender || 'male',
        specialRequirements: p.specialRequirements || ''
      }));
    } else {
      // Default participant if none provided
      data.participants = [{
        name: data.customerName,
        age: 18,
        gender: 'male',
        specialRequirements: ''
      }];
    }
    
    // Create booking with explicit type
    const booking = await Booking.create(data);
    
    // TypeScript workaround - cast to any to access properties
    const bookingData = booking as any;
    
    // Send confirmation email
    try {
      await sendBookingConfirmation(bookingData);
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
      // Don't fail the booking if email fails
    }
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Booking created successfully',
        bookingNumber: bookingData.bookingNumber,
        bookingId: bookingData._id 
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Booking creation error:', error);
    
    // Handle duplicate booking number error
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'Duplicate booking. Please try again.' },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create booking', details: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const searchParams = request.nextUrl.searchParams;
    const bookingNumber = searchParams.get('bookingNumber');
    const email = searchParams.get('email');
    
    if (bookingNumber) {
      const booking = await Booking.findOne({ bookingNumber });
      if (!booking) {
        return NextResponse.json(
          { error: 'Booking not found' },
          { status: 404 }
        );
      }
      
      // Convert to plain object to avoid TypeScript issues
      const bookingObj = booking.toObject();
      return NextResponse.json({ booking: bookingObj });
    }
    
    if (email) {
      const bookings = await Booking.find({ email }).sort({ createdAt: -1 });
      
      // Convert to plain objects
      const bookingsArray = bookings.map(booking => booking.toObject());
      return NextResponse.json({ bookings: bookingsArray });
    }
    
    // Admin endpoint - requires authentication in production
    const bookings = await Booking.find().sort({ createdAt: -1 }).limit(50);
    
    // Convert to plain objects
    const bookingsArray = bookings.map(booking => booking.toObject());
    return NextResponse.json({ bookings: bookingsArray });
  } catch (error: any) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}
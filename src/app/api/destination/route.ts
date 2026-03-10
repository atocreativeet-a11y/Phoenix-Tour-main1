// // routes/destinationRoutes.js
// import express from 'express';
// import Destination from '../models/Destination.js';

// const router = express.Router();

// // Get all destinations
// router.get('/', async (req: { query: { region: any; limit: any; sort: any; }; }, res: { json: (arg0: { success: boolean; count: any; data: any; }) => void; status: (arg0: number) => { (): any; new(): any; json: { (arg0: { success: boolean; message: string; error: any; }): void; new(): any; }; }; }) => {
//   try {
//     const { region, limit, sort } = req.query;
//     const query = { isActive: true };
    
//     if (region) {
//       query.region = region;
//     }
    
//     const destinations = await Destination.find(query)
//       .limit(parseInt(limit) || 20)
//       .sort(sort || 'order');
    
//     res.json({
//       success: true,
//       count: destinations.length,
//       data: destinations
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Server error',
//       error: error.message
//     });
//   }
// });

// // Get single destination by slug
// router.get('/:slug', async (req: { params: { slug: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { success: boolean; message: string; error?: any; }): void; new(): any; }; }; json: (arg0: { success: boolean; data: any; }) => void; }) => {
//   try {
//     const destination = await Destination.findOne({ 
//       slug: req.params.slug,
//       isActive: true 
//     });
    
//     if (!destination) {
//       return res.status(404).json({
//         success: false,
//         message: 'Destination not found'
//       });
//     }
    
//     res.json({
//       success: true,
//       data: destination
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Server error',
//       error: error.message
//     });
//   }
// });

// // Create new destination (admin)
// router.post('/', async (req: { body: any; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { success: boolean; data?: any; message?: string; error?: any; }): void; new(): any; }; }; }) => {
//   try {
//     const destination = new Destination(req.body);
//     await destination.save();
    
//     res.status(201).json({
//       success: true,
//       data: destination
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: 'Error creating destination',
//       error: error.message
//     });
//   }
// });

// // Update destination (admin)
// router.put('/:id', async (req: { params: { id: any; }; body: any; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { success: boolean; message: string; error?: any; }): void; new(): any; }; }; json: (arg0: { success: boolean; data: any; }) => void; }) => {
//   try {
//     const destination = await Destination.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true, runValidators: true }
//     );
    
//     if (!destination) {
//       return res.status(404).json({
//         success: false,
//         message: 'Destination not found'
//       });
//     }
    
//     res.json({
//       success: true,
//       data: destination
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: 'Error updating destination',
//       error: error.message
//     });
//   }
// });

// // Delete destination (admin)
// router.delete('/:id', async (req: { params: { id: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { success: boolean; message: string; error?: any; }): void; new(): any; }; }; json: (arg0: { success: boolean; message: string; }) => void; }) => {
//   try {
//     const destination = await Destination.findByIdAndUpdate(
//       req.params.id,
//       { isActive: false },
//       { new: true }
//     );
    
//     if (!destination) {
//       return res.status(404).json({
//         success: false,
//         message: 'Destination not found'
//       });
//     }
    
//     res.json({
//       success: true,
//       message: 'Destination deactivated'
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Server error',
//       error: error.message
//     });
//   }
// });

// // Get destinations by region with stats
// router.get('/regions/stats', async (req: any, res: { json: (arg0: { success: boolean; data: any; }) => void; status: (arg0: number) => { (): any; new(): any; json: { (arg0: { success: boolean; message: string; error: unknown; }): void; new(): any; }; }; }) => {
//   try {
//     const stats = await Destination.aggregate([
//       { $match: { isActive: true } },
//       {
//         $group: {
//           _id: '$region',
//           count: { $sum: 1 },
//           totalTours: { $sum: '$tourCount' },
//           destinations: { 
//             $push: {
//               title: '$title',
//               slug: '$slug',
//               image: '$mainImage',
//               tourCount: '$tourCount'
//             }
//           }
//         }
//       },
//       {
//         $project: {
//           region: '$_id',
//           count: 1,
//           totalTours: 1,
//           destinations: 1,
//           _id: 0
//         }
//       },
//       { $sort: { count: -1 } }
//     ]);
    
//     res.json({
//       success: true,
//       data: stats
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Server error',
//       error: error
//     });
//   }
// });

// export default router;

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
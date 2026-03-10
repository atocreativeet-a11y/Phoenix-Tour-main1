// app/api/trip-planner/submit/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import TripPlan from '@/lib/models/TripPlan.model';
import Tour from '@/lib/models/Tour';
// import { sendTripPlanEmail } from '@/lib/email/tripPlanEmail';
// import { validateTripPlan } from '@/lib/validations/tripPlan.validation';
// import { findMatchingTours } from '@/lib/services/tourMatchingService';

// Mock data for fallback
const mockTours = [
  {
    _id: 'mock-1',
    title: 'Classic Northern Ethiopia Circuit',
    description: 'Experience Ethiopia\'s highlights: Lalibela\'s rock churches, Gondar\'s castles, Simien Mountains, and Axum\'s ancient stelae.',
    duration: '12 days',
    difficulty: 'Moderate',
    price: 1850,
    rating: 4.9,
    category: 'Ethiopia Highlights',
    region: 'Northern Ethiopia',
    tags: ['history-culture', 'UNESCO', 'historical'],
    matchScore: 92
  },
  {
    _id: 'mock-2',
    title: 'Omo Valley Cultural Expedition',
    description: 'Deep cultural immersion with the indigenous tribes of Southern Ethiopia\'s Omo Valley.',
    duration: '8 days',
    difficulty: 'Moderate',
    price: 1200,
    rating: 4.8,
    category: 'Cultural Tours',
    region: 'Southern Ethiopia',
    tags: ['cultural-immersion', 'tribal', 'photography'],
    matchScore: 88
  },
  {
    _id: 'mock-3',
    title: 'Simien Mountains Trekking Adventure',
    description: 'Hike through the "Roof of Africa" with endemic wildlife, deep valleys, and stunning viewpoints.',
    duration: '6 days',
    difficulty: 'Challenging',
    price: 920,
    rating: 4.9,
    category: 'Nature & Trekking',
    region: 'Northern Ethiopia',
    tags: ['mountain-trekking', 'nature-wildlife', 'adventure-sports'],
    matchScore: 85
  }
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    // const validationErrors = validateTripPlan(body);
    // if (validationErrors.length > 0) {
    //   return NextResponse.json(
    //     { 
    //       success: false, 
    //       message: 'Validation failed',
    //       errors: validationErrors 
    //     },
    //     { status: 400 }
    //   );
    // }
    
    // Try to connect to database
    let useMockData = false;
    
    try {
      await connectDB();
    } catch (dbError) {
      console.error('Database connection failed, using mock data:', dbError);
      useMockData = true;
    }
    
    // Find matching tours
    let recommendedTours: any[] = [];
    
    // if (!useMockData) {
    //   try {
    //     // Use real tour matching service
    //     recommendedTours = await findMatchingTours(body);
    //   } catch (tourError) {
    //     console.error('Tour matching failed, using mock tours:', tourError);
    //     recommendedTours = mockTours;
    //     useMockData = true;
    //   }
    // } else {
    //   // Use mock tours
    //   recommendedTours = mockTours.map(tour => ({
    //     tourId: tour._id,
    //     title: tour.title,
    //     price: tour.price,
    //     duration: tour.duration,
    //     matchScore: tour.matchScore,
    //     reason: getMatchReason(tour, body)
    //   }));
    // }
    
    // Get client info
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const referrer = request.headers.get('referer') || 'unknown';
    
    // Create trip plan
    let tripPlan;
    
    if (!useMockData) {
      tripPlan = await TripPlan.create({
        ...body,
        recommendedTours,
        ipAddress: ip,
        userAgent: userAgent,
        referrer: referrer,
        source: getSource(referrer)
      });
    } else {
      // Create mock trip plan object (not saved to DB)
      tripPlan = {
        _id: `mock-${Date.now()}`,
        ...body,
        recommendedTours,
        createdAt: new Date(),
        updatedAt: new Date()
      };
    }
    
    // Send email notifications (in background)
    // try {
    //   await sendTripPlanEmail({
    //     customerEmail: body.email,
    //     customerName: body.name,
    //     tripPlanData: body,
    //     recommendedTours,
    //     useMockData
    //   });
    // } catch (emailError) {
    //   console.error('Email sending failed:', emailError);
    //   // Continue even if email fails
    // }
    
    return NextResponse.json({
      success: true,
      message: 'Trip plan submitted successfully!',
      data: {
        tripPlanId: tripPlan._id,
        recommendedTours: recommendedTours.slice(0, 3), // Return top 3
        useMockData,
        nextSteps: [
          'Our travel expert will contact you within 24 hours',
          'We\'ll create a customized itinerary based on your preferences',
          'You\'ll receive detailed pricing and booking options'
        ]
      }
    });
    
  } catch (error: any) {
    console.error('Error submitting trip plan:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error submitting trip plan',
        error: error.message,
        // Return mock data as fallback
        data: {
          tripPlanId: `fallback-${Date.now()}`,
          recommendedTours: mockTours.slice(0, 3),
          useMockData: true,
          message: 'Using sample tours while we process your request'
        }
      },
      { status: 500 }
    );
  }
}

// Helper functions
function getMatchReason(tour: any, preferences: any): string {
  const reasons: string[] = [];
  
  if (preferences.interests?.some((interest: string) => tour.tags?.includes(interest))) {
    reasons.push('Matches your interests');
  }
  
  if (tour.price <= preferences.budget * 1.2) {
    reasons.push('Fits your budget');
  }
  
  if (preferences.preferredDestinations?.some((dest: string) => 
    tour.region?.toLowerCase().includes(dest)
  )) {
    reasons.push('In your preferred region');
  }
  
  return reasons.length > 0 ? reasons.join(', ') : 'Recommended based on popular tours';
}

function getSource(referrer: string): string {
  if (referrer.includes('facebook.com')) return 'social-media';
  if (referrer.includes('instagram.com')) return 'social-media';
  if (referrer.includes('google.com')) return 'website';
  if (referrer.includes('email')) return 'email';
  return 'website';
}
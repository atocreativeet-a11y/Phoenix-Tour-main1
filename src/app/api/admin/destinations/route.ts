// src/app/api/admin/destinations/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Destination from "@/lib/models/Destination";

// GET all destinations with pagination and filters
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const filter = searchParams.get('filter') || 'all';
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    const skip = (page - 1) * limit;

    // Build query
    let query: any = {};

    // Search filter
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { region: { $regex: search, $options: 'i' } },
        { shortDescription: { $regex: search, $options: 'i' } },
        { 'features': { $regex: search, $options: 'i' } },
      ];
    }

    // Status filter
    if (filter === 'active') {
      query.isActive = true;
    } else if (filter === 'inactive') {
      query.isActive = false;
    } else if (filter === 'featured') {
      query.isFeatured = true;
    } else if (filter !== 'all') {
      query.region = filter;
    }

    // Count total documents
    const total = await Destination.countDocuments(query);

    // Get paginated results
    const destinations = await Destination.find(query)
      .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
      .skip(skip)
      .limit(limit)
      .select('-__v')
      .lean();

    return NextResponse.json({
      success: true,
      destinations,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    console.error('Error fetching destinations:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch destinations' },
      { status: 500 }
    );
  }
}

// CREATE new destination
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const data = await request.json();
    
    // Check if slug already exists
    const existingDestination = await Destination.findOne({ slug: data.slug });
    if (existingDestination) {
      return NextResponse.json(
        { success: false, error: 'Destination with this slug already exists' },
        { status: 400 }
      );
    }

    // Create new destination
    const destination = new Destination(data);
    await destination.save();

    return NextResponse.json({
      success: true,
      destination,
      message: 'Destination created successfully',
    });
  } catch (error) {
    console.log('Erro occurd:', error);
    console.error('Error creating destination:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create destination'+error },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'Admin API endpoint',
    endpoints: [
      '/api/admin/tours',
      '/api/admin/bookings',
      '/api/admin/guides',
      '/api/admin/destinations',
      '/api/admin/analytics'
    ]
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    return NextResponse.json({
      success: true,
      message: 'Admin action processed',
      data: body
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
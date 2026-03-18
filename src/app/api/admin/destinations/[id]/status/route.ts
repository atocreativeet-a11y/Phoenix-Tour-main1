import Destination from "@/lib/models/Destination";
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

// src/app/api/admin/destinations/[id]/status/route.ts
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await context.params;
    const { isActive } = await request.json();

    const destination = await Destination.findByIdAndUpdate(
      id,
      { isActive, updatedAt: new Date() },
      { new: true }
    ).select('-__v');

    if (!destination) {
      return NextResponse.json(
        { success: false, error: 'Destination not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      destination,
      message: `Destination ${isActive ? 'activated' : 'deactivated'} successfully`,
    });
  } catch (error) {
    console.error('Error updating destination status:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update destination status' },
      { status: 500 }
    );
  }
}
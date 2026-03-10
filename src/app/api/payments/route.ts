import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Simulate payment processing
    const paymentSuccess = Math.random() > 0.1; // 90% success rate
    
    if (paymentSuccess) {
      return NextResponse.json({
        success: true,
        message: 'Payment successful',
        transactionId: `txn_${Date.now()}`,
        amount: body.amount
      });
    } else {
      return NextResponse.json(
        { error: 'Payment failed. Please try again.' },
        { status: 402 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid payment request' },
      { status: 400 }
    );
  }
}
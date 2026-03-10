// lib/email-templates.ts
export function generateBookingEmail(booking: any): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Booking Confirmation - Phoenix Tour Ethiopia</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #059669 0%, #7c3aed 100%); padding: 30px; color: white; text-align: center;">
        <h1 style="margin: 0;">Booking Confirmed!</h1>
        <p style="opacity: 0.9; margin: 10px 0 0;">Thank you for choosing Phoenix Tour Ethiopia</p>
      </div>
      
      <div style="padding: 30px; background: #f9fafb;">
        <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h2 style="color: #059669; margin-top: 0;">Booking Details</h2>
          <p><strong>Booking Number:</strong> ${booking.bookingNumber}</p>
          <p><strong>Customer Name:</strong> ${booking.customerName}</p>
          <p><strong>Tour:</strong> ${booking.tourName}</p>
          <p><strong>Date:</strong> ${new Date(booking.tourDate).toLocaleDateString()}</p>
          <p><strong>Duration:</strong> ${booking.duration}</p>
          <p><strong>Group Size:</strong> ${booking.groupSize} people</p>
          <p><strong>Total Amount:</strong> ${booking.totalAmount} ${booking.currency}</p>
        </div>
        
        <div style="background: #fef3c7; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b; margin-bottom: 20px;">
          <p style="margin: 0; color: #92400e;"><strong>Next Steps:</strong></p>
          <p style="margin: 10px 0 0; color: #92400e;">1. Our Ethiopian guide will contact you within 24 hours</p>
          <p style="margin: 5px 0 0; color: #92400e;">2. Prepare your travel documents</p>
          <p style="margin: 5px 0 0; color: #92400e;">3. Review the packing list we'll send you</p>
        </div>
        
        <div style="text-align: center; padding: 20px; background: #dcfce7; border-radius: 8px;">
          <p style="margin: 0; color: #065f46;"><strong>Need help? Contact our Addis Ababa office:</strong></p>
          <p style="margin: 10px 0 0; font-size: 18px; color: #059669;">+251 11 123 4567</p>
          <p style="margin: 5px 0 0; color: #065f46;">or email: tours@phoenixtourethiopia.et</p>
        </div>
      </div>
    </body>
    </html>
  `;
}
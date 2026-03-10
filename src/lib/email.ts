import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export async function sendBookingConfirmation(booking: any) {
  const mailOptions = {
    from: '"Phoenix Tour Ethiopia" <bookings@phoenixtourethiopia.et>',
    to: booking.email,
    subject: `Booking Confirmation: ${booking.bookingNumber} - ${booking.tourName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #059669 0%, #7c3aed 100%); padding: 30px; color: white; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0;">Booking Confirmed!</h1>
          <p style="opacity: 0.9; margin: 10px 0 0;">Thank you for choosing Phoenix Tour Ethiopia</p>
        </div>
        
        <div style="padding: 30px; background: #f9fafb; border-radius: 0 0 10px 10px;">
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #059669; margin-top: 0;">Booking Details</h2>
            <p><strong>Booking Number:</strong> ${booking.bookingNumber}</p>
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
            <p style="margin: 0; color: #065f46;">Need help? Contact our Addis Ababa office:</p>
            <p style="margin: 10px 0 0; font-size: 18px; color: #059669;">+251 11 123 4567</p>
          </div>
        </div>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
}
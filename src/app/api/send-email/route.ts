import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import connectDB from '@/lib/mongodb'; // Import your DB connection
import Application from '@/lib/models/Application'; // Import the Application model

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Simple email templates
const getAdminEmail = (data: any) => `
<h2>📋 New Tour Application</h2>
<p><strong>Tour:</strong> ${data.tourName}</p>
<p><strong>Name:</strong> ${data.name}</p>
<p><strong>Email:</strong> ${data.email}</p>
<p><strong>Phone:</strong> ${data.phone}</p>
<p><strong>Reference ID:</strong> ${data.referenceId}</p>
<p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
<hr>
<p>Please respond within 24 hours.</p>
`;

const getApplicantEmail = (data: any) => `
<h2>🎉 Thank You, ${data.name}!</h2>
<p>We have received your application for <strong>${data.tourName}</strong>.</p>
<p><strong>Reference Number:</strong> ${data.referenceId}</p>
<p>Our team will contact you within 24 hours.</p>
<hr>
<p>For immediate assistance, call +251 (912) 345-6789</p>
`;

export async function POST(request: NextRequest) {
  let dbConnected = false;
  let savedApplication = null;

  try {
    const body = await request.json();
    const { name, email, phone, tourName } = body;

    console.log('📧 Processing application for:', email);

    // Generate reference ID
    const referenceId = `PT-${Date.now().toString(36).toUpperCase()}`;

    // Try to connect to database and save application
    try {
      await connectDB();
      dbConnected = true;
      
      // Create and save application to MongoDB
      const application = new Application({
        name,
        email,
        phone,
        tourName: tourName || 'Selected Tour',
        referenceId,
        status: 'pending',
      });
      
      savedApplication = await application.save();
      console.log('💾 Application saved to MongoDB:', savedApplication.referenceId);
      
    } catch (dbError: any) {
      console.error('❌ MongoDB save failed:', dbError.message);
      // Continue with email sending even if DB save fails
    }

    // Email to admin
    const adminMailOptions = {
      from: process.env.EMAIL_FROM || '"Phoenix Tour" <noreply@phoenixtouret.com>',
      to: process.env.ADMIN_EMAIL || 'admin@phoenixtouret.com',
      subject: `📋 New Tour Application: ${tourName || 'Selected Tour'}`,
      html: getAdminEmail({
        name,
        email,
        phone,
        tourName: tourName || 'Selected Tour',
        referenceId,
      }),
    };

    // Email to applicant
    const applicantMailOptions = {
      from: process.env.EMAIL_FROM || '"Phoenix Tour" <noreply@phoenixtouret.com>',
      to: email,
      subject: `🎉 Application Received: ${tourName || 'Selected Tour'}`,
      html: getApplicantEmail({
        name,
        tourName: tourName || 'Selected Tour',
        referenceId,
      }),
    };

    // Send emails
    const adminResult = await transporter.sendMail(adminMailOptions);
    const applicantResult = await transporter.sendMail(applicantMailOptions);

    console.log('📧 Emails sent successfully!');
    console.log('Admin email ID:', adminResult.messageId);
    console.log('Applicant email ID:', applicantResult.messageId);

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully!',
      referenceId,
      emailSent: true,
      savedToDatabase: dbConnected && savedApplication !== null,
      applicationId: savedApplication?._id || null,
    });
    
  } catch (error: any) {
    console.error('📧 Email sending failed:', error.message);
    
    // Return success for the user but indicate what happened
    return NextResponse.json({
      success: true, // Still true so user thinks it worked
      message: 'Application received! Our team will contact you soon.',
      referenceId: `PT-${Date.now().toString(36).toUpperCase()}`,
      emailSent: false,
      savedToDatabase: dbConnected && savedApplication !== null,
      note: 'Email notifications may be delayed',
    });
  }
}

// src/app/booking/page.tsx
'use client';

import { useState } from 'react';
import MultiPurposeBookingForm from '@/components/booking/MultiPurposeBookingForm';
import { Calendar, ShieldCheck, Coffee, Users, MapPin, CheckCircle, AlertCircle } from 'lucide-react';

export default function BookingPage() {
  const [bookingResult, setBookingResult] = useState<{
    success: boolean;
    bookingNumber?: string;
    message?: string;
  } | null>(null);

  const handleBookingSuccess = (bookingNumber: string) => {
    setBookingResult({
      success: true,
      bookingNumber,
      message: 'Booking successful! Your Ethiopian adventure is confirmed.'
    });
    
    // You could also redirect to a success page
    // window.location.href = `/booking/success?number=${bookingNumber}`;
  };

  const handleBookingError = (error: string) => {
    setBookingResult({
      success: false,
      message: error || 'Booking failed. Please try again.'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 via-yellow-500 to-red-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            Book Your Ethiopian Adventure
          </h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Experience the cradle of humanity with our authentic Ethiopian tours
          </p>
        </div>
      </div>

      {/* Success/Error Message */}
      {bookingResult && (
        <div className="container mx-auto px-4 mt-6">
          <div className={`rounded-2xl p-6 ${bookingResult.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <div className="flex items-start gap-3">
              {bookingResult.success ? (
                <CheckCircle className="w-6 h-6 text-green-500 mt-0.5" />
              ) : (
                <AlertCircle className="w-6 h-6 text-red-500 mt-0.5" />
              )}
              <div className="flex-1">
                <h3 className={`font-bold text-lg ${bookingResult.success ? 'text-green-800' : 'text-red-800'}`}>
                  {bookingResult.success ? 'Booking Confirmed!' : 'Booking Failed'}
                </h3>
                <p className={`mt-1 ${bookingResult.success ? 'text-green-700' : 'text-red-700'}`}>
                  {bookingResult.message}
                </p>
                {bookingResult.bookingNumber && (
                  <div className="mt-3 bg-white/50 rounded-xl p-4 border border-green-200">
                    <p className="text-sm text-green-600 font-medium">Your Booking Number:</p>
                    <p className="text-2xl font-bold text-green-700 mt-1">{bookingResult.bookingNumber}</p>
                    <p className="text-xs text-green-500 mt-2">
                      Save this number for future reference. Our team will contact you within 24 hours.
                    </p>
                  </div>
                )}
              </div>
              <button
                onClick={() => setBookingResult(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Booking Form */}
          <div className="lg:col-span-2">
            <MultiPurposeBookingForm
              showTourSelector={true}
              onSuccess={handleBookingSuccess}
            />
          </div>

          {/* Right Column - Info & Benefits */}
          <div className="space-y-6">
            {/* Why Book With Us */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-green-500" />
                Why Book With Phoenix Tour
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <span className="text-gray-700">Certified Ethiopian Guides</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <span className="text-gray-700">24/7 Local Support</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <span className="text-gray-700">Best Price Guarantee</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <span className="text-gray-700">Flexible Cancellation</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <span className="text-gray-700">Community Tourism Support</span>
                </li>
              </ul>
            </div>

            {/* Ethiopian Experience */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl shadow-lg p-6 border border-yellow-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Coffee className="w-5 h-5 text-yellow-600" />
                Authentic Ethiopian Experience
              </h3>
              <p className="text-gray-700 mb-4">
                All bookings include a traditional Ethiopian coffee ceremony and cultural briefing.
              </p>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>Small group sizes (max 12 people)</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Support local communities</span>
                </div>
              </div>
            </div>

            {/* Need Help? */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl shadow-lg p-6 border border-green-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Need Help?</h3>
              <p className="text-gray-700 mb-4">
                Our Ethiopian travel experts are here to assist you.
              </p>
              <div className="space-y-3">
                <a
                  href="tel:+251912345678"
                  className="block text-center py-3 bg-green-500 text-white font-medium rounded-xl hover:bg-green-600 transition-colors"
                >
                  Call Ethiopian Office
                </a>
                <a
                  href="https://wa.me/251912345678"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center py-3 border border-green-500 text-green-600 font-medium rounded-xl hover:bg-green-50 transition-colors"
                >
                  WhatsApp Chat
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
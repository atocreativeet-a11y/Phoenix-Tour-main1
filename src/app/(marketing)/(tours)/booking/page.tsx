'use client';

import { useState } from 'react';
import MultiPurposeBookingForm from '@/components/booking/MultiPurposeBookingForm';
import * as Icons from "lucide-react";

const Calendar = (Icons as any).Calendar;
const ShieldCheck = (Icons as any).ShieldCheck;
const Coffee = (Icons as any).Coffee;
const Users = (Icons as any).Users;
const MapPin = (Icons as any).MapPin;
const CheckCircle = (Icons as any).CheckCircle;
const AlertCircle = (Icons as any).AlertCircle;
const ChevronDown = (Icons as any).ChevronDown;
const Phone = (Icons as any).Phone;

export default function BookingPage() {
  const [bookingResult, setBookingResult] = useState<{
    success: boolean;
    bookingNumber?: string;
    message?: string;
  } | null>(null);

  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  const handleBookingSuccess = (bookingNumber: string) => {
    setBookingResult({
      success: true,
      bookingNumber,
      message: 'Booking successful! Your Ethiopian adventure is confirmed.'
    });
  };

  const handleBookingError = (error: string) => {
    setBookingResult({
      success: false,
      message: error || 'Booking failed. Please try again.'
    });
  };

  const toggleAccordion = (section: string) => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white overflow-x-hidden max-w-[100vw]">
      <div className="bg-gradient-to-r from-green-600 via-yellow-500 to-red-600 text-white py-8 md:py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl md:text-5xl font-heading font-bold mb-2 md:mb-4 px-2 leading-tight">
            Book Your Ethiopian Adventure
          </h1>
          <p className="text-sm md:text-xl max-w-3xl mx-auto opacity-90 px-4">
            Experience the cradle of humanity with our authentic Ethiopian tours
          </p>
        </div>
      </div>

      {bookingResult && (
        <div className="container mx-auto px-4 mt-4 md:mt-6">
          <div className={`rounded-xl md:rounded-2xl p-4 md:p-6 ${bookingResult.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <div className="flex items-start gap-2.5 md:gap-3">
              {bookingResult.success ? (
                <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-500 mt-0.5 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 md:w-6 md:h-6 text-red-500 mt-0.5 flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <h3 className={`font-bold text-base md:text-lg ${bookingResult.success ? 'text-green-800' : 'text-red-800'}`}>
                  {bookingResult.success ? 'Booking Confirmed!' : 'Booking Failed'}
                </h3>
                <p className={`mt-1 text-sm md:text-base break-words ${bookingResult.success ? 'text-green-700' : 'text-red-700'}`}>
                  {bookingResult.message}
                </p>
                {bookingResult.bookingNumber && (
                  <div className="mt-3 bg-white/50 rounded-xl p-3 md:p-4 border border-green-200">
                    <p className="text-xs text-green-600 font-medium">Your Booking Number:</p>
                    <p className="text-xl md:text-2xl font-bold text-green-700 mt-0.5 break-all">{bookingResult.bookingNumber}</p>
                    <p className="text-[11px] md:text-xs text-green-500 mt-1.5 leading-normal">
                      Save this number for future reference. Our team will contact you within 24 hours.
                    </p>
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => setBookingResult(null)}
                className="text-gray-400 hover:text-gray-600 text-xl p-1 -mt-1 touch-manipulation"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-6 md:py-12">
        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-2 order-1">
            <div className="bg-white rounded-xl md:rounded-2xl p-1 md:p-0 shadow-sm md:shadow-none border border-gray-100 md:border-none">
              <MultiPurposeBookingForm
                showTourSelector={true}
                onSuccess={handleBookingSuccess}
              />
            </div>
          </div>

          <div className="space-y-4 md:space-y-6 order-2 mt-2 lg:mt-0">
            <div className="block lg:hidden space-y-3">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleAccordion('whyBook')}
                  className="w-full flex items-center justify-between p-4 text-left font-bold text-gray-900 touch-manipulation"
                >
                  <span className="flex items-center gap-2 text-sm sm:text-base">
                    <ShieldCheck className="w-4 h-4 text-green-500" />
                    Why Book With Phoenix Ethiopia Tours
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${activeAccordion === 'whyBook' ? 'rotate-180' : ''}`} />
                </button>
                <div className={`transition-all duration-200 ease-in-out overflow-hidden ${activeAccordion === 'whyBook' ? 'max-h-60 border-t border-gray-100' : 'max-h-0'}`}>
                  <div className="p-4 bg-gray-50/50">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></div>
                        <span className="text-gray-700">Certified Ethiopian Guides</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></div>
                        <span className="text-gray-700">24/7 Local Support</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></div>
                        <span className="text-gray-700">Best Price Guarantee</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></div>
                        <span className="text-gray-700">Flexible Cancellation</span>
                      </li>
                      <li className="flex items-center gap-2 sm:col-span-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></div>
                        <span className="text-gray-700">Community Tourism Support</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleAccordion('experience')}
                  className="w-full flex items-center justify-between p-4 text-left font-bold text-gray-900 touch-manipulation"
                >
                  <span className="flex items-center gap-2 text-sm sm:text-base">
                    <Coffee className="w-4 h-4 text-yellow-600" />
                    Authentic Ethiopian Experience
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${activeAccordion === 'experience' ? 'rotate-180' : ''}`} />
                </button>
                <div className={`transition-all duration-200 ease-in-out overflow-hidden ${activeAccordion === 'experience' ? 'max-h-60 border-t border-gray-100' : 'max-h-0'}`}>
                  <div className="p-4 bg-gray-50/50">
                    <p className="text-xs sm:text-sm text-gray-700 mb-3 leading-relaxed">
                      All bookings include a traditional Ethiopian coffee ceremony and cultural briefing.
                    </p>
                    <div className="flex flex-wrap gap-4 text-xs text-gray-600">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-gray-400" />
                        <span>Max 12 people</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-gray-400" />
                        <span>Support communities</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden lg:block bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-green-500" />
                Why Book With Phoenix Ethiopia Tours
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

            <div className="hidden lg:block bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl shadow-lg p-6 border border-yellow-200">
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

            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl md:rounded-2xl shadow-sm md:shadow-lg p-5 md:p-6 border border-green-200">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-4">Need Help?</h3>
              <p className="text-xs md:text-sm text-gray-700 mb-4 leading-relaxed">
                Our Ethiopian travel experts are here to assist you.
              </p>
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
                <a
                  href="tel:+251 911 92 04 11"
                  className="flex items-center justify-center gap-2 py-3 px-2 bg-green-500 text-white text-xs sm:text-sm font-bold rounded-xl hover:bg-green-600 transition-colors shadow-sm active:scale-[0.98] min-h-[44px] touch-manipulation"
                >
                  <Phone className="w-3.5 h-3.5 block lg:hidden" />
                  <span>Call Office</span>
                </a>
                <a
                  href="https://wa.me/251912345678"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center py-3 px-2 border border-green-500 text-green-600 text-xs sm:text-sm font-bold rounded-xl hover:bg-green-50 transition-colors active:scale-[0.98] min-h-[44px] touch-manipulation"
                >
                  <span>WhatsApp Chat</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
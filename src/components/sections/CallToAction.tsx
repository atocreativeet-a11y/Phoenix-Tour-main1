// src/components/sections/CallToAction.tsx
import { Phone, Mail, MessageCircle, Calendar, ShieldCheck, Coffee, Flag } from 'lucide-react';
import Link from 'next/link';

export default function CallToAction() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background with Ethiopian colors gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-primary-600 to-orange-700">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* Ethiopian pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          backgroundSize: '200px'
        }}></div>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Ethiopian Badge */}
          <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-5 py-3 mb-8">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            </div>
            <Calendar className="w-4 h-4 text-white" />
            <span className="text-white font-medium">Limited Spots - Ethiopian High Season</span>
          </div>

          {/* Main Heading */}
          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            <span className="text-white">Ready to Explore </span>
            <span className="text-yellow-300">Ethiopia</span>
            <span className="text-white">?</span>
          </h2>

          {/* Description */}
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            Experience the land of origins today. Our expert-guided tours fill quickly during peak seasons!
          </p>

          {/* Action Buttons */}
          {/* <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link
              href="/tours/ethiopia"
              className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-green-700 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-2xl text-lg"
            >
              <Calendar className="w-5 h-5" />
              <span>Book Ethiopian Adventure</span>
              <Flag className="w-5 h-5 text-yellow-500 group-hover:rotate-12 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-transparent text-white font-bold rounded-xl border-2 border-white hover:bg-white/10 transition-all duration-300 hover:scale-105 text-lg"
            >
              <Coffee className="w-5 h-5" />
              <span>Schedule Free Consultation</span>
              <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </Link>
          </div> */}

          {/* Contact Info - Ethiopian Context */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-white transition-all duration-300 group">
              <div className="relative">
                <Phone className="w-8 h-8 text-white mb-4 mx-auto group-hover:scale-110 transition-transform" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div className="text-white font-semibold text-lg mb-2">Call Our Addis Ababa Office</div>
              <div className="text-white/80 text-xl font-semibold mb-1">+251 11 123 4567</div>
              <div className="text-white/80">(Ethiopian Office)</div>
              <div className="text-white/60 text-sm mt-2">Mon-Sun, 8am-8pm EAT</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-white transition-all duration-300 group">
              <div className="relative">
                <Mail className="w-8 h-8 text-white mb-4 mx-auto group-hover:scale-110 transition-transform" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full animate-pulse"></div>
              </div>
              <div className="text-white font-semibold text-lg mb-2">Email Our Local Team</div>
              <div className="text-white/80 text-lg">tours@phoenixtourethiopia.et</div>
              <div className="text-white/80 text-sm">(Primary Ethiopian Contact)</div>
              <div className="text-white/60 text-sm mt-2">Response within 1 hour during business hours</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-white transition-all duration-300 group">
              <div className="relative">
                <MessageCircle className="w-8 h-8 text-white mb-4 mx-auto group-hover:scale-110 transition-transform" />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
              </div>
              <div className="text-white font-semibold text-lg mb-2">WhatsApp Support</div>
              <div className="text-white/80 text-xl font-semibold mb-1">+251 91 234 5678</div>
              <div className="text-white/80">(Preferred by Local Guides)</div>
              <div className="text-white/60 text-sm mt-2">24/7 for urgent inquiries</div>
            </div>
          </div>

          {/* Ethiopian Cultural Guarantee Badge */}
          <div className="mt-12 inline-flex flex-col md:flex-row items-center gap-4 bg-white/20 backdrop-blur-sm rounded-2xl px-8 py-5 border border-white/30">
            <div className="flex items-center gap-4">
              <div className="relative">
                <ShieldCheck className="w-6 h-6 text-white" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="text-left">
                <div className="text-white font-semibold text-lg">
                  100% Authentic Ethiopian Experience Guarantee
                </div>
                <div className="text-white/80 text-sm">
                  • Local Ethiopian Guides Only • Community Tourism Support • Flexible Ethiopian Calendar Booking
                </div>
              </div>
            </div>
            
            {/* Ethiopian Calendar Note */}
            <div className="flex items-center gap-3 mt-4 md:mt-0 md:ml-6 pl-6 md:border-l border-white/30">
              <div className="flex flex-col items-center">
                <div className="text-yellow-300 font-bold text-2xl">13</div>
                <div className="text-white/80 text-xs">MONTHS</div>
              </div>
              <div className="text-white/70 text-sm max-w-[200px]">
                Plan according to Ethiopia's unique 13-month calendar for the best experience
              </div>
            </div>
          </div>

          {/* Ethiopian Cultural Note */}
          <div className="mt-8 inline-flex items-center gap-3 bg-yellow-500/20 backdrop-blur-sm rounded-full px-6 py-3 border border-yellow-500/30">
            <Coffee className="w-4 h-4 text-yellow-300" />
            <span className="text-yellow-100 text-sm">
              All bookings include a traditional Ethiopian coffee ceremony consultation
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
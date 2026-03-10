// src/app/not-found.tsx
import Link from 'next/link';
import { Home, Compass, Phone } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary-50 to-white p-4">
      <div className="max-w-lg w-full text-center">
        {/* Phoenix Logo */}
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary-500 to-orange-500 rounded-xl flex items-center justify-center mb-4">
            <div className="text-white text-2xl font-bold">PT</div>
          </div>
          <h1 className="text-2xl font-heading font-black text-gray-900">
            PHOENIX TOUR
          </h1>
          <p className="text-xs font-medium text-primary-500 tracking-widest uppercase mt-1">
            TAKE MEMORIES, LEAVE FOOTPRINTS
          </p>
        </div>

        {/* 404 Message */}
        <div className="mb-12">
          <div className="text-9xl font-bold text-primary-500/30 mb-4">404</div>
          <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">
            Adventure Not Found
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            The trail you're following seems to have disappeared. 
            But don't worry, Ethiopia has plenty of amazing paths to explore!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <Link
            href="/"
            className="flex flex-col items-center p-6 bg-white rounded-2xl border border-gray-200 hover:border-primary-500 hover:shadow-lg transition-all duration-300 group"
          >
            <Home className="w-8 h-8 text-primary-500 mb-3 group-hover:scale-110 transition-transform" />
            <div className="font-semibold text-gray-900">Home</div>
            <div className="text-gray-500 text-sm mt-1">Start fresh</div>
          </Link>

          <Link
            href="/tours"
            className="flex flex-col items-center p-6 bg-white rounded-2xl border border-gray-200 hover:border-primary-500 hover:shadow-lg transition-all duration-300 group"
          >
            <Compass className="w-8 h-8 text-primary-500 mb-3 group-hover:scale-110 transition-transform" />
            <div className="font-semibold text-gray-900">Tours</div>
            <div className="text-gray-500 text-sm mt-1">Find adventures</div>
          </Link>

          <Link
            href="/contact"
            className="flex flex-col items-center p-6 bg-white rounded-2xl border border-gray-200 hover:border-primary-500 hover:shadow-lg transition-all duration-300 group"
          >
            <Phone className="w-8 h-8 text-primary-500 mb-3 group-hover:scale-110 transition-transform" />
            <div className="font-semibold text-gray-900">Contact</div>
            <div className="text-gray-500 text-sm mt-1">Get help</div>
          </Link>
        </div>

        {/* Search Suggestion */}
        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-gray-200">
          <p className="text-gray-600 mb-4">Looking for something specific?</p>
          <Link
            href="/tours"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors"
          >
            Browse All Ethiopian Tours
          </Link>
        </div>
      </div>
    </div>
  );
}
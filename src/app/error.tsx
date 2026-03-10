// src/app/error.tsx
'use client'; // Add this directive at the top

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-md w-full text-center">
        {/* Error Icon */}
        <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-red-50 rounded-full flex items-center justify-center mx-auto mb-8 border-8 border-white shadow-lg">
          <AlertTriangle className="w-12 h-12 text-primary-500" />
        </div>

        {/* Error Message */}
        {/* <h1 className="text-3xl font-heading font-bold text-gray-900 mb-4">
          Oops! Something went wrong
        </h1>
        
        <p className="text-gray-600 mb-8">
          We're sorry, but an unexpected error has occurred. Our team has been notified and is working on a fix.
        </p> */}

        {/* Error Details (Collapsible) */}
        <details className="mb-8 text-left">
          <summary className="cursor-pointer text-gray-700 font-medium mb-2">
            Technical Details
          </summary>
          <div className="bg-gray-50 rounded-lg p-4 mt-2 text-sm font-mono">
            <p className="text-red-600">{error.message}</p>
            {error.digest && (
              <p className="mt-2 text-gray-500">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        </details>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-all duration-300 hover:scale-105"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
          
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 font-semibold rounded-lg border border-gray-300 hover:bg-gray-50 transition-all duration-300 hover:scale-105"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
        </div>

        {/* Contact Support */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm mb-2">
            Need immediate assistance?
          </p>
          <Link
            href="/contact"
            className="text-primary-500 hover:text-primary-600 font-medium inline-flex items-center gap-1"
          >
            Contact Support
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
'use client';

import Image from 'next/image';

export default function Logo() {
  return (
    <div className="flex flex-col group">
      <div className="flex items-center space-x-2 md:space-x-3">
        
        {/* Logo Image */}
        <div className="relative w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 flex-shrink-0">
          <Image
            src="/images/logos/logo4.png"
            alt="Phoenix Ethiopian Tours Logo"
            fill
            sizes="(max-width: 768px) 48px, (max-width: 1024px) 56px, 64px"
            className="object-contain"
            priority
          />
        </div>

        {/* Text */}
        <div className="flex flex-col justify-center">
          <div className="font-bold leading-tight">
            <div className="text-gray-900 text-sm">PHOENIX</div>
            <div className="text-gray-600 text-sm">ETHIOPIAN</div>
            <div className="text-gray-900 text-sm flex items-center gap-1">
              TOURS
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
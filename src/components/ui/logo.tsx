// components/ui/logo.tsx
'use client';

import { Footprints } from 'lucide-react';
import Image from 'next/image';

export default function Logo() {
  return (
    <div className="flex flex-col group">
      {/* Top row: Image and text side by side - Reduced height */}
      <div className="flex items-center space-x-2 md:space-x-3">
        {/* Logo Image - Smaller to fit navbar */}
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
        
        {/* Three texts - Reduced height to match smaller image */}
        <div className="flex flex-col justify-center h-10 md:h-12 lg:h-16 56px, 64px">
          <div className="font-bold">
            <div className="text-black-800 text-sm">PHOENIX</div>
            <div className="text-black-500 text-sm mt-[-0.2rem]">ETHIOPIAN</div>
            <div className="text-black-800 text-sm mt-[-0.2rem] flex items-center gap-1">
              TOURS
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
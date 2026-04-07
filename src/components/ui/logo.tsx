'use client';

import * as Icons from "lucide-react";

const Footprints = (Icons as any).Footprints || (() => null);
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
            alt="Phoenix Ethiopia Tours Logo"
            fill
            sizes="(max-width: 768px) 48px, (max-width: 1024px) 56px, 64px"
            className="object-contain"
            priority
          />
        </div>
        
        {/* Three texts - Reduced height to match smaller image */}
        <div className="flex flex-col justify-center h-12 md:h-14 lg:h-16">
          <div className="font-bold">
            <div className="text-blue-950 text-sm">PHOENIX</div>
            <div className="text-blue-950 text-sm mt-[-0.2rem]">ETHIOPIA</div>
            <div className="text-blue-950 text-sm mt-[-0.2rem] flex items-center gap-1">
              TOURS
              <Footprints className="w-5 h-5 text-blue-950" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Slogan - Reduced negative margin */}
      <div className="mt-0.8">
  <p className="text-[12px] md:text-[10px] text-blue-950 italic text-center leading-tight">
    <span className='text-yellow-500'>Take Memories,</span>{' '}
    Leave Footprints
  </p>
</div>
    </div>
  );
}
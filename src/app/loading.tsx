// src/app/loading.tsx
export default function Loading() {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center">
        {/* Animated compass */}
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className="absolute inset-0 border-2 border-primary-500/30 rounded-full"></div>
          <div className="absolute inset-4 border-2 border-primary-500/50 rounded-full animate-ping"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
          </div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
            <div className="w-4 h-4 bg-primary-500 rounded-full"></div>
          </div>
        </div>
        
        {/* Text with fade animation */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900 animate-pulse">
            Discovering Adventures
          </h3>
          <p className="text-sm text-gray-600">
            Please wait while we prepare your journey...
          </p>
        </div>
        
        {/* Progress bar - Using Tailwind animation */}
        <div className="mt-8 w-64 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary-500 to-orange-500 animate-[marquee_2s_ease-in-out_infinite]"></div>
        </div>
      </div>
    </div>
  );
}
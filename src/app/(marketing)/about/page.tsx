"use client";

import { useState } from "react";
import WhyChooseUs from "@/components/sections/WhyChooseUs";

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<"mission" | "story">("mission");

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 overflow-x-hidden">
      <div className="container mx-auto px-4 py-10 md:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <div className="inline-flex items-center gap-2 text-primary-500 text-xs md:text-sm font-semibold mb-3 md:mb-4 tracking-wider">
              <div className="w-2 h-2 md:w-4 md:h-4 bg-primary-500 rounded-full"></div>
              OUR ETHIOPIAN STORY
            </div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold mb-4 md:mb-6 leading-tight">
              <span className="text-gray-900">About </span>
              <span className="text-primary-500">Phoenix Ethiopia Tours</span>
            </h1>
            <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto px-2">
              Your trusted partner for authentic Ethiopian travel experiences since 2010
            </p>
          </div>

          <div className="mb-10 md:mb-12">
            <div className="relative h-56 md:h-96 rounded-xl md:rounded-2xl overflow-hidden shadow-md">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/30 to-transparent z-10"></div>
              <div className="absolute inset-0 bg-cover bg-center" style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1559561736-9e6dafa9e7b0?auto=format&fit=crop&w=1200&q=80)'
              }}></div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5 md:p-8 text-white z-20">
                <h2 className="text-lg md:text-2xl font-bold leading-tight">Land of Origins • 13 Months of Sunshine</h2>
              </div>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="block md:hidden mb-6">
              <div className="flex border-b border-gray-200">
                <button
                  type="button"
                  onClick={() => setActiveTab("mission")}
                  className={`flex-1 py-3 text-center font-medium text-sm transition-colors border-b-2 ${
                    activeTab === "mission"
                      ? "border-primary-500 text-primary-500 font-bold"
                      : "border-transparent text-gray-500"
                  }`}
                >
                  Our Mission
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("story")}
                  className={`flex-1 py-3 text-center font-medium text-sm transition-colors border-b-2 ${
                    activeTab === "story"
                      ? "border-primary-500 text-primary-500 font-bold"
                      : "border-transparent text-gray-500"
                  }`}
                >
                  Our Story
                </button>
              </div>
            </div>

            <div className="hidden md:grid grid-cols-2 gap-12 mb-16">
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 h-full">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
                <p className="text-gray-700 mb-4">
                  At Phoenix Ethiopia Tour, we are passionate about showcasing the rich cultural
                  heritage, breathtaking landscapes, and extraordinary history of Ethiopia. Founded
                  with a vision to provide authentic and memorable travel experiences, we are
                  dedicated to making your Ethiopian journey safe, comfortable, and truly
                  unforgettable.
                </p>
                <p className="text-gray-700">
                  Our motto <strong>"Take Memories, Leave Footprints"</strong> reflects our commitment to responsible
                  tourism that benefits local communities while providing unforgettable experiences.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 h-full">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
                <p className="text-gray-700 mb-4">
                  Founded in 2010 by a group of passionate Ethiopian guides, Phoenix Tour began with
                  a simple mission: to share the true beauty of Ethiopia with the world.
                </p>
                <p className="text-gray-700 mb-4">
                  What started as small group tours to the Simien Mountains has grown into one of
                  Ethiopia's most respected tour operators, offering experiences across all major regions.
                </p>
                <p className="text-gray-700">
                  Today, we're proud to have introduced thousands of travelers to Ethiopia's wonders
                  while directly supporting over 50 local communities through our tourism initiatives.
                </p>
              </div>
            </div>

            <div className="block md:hidden mb-10">
              {activeTab === "mission" && (
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 animate-fadeInDynamic">
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    At Phoenix Ethiopia Tour, we are passionate about showcasing the rich cultural
                    heritage, breathtaking landscapes, and extraordinary history of Ethiopia. Founded
                    with a vision to provide authentic and memorable travel experiences, we are
                    dedicated to making your Ethiopian journey safe, comfortable, and truly
                    unforgettable.
                  </p>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Our motto <strong>"Take Memories, Leave Footprints"</strong> reflects our commitment to responsible
                    tourism that benefits local communities while providing unforgettable experiences.
                  </p>
                </div>
              )}

              {activeTab === "story" && (
                <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 animate-fadeInDynamic">
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    Founded in 2010 by a group of passionate Ethiopian guides, Phoenix Tour began with
                    a simple mission: to share the true beauty of Ethiopia with the world.
                  </p>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    What started as small group tours to the Simien Mountains has grown into one of
                    Ethiopia's most respected tour operators, offering experiences across all major regions.
                  </p>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Today, we're proud to have introduced thousands of travelers to Ethiopia's wonders
                    while directly supporting over 50 local communities through our tourism initiatives.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-gradient-to-b from-gray-50 to-white py-12 md:py-24 border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <WhyChooseUs />
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 md:mb-16">
            <div className="bg-gradient-to-r from-primary-500 to-orange-500 rounded-xl md:rounded-2xl p-6 md:p-8 text-white shadow-lg">
              <h3 className="text-lg md:text-xl font-bold mb-6 text-center tracking-wide">By the Numbers</h3>
              
              <div className="flex md:grid md:grid-cols-4 gap-4 overflow-x-auto pb-3 pt-1 px-1 snap-x snap-mandatory scrollbar-none md:overflow-visible md:pb-0 md:snap-none">
                <div className="flex-shrink-0 w-[42%] sm:w-[30%] md:w-full text-center snap-center bg-white/10 md:bg-transparent p-4 md:p-0 rounded-lg backdrop-blur-sm md:backdrop-blur-none">
                  <div className="text-2xl md:text-3xl font-bold mb-1">14+</div>
                  <div className="text-xs md:text-sm opacity-90 whitespace-nowrap">Years Experience</div>
                </div>
                <div className="flex-shrink-0 w-[42%] sm:w-[30%] md:w-full text-center snap-center bg-white/10 md:bg-transparent p-4 md:p-0 rounded-lg backdrop-blur-sm md:backdrop-blur-none">
                  <div className="text-2xl md:text-3xl font-bold mb-1">10,000+</div>
                  <div className="text-xs md:text-sm opacity-90 whitespace-nowrap">Travelers Served</div>
                </div>
                <div className="flex-shrink-0 w-[42%] sm:w-[30%] md:w-full text-center snap-center bg-white/10 md:bg-transparent p-4 md:p-0 rounded-lg backdrop-blur-sm md:backdrop-blur-none">
                  <div className="text-2xl md:text-3xl font-bold mb-1">50+</div>
                  <div className="text-xs md:text-sm opacity-90 whitespace-nowrap">Local Guides</div>
                </div>
                <div className="flex-shrink-0 w-[42%] sm:w-[30%] md:w-full text-center snap-center bg-white/10 md:bg-transparent p-4 md:p-0 rounded-lg backdrop-blur-sm md:backdrop-blur-none">
                  <div className="text-2xl md:text-3xl font-bold mb-1">98%</div>
                  <div className="text-xs md:text-sm opacity-90 whitespace-nowrap">Satisfaction Rate</div>
                </div>
              </div>
              
              <div className="flex justify-center gap-1.5 mt-2 md:hidden">
                <div className="w-1.5 h-1.5 rounded-full bg-white/40"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-white/40"></div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
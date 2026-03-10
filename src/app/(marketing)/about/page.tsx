import WhyChooseUs from "@/components/sections/WhyChooseUs";

// src/app/(marketing)/about/page.tsx
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-primary-500 font-semibold mb-4">
              <div className="w-4 h-4 bg-primary-500 rounded-full"></div>
              OUR ETHIOPIAN STORY
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              <span className="text-gray-900">About </span>
              <span className="text-primary-500">Phoenix Tour</span>
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Your trusted partner for authentic Ethiopian travel experiences since 2010
            </p>
          </div>

          {/* Hero Image */}
          <div className="mb-12">
            <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/30 to-transparent z-10"></div>
              <div className="absolute inset-0 bg-cover bg-center" style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1559561736-9e6dafa9e7b0?auto=format&fit=crop&w=1200&q=80)'
              }}></div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8 text-white z-20">
                <h2 className="text-2xl font-bold">Land of Origins • 13 Months of Sunshine</h2>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div>
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
              </div>

              <div>
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
            </div>

            {/* Stats Section */}
            
          </div>
        </div>
      </div>

      {/* Full Screen Width WhyChooseUs Section - Breaks out of container */}
      <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
        <WhyChooseUs />
     
      </div>

      {/* Rest of the page content if any */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
           <div className="mb-16">
              <div className="bg-gradient-to-r from-primary-500 to-orange-500 rounded-2xl p-8 text-white">
                <h3 className="text-xl font-bold mb-6 text-center">By the Numbers</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1">14+</div>
                    <div className="text-sm opacity-90">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1">10,000+</div>
                    <div className="text-sm opacity-90">Travelers Served</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1">50+</div>
                    <div className="text-sm opacity-90">Local Guides</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1">98%</div>
                    <div className="text-sm opacity-90">Satisfaction Rate</div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
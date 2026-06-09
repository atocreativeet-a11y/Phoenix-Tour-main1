'use client';

import * as Icons from "lucide-react";
import { useState } from 'react';

const Star = (Icons as any).Star;
const Quote = (Icons as any).Quote;
const MapPin = (Icons as any).MapPin;
const Globe = (Icons as any).Globe;
const Award = (Icons as any).Award;

const testimonials = [
  {
    id: 1,
    name: 'Selamawi T.',
    role: 'Ethiopian Diaspora Returnee',
    content: 'Phoenix Tour showed me parts of Ethiopia I never knew existed. The Omo Valley tour was life-changing - authentic, respectful, and deeply moving.',
    rating: 5,
    origin: 'Addis Ababa, Ethiopia',
    date: '3 weeks ago',
    tour: 'Omo Valley Cultural Tour'
  },
  {
    id: 2,
    name: 'Dr. James Wilson',
    role: 'Anthropology Professor',
    content: 'As an academic studying East African cultures, I was impressed by Phoenix Tour\'s ethical approach. Their guides have deep local knowledge and genuine relationships with communities.',
    rating: 5,
    origin: 'London, UK',
    date: '1 month ago',
    tour: 'Tribal Cultural Immersion'
  },
  {
    id: 3,
    name: 'Liya & Mikael',
    role: 'Adventure Couple',
    content: 'The Simien Mountains trek exceeded all expectations! Our guide was not only knowledgeable about the trails but also shared fascinating stories about Ethiopian history. We felt completely safe and cared for.',
    rating: 5,
    origin: 'Stockholm, Sweden',
    date: '2 weeks ago',
    tour: 'Simien Mountains Expedition'
  },
  {
    id: 4,
    name: 'Amina Hassan',
    role: 'Documentary Filmmaker',
    content: 'I\'ve traveled with many tour companies in Africa, but Phoenix Tour stands out. Their commitment to supporting local communities is real. The coffee ceremony experience was authentic and unforgettable.',
    rating: 5,
    origin: 'Nairobi, Kenya',
    date: '6 weeks ago',
    tour: 'Coffee Origin Journey'
  },
  {
    id: 5,
    name: 'Dr. Chen Wei',
    role: 'Geology Researcher',
    content: 'The Danakil Depression tour was scientifically fascinated. The guides were well-informed about geology and safety protocols. An extreme environment handled with extreme professionalism.',
    rating: 5,
    origin: 'Beijing, China',
    date: '1 month ago',
    tour: 'Danakil Depression Expedition'
  },
  {
    id: 6,
    name: 'Maria Rodriguez',
    role: 'Photography Workshop Leader',
    content: 'Perfect for photography enthusiasts! The guides knew exactly when and where to capture the best light. Lalibela at sunrise was magical. Already planning my return trip.',
    rating: 5,
    origin: 'Barcelona, Spain',
    date: '3 weeks ago',
    tour: 'Northern Historical Route'
  }
];

export default function Testimonials() {
  const [activeTab, setActiveTab] = useState('all');

  const filteredTestimonials = activeTab === 'all' 
    ? testimonials 
    : testimonials.filter(t => 
        activeTab === 'cultural' ? t.tour.includes('Cultural') || t.tour.includes('Tribal') :
        activeTab === 'adventure' ? t.tour.includes('Mountains') || t.tour.includes('Expedition') || t.tour.includes('Danakil') :
        activeTab === 'photography' ? t.tour.includes('Historical') || t.tour.includes('Route') || t.tour.includes('Photography') :
        testimonials
      );

  return (
    <section className="w-full py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      
      {/* HEADER WRAPPER */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-primary-500 font-semibold mb-4">
            <div className="w-4 h-4 bg-primary-500 rounded-full animate-pulse"></div>
            TRAVELER EXPERIENCES IN ETHIOPIA
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            <span className="text-gray-900">Global Travelers, </span>
            <span className="text-primary-500">Authentic Experiences</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-10">
            Hear from travelers who have discovered Ethiopia's wonders with Phoenix Tour. 
            From diaspora returnees to international explorers, our guests share their journeys.
          </p>

          {/* Filter Categories Track */}
          <div className="flex flex-nowrap overflow-x-auto gap-3 mb-12 pb-2 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {['all', 'cultural', 'adventure', 'photography'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-shrink-0 px-5 py-2.5 rounded-full font-medium transition-all duration-300 border ${
                  activeTab === tab 
                    ? 'bg-primary-500 text-white border-primary-500' 
                    : 'bg-white text-gray-700 hover:bg-primary-50 border-gray-300 hover:border-primary-300'
                }`}
              >
                {tab === 'all' && 'All Experiences'}
                {tab === 'cultural' && 'Cultural Tours'}
                {tab === 'adventure' && 'Adventure Expeditions'}
                {tab === 'photography' && 'Photography Tours'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FIXED CAROUSEL TRACK */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex flex-nowrap overflow-x-auto gap-6 lg:gap-8 pb-8 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory touch-pan-x">
          {filteredTestimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="relative flex-shrink-0 w-[calc(100%-24px)] sm:w-[calc((100%-24px)/2)] lg:w-[calc((100%-64px)/3)] snap-start bg-white rounded-2xl p-8 border border-gray-200 hover:border-primary-500 transition-all duration-300 md:hover:-translate-y-2 hover:shadow-2xl group flex flex-col justify-between"
            >
              <div>
                <Quote className="absolute top-8 left-8 w-10 h-10 text-primary-500/10 group-hover:text-primary-500/20 transition-colors" />
                
                <div className="flex gap-1 mb-6 relative z-10">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary-500 text-primary-500" />
                  ))}
                </div>
                
                <p className="text-gray-700 text-base md:text-lg mb-6 italic leading-relaxed relative z-10">
                  "{testimonial.content}"
                </p>
              </div>
              
              <div>
                <div className="mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-50 text-primary-700 rounded-full text-sm font-medium">
                    <MapPin className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate max-w-[220px]">{testimonial.tour}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="relative flex-shrink-0">
                    <div className="w-14 h-14 rounded-full overflow-hidden bg-gradient-to-br from-primary-500 to-yellow-600 p-0.5 group-hover:scale-110 transition-transform duration-300">
                      <div className="w-full h-full rounded-full bg-white p-0.5">
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                          <span className="text-lg font-semibold text-gray-700">
                            {testimonial.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white border-2 border-white flex items-center justify-center shadow-sm">
                      <Globe className="w-3 h-3 text-gray-600" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 truncate">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm truncate">{testimonial.role}</div>
                    <div className="flex items-center gap-2 text-gray-500 text-xs mt-1 flex-wrap">
                      <span className="truncate">{testimonial.origin}</span>
                      <span className="text-gray-400">•</span>
                      <span className="flex-shrink-0">{testimonial.date}</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* FOOTER AREA */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="text-center mt-6">
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-500 font-semibold rounded-xl border-2 border-primary-500 hover:bg-primary-50 transition-all duration-300 hover:scale-105">
            View More Traveler Stories
            <span className="text-lg">→</span>
          </button>
        </div>

        <div className="mt-20 pt-16 border-t border-gray-200">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 mb-8">
              <Award className="w-6 h-6 text-primary-500" />
              <h3 className="text-2xl font-heading font-bold text-gray-900">
                Recognized for Excellence in Ethiopian Tourism
              </h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-primary-500 mb-2">98%</div>
                <div className="text-gray-700 font-medium text-sm md:text-base">Guest Satisfaction</div>
                <div className="text-gray-500 text-xs md:text-sm">Based on 500+ reviews</div>
              </div>
              
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-primary-500 mb-2">100%</div>
                <div className="text-gray-700 font-medium text-sm md:text-base">Ethiopian Guides</div>
                <div className="text-gray-500 text-xs md:text-sm">Certified local experts</div>
              </div>
              
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-primary-500 mb-2">5★</div>
                <div className="text-gray-700 font-medium text-sm md:text-base">TripAdvisor Rating</div>
                <div className="text-gray-500 text-xs md:text-sm">Consistent excellence</div>
              </div>
              
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-primary-500 mb-2">15+</div>
                <div className="text-gray-700 font-medium text-sm md:text-base">Years Experience</div>
                <div className="text-gray-500 text-xs md:text-sm">In Ethiopian tourism</div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-gray-600 mb-6 text-sm font-medium tracking-wide">Proud Member of Ethiopian Tourism Organizations</p>
              <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 opacity-75">
                <div className="text-xs md:text-sm font-bold text-gray-700 bg-gray-100 px-4 py-2 rounded-lg">ETA</div>
                <div className="text-xs md:text-sm font-bold text-gray-700 bg-gray-100 px-4 py-2 rounded-lg">ETTA</div>
                <div className="text-xs md:text-sm font-bold text-gray-700 bg-gray-100 px-4 py-2 rounded-lg">UNESCO ETHIOPIA</div>
                <div className="text-xs md:text-sm font-bold text-gray-700 bg-gray-100 px-4 py-2 rounded-lg">ETHIOPIAN CULTURAL HERITAGE</div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}
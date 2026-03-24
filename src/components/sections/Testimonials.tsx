// src/components/sections/Testimonials.tsx
'use client';

import { Star, Quote, MapPin, Globe, Award } from 'lucide-react';
import { useState } from 'react';

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
    content: 'The Danakil Depression tour was scientifically fascinating. The guides were well-informed about geology and safety protocols. An extreme environment handled with extreme professionalism.',
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
        testimonials
      );

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
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

          {/* Testimonial Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {['all', 'cultural', 'adventure', 'photography'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 border ${
                  activeTab === tab 
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30 border-primary-500' 
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

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTestimonials.slice(0, 3).map((testimonial) => (
            <div 
              key={testimonial.id}
              className="relative bg-white rounded-2xl p-8 border border-gray-200 hover:border-primary-500 transition-all duration-300 hover:shadow-2xl group"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-8 left-8 w-10 h-10 text-primary-500/10 group-hover:text-primary-500/20 transition-colors" />
              
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary-500 text-primary-500" />
                ))}
              </div>
              
              {/* Content */}
              <p className="text-gray-700 text-lg mb-8 italic leading-relaxed">
                "{testimonial.content}"
              </p>
              
              {/* Tour Badge */}
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-50 text-primary-700 rounded-full text-sm font-medium">
                  <MapPin className="w-3 h-3" />
                  {testimonial.tour}
                </div>
              </div>
              
              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-gradient-to-br from-primary-500 to-yellow-600 p-0.5 group-hover:scale-110 transition-transform duration-300">
                    <div className="w-full h-full rounded-full bg-white p-0.5">
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <span className="text-lg font-semibold text-gray-700">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white border-2 border-white flex items-center justify-center">
                    <Globe className="w-3 h-3 text-gray-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-600 text-sm">{testimonial.role}</div>
                  <div className="flex items-center gap-2 text-gray-500 text-xs mt-1">
                    <MapPin className="w-3 h-3" />
                    {testimonial.origin}
                    <span className="text-gray-400">•</span>
                    {testimonial.date}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-500 font-semibold rounded-xl border-2 border-primary-500 hover:bg-primary-50 transition-all duration-300 hover:scale-105">
            View More Traveler Stories
            <span className="text-lg">→</span>
          </button>
        </div>

        {/* Trust Indicators - Ethiopian Context */}
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
                <div className="text-gray-700 font-medium">Guest Satisfaction</div>
                <div className="text-gray-500 text-sm">Based on 500+ reviews</div>
              </div>
              
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-primary-500 mb-2">100%</div>
                <div className="text-gray-700 font-medium">Ethiopian Guides</div>
                <div className="text-gray-500 text-sm">Certified local experts</div>
              </div>
              
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-primary-500 mb-2">5★</div>
                <div className="text-gray-700 font-medium">TripAdvisor Rating</div>
                <div className="text-gray-500 text-sm">Consistent excellence</div>
              </div>
              
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-primary-500 mb-2">15+</div>
                <div className="text-gray-700 font-medium">Years Experience</div>
                <div className="text-gray-500 text-sm">In Ethiopian tourism</div>
              </div>
            </div>

            {/* Ethiopian Tourism Associations */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-gray-600 mb-6">Proud Member of Ethiopian Tourism Organizations</p>
              <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-70">
                <div className="text-lg font-bold text-gray-700 bg-gray-100 px-4 py-2 rounded-lg">ETA</div>
                <div className="text-lg font-bold text-gray-700 bg-gray-100 px-4 py-2 rounded-lg">ETTA</div>
                <div className="text-lg font-bold text-gray-700 bg-gray-100 px-4 py-2 rounded-lg">UNESCO ETHIOPIA</div>
                <div className="text-lg font-bold text-gray-700 bg-gray-100 px-4 py-2 rounded-lg">ETHIOPIAN CULTURAL HERITAGE</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
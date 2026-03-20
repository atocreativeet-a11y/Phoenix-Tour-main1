// src/components/sections/Testimonials.tsx
'use client';

import { Star, Quote, MapPin, Award } from 'lucide-react';
import { useState } from 'react';

const testimonials = [
  {
    id: 1,
    name: 'Selamawi T.',
    role: 'Ethiopian Diaspora Returnee',
    content:
      'Phoenix Tour showed me parts of Ethiopia I never knew existed. The Omo Valley tour was life-changing - authentic, respectful, and deeply moving.',
    rating: 5,
    origin: 'Addis Ababa, Ethiopia',
    date: '3 weeks ago',
    tour: 'Omo Valley Cultural Tour',
  },
  {
    id: 2,
    name: 'Dr. James Wilson',
    role: 'Anthropology Professor',
    content:
      "As an academic studying East African cultures, I was impressed by Phoenix Tour's ethical approach. Their guides have deep local knowledge and genuine relationships with communities.",
    rating: 5,
    origin: 'London, UK',
    date: '1 month ago',
    tour: 'Tribal Cultural Immersion',
  },
  {
    id: 3,
    name: 'Liya & Mikael',
    role: 'Adventure Couple',
    content:
      'The Simien Mountains trek exceeded all expectations! Our guide was not only knowledgeable about the trails but also shared fascinating stories about Ethiopian history. We felt completely safe and cared for.',
    rating: 5,
    origin: 'Stockholm, Sweden',
    date: '2 weeks ago',
    tour: 'Simien Mountains Expedition',
  },
];

export default function Testimonials() {
  const [activeTab, setActiveTab] = useState('all');

  const filteredTestimonials =
    activeTab === 'all'
      ? testimonials
      : testimonials.filter((t) =>
          activeTab === 'cultural'
            ? t.tour.includes('Cultural') || t.tour.includes('Tribal')
            : activeTab === 'adventure'
            ? t.tour.includes('Mountains') ||
              t.tour.includes('Expedition') ||
              t.tour.includes('Danakil')
            : activeTab === 'photography'
            ? t.tour.includes('Photography')
            : false
        );

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-primary-500 font-semibold mb-3 text-sm">
            <div className="w-3 h-3 bg-primary-500 rounded-full animate-pulse"></div>
            TRAVELER EXPERIENCES
          </div>

          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-3">
            <span className="text-gray-900">Global Travelers, </span>
            <span className="text-primary-500">Authentic Experiences</span>
          </h2>

          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto mb-6">
            Hear from travelers discovering Ethiopia with Phoenix Tour.
          </p>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {['all', 'cultural', 'adventure', 'photography'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-xs md:text-sm font-medium border transition ${
                  activeTab === tab
                    ? 'bg-primary-500 text-white border-primary-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-primary-50'
                }`}
              >
                {tab === 'all' && 'All'}
                {tab === 'cultural' && 'Cultural'}
                {tab === 'adventure' && 'Adventure'}
                {tab === 'photography' && 'Photography'}
              </button>
            ))}
          </div>
        </div>

        {/* MOBILE CAROUSEL */}
        <div className="flex md:hidden flex-col">
          <div className="flex justify-center items-center gap-2 text-gray-400 text-xs mb-2 animate-pulse">
            <span>←</span>
            <span>Swipe</span>
            <span>→</span>
          </div>

          <div className="flex overflow-x-auto gap-4 pb-3 snap-x snap-mandatory scroll-smooth px-2">
            {filteredTestimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="min-w-[80%] snap-center bg-white rounded-xl p-5 border border-gray-200"
              >
                <Quote className="w-6 h-6 text-primary-500/10 mb-2" />

                <div className="flex gap-1 mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-primary-500 text-primary-500"
                    />
                  ))}
                </div>

                <p className="text-gray-700 text-sm italic mb-3 leading-snug">
                  "{testimonial.content}"
                </p>

                <div className="text-xs text-gray-600">
                  {testimonial.name} • {testimonial.role}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DESKTOP GRID */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.slice(0, 3).map((testimonial) => (
            <div
              key={testimonial.id}
              className="relative bg-white rounded-xl p-5 border border-gray-200 hover:shadow-lg transition"
            >
              <Quote className="absolute top-3 left-3 w-6 h-6 text-primary-500/10" />

              <div className="flex gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-primary-500 text-primary-500"
                  />
                ))}
              </div>

              <p className="text-gray-700 text-sm mb-4 italic leading-snug">
                "{testimonial.content}"
              </p>

              <div className="mb-4">
                <div className="inline-flex items-center gap-2 px-2 py-1 bg-primary-50 text-primary-700 rounded-full text-xs">
                  <MapPin className="w-3 h-3" />
                  {testimonial.tour}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-sm">
                  {testimonial.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>

                <div>
                  <div className="font-semibold text-sm">
                    {testimonial.name}
                  </div>
                  <div className="text-gray-500 text-xs">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <button className="px-5 py-2.5 text-sm bg-white text-primary-500 font-semibold rounded-lg border border-primary-500 hover:bg-primary-50 transition">
            View More Stories →
          </button>
        </div>

        {/* Trust */}
        <div className="mt-14 pt-10 border-t border-gray-200 text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <Award className="w-5 h-5 text-primary-500" />
            <h3 className="text-lg md:text-xl font-bold">
              Recognized for Excellence
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
            <div>
              <div className="text-2xl font-bold text-primary-500">98%</div>
              <div>Guest Satisfaction</div>
            </div>

            <div>
              <div className="text-2xl font-bold text-primary-500">100%</div>
              <div>Ethiopian Guides</div>
            </div>

            <div>
              <div className="text-2xl font-bold text-primary-500">5★</div>
              <div>TripAdvisor</div>
            </div>

            <div>
              <div className="text-2xl font-bold text-primary-500">5+</div>
              <div>Years Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
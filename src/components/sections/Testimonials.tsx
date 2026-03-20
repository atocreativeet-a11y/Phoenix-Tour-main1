'use client';

import { Star, Quote, MapPin, Award } from 'lucide-react';
import { useState, useRef } from 'react';

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

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

  const handleScroll = () => {
    if (!scrollRef.current) return;

    const container = scrollRef.current;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.offsetWidth * 0.8 + 16;

    const index = Math.round(scrollLeft / cardWidth);
    setCurrentIndex(index);
  };

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;

    const container = scrollRef.current;
    const cardWidth = container.offsetWidth * 0.8 + 16;

    container.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth',
    });

    setCurrentIndex(index);
  };

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Global Travelers, <span className="text-primary-500">Authentic Experiences</span>
          </h2>
        </div>

        {/* MOBILE CAROUSEL */}
        <div className="flex md:hidden flex-col">
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto gap-4 pb-3 snap-x snap-mandatory scroll-smooth px-2 no-scrollbar"
          >
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

                <p className="text-gray-700 text-sm italic mb-3">
                  "{testimonial.content}"
                </p>

                <div className="text-xs text-gray-600">
                  {testimonial.name} • {testimonial.role}
                </div>
              </div>
            ))}
          </div>

          {/* DOT INDICATORS */}
          <div className="flex justify-center mt-4 gap-2">
            {filteredTestimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  currentIndex === index
                    ? 'bg-primary-500 scale-110'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* DESKTOP GRID */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 mt-10">
          {filteredTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl p-5 border border-gray-200"
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

              <p className="text-sm italic mb-3">
                "{testimonial.content}"
              </p>

              <div className="text-xs text-gray-600">
                {testimonial.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
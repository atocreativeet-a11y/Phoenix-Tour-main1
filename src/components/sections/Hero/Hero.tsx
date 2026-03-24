// src/components/sections/Hero/Hero.tsx
'use client';

import { ArrowRight, MapPin, Calendar, Users, Shield, UserCheck, Zap, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import ApplyTourModal from '@/components/modals/ApplyTourModal';

export default function Hero() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);

  const heroImages = [
    'https://images.unsplash.com/photo-1573404353091-bd68e3010d73?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ];

  const stats = [
    { label: 'Destinations', value: '50+', icon: MapPin },
    { label: 'Tours Completed', value: '2,500+', icon: Calendar },
    { label: 'Happy Travelers', value: '10,000+', icon: Users }
  ];

  const trustSignals = [
    { text: 'Local Ethiopian tour operator', icon: UserCheck },
    { text: 'Licensed & experienced guides', icon: Shield },
    { text: 'Custom & private tours available', icon: Zap },
    { text: '24/7 WhatsApp support', icon: MessageCircle }
  ];

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Gradient */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url(${heroImages[0]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        />

        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-secondary-500/10 animate-pulse-slow" />

        <div className="container relative z-10 mx-auto px-4 py-20 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8 animate-slide-in">
            <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></span>
            <span className="text-white text-sm font-medium">Authentic Ethiopian Experiences Since 2010</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-4">
            <span className="text-white">Authentic Ethiopia Tours</span>
            <br />
            <span className="text-primary-500 animate-pulse">with Local Experts</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-2">
            Culture • Nature • Wildlife • Adventure
          </p>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-10">
            Tailor-made private and group tours across Ethiopia — Lalibela, Axum, Afar, Omo Valley, Simien Mountains & more.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary-500/30"
            >
              Get a Custom Itinerary
              <ArrowRight className="w-5 h-5" />
            </button>

<a
  href="#tours"
  onClick={(e) => {
    e.preventDefault();
    
    // First try to find the tours section
    const toursSection = document.getElementById('tours');
    
    if (toursSection) {
      // Calculate the position to scroll to
      const elementPosition = toursSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - 100; // 100px offset for header
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Also add a visual indicator
      toursSection.classList.add('highlight-section');
      setTimeout(() => {
        toursSection.classList.remove('highlight-section');
      }, 2000);
    } else {
      // Fallback: log error and scroll down
      console.log('Tours section not found, scrolling down');
      window.scrollBy({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    }
  }}
  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl"
>
  View All Tours
</a>
          </div>

          {/* Trust Signals */}
          <div className="max-w-6xl mx-auto mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {trustSignals.map((signal, index) => {
                const Icon = signal.icon;
                return (
                  <div 
                    key={signal.text}
                    className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-primary-500/30 transition-all duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="p-2 bg-primary-500/20 rounded-lg">
                      <Icon className="w-5 h-5 text-primary-500" />
                    </div>
                    <span className="text-white text-sm font-medium text-left">{signal.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

        

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={stat.label}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:border-primary-500 transition-all duration-300 hover:scale-105"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="p-3 bg-primary-500/20 rounded-full">
                      <Icon className="w-6 h-6 text-primary-500" />
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-white/80">{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="animate-bounce">
              <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-primary-500 rounded-full mt-2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <ApplyTourModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
}
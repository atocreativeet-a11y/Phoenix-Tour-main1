'use client';

import { useState } from 'react';
import * as Icons from "lucide-react";

const Phone = (Icons as any).Phone;
const Mail = (Icons as any).Mail;
const MapPin = (Icons as any).MapPin;
const Clock = (Icons as any).Clock;
const MessageCircle = (Icons as any).MessageCircle;
const Coffee = (Icons as any).Coffee;
const Navigation = (Icons as any).Navigation;
const Globe = (Icons as any).Globe;
const ChevronDown = (Icons as any).ChevronDown;

export default function ContactPage() {
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  const toggleAccordion = (section: string) => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  // Google Maps safe URL configuration for your specific location
  const mapEmbedUrl = "https://maps.google.com/maps?q=Phoenix+Ethiopia+Tours,+Bole+Road,+Addis+Ababa,+Ethiopia&t=&z=15&ie=UTF8&iwloc=&output=embed";
  const directionsUrl = "https://www.google.com/maps/dir/?api=1&destination=Phoenix+Ethiopia+Tours,+Bole+Road,+Addis+Ababa,+Ethiopia";

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-10 md:py-20 overflow-x-hidden max-w-[100vw]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 md:mb-16">
          <div className="inline-flex items-center gap-1.5 text-primary-500 text-xs md:text-sm font-bold tracking-wider mb-2 md:mb-4 bg-primary-50 px-3 py-1 rounded-full">
            <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
            GET IN TOUCH
          </div>
          <h1 className="text-2xl md:text-5xl font-heading font-bold mb-3 md:mb-6 leading-tight text-gray-900">
            Contact <span className="text-primary-500">Phoenix Tours</span>
          </h1>
          <p className="text-gray-600 text-sm md:text-lg max-w-2xl mx-auto px-2">
            Ready to explore Ethiopia? Our Ethiopian team is here to help plan your perfect adventure.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 md:gap-12">
          {/* Contact Information - Left Side */}
          <div className="lg:col-span-1 space-y-4 md:space-y-8 order-2 lg:order-1">
            {/* Ethiopian Office Card */}
            <div className="bg-white rounded-xl md:rounded-2xl p-5 md:p-8 shadow-md border border-gray-200">
              <div className="flex items-start gap-3.5 mb-5 md:mb-6">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 md:w-6 md:h-6 text-primary-500" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1.5">Our Addis Ababa Office</h3>
                  <p className="text-sm text-gray-600 leading-normal break-words">
                    Bole Road, Addis Ababa<br />
                    Ethiopia
                  </p>
                </div>
              </div>

              {/* Contact Details */}
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs text-gray-400 font-medium">Phone (Ethiopia)</div>
                    <a href="tel:+251911920411" className="font-bold text-sm md:text-base text-gray-900 hover:text-primary-500 transition-colors block truncate">
                      +251 911 92 04 11
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs text-gray-400 font-medium">Email</div>
                    <a href="mailto:contact@phoenixethiopiatours.com" className="font-bold text-xs md:text-sm text-gray-900 hover:text-primary-500 transition-colors block truncate">
                      contact@phoenixethiopiatours.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs text-gray-400 font-medium">WhatsApp</div>
                    <a href="https://wa.me/251911920411" target="_blank" rel="noopener noreferrer" className="font-bold text-sm md:text-base text-gray-900 hover:text-primary-500 transition-colors block truncate">
                      +251 911 92 04 11
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-yellow-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs text-gray-400 font-medium">Business Hours (EAT)</div>
                    <div className="font-bold text-xs md:text-sm text-gray-900">Mon-Sun: 8AM - 8PM</div>
                  </div>
                </div>
              </div>

              {/* Ethiopian Calendar Note */}
              <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-200">
                <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <Coffee className="w-4 h-4 text-primary-500 flex-shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-gray-900">13-Month Calendar</div>
                    <div className="text-[11px] text-gray-500"> We align operations with Ethiopia's unique timeline</div>
                  </div>
                </div>
              </div>

              {/* Map Directions Button */}
              <div className="mt-5 md:mt-6">
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-primary-500 text-white text-xs md:text-sm font-bold rounded-xl hover:bg-primary-600 transition-all shadow-sm active:scale-[0.98] flex items-center justify-center gap-2 min-h-[44px] touch-manipulation"
                >
                  <Navigation className="w-4 h-4" />
                  Get Directions on Google Maps
                </a>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-gradient-to-r from-primary-500 to-orange-500 rounded-xl md:rounded-2xl p-6 md:p-8 text-white shadow-sm">
              <h3 className="text-base md:text-xl font-bold mb-1.5 md:mb-2">24/7 Tour Emergency</h3>
              <p className="mb-4 text-white/90 text-xs md:text-sm leading-relaxed">For urgent assistance during active tours anywhere in Ethiopia</p>
              <a href="tel:+251911920411" className="text-xl md:text-2xl font-bold mb-1.5 hover:underline block active:scale-95 transition-transform max-w-max">
                +251 911 92 04 11
              </a>
              <p className="text-[10px] md:text-xs opacity-90 leading-normal">Available anytime, anywhere in Ethiopia</p>
            </div>
          </div>

          {/* Map Section - Right Side */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="bg-white rounded-xl md:rounded-2xl shadow-md border border-gray-200 overflow-hidden">
              {/* Map Header */}
              <div className="p-4 md:p-8">
                <h2 className="text-lg md:text-2xl font-bold text-gray-900 mb-1">Find Our Office in Addis Ababa</h2>
                <p className="text-xs md:text-sm text-gray-500 mb-4">Located in the heart of Ethiopia's capital city</p>
                
                {/* Info Box */}
                <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-100/50">
                  <p className="text-xs text-blue-800 flex items-start gap-2 leading-relaxed">
                    <span className="font-bold flex-shrink-0">Office Location:</span> 
                    Bole Road area. Click on the map to interact or get exact step-by-step route directions.
                  </p>
                </div>
              </div>

              {/* No-API Clean Embed Google Map Container */}
              <div className="h-[380px] md:h-[500px] w-full px-4 md:px-8 pb-4 md:pb-8">
                <iframe
                  title="Phoenix Ethiopia Tours Location Map"
                  src={mapEmbedUrl}
                  className="w-full h-full rounded-xl border border-gray-200 shadow-inner"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              {/* Map Footer Control Links */}
              <div className="p-4 md:p-6 border-t border-gray-100 bg-gray-50/50">
                <div className="flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    <span className="text-gray-500 font-medium">Phoenix Tour Office</span>
                  </div>
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-500 font-bold hover:text-primary-600 flex items-center gap-1 min-h-[36px] touch-manipulation active:scale-95 transition-transform"
                  >
                    <span>Full Map View</span>
                    <Navigation className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Accordion Panels for Mobile */}
            <div className="mt-4 md:mt-6 block lg:hidden space-y-3">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleAccordion('hours')}
                  className="w-full flex items-center justify-between p-4 text-left font-bold text-gray-900 touch-manipulation"
                >
                  <span className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-primary-500" />
                    Visiting Hours
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${activeAccordion === 'hours' ? 'rotate-180' : ''}`} />
                </button>
                <div className={`transition-all duration-200 ease-in-out overflow-hidden ${activeAccordion === 'hours' ? 'max-h-40 border-t border-gray-100' : 'max-h-0'}`}>
                  <div className="p-4 bg-gray-50/50 text-xs sm:text-sm">
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex justify-between"><span>Monday - Friday</span><span className="font-bold">8:00 AM - 7:00 PM</span></li>
                      <li className="flex justify-between"><span>Saturday</span><span className="font-bold">9:00 AM - 5:00 PM</span></li>
                      <li className="flex justify-between"><span>Sunday</span><span className="font-bold">10:00 AM - 3:00 PM</span></li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleAccordion('regions')}
                  className="w-full flex items-center justify-between p-4 text-left font-bold text-gray-900 touch-manipulation"
                >
                  <span className="flex items-center gap-2 text-sm">
                    <Globe className="w-4 h-4 text-primary-500" />
                    Regional Staff Coverage
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${activeAccordion === 'regions' ? 'rotate-180' : ''}`} />
                </button>
                <div className={`transition-all duration-200 ease-in-out overflow-hidden ${activeAccordion === 'regions' ? 'max-h-40 border-t border-gray-100' : 'max-h-0'}`}>
                  <div className="p-4 bg-gray-50/50">
                    <p className="text-xs text-gray-600 mb-2 leading-relaxed">Local field experts available dynamically across:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {['Bahir Dar', 'Lalibela', 'Axum', 'Gondar', 'Hawassa', 'Arba Minch'].map(tag => (
                        <span key={tag} className="px-2.5 py-0.5 bg-primary-50 border border-primary-100 text-primary-700 text-[11px] font-medium rounded-full">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Side Info Grid */}
            <div className="mt-6 hidden lg:grid grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary-500" />
                  Visiting Hours
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="font-semibold">8:00 AM - 7:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-semibold">9:00 AM - 5:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-semibold">10:00 AM - 3:00 PM</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary-500" />
                  Regional Offices
                </h3>
                <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                  We also have local guides stationed in all major Ethiopian regions:
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-primary-50 text-primary-700 text-xs font-semibold rounded-full border border-primary-100">Bahir Dar</span>
                  <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full border border-green-100">Lalibela</span>
                  <span className="px-3 py-1 bg-yellow-50 text-yellow-700 text-xs font-semibold rounded-full border border-yellow-100">Axum</span>
                  <span className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-semibold rounded-full border border-purple-100">Gondar</span>
                  <span className="px-3 py-1 bg-pink-50 text-pink-700 text-xs font-semibold rounded-full border border-pink-100">Hawassa</span>
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full border border-indigo-100">Arba Minch</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
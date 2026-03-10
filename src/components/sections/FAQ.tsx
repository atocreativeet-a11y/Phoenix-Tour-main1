// src/components/sections/FAQ.tsx
'use client';

import { useState } from 'react';
import { ChevronDown, Shield, FileText, Settings, MessageCircle, Phone, Mail, Globe, Users, Calendar, CheckCircle, Star } from 'lucide-react';

const initialFAQs = [
  {
    id: 1,
    question: 'Is Ethiopia safe for tourists?',
    answer: 'Yes, Ethiopia is safe when traveling with a licensed local operator.',
    icon: Shield,
    tag: 'Safety'
  },
  {
    id: 2,
    question: 'Do you arrange visas?',
    answer: 'We provide visa guidance and invitation support.',
    icon: FileText,
    tag: 'Documentation'
  },
  {
    id: 3,
    question: 'Can tours be customized?',
    answer: 'Absolutely — all our tours are tailor-made to your preferences.',
    icon: Settings,
    tag: 'Customization'
  }
];

const expandedFAQs = [
  {
    category: 'Planning & Booking',
    icon: Calendar,
    questions: [
      {
        id: 4,
        question: 'How far in advance should I book?',
        answer: 'We recommend 3-6 months advance booking for peak seasons (Oct-Feb, Jun-Sep). For festival periods like Timkat (Ethiopian Epiphany) in January, book 6-8 months ahead.',
        highlight: 'Ethiopian festivals book out quickly'
      },
      {
        id: 5,
        question: 'What\'s included in tour prices?',
        answer: 'Inclusions: Professional Ethiopian guide & driver, 4x4 vehicle, accommodations, meals as specified, all entrance fees, domestic flights when listed, airport transfers.',
        highlight: 'Transparent pricing - no hidden costs'
      },
      {
        id: 6,
        question: 'What payment methods do you accept?',
        answer: 'We accept: Bank transfer, credit cards, PayPal, Wise. Payment terms: 30% deposit to confirm booking, balance due 45 days before travel.',
        highlight: 'Flexible payment plans available'
      }
    ]
  },
  {
    category: 'Travel Practicalities',
    icon: Globe,
    questions: [
      {
        id: 7,
        question: 'What vaccinations are required?',
        answer: 'Required: Yellow fever certificate if arriving from endemic areas. Recommended: Hepatitis A & B, Typhoid, Tetanus, Malaria prophylaxis.',
        highlight: 'Travel insurance is mandatory for all tours'
      },
      {
        id: 8,
        question: 'What\'s the best time to visit Ethiopia?',
        answer: 'Dry season (Oct-May): Best for historical sites & festivals. Green season (Jun-Sep): Ideal for photography & nature.',
        highlight: 'Ethiopia is a year-round destination'
      },
      {
        id: 9,
        question: 'What currency should I bring?',
        answer: 'Ethiopian Birr (ETB) is the local currency. Bring USD/EUR cash (post-2006 bills) to exchange. Credit cards accepted in major hotels.',
        highlight: 'Ethiopian banks close at 3 PM'
      }
    ]
  },
  {
    category: 'Cultural Experience',
    icon: Users,
    questions: [
      {
        id: 10,
        question: 'How do you ensure ethical cultural interactions?',
        answer: 'We follow strict ethical guidelines: Fair compensation to communities, advance permission for photography, local guides from each region.',
        highlight: '"Take only photos, leave only footprints"'
      },
      {
        id: 11,
        question: 'What should I wear in Ethiopia?',
        answer: 'Modest dress is appreciated: Shoulders and knees covered, light layers for varying altitudes, comfortable walking shoes.',
        highlight: 'Respect local customs - it enhances your experience'
      },
      {
        id: 12,
        question: 'Can I participate in religious ceremonies?',
        answer: 'Yes, with respect. Ethiopian Orthodox Christian ceremonies are often open to respectful observers.',
        highlight: 'Observe respectfully, participate when invited'
      }
    ]
  }
];

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([1]); // Start with only first question open
  const [showAllFAQs, setShowAllFAQs] = useState(false);

  const toggleItem = (id: number) => {
    setOpenItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleAllFAQs = () => {
    setShowAllFAQs(!showAllFAQs);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <div className="flex justify-center gap-1 mb-4">
              <div className="w-6 h-1 bg-green-500 rounded-full"></div>
              <div className="w-6 h-1 bg-yellow-500 rounded-full"></div>
              <div className="w-6 h-1 bg-red-500 rounded-full"></div>
            </div>
            
            <div className="inline-flex items-center gap-3 bg-primary-50 rounded-full px-5 py-2 mb-6">
              <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
              <span className="text-primary-600 font-semibold text-sm">
                TRAVEL WITH CONFIDENCE
              </span>
              <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            <span className="text-gray-900">Frequently Asked </span>
            <span className="text-primary-500">Questions</span>
          </h2>
          
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Get clear answers to common questions about traveling in Ethiopia with Phoenix Tour.
          </p>
        </div>

        {/* Featured Questions - Client's 3 Questions Prominently Displayed */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {initialFAQs.map((faq) => {
              const Icon = faq.icon;
              const isOpen = openItems.includes(faq.id);
              
              return (
                <div 
                  key={faq.id}
                  className={`bg-white rounded-2xl border-2 transition-all duration-300 hover:shadow-lg ${
                    isOpen ? 'border-primary-500 shadow-md' : 'border-gray-200 hover:border-primary-300'
                  }`}
                >
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full p-6 text-left flex items-start gap-4"
                  >
                    <div className={`p-3 rounded-xl ${
                      isOpen ? 'bg-primary-500' : 'bg-primary-50'
                    }`}>
                      <Icon className={`w-6 h-6 ${isOpen ? 'text-white' : 'text-primary-500'}`} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-gray-900 text-lg mb-2 pr-4">
                          {faq.question}
                        </h3>
                        <ChevronDown 
                          className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                      
                      <div className={`overflow-hidden transition-all duration-300 ${
                        isOpen ? 'mt-4 opacity-100' : 'max-h-0 opacity-0'
                      }`}>
                        <p className="text-gray-700 mb-3">{faq.answer}</p>
                        {faq.tag && (
                          <div className="inline-block bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">
                            {faq.tag}
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Trust Badge */}
          <div className="bg-gradient-to-r from-green-50 to-yellow-50 rounded-2xl p-6 border border-green-200 mb-12">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-xl shadow-sm">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">
                    Licensed Ethiopian Tour Operator
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Registered with Ethiopian Tourism Organization • 15+ years experience
                  </p>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-500">10,000+</div>
                  <div className="text-gray-600 text-sm">Travelers</div>
                </div>
                <div className="h-8 w-px bg-gray-300"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-500">98%</div>
                  <div className="text-gray-600 text-sm">Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Expandable Additional FAQs */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <button
              onClick={toggleAllFAQs}
              className="inline-flex items-center gap-3 px-6 py-3 bg-white text-primary-600 font-semibold rounded-xl border-2 border-primary-500 hover:bg-primary-50 transition-all duration-300"
            >
              {showAllFAQs ? 'Show Less Questions' : 'View All Travel Questions'}
              <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${showAllFAQs ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {showAllFAQs && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                {expandedFAQs.map((category) => {
                  const Icon = category.icon;
                  return (
                    <div 
                      key={category.category} 
                      className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
                    >
                      {/* Category Header */}
                      <div className="bg-gradient-to-r from-gray-50 to-white p-6 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary-100 rounded-lg">
                            <Icon className="w-5 h-5 text-primary-600" />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900">{category.category}</h3>
                        </div>
                      </div>

                      {/* Questions */}
                      <div className="divide-y divide-gray-100">
                        {category.questions.map((item) => {
                          const isOpen = openItems.includes(item.id);
                          return (
                            <div key={item.id} className="group">
                              <button
                                onClick={() => toggleItem(item.id)}
                                className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors duration-200 flex justify-between items-center"
                              >
                                <span className="font-semibold text-gray-900 text-left pr-4">
                                  {item.question}
                                </span>
                                <ChevronDown 
                                  className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${
                                    isOpen ? 'rotate-180' : ''
                                  }`}
                                />
                              </button>
                              
                              <div 
                                className={`px-6 overflow-hidden transition-all duration-300 ${
                                  isOpen 
                                    ? 'pb-4 opacity-100' 
                                    : 'max-h-0 opacity-0'
                                }`}
                              >
                                <div className="pl-0">
                                  <p className="text-gray-700 mb-3">{item.answer}</p>
                                  {item.highlight && (
                                    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3 rounded-r-lg">
                                      <div className="flex items-start gap-2">
                                        <Star className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                                        <span className="text-yellow-800 font-medium text-sm">
                                          {item.highlight}
                                        </span>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quick Answers Table */}
              <div className="bg-gray-50 rounded-2xl p-8 mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  Quick Ethiopia Travel Facts
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-white rounded-xl">
                    <div className="text-3xl font-bold text-primary-500 mb-2">13</div>
                    <div className="text-gray-700 font-medium">Months</div>
                    <div className="text-gray-500 text-sm">Unique Calendar</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl">
                    <div className="text-3xl font-bold text-primary-500 mb-2">80+</div>
                    <div className="text-gray-700 font-medium">Languages</div>
                    <div className="text-gray-500 text-sm">Diverse Culture</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl">
                    <div className="text-3xl font-bold text-primary-500 mb-2">3,000m</div>
                    <div className="text-gray-700 font-medium">Average Altitude</div>
                    <div className="text-gray-500 text-sm">"Roof of Africa"</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl">
                    <div className="text-3xl font-bold text-primary-500 mb-2">9</div>
                    <div className="text-gray-700 font-medium">UNESCO Sites</div>
                    <div className="text-gray-500 text-sm">Cultural Heritage</div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Live Support Section */}
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-8 text-white">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1 mb-4">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">LIVE SUPPORT</span>
                </div>
                <h3 className="text-2xl font-bold mb-3">
                  Still have questions about Ethiopia?
                </h3>
                <p className="text-white/90 max-w-lg">
                  Our Ethiopian team is available via WhatsApp, phone, or email to answer 
                  any questions about travel in Ethiopia.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://wa.me/251911234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp Chat
                </a>
                <a
                  href="tel:+251911234567"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-primary-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  Call Ethiopian Office
                </a>
              </div>
            </div>
            
            {/* Quick Contact Info */}
            <div className="mt-8 pt-8 border-t border-white/20 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 mb-2">
                  <Phone className="w-4 h-4" />
                  <span className="font-medium">Addis Ababa Office</span>
                </div>
                <div className="text-lg font-semibold">+251 11 123 4567</div>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center gap-2 mb-2">
                  <Mail className="w-4 h-4" />
                  <span className="font-medium">Email Response</span>
                </div>
                <div className="text-lg font-semibold">Within 1 hour</div>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center gap-2 mb-2">
                  <Globe className="w-4 h-4" />
                  <span className="font-medium">Local Expertise</span>
                </div>
                <div className="text-lg font-semibold">Ethiopian Guides Only</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
// src/components/tours/TourDetailView.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import * as Icons from "lucide-react";

const MapPin = (Icons as any).MapPin;
const Calendar = (Icons as any).Calendar;
const Users = (Icons as any).Users;
const Star = (Icons as any).Star;
const Clock = (Icons as any).Clock;
const DollarSign = (Icons as any).DollarSign;
const ChevronLeft = (Icons as any).ChevronLeft;
const Heart = (Icons as any).Heart;
const Share2 = (Icons as any).Share2;
const CheckCircle = (Icons as any).CheckCircle;
const Camera = (Icons as any).Camera;
const BookOpen = (Icons as any).BookOpen;
const Shield = (Icons as any).Shield;
const Navigation = (Icons as any).Navigation;
const Phone = (Icons as any).Phone;
const Mail = (Icons as any).Mail;
const Instagram = (Icons as any).Instagram;
const Facebook = (Icons as any).Facebook;
const Twitter = (Icons as any).Twitter;
const ArrowRight = (Icons as any).ArrowRight;
const TrendingUp = (Icons as any).TrendingUp;
const Mountain = (Icons as any).Mountain;
const Castle = (Icons as any).Castle;
const Compass = (Icons as any).Compass;
const Zap = (Icons as any).Zap;

import ApplyTourModal from '@/components/modals/ApplyTourModal';

interface Tour {
  _id: string;
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  duration: string;
  difficulty: string;
  price: number;
  rating: number;
  category: string;
  region: string;
  image: string;
  images?: string[];
  tags: string[];
  iconName: string;
  highlight?: string;
  itinerary?: Array<{
    day: number;
    title: string;
    description: string;
    meals: string[];
    accommodation?: string;
    highlights: string[];
  }>;
  inclusions?: string[];
  exclusions?: string[];
  bestTime?: string;
  groupSize?: string;
  accommodations?: string;
  transportation?: string;
  tourGuide?: boolean;
  meals?: string;
  departurePoint?: string;
  returnPoint?: string;
  physicalRating?: string;
  ageRequirements?: string;
  cancellationPolicy?: string;
  highlights?: string[];
  createdAt?: string;
}

interface TourDetailViewProps {
  tourId?: string;
  initialTour?: Tour;
}

// Enhanced mock tours data matching navbar categories
const mockTours: Record<string, Tour> = {
  'classic-northern-ethiopia-circuit': {
    _id: 'mock-1',
    title: 'Classic Northern Ethiopia Circuit',
    slug: 'classic-northern-ethiopia-circuit',
    description: 'Experience Ethiopia\'s highlights: Lalibela\'s rock churches, Gondar\'s castles, Simien Mountains, and Axum\'s ancient stelae.',
    longDescription: 'This comprehensive tour covers the Northern Historical Route, the heart of ancient Ethiopian civilization. Travel through 3,000 years of history, from the ancient Aksumite Empire to medieval castles and rock-hewn churches. Perfect for first-time visitors wanting to experience the best of Ethiopia\'s cultural and historical treasures.',
    duration: '12 days / 11 nights',
    difficulty: 'Moderate',
    price: 1850,
    rating: 4.9,
    category: 'Ethiopia Highlights',
    region: 'Northern Ethiopia',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80'
    ],
    tags: ['Classic', 'Comprehensive', 'Best Seller', 'UNESCO', 'Historical', 'Cultural', 'Photography'],
    iconName: 'Star',
    highlight: 'Complete Northern Historical Route experience',
    
    // Detailed itinerary
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Addis Ababa',
        description: 'Arrive at Bole International Airport, transfer to hotel. Brief city orientation and welcome dinner.',
        meals: ['Dinner'],
        accommodation: 'Radisson Blu or similar',
        highlights: ['Welcome dinner', 'City orientation']
      },
      {
        day: 2,
        title: 'Addis Ababa City Tour',
        description: 'Visit National Museum (see Lucy), Ethnographic Museum, Holy Trinity Cathedral, and Mount Entoto.',
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Radisson Blu or similar',
        highlights: ['National Museum', 'Mount Entoto views', 'Traditional coffee ceremony']
      },
      {
        day: 3,
        title: 'Fly to Bahir Dar - Lake Tana Monasteries',
        description: 'Morning flight to Bahir Dar. Afternoon boat trip on Lake Tana to visit ancient monasteries.',
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Kuriftu Resort or similar',
        highlights: ['Lake Tana boat trip', '13th-century monasteries', 'Blue Nile source']
      },
      {
        day: 4,
        title: 'Blue Nile Falls & Drive to Gondar',
        description: 'Visit Blue Nile Falls, then drive to Gondar. Afternoon visit to Royal Enclosure.',
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Goha Hotel or similar',
        highlights: ['Blue Nile Falls', 'Gondar castles', 'Fasil Ghebbi UNESCO site']
      },
      {
        day: 5,
        title: 'Gondar Exploration',
        description: 'Full day exploring Gondar: Debre Berhan Selassie Church, Fasiladas Bath, and local markets.',
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Goha Hotel or similar',
        highlights: ['Debre Berhan Selassie', 'Fasiladas Bath', 'Local market visit']
      },
      {
        day: 6,
        title: 'Drive to Simien Mountains',
        description: 'Scenic drive to Simien Mountains National Park. Afternoon hike to see Gelada baboons.',
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Simien Lodge or similar',
        highlights: ['Simien Mountains', 'Gelada baboons', 'Dramatic landscapes']
      },
      {
        day: 7,
        title: 'Simien Mountains Trekking',
        description: 'Full day hiking in the Simien Mountains. Visit Chennek and Buit Ras viewpoints.',
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Simien Lodge or similar',
        highlights: ['Mountain trekking', 'Endemic wildlife', 'Stunning viewpoints']
      },
      {
        day: 8,
        title: 'Fly to Lalibela',
        description: 'Morning transfer, flight to Lalibela. Afternoon visit to first group of rock-hewn churches.',
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Mountain View Hotel or similar',
        highlights: ['First rock churches', 'UNESCO World Heritage', 'Spiritual experience']
      },
      {
        day: 9,
        title: 'Lalibela Churches Full Day',
        description: 'Explore all 11 rock-hewn churches of Lalibela, including St. George\'s Church.',
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Mountain View Hotel or similar',
        highlights: ['All 11 churches', 'St. George\'s Church', 'Religious ceremonies']
      },
      {
        day: 10,
        title: 'Fly to Axum',
        description: 'Morning flight to Axum. Visit ancient stelae field, archaeological museum, and Queen of Sheba\'s palace.',
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Sabean Hotel or similar',
        highlights: ['Axum stelae', 'Archaeological museum', 'Ark of the Covenant church']
      },
      {
        day: 11,
        title: 'Axum Exploration & Fly to Addis',
        description: 'Morning visits to historical sites, afternoon flight back to Addis Ababa.',
        meals: ['Breakfast', 'Lunch', 'Dinner'],
        accommodation: 'Radisson Blu or similar',
        highlights: ['Historical sites', 'Cultural experiences', 'Farewell dinner']
      },
      {
        day: 12,
        title: 'Departure',
        description: 'Transfer to airport for departure flight.',
        meals: ['Breakfast'],
        highlights: ['Airport transfer', 'Departure']
      }
    ],
    
    // Tour details
    inclusions: [
      'All domestic flights (Addis-Bahir Dar, Gondar-Lalibela, Lalibela-Axum, Axum-Addis)',
      'All accommodation in 3-4 star hotels/lodges',
      'All meals as indicated in itinerary',
      'Professional English-speaking guide throughout',
      'All entrance fees and activities mentioned',
      'All ground transportation in comfortable 4x4 vehicle',
      'Boat trip on Lake Tana',
      'Airport transfers',
      'Government taxes and service charges'
    ],
    exclusions: [
      'International flights',
      'Travel insurance',
      'Visa fees',
      'Personal expenses',
      'Tips for guides and drivers',
      'Alcoholic beverages',
      'Meals not mentioned in itinerary'
    ],
    bestTime: 'October to May (dry season)',
    groupSize: '2-12 people',
    accommodations: '3-4 star hotels and lodges',
    transportation: '4x4 Land Cruiser, domestic flights',
    tourGuide: true,
    meals: 'Full board (breakfast, lunch, dinner)',
    departurePoint: 'Addis Ababa',
    returnPoint: 'Addis Ababa',
    physicalRating: 'Moderate - some walking and hiking required',
    ageRequirements: 'Minimum 12 years old',
    cancellationPolicy: '30 days prior for full refund',
    highlights: [
      '11 rock-hewn churches of Lalibela',
      'Gondar\'s medieval castles',
      'Simien Mountains National Park',
      'Ancient Axum stelae',
      'Lake Tana monasteries',
      'Blue Nile Falls',
      'Addis Ababa city tour'
    ]
  },
  'lalibela-tigray-rock-churches': {
    _id: 'mock-2',
    title: 'Lalibela & Tigray Rock Churches',
    slug: 'lalibela-tigray-rock-churches',
    description: 'Explore the incredible rock-hewn churches of Lalibela and the hidden cliff churches of Tigray region.',
    longDescription: 'This specialized tour focuses on Ethiopia\'s remarkable rock churches. Experience the world-famous rock-hewn churches of Lalibela and discover the lesser-known but equally spectacular cliff churches of Tigray. Perfect for those interested in architecture, history, and spiritual experiences.',
    duration: '5 days / 4 nights',
    difficulty: 'Moderate',
    price: 850,
    rating: 4.8,
    category: 'Historical Tours',
    region: 'Northern Ethiopia',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1200&q=80',
    iconName: 'Castle',
    highlight: 'Visit St. George\'s Church & hidden Tigray churches',
    tags: ['UNESCO', 'Historical', 'Spiritual', 'Architecture', 'Churches', 'Rock-hewn'],
    
    // More mock tours would continue here...
  }
  // Add other mock tours similarly...
};

export default function TourDetailView({ tourId, initialTour }: TourDetailViewProps) {
  const router = useRouter();
  const [tour, setTour] = useState<Tour | null>(initialTour || null);
  const [loading, setLoading] = useState(!initialTour);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [favorite, setFavorite] = useState(false);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'itinerary' | 'details' | 'pricing'>('overview');

  useEffect(() => {
    if (!initialTour && tourId) {
      fetchTour(tourId);
    }
  }, [tourId, initialTour]);

  const fetchTour = async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Try to fetch from API first
      const response = await fetch(`/api/tours/${id}`);
      
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.tour) {
          setTour(data.tour);
        } else {
          // Fallback to mock data
          useMockTour(id);
        }
      } else {
        // Fallback to mock data
        useMockTour(id);
      }
    } catch (err) {
      console.error('Error fetching tour:', err);
      useMockTour(id);
    } finally {
      setLoading(false);
    }
  };

  const useMockTour = (slugOrId: string) => {
    // Check if we have mock data for this slug/ID
    const mockTour = Object.values(mockTours).find(
      t => t._id === slugOrId || t.slug === slugOrId
    );
    
    if (mockTour) {
      setTour(mockTour);
    } else {
      setError('Tour not found');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading tour details...</p>
        </div>
      </div>
    );
  }

  if (error || !tour) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto p-8 bg-white rounded-2xl shadow-lg">
          <div className="text-gray-400 text-lg mb-4">{error || 'Tour not found'}</div>
          <div className="space-y-4">
            <button
              onClick={() => router.back()}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              <ChevronLeft className="w-4 h-4" />
              Go Back
            </button>
            <Link
              href="/tours"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
            >
              Browse All Tours
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const iconMap: Record<string, any> = {
    'Star': Star,
    'Castle': Castle,
    'Compass': Compass,
    'Mountain': Mountain,
    'Zap': Zap,
    'Clock': Clock
  };

  const Icon = iconMap[tour.iconName] || Star;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="relative py-16 bg-gradient-to-r from-primary-600 to-orange-600 text-white">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0">
          <Image
            src={tour.image}
            alt={tour.title}
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-white/80 hover:text-white mb-6"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Tours
            </button>
            
            <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{tour.category}</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                  {tour.title}
                </h1>
                <p className="text-xl text-white/90 mb-6">
                  {tour.description}
                </p>
                
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold">{tour.rating}</span>
                      <span className="text-white/70">/5.0</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-white/70" />
                      <span>{tour.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-white/70" />
                      <span>{tour.region}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">${tour.price}</span>
                    <span className="text-white/70">per person</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setFavorite(!favorite)}
                  className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                >
                  <Heart className={`w-5 h-5 ${favorite ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                </button>
                <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                  <Share2 className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={() => setIsApplyModalOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  Book This Tour
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Tab Navigation */}
          <div className="mb-8 border-b border-gray-200">
            <nav className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 font-medium rounded-t-lg transition-colors ${
                  activeTab === 'overview'
                    ? 'bg-primary-500 text-white'
                    : 'text-gray-600 hover:text-primary-600 hover:bg-gray-100'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('itinerary')}
                className={`px-4 py-2 font-medium rounded-t-lg transition-colors ${
                  activeTab === 'itinerary'
                    ? 'bg-primary-500 text-white'
                    : 'text-gray-600 hover:text-primary-600 hover:bg-gray-100'
                }`}
              >
                Detailed Itinerary
              </button>
              <button
                onClick={() => setActiveTab('details')}
                className={`px-4 py-2 font-medium rounded-t-lg transition-colors ${
                  activeTab === 'details'
                    ? 'bg-primary-500 text-white'
                    : 'text-gray-600 hover:text-primary-600 hover:bg-gray-100'
                }`}
              >
                Tour Details
              </button>
              <button
                onClick={() => setActiveTab('pricing')}
                className={`px-4 py-2 font-medium rounded-t-lg transition-colors ${
                  activeTab === 'pricing'
                    ? 'bg-primary-500 text-white'
                    : 'text-gray-600 hover:text-primary-600 hover:bg-gray-100'
                }`}
              >
                Pricing & Booking
              </button>
            </nav>
          </div>

          {/* Content based on active tab */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Image Gallery */}
                {tour.images && tour.images.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Camera className="w-5 h-5 text-primary-600" />
                      Photo Gallery
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="relative h-64 md:h-80 rounded-xl overflow-hidden">
                        <Image
                          src={tour.images[selectedImage]}
                          alt={`${tour.title} ${selectedImage + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {tour.images.slice(0, 4).map((image, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedImage(index)}
                            className={`relative h-32 rounded-lg overflow-hidden ${
                              selectedImage === index ? 'ring-2 ring-primary-500' : ''
                            }`}
                          >
                            <Image
                              src={image}
                              alt={`${tour.title} ${index + 1}`}
                              fill
                              className="object-cover hover:scale-105 transition-transform"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Tour Highlights */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Tour Highlights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tour.highlights?.slice(0, 6).map((highlight, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{highlight}</span>
                      </div>
                    )) || (
                      <div className="text-gray-500">No highlights specified</div>
                    )}
                  </div>
                </div>

                {/* Quick Facts */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Facts</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm text-gray-500">Duration</div>
                      <div className="font-semibold">{tour.duration}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm text-gray-500">Difficulty</div>
                      <div className="font-semibold">{tour.difficulty}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm text-gray-500">Group Size</div>
                      <div className="font-semibold">{tour.groupSize || 'Flexible'}</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-sm text-gray-500">Best Time</div>
                      <div className="font-semibold">{tour.bestTime || 'Year-round'}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'itinerary' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Detailed Day-by-Day Itinerary</h3>
                {tour.itinerary && tour.itinerary.length > 0 ? (
                  <div className="space-y-4">
                    {tour.itinerary.map((day) => (
                      <div key={day.day} className="border border-gray-200 rounded-xl overflow-hidden">
                        <div className="bg-primary-50 px-6 py-4 border-b border-gray-200">
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-gray-900">
                              Day {day.day}: {day.title}
                            </h4>
                            {day.accommodation && (
                              <span className="text-sm bg-white px-3 py-1 rounded-full">
                                {day.accommodation}
                              </span>
                            )}
                          </div>
                        </div>
                        {/* <div className="p-6">
                          <p className="text-gray-700 mb-4">{day.description}</p>
                          
                          {day.meals && day.meals.length > 0 && (
                            <div className="mb-4">
                              <div className="text-sm text-gray-500 mb-2">Meals included:</div>
                              <div className="flex flex-wrap gap-2">
                                {day.meals.map((meal, index) => (
                                  <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                                    {meal}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {day.highlights && day.highlights.length > 0 && (
                            <div>
                              <div className="text-sm text-gray-500 mb-2">Highlights:</div>
                              <ul className="space-y-1">
                                {day.highlights.map((highlight, index) => (
                                  <li key={index} className="flex items-start gap-2">
                                    <ArrowRight className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-700">{highlight}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div> */}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Detailed itinerary coming soon</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'details' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* What's Included */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">What's Included</h3>
                    <ul className="space-y-3">
                      {tour.inclusions && tour.inclusions.length > 0 ? (
                        tour.inclusions.slice(0, 8).map((inclusion, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{inclusion}</span>
                          </li>
                        ))
                      ) : (
                        <li className="text-gray-500">Details coming soon</li>
                      )}
                    </ul>
                  </div>

                  {/* What's Not Included */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">What's Not Included</h3>
                    <ul className="space-y-3">
                      {tour.exclusions && tour.exclusions.length > 0 ? (
                        tour.exclusions.slice(0, 8).map((exclusion, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0">×</div>
                            <span className="text-gray-700">{exclusion}</span>
                          </li>
                        ))
                      ) : (
                        <li className="text-gray-500">Details coming soon</li>
                      )}
                    </ul>
                  </div>
                </div>

                {/* Additional Information */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Additional Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {tour.physicalRating && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Physical Rating</h4>
                        <p className="text-gray-700">{tour.physicalRating}</p>
                      </div>
                    )}
                    {tour.ageRequirements && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Age Requirements</h4>
                        <p className="text-gray-700">{tour.ageRequirements}</p>
                      </div>
                    )}
                    {tour.cancellationPolicy && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Cancellation Policy</h4>
                        <p className="text-gray-700">{tour.cancellationPolicy}</p>
                      </div>
                    )}
                    {tour.transportation && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Transportation</h4>
                        <p className="text-gray-700">{tour.transportation}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'pricing' && (
              <div className="space-y-8">
                {/* Pricing Details */}
                <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Pricing Details</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-gray-200">
                      <span className="text-gray-700">Tour Price per Person</span>
                      <span className="text-2xl font-bold text-primary-600">${tour.price}</span>
                    </div>
                    {tour.groupSize && (
                      <div className="flex items-center justify-between py-3 border-b border-gray-200">
                        <span className="text-gray-700">Group Size</span>
                        <span className="font-medium">{tour.groupSize}</span>
                      </div>
                    )}
                    {tour.duration && (
                      <div className="flex items-center justify-between py-3 border-b border-gray-200">
                        <span className="text-gray-700">Duration</span>
                        <span className="font-medium">{tour.duration}</span>
                      </div>
                    )}
                    <div className="pt-4">
                      <button
                        onClick={() => setIsApplyModalOpen(true)}
                        className="w-full py-4 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors text-lg"
                      >
                        Book This Tour Now
                      </button>
                      <p className="text-center text-gray-500 text-sm mt-4">
                        Secure your spot with a 30% deposit
                      </p>
                    </div>
                  </div>
                </div>

                {/* Booking Process */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">How to Book</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-primary-600 font-bold">1</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Submit Inquiry</h4>
                      <p className="text-gray-600 text-sm">Fill out the booking form with your details</p>
                    </div>
                    <div className="text-center p-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-primary-600 font-bold">2</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Confirmation & Deposit</h4>
                      <p className="text-gray-600 text-sm">We'll confirm availability and request deposit</p>
                    </div>
                    <div className="text-center p-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-primary-600 font-bold">3</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Final Payment & Documents</h4>
                      <p className="text-gray-600 text-sm">Complete payment and receive travel documents</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Call to Action */}
          <div className="mt-8 bg-gradient-to-r from-primary-600 to-orange-600 rounded-2xl p-8 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">Ready for Your Ethiopian Adventure?</h3>
                <p className="text-white/90">Book now or contact us for more information</p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setIsApplyModalOpen(true)}
                  className="px-8 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Book This Tour
                </button>
                <Link
                  href="/contact"
                  className="px-8 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/30 transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>

          {/* Related Tours */}
          <div className="mt-12">
            {/* <h3 className="text-2xl font-bold text-gray-900 mb-6">You Might Also Like</h3> */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.values(mockTours)
                .filter(t => t._id !== tour._id && t.category === tour.category)
                .slice(0, 3)
                .map((relatedTour) => (
                  <Link
                    key={relatedTour._id}
                    href={`/tours/${relatedTour.slug}`}
                    className="group bg-white rounded-xl shadow border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all duration-300 overflow-hidden"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={relatedTour.image}
                        alt={relatedTour.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h4 className="text-lg font-bold text-white">{relatedTour.title}</h4>
                        <p className="text-white/80 text-sm mt-1">{relatedTour.duration} • ${relatedTour.price}</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-gray-600 text-sm line-clamp-2">{relatedTour.description}</p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>

          {/* Mock Data Notice */}
          {/* <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-2 rounded-lg">
              <BookOpen className="w-4 h-4" />
              <span className="text-sm">This is a demo page with sample tour data. Connect to backend for real booking.</span>
            </div>
          </div> */}
        </div>
      </div>

      {/* Apply Tour Modal */}
      <ApplyTourModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        tour={tour ? {
          id: tour._id,
          name: tour.title,
          price: tour.price,
          duration: tour.duration,
          difficulty: tour.difficulty
        } : undefined}
      />
    </div>
  );
}
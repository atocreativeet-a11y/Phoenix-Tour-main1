// src/app/destinations/page.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  MapPin, 
  Building, 
  Mountain, 
  Compass, 
  Sun, 
  Trees, 
  Users, 
  Calendar, 
  Star,
  ArrowRight,
  Search,
  Filter,
  Loader,
  Sparkles,
  Camera,
  BookOpen,
  DollarSign,
  Clock,
  Shield,
  Heart
} from 'lucide-react';

// Enhanced mock destinations data matching navbar
const fallbackDestinations = [
  {
    _id: 'mock-1',
    title: 'Addis Ababa',
    slug: 'addis-ababa',
    region: 'Capital Region',
    description: 'Ethiopia\'s vibrant capital city, blending modernity with ancient history. Visit the National Museum to see Lucy (Australopithecus), explore Merkato - Africa\'s largest open-air market, and enjoy panoramic views from Entoto Mountain. Experience traditional coffee ceremonies in the birthplace of coffee.',
    shortDescription: 'Vibrant capital city blending modernity with ancient history',
    mainImage: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80'
    ],
    iconName: 'Building',
    features: ['National Museum', 'Holy Trinity Cathedral', 'Merkato Market', 'Entoto Mountain', 'Coffee Ceremonies', 'Unity Park'],
    bestFor: ['First-time visitors', 'City exploration', 'Cultural experiences', 'Food tours', 'Shopping', 'History buffs'],
    tourCount: 12,
    highlights: [
      'See Lucy (Australopithecus) at the National Museum',
      'Traditional Ethiopian coffee ceremony',
      'Panoramic views from Entoto Mountain'
    ],
    quickFacts: [
      { label: 'Elevation', value: '2,355m', icon: 'Mountain' },
      { label: 'Population', value: '4.8 million', icon: 'Users' },
      { label: 'Best Time', value: 'Oct - Jun', icon: 'Sun' },
      { label: 'UNESCO', value: '2 Sites Nearby', icon: 'Shield' }
    ],
    rating: 4.8,
    duration: '2-4 days'
  },
  {
    _id: 'mock-2',
    title: 'Northern Circuit',
    slug: 'northern-circuit',
    region: 'Historical Route',
    description: 'The heart of ancient Ethiopian civilization. Explore the 11 rock-hewn churches of Lalibela, medieval castles of Gondar, hike in the Simien Mountains (Roof of Africa), and discover ancient stelae in Axum. This UNESCO World Heritage route showcases Ethiopia\'s rich history spanning 3,000 years.',
    shortDescription: 'Ancient civilizations, rock churches, and breathtaking mountains',
    mainImage: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=800&q=80'
    ],
    iconName: 'Mountain',
    features: ['Lalibela Rock Churches', 'Simien Mountains', 'Gondar Castles', 'Axum Stelae', 'Tigray Churches', 'Danakil Depression'],
    bestFor: ['History lovers', 'Trekking', 'Photography', 'UNESCO sites', 'Spiritual journeys', 'Adventure'],
    tourCount: 18,
    highlights: [
      '11 rock-hewn churches in Lalibela',
      'UNESCO World Heritage sites & "Roof of Africa"',
      'Medieval castles and ancient obelisks'
    ],
    quickFacts: [
      { label: 'UNESCO Sites', value: '5', icon: 'Shield' },
      { label: 'Highest Peak', value: '4,550m', icon: 'Mountain' },
      { label: 'Best Time', value: 'Oct - May', icon: 'Sun' },
      { label: 'Duration', value: '7-14 days', icon: 'Clock' }
    ],
    rating: 4.9,
    duration: '7-14 days'
  },
  {
    _id: 'mock-3',
    title: 'Southern Circuit',
    slug: 'southern-circuit',
    region: 'Cultural Heartland',
    description: 'Home to diverse indigenous tribes and cultures of the Omo Valley. Experience traditional lifestyles of the Mursi, Hamer, Karo, and other tribes. Visit colorful markets, witness unique ceremonies, and explore ancient customs. This region offers unparalleled cultural immersion and anthropological insights into some of Africa\'s most preserved cultures.',
    shortDescription: 'Indigenous tribes and rich cultural traditions',
    mainImage: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=800&q=80'
    ],
    iconName: 'Compass',
    features: ['Omo Valley Tribes', 'Mago National Park', 'Turmi Market', 'Konso Cultural Landscape', 'Tribal Ceremonies', 'Konso Terraces'],
    bestFor: ['Cultural immersion', 'Anthropology', 'Photography', 'Adventure', 'Ethnographic studies', 'Unique experiences'],
    tourCount: 15,
    highlights: [
      'Meet the Mursi, Hamer, and Karo tribes',
      'Experience traditional tribal ceremonies',
      'Visit colorful weekly markets'
    ],
    quickFacts: [
      { label: 'Tribes', value: '16+', icon: 'Users' },
      { label: 'UNESCO', value: '1 Site', icon: 'Shield' },
      { label: 'Best Time', value: 'Jun - Sep', icon: 'Sun' },
      { label: 'Temperature', value: '25-35°C', icon: 'Sun' }
    ],
    rating: 4.7,
    duration: '5-10 days'
  },
  {
    _id: 'mock-4',
    title: 'Eastern (Harar)',
    slug: 'eastern-harar',
    region: 'Islamic Heritage',
    description: 'Explore the ancient walled city of Harar, a UNESCO World Heritage site with 368 alleys in its old town. Experience unique traditions including the hyena feeding ceremony, explore colorful markets, and discover Ethiopia\'s Islamic heritage. Visit Dire Dawa and the volcanic landscapes of Awash National Park.',
    shortDescription: 'Ancient walled city with unique Islamic heritage',
    mainImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=800&q=80'
    ],
    iconName: 'Sun',
    features: ['Harar Old Town', 'Hyena Feeding', 'Dire Dawa', 'Awash National Park', 'Islamic Architecture', 'Khat Markets'],
    bestFor: ['Islamic history', 'Unique experiences', 'Photography', 'Desert landscapes', 'Cultural exchange', 'Food exploration'],
    tourCount: 9,
    highlights: [
      'Witness the traditional hyena feeding ceremony',
      'Explore 368 alleys in the UNESCO walled city',
      'Visit colorful spice and khat markets'
    ],
    quickFacts: [
      { label: 'UNESCO', value: '1 Site', icon: 'Shield' },
      { label: 'Founded', value: '7th Century', icon: 'Calendar' },
      { label: 'Best Time', value: 'Oct - Mar', icon: 'Sun' },
      { label: 'Altitude', value: '1,885m', icon: 'Mountain' }
    ],
    rating: 4.6,
    duration: '3-5 days'
  },
  {
    _id: 'mock-5',
    title: 'Western (Gambella)',
    slug: 'western-gambella',
    region: 'Wild Frontier',
    description: 'Ethiopia\'s greenest region with abundant wildlife, national parks, and diverse ethnic groups. Explore Gambella National Park, take river adventures on the Baro River, and experience unique indigenous cultures. Perfect for nature lovers and adventure seekers looking for off-the-beaten-path experiences in lush tropical landscapes.',
    shortDescription: 'Lush landscapes, wildlife, and cultural diversity',
    mainImage: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80'
    ],
    iconName: 'Trees',
    features: ['Gambella National Park', 'Baro River', 'Indigenous Cultures', 'Wildlife Viewing', 'River Adventures', 'Bird Watching'],
    bestFor: ['Wildlife', 'Nature photography', 'River adventures', 'Off-the-beaten-path', 'Bird watching', 'Fishing'],
    tourCount: 6,
    highlights: [
      'Wildlife viewing in Gambella National Park',
      'River adventures on the Baro River',
      'Bird watching with 350+ species'
    ],
    quickFacts: [
      { label: 'Rainfall', value: '1,200mm/year', icon: 'Trees' },
      { label: 'Wildlife', value: 'Elephants, Lions', icon: 'Shield' },
      { label: 'Best Time', value: 'Nov - Feb', icon: 'Sun' },
      { label: 'Temperature', value: '25-30°C', icon: 'Sun' }
    ],
    rating: 4.5,
    duration: '4-7 days'
  }
];

const fallbackRegionStats = [
  {
    region: 'Capital Region',
    count: 1,
    totalTours: 12,
    destinations: [
      {
        title: 'Addis Ababa',
        slug: 'addis-ababa',
        image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=400&q=80',
        tourCount: 12
      }
    ]
  },
  {
    region: 'Historical Route',
    count: 1,
    totalTours: 18,
    destinations: [
      {
        title: 'Northern Circuit',
        slug: 'northern-circuit',
        image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=400&q=80',
        tourCount: 18
      }
    ]
  },
  {
    region: 'Cultural Heartland',
    count: 1,
    totalTours: 15,
    destinations: [
      {
        title: 'Southern Circuit',
        slug: 'southern-circuit',
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=400&q=80',
        tourCount: 15
      }
    ]
  },
  {
    region: 'Islamic Heritage',
    count: 1,
    totalTours: 9,
    destinations: [
      {
        title: 'Eastern (Harar)',
        slug: 'eastern-harar',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80',
        tourCount: 9
      }
    ]
  },
  {
    region: 'Wild Frontier',
    count: 1,
    totalTours: 6,
    destinations: [
      {
        title: 'Western (Gambella)',
        slug: 'western-gambella',
        image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=400&q=80',
        tourCount: 6
      }
    ]
  }
];

interface Destination {
  _id: string;
  title: string;
  slug: string;
  region: string;
  description: string;
  shortDescription: string;
  mainImage: string;
  images: string[];
  iconName: string;
  features: string[];
  bestFor: string[];
  tourCount: number;
  highlights: string[];
  quickFacts: Array<{
    label: string;
    value: string;
    icon: string;
  }>;
  rating: number;
  duration: string;
}

interface RegionStat {
  region: string;
  count: number;
  totalTours: number;
  destinations: Array<{
    title: string;
    slug: string;
    image: string;
    tourCount: number;
  }>;
}

const iconMap = {
  'Building': Building,
  'Mountain': Mountain,
  'Compass': Compass,
  'Sun': Sun,
  'Trees': Trees,
  'Users': Users,
  'Calendar': Calendar,
  'Shield': Shield,
  'Clock': Clock
};

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>(fallbackDestinations);
  const [regionStats, setRegionStats] = useState<RegionStat[]>(fallbackRegionStats);
  const [loading, setLoading] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);

  // For demonstration, we'll use mock data directly
  useEffect(() => {
    setLoading(true);
    // Simulate API call delay
    const timer = setTimeout(() => {
      setDestinations(fallbackDestinations);
      setRegionStats(fallbackRegionStats);
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites(prev =>
      prev.includes(id)
        ? prev.filter(favId => favId !== id)
        : [...prev, id]
    );
  };

  const filteredDestinations = destinations.filter(destination => {
    // Region filter
    if (selectedRegion !== 'all' && destination.region !== selectedRegion) {
      return false;
    }
    
    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        destination.title.toLowerCase().includes(searchLower) ||
        destination.description.toLowerCase().includes(searchLower) ||
        destination.region.toLowerCase().includes(searchLower) ||
        destination.features.some(feature => feature.toLowerCase().includes(searchLower)) ||
        destination.bestFor.some(item => item.toLowerCase().includes(searchLower))
      );
    }
    
    return true;
  });

  const regions = [
    { id: 'all', name: 'All Regions', count: destinations.length },
    ...regionStats.map(stat => ({
      id: stat.region,
      name: stat.region,
      count: stat.count,
      tours: stat.totalTours
    }))
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="relative py-20 bg-gradient-to-r from-blue-600 to-primary-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20"></div>
        </div>
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              Ethiopian Destinations
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Explore Ethiopia's diverse regions - from ancient cities to tribal lands, mountains to deserts
            </p>
            
            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <MapPin className="w-4 h-4" />
                <span>5 Major Regions</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Calendar className="w-4 h-4" />
                <span>60+ Tours</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Shield className="w-4 h-4" />
                <span>9 UNESCO Sites</span>
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4 bg-white/20 backdrop-blur-lg rounded-2xl p-2">
                <div className="flex-1 flex items-center">
                  <Search className="w-5 h-5 text-white/60 ml-4 absolute" />
                  <input
                    type="text"
                    placeholder="Search destinations by name, features, or activities..."
                    className="w-full pl-12 pr-6 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button 
                  onClick={() => {
                    // Search functionality
                  }}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300"
                >
                  <Search className="w-5 h-5" />
                  Search
                </button>
              </div>
            </div>

            {/* Mock Data Notice */}
            <div className="mt-6 inline-flex items-center gap-2 bg-yellow-500/20 backdrop-blur-sm border border-yellow-400/30 text-yellow-100 px-4 py-2 rounded-lg">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm">Showing sample destinations with rich content</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Region Filters */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <MapPin className="w-6 h-6 text-primary-600" />
            Browse by Region
          </h2>
          <div className="flex flex-wrap gap-3">
            {regions.map((region) => (
              <button
                key={region.id}
                onClick={() => setSelectedRegion(region.id)}
                className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 border flex items-center gap-2 ${
                  selectedRegion === region.id
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30 border-primary-500'
                    : 'bg-white text-gray-700 hover:bg-primary-50 border-gray-300 hover:border-primary-300'
                }`}
              >
                {region.name}
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  selectedRegion === region.id
                    ? 'bg-primary-600/30 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {region.id === 'all' ? region.count : `${region.count} (${region.name} tours)`}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-12">
            <Loader className="w-8 h-8 animate-spin text-primary-600 mx-auto" />
            <p className="text-gray-600 mt-4">Loading destinations...</p>
          </div>
        ) : (
          <>
            {/* Destinations Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredDestinations.map((destination) => {
                const Icon = iconMap[destination.iconName as keyof typeof iconMap] || MapPin;
                
                return (
                  <div 
                    key={destination._id} 
                    className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:border-primary-300 transition-all duration-300 hover:shadow-xl group"
                  >
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={destination.mainImage}
                        alt={destination.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      
                      {/* Top Badges */}
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium">
                          <MapPin className="w-3 h-3" />
                          {destination.region}
                        </span>
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-500/90 backdrop-blur-sm text-white rounded-full text-sm font-medium">
                          <Clock className="w-3 h-3" />
                          {destination.duration}
                        </span>
                      </div>
                      
                      {/* Favorite Button */}
                      <button
                        onClick={() => toggleFavorite(destination._id)}
                        className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                      >
                        <Heart 
                          className={`w-5 h-5 ${favorites.includes(destination._id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
                        />
                      </button>
                      
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-2xl font-bold text-white">{destination.title}</h3>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-white font-medium">{destination.rating}</span>
                          </div>
                          <span className="text-white/80 text-sm">• {destination.tourCount} tours available</span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary-100 rounded-lg">
                            <Icon className="w-5 h-5 text-primary-600" />
                          </div>
                          <div>
                            <p className="text-gray-600 text-sm">{destination.shortDescription}</p>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-6 line-clamp-3">{destination.description}</p>

                      {/* Quick Facts */}
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {destination.quickFacts.slice(0, 4).map((fact, index) => {
                          const FactIcon = iconMap[fact.icon as keyof typeof iconMap] || MapPin;
                          return (
                            <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                              <div className="p-1.5 bg-primary-100 rounded-md">
                                <FactIcon className="w-3.5 h-3.5 text-primary-600" />
                              </div>
                              <div>
                                <div className="text-xs text-gray-500">{fact.label}</div>
                                <div className="text-sm font-medium">{fact.value}</div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Features & Best For */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-primary-600" />
                            Key Features
                          </h4>
                          <ul className="space-y-2">
                            {destination.features.slice(0, 4).map((feature, index) => (
                              <li key={index} className="flex items-center gap-2 text-gray-600 text-sm">
                                <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <Users className="w-4 h-4 text-primary-600" />
                            Best For
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {destination.bestFor.slice(0, 4).map((item, index) => (
                              <span 
                                key={index}
                                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Highlight & CTA */}
                      <div className="pt-6 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 text-primary-600 font-medium">
                              <Star className="w-4 h-4" />
                              <span className="text-sm">{destination.highlights[0]}</span>
                            </div>
                          </div>
                          <Link
                            href={`/destinations/${destination.slug}`}
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 transition-colors group-hover:gap-3"
                          >
                            Explore Details
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* No Results */}
            {filteredDestinations.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-lg mb-4">
                  No destinations found matching your search
                </div>
                <button
                  onClick={() => {
                    setSelectedRegion('all');
                    setSearchTerm('');
                  }}
                  className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </>
        )}

        {/* Ethiopia Map Overview */}
        <div className="mt-16 bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl p-8 border border-primary-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Ethiopia's Geographic Diversity
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {destinations.slice(0, 5).map((destination) => {
              const Icon = iconMap[destination.iconName as keyof typeof iconMap] || MapPin;
              
              return (
                <Link
                  key={destination._id}
                  href={`/destinations/${destination.slug}`}
                  className="group text-center"
                >
                  <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-200 group-hover:border-primary-300 transition-colors">
                    <div className="w-16 h-16 mx-auto mb-4 p-3 bg-primary-100 rounded-full group-hover:bg-primary-200 transition-colors">
                      <Icon className="w-10 h-10 text-primary-600" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">{destination.title}</h4>
                    <p className="text-gray-600 text-sm mb-3">{destination.shortDescription}</p>
                    <div className="text-primary-600 text-sm font-medium flex items-center justify-center gap-1">
                      <span>View tours</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Quick Facts */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="text-3xl font-bold text-primary-600 mb-2">13+</div>
            <div className="font-semibold text-gray-900 mb-1">UNESCO Sites</div>
            <p className="text-gray-600 text-sm">World Heritage sites across Ethiopia</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="text-3xl font-bold text-primary-600 mb-2">80+</div>
            <div className="font-semibold text-gray-900 mb-1">Ethnic Groups</div>
            <p className="text-gray-600 text-sm">Distinct cultures and languages</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="text-3xl font-bold text-primary-600 mb-2">3,000m</div>
            <div className="font-semibold text-gray-900 mb-1">Average Elevation</div>
            <p className="text-gray-600 text-sm">"Roof of Africa" highlands</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="text-3xl font-bold text-primary-600 mb-2">13</div>
            <div className="font-semibold text-gray-900 mb-1">Months of Sunshine</div>
            <p className="text-gray-600 text-sm">Unique Ethiopian calendar</p>
          </div>
        </div>

        {/* What's Included */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Complete Destination Guides
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-6 h-6 text-primary-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Professional Photos</h4>
              <p className="text-gray-600 text-sm">High-quality images showing each destination</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-primary-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Detailed Information</h4>
              <p className="text-gray-600 text-sm">Complete guides with history, culture, and tips</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-6 h-6 text-primary-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Tour Packages</h4>
              <p className="text-gray-600 text-sm">Curated tours for each destination</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-primary-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Local Experts</h4>
              <p className="text-gray-600 text-sm">Guidance from Ethiopian tour specialists</p>
            </div>
          </div>
        </div>

        {/* Mock Data Notice */}
        {/* <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-2 rounded-lg">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm">This is a demo page with sample destination data. Real data will load when connected to backend.</span>
          </div>
        </div> */}
      </div>
    </div>
  );
}
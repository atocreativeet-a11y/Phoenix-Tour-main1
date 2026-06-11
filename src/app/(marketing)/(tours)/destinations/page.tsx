'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import * as Icons from "lucide-react";

const MapPin = (Icons as any).MapPin;
const Building = (Icons as any).Building;
const Mountain = (Icons as any).Mountain;
const Compass = (Icons as any).Compass;
const Sun = (Icons as any).Sun;
const Trees = (Icons as any).Trees;
const Users = (Icons as any).Users;
const Calendar = (Icons as any).Calendar;
const Star = (Icons as any).Star;
const ArrowRight = (Icons as any).ArrowRight;
const Search = (Icons as any).Search;
const Loader = (Icons as any).Loader;
const Sparkles = (Icons as any).Sparkles;
const Camera = (Icons as any).Camera;
const BookOpen = (Icons as any).BookOpen;
const DollarSign = (Icons as any).DollarSign;
const Clock = (Icons as any).Clock;
const Shield = (Icons as any).Shield;
const Heart = (Icons as any).Heart;

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

  useEffect(() => {
    setLoading(true);
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
    if (selectedRegion !== 'all' && destination.region !== selectedRegion) {
      return false;
    }
    
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
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 overflow-x-hidden max-w-[100vw]">
      <div className="relative py-12 md:py-20 bg-gradient-to-r from-blue-600 to-primary-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20"></div>
        </div>
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-6xl font-heading font-bold mb-4 md:mb-6 leading-tight">
              Ethiopian Destinations
            </h1>
            <p className="text-base md:text-xl text-white/90 mb-6 md:mb-8 max-w-2xl mx-auto px-2">
              Explore Ethiopia's diverse regions - from ancient cities to tribal lands, mountains to deserts
            </p>
            
            <div className="flex overflow-x-auto pb-4 pt-1 px-1 -mx-4 md:mx-0 snap-x snap-mandatory scrollbar-none md:overflow-visible md:pb-0 md:snap-none md:flex-wrap md:justify-center gap-3 md:gap-6 mb-6 md:mb-8">
              <div className="flex-shrink-0 ml-4 md:ml-0 snap-center flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span className="whitespace-nowrap">5 Major Regions</span>
              </div>
              <div className="flex-shrink-0 snap-center flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                <Calendar className="w-4 h-4 flex-shrink-0" />
                <span className="whitespace-nowrap">60+ Tours</span>
              </div>
              <div className="flex-shrink-0 mr-4 md:mr-0 snap-center flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                <Shield className="w-4 h-4 flex-shrink-0" />
                <span className="whitespace-nowrap">9 UNESCO Sites</span>
              </div>
            </div>
            
            <div className="max-w-2xl mx-auto px-1 sm:px-0">
              <div className="flex flex-col sm:flex-row gap-3 bg-white/20 backdrop-blur-lg rounded-xl md:rounded-2xl p-2 border border-white/10">
                <div className="flex-1 flex items-center relative">
                  <Search className="w-5 h-5 text-white/70 ml-4 absolute pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search destinations..."
                    className="w-full pl-12 pr-4 py-3.5 rounded-lg md:rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button 
                  type="button"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-blue-600 font-bold rounded-lg md:rounded-xl hover:bg-gray-100 transition-all active:scale-[0.99] touch-manipulation text-sm shadow-sm"
                >
                  <Search className="w-4 h-4" />
                  Search
                </button>
              </div>
            </div>

            <div className="mt-5 md:mt-6 inline-flex items-center gap-2 bg-yellow-500/20 backdrop-blur-sm border border-yellow-400/30 text-yellow-100 px-3 py-1.5 rounded-lg text-xs md:text-sm">
              <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Showing sample destinations with rich content</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8 md:mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 flex items-center gap-2">
            <MapPin className="w-5 h-5 md:w-6 md:h-6 text-primary-600" />
            Browse by Region
          </h2>
          <div className="flex overflow-x-auto pb-3 pt-1 px-1 -mx-4 md:mx-0 gap-2.5 snap-x snap-mandatory scrollbar-none md:flex-wrap md:overflow-visible md:pb-0 md:snap-none">
            {regions.map((region, idx) => (
              <button
                key={region.id}
                type="button"
                onClick={() => setSelectedRegion(region.id)}
                className={`flex-shrink-0 snap-center touch-manipulation px-4 md:px-5 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 border flex items-center gap-2 ${
                  idx === 0 ? 'ml-4 md:ml-0' : ''
                } ${idx === regions.length - 1 ? 'mr-4 md:mr-0' : ''} ${
                  selectedRegion === region.id
                    ? 'bg-primary-500 text-white shadow-md shadow-primary-500/20 border-primary-500'
                    : 'bg-white text-gray-700 hover:bg-primary-50 border-gray-300 hover:border-primary-300'
                }`}
              >
                {region.name}
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  selectedRegion === region.id
                    ? 'bg-primary-600/40 text-white'
                    : 'bg-gray-100 text-gray-500'
                }`}>
                  {region.id === 'all' ? region.count : region.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <Loader className="w-8 h-8 animate-spin text-primary-600 mx-auto" />
            <p className="text-gray-600 mt-4 text-sm">Loading destinations...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:grid-cols-1 md:gap-8">
              {filteredDestinations.map((destination) => {
                const Icon = iconMap[destination.iconName as keyof typeof iconMap] || MapPin;
                
                return (
                  <div 
                    key={destination._id} 
                    className="bg-white rounded-xl md:rounded-2xl shadow-md overflow-hidden border border-gray-100 md:border-gray-200 hover:border-primary-300 transition-all duration-300 hover:shadow-xl group flex flex-col h-full"
                  >
                    <div className="relative h-52 sm:h-64 overflow-hidden flex-shrink-0">
                      <Image
                        src={destination.mainImage}
                        alt={destination.title}
                        fill
                        priority={destination.slug === 'addis-ababa'}
                        sizes="(max-w-7xl) 100vw, 50vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent"></div>
                      
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 max-w-[80%]">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-white/90 backdrop-blur-sm rounded-full text-[11px] font-semibold text-gray-800 shadow-sm">
                          <MapPin className="w-3 h-3 text-gray-600" />
                          {destination.region}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-primary-500/90 backdrop-blur-sm text-white rounded-full text-[11px] font-semibold shadow-sm">
                          <Clock className="w-3 h-3" />
                          {destination.duration}
                        </span>
                      </div>
                      
                      <button
                        type="button"
                        onClick={() => toggleFavorite(destination._id)}
                        className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors touch-manipulation shadow-sm"
                        aria-label="Toggle favorite"
                      >
                        <Heart 
                          className={`w-4 h-4 ${favorites.includes(destination._id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
                        />
                      </button>
                      
                      <div className="absolute bottom-3 left-3 right-3">
                        <h3 className="text-xl md:text-2xl font-bold text-white tracking-wide">{destination.title}</h3>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <div className="flex items-center gap-0.5">
                            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                            <span className="text-white text-xs font-bold">{destination.rating}</span>
                          </div>
                          <span className="text-white/90 text-xs font-medium">• {destination.tourCount} tours available</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 md:p-6 flex flex-col flex-1">
                      <div className="flex items-start justify-between mb-3 flex-shrink-0">
                        <div className="flex items-center gap-2.5">
                          <div className="p-1.5 bg-primary-50 rounded-lg flex-shrink-0">
                            <Icon className="w-4 h-4 text-primary-600" />
                          </div>
                          <p className="text-gray-500 text-xs md:text-sm font-medium line-clamp-1">{destination.shortDescription}</p>
                        </div>
                      </div>

                      <p className="text-gray-600 text-xs md:text-sm mb-4 leading-relaxed line-clamp-3 flex-1">{destination.description}</p>

                      <div className="grid grid-cols-2 gap-2 mb-4 flex-shrink-0">
                        {destination.quickFacts.slice(0, 4).map((fact, index) => {
                          const FactIcon = iconMap[fact.icon as keyof typeof iconMap] || MapPin;
                          return (
                            <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg border border-gray-100/50">
                              <div className="p-1 bg-primary-100 rounded flex-shrink-0">
                                <FactIcon className="w-3 h-3 text-primary-600" />
                              </div>
                              <div className="min-w-0">
                                <div className="text-[10px] text-gray-400 truncate font-medium">{fact.label}</div>
                                <div className="text-xs font-bold text-gray-800 truncate">{fact.value}</div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5 pt-3 border-t border-gray-100 flex-shrink-0">
                        <div>
                          <h4 className="font-bold text-gray-800 text-xs mb-2 flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-primary-600" />
                            Key Features
                          </h4>
                          <ul className="space-y-1.5">
                            {destination.features.slice(0, 3).map((feature, index) => (
                              <li key={index} className="flex items-center gap-1.5 text-gray-650 text-xs">
                                <div className="w-1.5 h-1.5 bg-primary-500 rounded-full flex-shrink-0"></div>
                                <span className="truncate">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="hidden sm:block md:block lg:block">
                          <h4 className="font-bold text-gray-800 text-xs mb-2 flex items-center gap-1.5">
                            <Users className="w-3.5 h-3.5 text-primary-600" />
                            Best For
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {destination.bestFor.slice(0, 3).map((item, index) => (
                              <span 
                                key={index}
                                className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[11px] font-medium rounded-full"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-gray-100 flex-shrink-0 mt-auto">
                        <div className="flex items-center justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1 text-primary-600 font-semibold">
                              <Star className="w-3.5 h-3.5 flex-shrink-0 fill-primary-100" />
                              <span className="text-[11px] md:text-xs truncate">{destination.highlights[0]}</span>
                            </div>
                          </div>
                          <Link
                            href={`/destinations/${destination.slug}`}
                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary-500 text-white text-xs font-bold rounded-lg hover:bg-primary-600 transition-colors shadow-sm active:scale-[0.98] flex-shrink-0 touch-manipulation min-h-[38px]"
                          >
                            <span>Details</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredDestinations.length === 0 && (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-100 p-6">
                <div className="text-gray-500 text-sm mb-4">
                  No destinations found matching your search
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedRegion('all');
                    setSearchTerm('');
                  }}
                  className="px-5 py-2.5 bg-primary-500 text-white font-bold text-xs rounded-lg hover:bg-primary-600 shadow-sm active:scale-95 touch-manipulation"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </>
        )}

        <div className="mt-12 md:mt-16 bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl md:rounded-2xl p-4 md:p-8 border border-primary-100">
          <h2 className="text-lg md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 text-center">
            Ethiopia's Geographic Diversity
          </h2>
          <div className="flex overflow-x-auto pb-4 pt-1 px-1 -mx-4 md:mx-0 gap-4 snap-x snap-mandatory scrollbar-none md:grid md:grid-cols-3 lg:grid-cols-5 md:overflow-visible md:pb-0 md:snap-none">
            {destinations.slice(0, 5).map((destination, idx) => {
              const Icon = iconMap[destination.iconName as keyof typeof iconMap] || MapPin;
              
              return (
                <Link
                  key={destination._id}
                  href={`/destinations/${destination.slug}`}
                  className={`flex-shrink-0 w-[70%] sm:w-[45%] md:w-full snap-center group touch-manipulation ${
                    idx === 0 ? 'ml-4 md:ml-0' : ''
                  } ${idx === 4 ? 'mr-4 md:mr-0' : ''}`}
                >
                  <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 group-hover:border-primary-300 transition-colors h-full flex flex-col justify-between">
                    <div>
                      <div className="w-12 h-12 md:w-14 md:h-14 mx-auto mb-3 p-2.5 bg-primary-50 rounded-full group-hover:bg-primary-100 transition-colors flex items-center justify-center">
                        <Icon className="w-6 h-6 md:w-7 md:h-7 text-primary-600" />
                      </div>
                      <h4 className="font-bold text-gray-800 text-sm mb-1 line-clamp-1">{destination.title}</h4>
                      <p className="text-gray-500 text-xs mb-3 line-clamp-2 leading-relaxed">{destination.shortDescription}</p>
                    </div>
                    <div className="text-primary-600 text-xs font-bold flex items-center justify-center gap-1 mt-auto pt-2 border-t border-gray-50">
                      <span>View tours</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mt-8 md:mt-12 grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          <div className="bg-white rounded-xl p-4 md:p-6 border border-gray-100 md:border-gray-200 shadow-sm text-center sm:text-left">
            <div className="text-2xl md:text-3xl font-bold text-primary-600 mb-1">13+</div>
            <div className="font-bold text-gray-800 text-xs md:text-sm mb-0.5">UNESCO Sites</div>
            <p className="text-gray-500 text-[11px] md:text-xs leading-normal hidden sm:block">World Heritage sites across Ethiopia</p>
          </div>
          <div className="bg-white rounded-xl p-4 md:p-6 border border-gray-100 md:border-gray-200 shadow-sm text-center sm:text-left">
            <div className="text-2xl md:text-3xl font-bold text-primary-600 mb-1">80+</div>
            <div className="font-bold text-gray-800 text-xs md:text-sm mb-0.5">Ethnic Groups</div>
            <p className="text-gray-500 text-[11px] md:text-xs leading-normal hidden sm:block">Distinct cultures and languages</p>
          </div>
          <div className="bg-white rounded-xl p-4 md:p-6 border border-gray-100 md:border-gray-200 shadow-sm text-center sm:text-left">
            <div className="text-2xl md:text-3xl font-bold text-primary-600 mb-1">3,000m</div>
            <div className="font-bold text-gray-800 text-xs md:text-sm mb-0.5">Avg Elevation</div>
            <p className="text-gray-500 text-[11px] md:text-xs leading-normal hidden sm:block">"Roof of Africa" highlands</p>
          </div>
          <div className="bg-white rounded-xl p-4 md:p-6 border border-gray-100 md:border-gray-200 shadow-sm text-center sm:text-left">
            <div className="text-2xl md:text-3xl font-bold text-primary-600 mb-1">13</div>
            <div className="font-bold text-gray-800 text-xs md:text-sm mb-0.5">Months Sunshine</div>
            <p className="text-gray-500 text-[11px] md:text-xs leading-normal hidden sm:block">Unique Ethiopian calendar</p>
          </div>
        </div>

        <div className="mt-12 md:mt-16 bg-white rounded-xl md:rounded-2xl shadow-md border border-gray-100 md:border-gray-200 p-5 md:p-8">
          <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-6 text-center">
            Complete Destination Guides
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div className="text-center p-2">
              <div className="bg-primary-50 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                <Camera className="w-5 h-5 text-primary-600" />
              </div>
              <h4 className="font-bold text-gray-800 text-xs md:text-sm mb-1">Professional Photos</h4>
              <p className="text-gray-500 text-[11px] md:text-xs leading-relaxed hidden sm:block">High-quality images showing each destination</p>
            </div>
            <div className="text-center p-2">
              <div className="bg-primary-50 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                <BookOpen className="w-5 h-5 text-primary-600" />
              </div>
              <h4 className="font-bold text-gray-800 text-xs md:text-sm mb-1">Detailed Info</h4>
              <p className="text-gray-500 text-[11px] md:text-xs leading-relaxed hidden sm:block">Complete guides with history, culture, and tips</p>
            </div>
            <div className="text-center p-2">
              <div className="bg-primary-50 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                <DollarSign className="w-5 h-5 text-primary-600" />
              </div>
              <h4 className="font-bold text-gray-800 text-xs md:text-sm mb-1">Tour Packages</h4>
              <p className="text-gray-500 text-[11px] md:text-xs leading-relaxed hidden sm:block">Curated tours for each destination</p>
            </div>
            <div className="text-center p-2">
              <div className="bg-primary-50 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                <Shield className="w-5 h-5 text-primary-600" />
              </div>
              <h4 className="font-bold text-gray-800 text-xs md:text-sm mb-1">Local Experts</h4>
              <p className="text-gray-500 text-[11px] md:text-xs leading-relaxed hidden sm:block">Guidance from Ethiopian tour specialists</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
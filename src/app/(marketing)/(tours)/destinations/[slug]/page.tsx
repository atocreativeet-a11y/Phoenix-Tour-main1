// src/app/destinations/[slug]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import * as Icons from "lucide-react";

const MapPin = (Icons as any).MapPin;
const Building = (Icons as any).Building;
const Calendar = (Icons as any).Calendar;
const Users = (Icons as any).Users;
const Star = (Icons as any).Star;
const ArrowRight = (Icons as any).ArrowRight;
const ArrowLeft = (Icons as any).ArrowLeft;
const Phone = (Icons as any).Phone;
const Mail = (Icons as any).Mail;
const Globe = (Icons as any).Globe;
const Camera = (Icons as any).Camera;
const Coffee = (Icons as any).Coffee;
const Shield = (Icons as any).Shield;
const Loader = (Icons as any).Loader;
const Clock = (Icons as any).Clock;
const Mountain = (Icons as any).Mountain;
const Sun = (Icons as any).Sun;
const Trees = (Icons as any).Trees;
const Compass = (Icons as any).Compass;
const Heart = (Icons as any).Heart;
const Share2 = (Icons as any).Share2;
const Navigation = (Icons as any).Navigation;
const BookOpen = (Icons as any).BookOpen;
const DollarSign = (Icons as any).DollarSign;
const CheckCircle = (Icons as any).CheckCircle;

// Enhanced mock destinations data
const mockDestinations = [
  {
    _id: 'mock-1',
    title: 'Addis Ababa',
    slug: 'addis-ababa',
    region: 'Capital Region',
    description: 'Addis Ababa, meaning "New Flower" in Amharic, is Ethiopia\'s vibrant capital and diplomatic capital of Africa. Founded in 1886 by Emperor Menelik II, the city sits at 2,355 meters above sea level, making it one of the highest capitals in the world. Addis Ababa is a city of contrasts where modernity meets tradition - from skyscrapers and luxury hotels to ancient churches and bustling markets.',
    shortDescription: 'Vibrant capital city blending modernity with ancient history',
    mainImage: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80'
    ],
    iconName: 'Building',
    features: ['National Museum', 'Holy Trinity Cathedral', 'Merkato Market', 'Entoto Mountain', 'Coffee Ceremonies', 'Unity Park', 'Ethnographic Museum', 'Red Terror Museum'],
    bestFor: ['First-time visitors', 'City exploration', 'Cultural experiences', 'Food tours', 'Shopping', 'History buffs', 'Museum lovers', 'Photography'],
    tourCount: 12,
    highlights: [
      'See Lucy (Australopithecus) at the National Museum',
      'Traditional Ethiopian coffee ceremony',
      'Panoramic views from Entoto Mountain',
      'Explore Africa\'s largest open-air market at Merkato'
    ],
    quickFacts: [
      { label: 'Elevation', value: '2,355m', icon: 'Mountain' },
      { label: 'Population', value: '4.8 million', icon: 'Users' },
      { label: 'Best Time', value: 'Oct - Jun', icon: 'Sun' },
      { label: 'Founded', value: '1886 AD', icon: 'Calendar' },
      { label: 'UNESCO', value: '2 Sites Nearby', icon: 'Shield' },
      { label: 'Language', value: 'Amharic', icon: 'Globe' }
    ],
    rating: 4.8,
    duration: '2-4 days',
    attractions: [
      {
        title: 'National Museum of Ethiopia',
        description: 'Home to Lucy (Australopithecus afarensis), the 3.2 million-year-old hominid fossil, and other important archaeological finds.',
        image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=400&q=80',
        duration: '2-3 hours',
        type: 'Museum'
      },
      {
        title: 'Merkato Market',
        description: 'Africa\'s largest open-air market, offering everything from spices and textiles to traditional crafts and souvenirs.',
        image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=400&q=80',
        duration: '3-4 hours',
        type: 'Market'
      },
      {
        title: 'Entoto Mountain',
        description: 'Historic site with panoramic views of the city, home to Entoto Maryam Church and Emperor Menelik II\'s palace.',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80',
        duration: 'Half day',
        type: 'Nature/History'
      }
    ],
    climate: 'Mild year-round with average temperatures of 16-20°C. Rainy season: June-September.',
    gettingThere: 'Bole International Airport (ADD) serves as Ethiopia\'s main international gateway with connections worldwide.',
    accommodation: 'Range from luxury hotels to budget guesthouses. Most international chains are represented.',
    tips: [
      'Try traditional coffee ceremony',
      'Visit churches in the morning',
      'Bargain at markets',
      'Carry cash for small purchases'
    ]
  },
  {
    _id: 'mock-2',
    title: 'Northern Circuit',
    slug: 'northern-circuit',
    region: 'Historical Route',
    description: 'The Northern Historical Circuit is the heart of ancient Ethiopian civilization, spanning 3,000 years of history. This route takes you through Axum - the ancient capital of the Aksumite Empire, Gondar - home to medieval castles, Lalibela - with its magnificent rock-hewn churches, and the Simien Mountains - often called the "Roof of Africa".',
    shortDescription: 'Ancient civilizations, rock churches, and breathtaking mountains',
    mainImage: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80'
    ],
    iconName: 'Mountain',
    features: ['Lalibela Rock Churches', 'Simien Mountains', 'Gondar Castles', 'Axum Stelae', 'Tigray Churches', 'Danakil Depression', 'Blue Nile Falls', 'Lake Tana Monasteries'],
    bestFor: ['History lovers', 'Trekking', 'Photography', 'UNESCO sites', 'Spiritual journeys', 'Adventure', 'Archaeology', 'Nature lovers'],
    tourCount: 18,
    highlights: [
      '11 rock-hewn churches in Lalibela',
      'UNESCO World Heritage sites & "Roof of Africa"',
      'Medieval castles and ancient obelisks',
      'Hike to see Gelada baboons in Simien Mountains'
    ],
    quickFacts: [
      { label: 'UNESCO Sites', value: '5', icon: 'Shield' },
      { label: 'Highest Peak', value: '4,550m', icon: 'Mountain' },
      { label: 'Best Time', value: 'Oct - May', icon: 'Sun' },
      { label: 'Duration', value: '7-14 days', icon: 'Clock' },
      { label: 'Ancient Kingdom', value: 'Aksumite', icon: 'Calendar' },
      { label: 'Rock Churches', value: '11 in Lalibela', icon: 'Building' }
    ],
    rating: 4.9,
    duration: '7-14 days',
    attractions: [
      {
        title: 'Lalibela Rock-Hewn Churches',
        description: '11 medieval monolithic churches carved out of rock in the 12th-13th centuries, often called the "Eighth Wonder of the World".',
        image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=400&q=80',
        duration: 'Full day',
        type: 'Religious/Historical'
      },
      {
        title: 'Simien Mountains National Park',
        description: 'UNESCO World Heritage site with stunning mountain scenery, endemic wildlife including Gelada baboons and Walia ibex.',
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=400&q=80',
        duration: '2-5 days',
        type: 'Nature/Trekking'
      },
      {
        title: 'Gondar Castles',
        description: '17th-century fortress-city known as the "Camelot of Africa", with medieval castles and churches.',
        image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=400&q=80',
        duration: '1 day',
        type: 'Historical'
      }
    ],
    climate: 'Varies by elevation. Highlands: cool (10-25°C), Lowlands: hot (25-40°C).',
    gettingThere: 'Fly to Bahir Dar, Gondar, or Lalibela from Addis Ababa. Domestic flights available daily.',
    accommodation: 'Range from basic lodges to luxury hotels in major towns. Camping available in Simien Mountains.',
    tips: [
      'Acclimatize to altitude',
      'Hire local guides',
      'Respect religious sites',
      'Carry warm clothing'
    ]
  },
  {
    _id: 'mock-3',
    title: 'Southern Circuit',
    slug: 'southern-circuit',
    region: 'Cultural Heartland',
    description: 'The Southern Circuit takes you to Ethiopia\'s cultural heartland - the Omo Valley, home to some of Africa\'s most fascinating indigenous tribes. This region is a living museum of ancient traditions, where tribes like the Mursi, Hamer, Karo, and others maintain their traditional ways of life. The area is also known for its stunning landscapes, national parks, and unique cultural practices.',
    shortDescription: 'Indigenous tribes and rich cultural traditions',
    mainImage: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80'
    ],
    iconName: 'Compass',
    features: ['Omo Valley Tribes', 'Mago National Park', 'Turmi Market', 'Konso Cultural Landscape', 'Tribal Ceremonies', 'Konso Terraces', 'Dorze Villages', 'Arbore Tribe'],
    bestFor: ['Cultural immersion', 'Anthropology', 'Photography', 'Adventure', 'Ethnographic studies', 'Unique experiences', 'Wildlife', 'Nature'],
    tourCount: 15,
    highlights: [
      'Meet the Mursi, Hamer, and Karo tribes',
      'Experience traditional tribal ceremonies',
      'Visit colorful weekly markets',
      'See the UNESCO-listed Konso cultural landscape'
    ],
    quickFacts: [
      { label: 'Tribes', value: '16+', icon: 'Users' },
      { label: 'UNESCO', value: '1 Site', icon: 'Shield' },
      { label: 'Best Time', value: 'Jun - Sep', icon: 'Sun' },
      { label: 'Temperature', value: '25-35°C', icon: 'Sun' },
      { label: 'Wildlife', value: 'Elephants, Crocodiles', icon: 'Shield' },
      { label: 'River', value: 'Omo River', icon: 'Navigation' }
    ],
    rating: 4.7,
    duration: '5-10 days'
  },
  {
    _id: 'mock-4',
    title: 'Eastern (Harar)',
    slug: 'eastern-harar',
    region: 'Islamic Heritage',
    description: 'The Eastern Circuit features Harar, the fourth holiest city in Islam and a UNESCO World Heritage site. This ancient walled city with 368 alleys is known for its unique architecture, hyena feeding tradition, and rich Islamic heritage. The circuit also includes Dire Dawa, Awash National Park, and the dramatic landscapes of the Danakil Depression.',
    shortDescription: 'Ancient walled city with unique Islamic heritage',
    mainImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=800&q=80'
    ],
    iconName: 'Sun',
    features: ['Harar Old Town', 'Hyena Feeding', 'Dire Dawa', 'Awash National Park', 'Islamic Architecture', 'Khat Markets', 'Danakil Depression', 'Erta Ale Volcano'],
    bestFor: ['Islamic history', 'Unique experiences', 'Photography', 'Desert landscapes', 'Cultural exchange', 'Food exploration', 'Adventure', 'Geology'],
    tourCount: 9,
    highlights: [
      'Witness the traditional hyena feeding ceremony',
      'Explore 368 alleys in the UNESCO walled city',
      'Visit colorful spice and khat markets',
      'See the active lava lake at Erta Ale volcano'
    ],
    quickFacts: [
      { label: 'UNESCO', value: '1 Site', icon: 'Shield' },
      { label: 'Founded', value: '7th Century', icon: 'Calendar' },
      { label: 'Best Time', value: 'Oct - Mar', icon: 'Sun' },
      { label: 'Altitude', value: '1,885m', icon: 'Mountain' },
      { label: 'Gates', value: '5 main gates', icon: 'Building' },
      { label: 'Hyena Feeders', value: '2 families', icon: 'Users' }
    ],
    rating: 4.6,
    duration: '3-5 days'
  },
  {
    _id: 'mock-5',
    title: 'Western (Gambella)',
    slug: 'western-gambella',
    region: 'Wild Frontier',
    description: 'The Western Circuit explores Ethiopia\'s least-visited region, known for its lush tropical forests, abundant wildlife, and diverse ethnic groups. Gambella National Park is home to elephants, lions, and over 350 bird species. The region offers unique river adventures on the Baro River and opportunities to experience the cultures of the Anuak and Nuer peoples.',
    shortDescription: 'Lush landscapes, wildlife, and cultural diversity',
    mainImage: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80'
    ],
    iconName: 'Trees',
    features: ['Gambella National Park', 'Baro River', 'Indigenous Cultures', 'Wildlife Viewing', 'River Adventures', 'Bird Watching', 'Fishing', 'Tropical Forests'],
    bestFor: ['Wildlife', 'Nature photography', 'River adventures', 'Off-the-beaten-path', 'Bird watching', 'Fishing', 'Cultural immersion', 'Adventure'],
    tourCount: 6,
    highlights: [
      'Wildlife viewing in Gambella National Park',
      'River adventures on the Baro River',
      'Bird watching with 350+ species',
      'Experience Anuak and Nuer cultures'
    ],
    quickFacts: [
      { label: 'Rainfall', value: '1,200mm/year', icon: 'Trees' },
      { label: 'Wildlife', value: 'Elephants, Lions', icon: 'Shield' },
      { label: 'Best Time', value: 'Nov - Feb', icon: 'Sun' },
      { label: 'Temperature', value: '25-30°C', icon: 'Sun' },
      { label: 'Bird Species', value: '350+', icon: 'Navigation' },
      { label: 'River', value: 'Baro River', icon: 'Navigation' }
    ],
    rating: 4.5,
    duration: '4-7 days'
  }
];

const iconMap = {
  'Building': Building,
  'Mountain': Mountain,
  'Compass': Compass,
  'Sun': Sun,
  'Trees': Trees,
  'Users': Users,
  'Calendar': Calendar,
  'Shield': Shield,
  'Clock': Clock,
  'Globe': Globe,
  'Navigation': Navigation
};

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
  attractions?: Array<{
    title: string;
    description: string;
    image: string;
    duration: string;
    type: string;
  }>;
  climate?: string;
  gettingThere?: string;
  accommodation?: string;
  tips?: string[];
}

export default function DestinationPage() {
  const params = useParams();
  const router = useRouter();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const fetchDestination = () => {
      if (!params.slug) return;
      
      setLoading(true);
      setError(null);
      
      try {
        // Find destination in mock data
        const foundDestination = mockDestinations.find(
          dest => dest.slug === params.slug
        );
        
        if (foundDestination) {
          setDestination(foundDestination);
        } else {
          setError('Destination not found');
        }
      } catch (err) {
        setError('Error loading destination');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    // Simulate API delay
    setTimeout(fetchDestination, 500);
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading destination details...</p>
        </div>
      </div>
    );
  }

  if (error || !destination) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto p-8 bg-white rounded-2xl shadow-lg">
          <div className="text-gray-400 text-lg mb-4">{error || 'Destination not found'}</div>
          <div className="space-y-4">
            <button
              onClick={() => router.back()}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>
            <Link
              href="/destinations"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
            >
              Browse All Destinations
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const Icon = iconMap[destination.iconName as keyof typeof iconMap] || MapPin;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="relative py-20 bg-gradient-to-r from-blue-600 to-primary-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0">
          <Image
            src={destination.mainImage}
            alt={destination.title}
            fill
            className="object-cover opacity-30"
            priority
          />
        </div>
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-white/80 hover:text-white mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Destinations
            </button>
            
            <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{destination.region}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                  {destination.title}
                </h1>
                <p className="text-xl text-white/90 mb-6 max-w-3xl">
                  {destination.shortDescription}
                </p>
                
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold">{destination.rating}</span>
                      <span className="text-white/70">/5.0</span>
                    </div>
                    <span className="text-white/70">•</span>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-white/70" />
                      <span>{destination.duration}</span>
                    </div>
                    <span className="text-white/70">•</span>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-white/70" />
                      <span>{destination.tourCount} tours available</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setFavorite(!favorite)}
                  className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                >
                  <Heart className={`w-5 h-5 ${favorite ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                </button>
                <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                  <Share2 className="w-5 h-5 text-white" />
                </button>
                <Link
                  href={`/tours?destination=${destination.slug}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  View Tours
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Gallery */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Camera className="w-5 h-5 text-primary-600" />
                  Photo Gallery
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative h-64 md:h-80 rounded-xl overflow-hidden">
                    <Image
                      src={destination.images[selectedImage]}
                      alt={destination.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {destination.images.slice(0, 4).map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`relative h-32 rounded-lg overflow-hidden ${
                          selectedImage === index ? 'ring-2 ring-primary-500' : ''
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`${destination.title} ${index + 1}`}
                          fill
                          className="object-cover hover:scale-105 transition-transform"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  About {destination.title}
                </h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 mb-6">{destination.description}</p>
                  
                  {/* Highlights */}
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Highlights</h3>
                    <ul className="space-y-3">
                      {destination.highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Attractions */}
              {destination.attractions && destination.attractions.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Main Attractions
                  </h2>
                  <div className="space-y-6">
                    {destination.attractions.map((attraction, index) => (
                      <div key={index} className="flex flex-col md:flex-row gap-6 p-4 bg-gray-50 rounded-xl">
                        <div className="relative w-full md:w-48 h-48 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={attraction.image}
                            alt={attraction.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-xl font-semibold text-gray-900">
                              {attraction.title}
                            </h3>
                            <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm rounded-full">
                              {attraction.type}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-4">{attraction.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{attraction.duration}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Features */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  What to Experience
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary-600" />
                      Key Features
                    </h3>
                    <ul className="space-y-3">
                      {destination.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary-600" />
                      Best For
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {destination.bestFor.map((item, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-full"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Quick Facts */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Quick Facts
                </h3>
                <div className="space-y-4">
                  {destination.quickFacts.map((fact, index) => {
                    const FactIcon = iconMap[fact.icon as keyof typeof iconMap] || MapPin;
                    return (
                      <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary-50 rounded-lg">
                            <FactIcon className="w-4 h-4 text-primary-600" />
                          </div>
                          <span className="text-gray-600">{fact.label}</span>
                        </div>
                        <span className="font-semibold text-gray-900">{fact.value}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Tours Available */}
              <div className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-2xl p-6 border border-primary-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary-100 rounded-lg">
                    <Calendar className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Available Tours</h3>
                    <p className="text-sm text-gray-600">{destination.tourCount} curated experiences</p>
                  </div>
                </div>
                <Link
                  href={`/tours?destination=${destination.slug}`}
                  className="block w-full text-center py-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors"
                >
                  Browse All Tours
                </Link>
              </div>

              {/* Travel Tips */}
              {destination.tips && (
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary-600" />
                    Travel Tips
                  </h3>
                  <ul className="space-y-3">
                    {destination.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Climate */}
              {destination.climate && (
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Sun className="w-5 h-5 text-primary-600" />
                    Climate
                  </h3>
                  <p className="text-gray-700">{destination.climate}</p>
                </div>
              )}

              {/* Getting There */}
              {destination.gettingThere && (
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Navigation className="w-5 h-5 text-primary-600" />
                    Getting There
                  </h3>
                  <p className="text-gray-700">{destination.gettingThere}</p>
                </div>
              )}

              {/* Contact CTA */}
              <div className="bg-gradient-to-r from-blue-600 to-primary-600 rounded-2xl p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Need Help Planning?</h3>
                <p className="text-white/90 mb-6">Our local experts can help you create the perfect itinerary.</p>
                <div className="space-y-3">
                  <button className="flex items-center justify-center gap-2 w-full py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100">
                    <Phone className="w-4 h-4" />
                    Call Us Now
                  </button>
                  <button className="flex items-center justify-center gap-2 w-full py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/30">
                    <Mail className="w-4 h-4" />
                    Send Inquiry
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Related Destinations */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Explore Other Destinations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockDestinations
                .filter(dest => dest._id !== destination._id)
                .slice(0, 3)
                .map((relatedDest) => (
                  <Link
                    key={relatedDest._id}
                    href={`/destinations/${relatedDest.slug}`}
                    className="group bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:border-primary-300 transition-all duration-300 hover:shadow-xl"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={relatedDest.mainImage}
                        alt={relatedDest.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-xl font-bold text-white">{relatedDest.title}</h3>
                        <p className="text-white/80 text-sm mt-1">{relatedDest.region}</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-gray-600 text-sm mb-4">{relatedDest.shortDescription}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span>{relatedDest.rating}</span>
                          <span>•</span>
                          <span>{relatedDest.tourCount} tours</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-primary-500 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>

          {/* Mock Data Notice */}
          {/* <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-2 rounded-lg">
              <BookOpen className="w-4 h-4" />
              <span className="text-sm">This is a demo page with sample destination data. Connect to backend for real data.</span>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
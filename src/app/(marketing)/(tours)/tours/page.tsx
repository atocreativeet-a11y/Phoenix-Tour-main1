'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import TourCard from '@/components/tours/TourCard';
import * as Icons from "lucide-react";

const Filter = (Icons as any).Filter;
const MapPin = (Icons as any).MapPin;
const Calendar = (Icons as any).Calendar;
const TrendingUp = (Icons as any).TrendingUp;
const Search = (Icons as any).Search;
const X = (Icons as any).X;
const Sparkles = (Icons as any).Sparkles;
const BookOpen = (Icons as any).BookOpen;
const Camera = (Icons as any).Camera;
const DollarSign = (Icons as any).DollarSign;
const Users = (Icons as any).Users;
const Mountain = (Icons as any).Mountain;
const Castle = (Icons as any).Castle;
const Compass = (Icons as any).Compass;
const Zap = (Icons as any).Zap;
const Clock = (Icons as any).Clock;
const Star = (Icons as any).Star;
import { categories, regions, difficulties } from '@/lib/utils/tour-icons';
import ApplyTourModal from '@/components/modals/ApplyTourModal';

interface Tour {
  _id: string;
  title: string;
  slug: string;
  description: string;
  duration: string;
  difficulty: string;
  price: number;
  rating: number;
  category: string;
  region: string;
  image: string;
  tags: string[];
  iconName: string;
  highlight?: string;
}

interface Filters {
  category: string;
  region: string;
  difficulty: string;
  duration: string;
  search: string;
}

const fallbackTours = [
  {
    _id: 'mock-1',
    title: 'Classic Northern Ethiopia Circuit',
    slug: 'classic-northern-ethiopia-circuit',
    description: 'Experience Ethiopia\'s highlights: Lalibela\'s rock churches, Gondar\'s castles, Simien Mountains, and Axum\'s ancient stelae.',
    duration: '12 days',
    difficulty: 'Moderate',
    price: 1850,
    rating: 4.9,
    category: 'Ethiopia Highlights',
    region: 'Northern Ethiopia',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
    tags: ['Classic', 'Comprehensive', 'Best Seller', 'UNESCO', 'Historical'],
    iconName: 'Star',
    highlight: 'Complete Northern Historical Route experience'
  },
  {
    _id: 'mock-2',
    title: 'Lalibela & Tigray Rock Churches',
    slug: 'allibela-tigray-rock-churches',
    description: 'Explore the incredible rock-hewn churches of Lalibela and the hidden cliff churches of Tigray region.',
    duration: '5 days',
    difficulty: 'Moderate',
    price: 850,
    rating: 4.8,
    category: 'Historical Tours',
    region: 'Northern Ethiopia',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80',
    tags: ['UNESCO', 'Historical', 'Spiritual', 'Architecture', 'Churches'],
    iconName: 'Castle',
    highlight: 'Visit St. George\'s Church & hidden Tigray churches'
  },
  {
    _id: 'mock-3',
    title: 'Omo Valley Cultural Expedition',
    slug: 'omo-valley-cultural-expedition',
    description: 'Deep cultural immersion with the indigenous tribes of Southern Ethiopia\'s Omo Valley.',
    duration: '8 days',
    difficulty: 'Moderate',
    price: 1200,
    rating: 4.8,
    category: 'Cultural Tours',
    region: 'Southern Ethiopia',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
    tags: ['Tribal', 'Cultural', 'Anthropology', 'Photography', 'Indigenous'],
    iconName: 'Compass',
    highlight: 'Meet Mursi, Hamer, Karo, and Dassanech tribes'
  },
  {
    _id: 'mock-4',
    title: 'Simien Mountains Trekking Adventure',
    slug: 'simien-mountains-trekking-adventure',
    description: 'Hike through the "Roof of Africa" with endemic wildlife, deep valleys, and stunning viewpoints.',
    duration: '6 days',
    difficulty: 'Challenging',
    price: 920,
    rating: 4.9,
    category: 'Nature & Trekking',
    region: 'Northern Ethiopia',
    image: 'https://images.unsplash.com/photo-1559561736-9e6dafa9e7b0?auto=format&fit=crop&w=800&q=80',
    tags: ['Trekking', 'Hiking', 'Wildlife', 'UNESCO', 'Mountains'],
    iconName: 'Mountain',
    highlight: 'See Gelada monkeys and Ethiopian wolves'
  },
  {
    _id: 'mock-5',
    title: 'Bale Mountains & Sof Omar Caves',
    slug: 'bale-mountains-sof-omar-caves',
    description: 'Explore Africa\'s largest alpine ecosystem and the spectacular Sof Omar cave system.',
    duration: '5 days',
    difficulty: 'Moderate',
    price: 780,
    rating: 4.7,
    category: 'Nature & Trekking',
    region: 'Southern Ethiopia',
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=800&q=80',
    tags: ['Wildlife', 'Hiking', 'Caves', 'Nature', 'Endemic Species'],
    iconName: 'Mountain',
    highlight: 'Spot the rare Ethiopian wolf in Bale Mountains'
  },
  {
    _id: 'mock-6',
    title: 'Danakil Depression Extreme Adventure',
    slug: 'danakil-depression-extreme-adventure',
    description: 'Witness Earth\'s most extreme environment: active volcanoes, colorful sulfur springs, and salt flats.',
    duration: '4 days',
    difficulty: 'Moderate',
    price: 720,
    rating: 4.9,
    category: 'Adventure',
    region: 'Eastern Ethiopia',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
    tags: ['Volcano', 'Extreme', 'Geothermal', 'Adventure', 'Unique'],
    iconName: 'Zap',
    highlight: 'Erta Ale lava lake & Dallol sulfur springs'
  },
  {
    _id: 'mock-7',
    title: 'Awash River Rafting Expedition',
    slug: 'awash-river-rafting-expedition',
    description: 'White water rafting on the Awash River combined with wildlife viewing in Awash National Park.',
    duration: '3 days',
    difficulty: 'Challenging',
    price: 450,
    rating: 4.6,
    category: 'Adventure',
    region: 'Eastern Ethiopia',
    image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=800&q=80',
    tags: ['Rafting', 'Adventure', 'Wildlife', 'River', 'Sports'],
    iconName: 'Zap',
    highlight: 'Class III-IV rapids & wildlife safari'
  },
  {
    _id: 'mock-8',
    title: 'Addis Ababa & Debre Libanos Day Trip',
    slug: 'addis-ababa-debre-libanos-day-trip',
    description: 'Explore Ethiopia\'s capital and visit the historic Debre Libanos monastery with stunning Blue Nile Gorge views.',
    duration: '1 day',
    difficulty: 'Easy',
    price: 85,
    rating: 4.7,
    category: 'Day Trips',
    region: 'Central Ethiopia',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
    tags: ['City Tour', 'Historical', 'Easy', 'Monastery', 'Scenic'],
    iconName: 'Clock',
    highlight: 'Blue Nile Gorge viewpoint & National Museum'
  },
  {
    _id: 'mock-9',
    title: 'Gondar Castles & Simien Mountains',
    slug: 'gondar-castles-simien-mountains',
    description: 'Explore the "Camelot of Africa" and hike in the nearby Simien Mountains National Park.',
    duration: '4 days',
    difficulty: 'Moderate',
    price: 680,
    rating: 4.8,
    category: 'Historical Tours',
    region: 'Northern Ethiopia',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
    tags: ['Castles', 'Historical', 'Hiking', 'UNESCO', 'Royal'],
    iconName: 'Castle',
    highlight: 'Royal Enclosure castles & Simien viewpoints'
  },
  {
    _id: 'mock-10',
    title: 'Harar & Dire Dawa Cultural Tour',
    slug: 'harar-dire-dawa-cultural-tour',
    description: 'Explore the ancient walled city of Harar and experience the unique hyena feeding tradition.',
    duration: '2 days',
    difficulty: 'Easy',
    price: 320,
    rating: 4.7,
    category: 'Cultural Tours',
    region: 'Eastern Ethiopia',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
    tags: ['Historical', 'Cultural', 'UNESCO', 'City Tour', 'Unique'],
    iconName: 'Compass',
    highlight: 'Hyena feeding ceremony & Harar\'s old town'
  },
  {
    _id: 'mock-11',
    title: 'Biking in the Rift Valley',
    slug: 'biking-rift-valley',
    description: 'Mountain biking through the beautiful Ethiopian Rift Valley with its lakes and volcanic landscapes.',
    duration: '2 days',
    difficulty: 'Moderate',
    price: 280,
    rating: 4.6,
    category: 'Adventure',
    region: 'Central Ethiopia',
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=800&q=80',
    tags: ['Biking', 'Adventure', 'Lakes', 'Nature', 'Sports'],
    iconName: 'Zap',
    highlight: 'Lakeside trails & volcanic crater views'
  },
  {
    _id: 'mock-12',
    title: 'Rift Valley Lakes & Bird Watching',
    slug: 'rift-valley-lakes-bird-watching',
    description: 'Explore the beautiful lakes of the Ethiopian Rift Valley, perfect for bird watching and relaxation.',
    duration: '3 days',
    difficulty: 'Easy',
    price: 420,
    rating: 4.6,
    category: 'Day Trips',
    region: 'Central Ethiopia',
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=800&q=80',
    tags: ['Lakes', 'Bird Watching', 'Nature', 'Relaxing', 'Scenic'],
    iconName: 'Clock',
    highlight: 'Over 400 bird species in lake ecosystems'
  }
];

const mainCategories = [
  { name: 'Ethiopia Highlights', icon: Star, description: 'Classic routes covering major attractions' },
  { name: 'Historical Tours', icon: Castle, description: 'Lalibela, Gondar, Axum - Ancient kingdoms' },
  { name: 'Cultural Tours', icon: Users, description: 'Omo Valley tribes & traditional experiences' },
  { name: 'Nature & Trekking', icon: Mountain, description: 'Simien, Bale Mountains, wildlife' },
  { name: 'Adventure', icon: Zap, description: 'Rafting, biking, off-road experiences' },
  { name: 'Day Trips', icon: Clock, description: 'Addis, Debre Libanos, easy excursions' }
];

const enhancedFallbackTours = [
  ...fallbackTours,
  {
    _id: 'mock-13',
    title: 'Historical Route & Omo Valley Combo',
    slug: 'historical-route-omo-valley-combo',
    description: 'Combine the Northern Historical Route with the cultural richness of Omo Valley for a complete Ethiopia experience.',
    duration: '16 days',
    difficulty: 'Moderate',
    price: 2450,
    rating: 4.9,
    category: 'Ethiopia Highlights',
    region: 'Northern & Southern Ethiopia',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80',
    tags: ['Comprehensive', 'Best Seller', 'UNESCO', 'Cultural', 'Historical'],
    iconName: 'Star',
    highlight: 'Complete Ethiopia experience covering major highlights'
  },
  {
    _id: 'mock-14',
    title: 'Axum & Yeha Temple Archaeological Tour',
    slug: 'axum-yeha-temple-archaeological',
    description: 'Explore the ancient Aksumite Empire ruins and visit the pre-Aksumite Yeha temple, the oldest standing structure in Ethiopia.',
    duration: '4 days',
    difficulty: 'Easy',
    price: 680,
    rating: 4.7,
    category: 'Historical Tours',
    region: 'Northern Ethiopia',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
    tags: ['Archaeology', 'Ancient', 'Ruins', 'Historical', 'Temples'],
    iconName: 'Castle',
    highlight: 'Yeha Temple & ancient Aksumite ruins'
  },
  {
    _id: 'mock-15',
    title: 'Hamer Tribe Bull Jumping Ceremony',
    slug: 'hamer-tribe-bull-jumping',
    description: 'Witness the unique coming-of-age ceremony of the Hamer tribe where young men jump over bulls.',
    duration: '5 days',
    difficulty: 'Moderate',
    price: 950,
    rating: 4.8,
    category: 'Cultural Tours',
    region: 'Southern Ethiopia',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
    tags: ['Tribal', 'Ceremony', 'Cultural', 'Photography', 'Unique'],
    iconName: 'Compass',
    highlight: 'Witness the rare bull jumping ceremony'
  },
  {
    _id: 'mock-16',
    title: 'Bale Mountains National Park Trek',
    slug: 'bale-mountains-national-park-trek',
    description: 'Trek through Africa\'s largest alpine ecosystem with opportunities to spot the rare Ethiopian wolf.',
    duration: '6 days',
    difficulty: 'Moderate',
    price: 890,
    rating: 4.7,
    category: 'Nature & Trekking',
    region: 'Southern Ethiopia',
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=800&q=80',
    tags: ['Trekking', 'Wildlife', 'Nature', 'Mountains', 'Endemic'],
    iconName: 'Mountain',
    highlight: 'Spot Ethiopian wolves in their natural habitat'
  },
  {
    _id: 'mock-17',
    title: 'Off-Road Adventure to Surma Tribes',
    slug: 'off-road-adventure-surma-tribes',
    description: 'Challenging off-road journey to remote Surma tribes, known for their distinctive lip plates and body painting.',
    duration: '7 days',
    difficulty: 'Challenging',
    price: 1200,
    rating: 4.8,
    category: 'Adventure',
    region: 'Southern Ethiopia',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
    tags: ['Off-Road', 'Remote', 'Tribal', 'Adventure', 'Photography'],
    iconName: 'Zap',
    highlight: 'Visit remote Surma tribes accessible only by 4x4'
  },
  {
    _id: 'mock-18',
    title: 'Debre Libanos & Portuguese Bridge',
    slug: 'debre-libanos-portuguese-bridge',
    description: 'Day trip to historic Debre Libanos monastery and the stunning Portuguese Bridge with Blue Nile Gorge views.',
    duration: '1 day',
    difficulty: 'Easy',
    price: 75,
    rating: 4.6,
    category: 'Day Trips',
    region: 'Central Ethiopia',
    image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=800&q=80',
    tags: ['Monastery', 'Scenic', 'Easy', 'Historical', 'Nature'],
    iconName: 'Clock',
    highlight: 'Portuguese Bridge with Blue Nile Gorge views'
  }
];

export default function ToursPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [allTours, setAllTours] = useState<Tour[]>([]);
  const [filteredTours, setFilteredTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [useFallback, setUseFallback] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  const [filters, setFilters] = useState<Filters>({
    category: '',
    region: '',
    difficulty: '',
    duration: '',
    search: ''
  });
  
  const [urlParamsRead, setUrlParamsRead] = useState(false);
  
  const [pagination, setPagination] = useState({
    page: 1,
    total: 0,
    pages: 1,
    hasNext: false,
    hasPrev: false
  });

  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState<{
    id?: string;
    name: string;
    price?: number;
    duration?: string;
    difficulty?: string;
  } | null>(null);

  const updateURL = useCallback((newFilters: Filters) => {
    const params = new URLSearchParams();
    
    if (newFilters.category) params.set('category', newFilters.category);
    if (newFilters.region) params.set('region', newFilters.region);
    if (newFilters.difficulty) params.set('difficulty', newFilters.difficulty);
    if (newFilters.duration) params.set('duration', newFilters.duration);
    if (newFilters.search) params.set('search', newFilters.search);
    
    const queryString = params.toString();
    const newUrl = queryString ? `/tours?${queryString}` : '/tours';
    
    router.push(newUrl, { scroll: false });
  }, [router]);

  useEffect(() => {
    const category = searchParams.get('category') || '';
    const region = searchParams.get('region') || '';
    const difficulty = searchParams.get('difficulty') || '';
    const duration = searchParams.get('duration') || '';
    const search = searchParams.get('search') || '';
    
    setFilters(prev => {
      if (
        prev.category !== category ||
        prev.region !== region ||
        prev.difficulty !== difficulty ||
        prev.duration !== duration ||
        prev.search !== search
      ) {
        return { category, region, difficulty, duration, search };
      }
      return prev;
    });
    
    setUrlParamsRead(true);
  }, [searchParams]);

  const fetchAllTours = useCallback(async () => {
    setLoading(true);
    setUseFallback(false);
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    try {
      const response = await fetch('/api/tours?limit=100');
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      if (data.success && data.tours && data.tours.length > 0) {
        setAllTours(data.tours);
      } else {
        setUseFallback(true);
        setAllTours(enhancedFallbackTours);
      }
    } catch (error) {
      clearTimeout(timeoutId);
      setUseFallback(true);
      setAllTours(enhancedFallbackTours);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllTours();
  }, [fetchAllTours]);

  const filterToursLocally = useCallback((currentFilters: Filters) => {
    const toursToFilter = useFallback ? enhancedFallbackTours : allTours;
    
    if (toursToFilter.length === 0) return [];
    
    return toursToFilter.filter(tour => {
      if (currentFilters.category && currentFilters.category !== 'All Tours') {
        if (tour.category !== currentFilters.category) return false;
      }
      if (currentFilters.region) {
        if (tour.region !== currentFilters.region) return false;
      }
      if (currentFilters.difficulty) {
        if (tour.difficulty !== currentFilters.difficulty) return false;
      }
      if (currentFilters.duration) {
        const durationMatch = tour.duration.match(/\d+/);
        const tourDays = durationMatch ? parseInt(durationMatch[0]) : 0;
        
        let passesDurationFilter = false;
        switch (currentFilters.duration) {
          case '1-3 days':
            passesDurationFilter = tourDays >= 1 && tourDays <= 3;
            break;
          case '4-7 days':
            passesDurationFilter = tourDays >= 4 && tourDays <= 7;
            break;
          case '8-14 days':
            passesDurationFilter = tourDays >= 8 && tourDays <= 14;
            break;
          case '15+ days':
            passesDurationFilter = tourDays >= 15;
            break;
        }
        if (!passesDurationFilter) return false;
      }
      
      if (currentFilters.search.trim()) {
        const searchLower = currentFilters.search.toLowerCase();
        const searchInTitle = tour.title.toLowerCase().includes(searchLower);
        const searchInDescription = tour.description.toLowerCase().includes(searchLower);
        const searchInTags = tour.tags.some(tag => tag.toLowerCase().includes(searchLower));
        const searchInCategory = tour.category.toLowerCase().includes(searchLower);
        const searchInRegion = tour.region.toLowerCase().includes(searchLower);
        
        if (!searchInTitle && !searchInDescription && !searchInTags && !searchInCategory && !searchInRegion) {
          return false;
        }
      }
      return true;
    });
  }, [allTours, useFallback]);

  useEffect(() => {
    if ((allTours.length > 0 || useFallback) && urlParamsRead) {
      const filtered = filterToursLocally(filters);
      setFilteredTours(filtered);
      setPagination({
        page: 1,
        total: filtered.length,
        pages: Math.ceil(filtered.length / 6),
        hasNext: filtered.length > 6,
        hasPrev: false
      });
    }
  }, [filters, allTours, useFallback, urlParamsRead, filterToursLocally]);

  useEffect(() => {
    if (urlParamsRead) {
      updateURL(filters);
    }
  }, [filters, updateURL, urlParamsRead]);

  const paginatedTours = useMemo(() => {
    const startIndex = (pagination.page - 1) * 6;
    return filteredTours.slice(startIndex, startIndex + 6);
  }, [filteredTours, pagination.page]);

  const handleFilterChange = (key: keyof Filters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      region: '',
      difficulty: '',
      duration: '',
      search: ''
    });
  };

  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({
      ...prev,
      page: newPage
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreTour = (tour: Tour) => {
    setSelectedTour({
      id: tour._id,
      name: tour.title,
      price: tour.price,
      duration: tour.duration,
      difficulty: tour.difficulty
    });
    setIsApplyModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsApplyModalOpen(false);
    setSelectedTour(null);
  };

  const handleCustomTourRequest = () => {
    setSelectedTour({
      name: "Custom Tour Request",
      duration: "Custom",
      difficulty: "Customizable"
    });
    setIsApplyModalOpen(true);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.category && filters.category !== 'All Tours') count++;
    if (filters.region) count++;
    if (filters.difficulty) count++;
    if (filters.duration) count++;
    if (filters.search.trim()) count++;
    return count;
  };

  const calculatedCategoryCounts = useMemo(() => {
    const counts: {[key: string]: number} = {};
    const toursToCount = useFallback ? enhancedFallbackTours : allTours;
    
    ['All Tours', ...mainCategories.map(c => c.name)].forEach(category => {
      counts[category] = 0;
    });
    
    toursToCount.forEach(tour => {
      if (counts[tour.category] !== undefined) {
        counts[tour.category]++;
      }
      counts['All Tours']++;
    });
    
    return counts;
  }, [allTours, useFallback]);

  // Subcomponent for Filters content to prevent redundancy between Mobile drawer and Desktop sidebar
  const FilterFormControls = () => (
    <>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filter Tours
          {getActiveFilterCount() > 0 && (
            <span className="bg-primary-500 text-white text-xs px-2 py-1 rounded-full">
              {getActiveFilterCount()} active
            </span>
          )}
        </h3>
        {getActiveFilterCount() > 0 && (
          <button 
            onClick={clearFilters}
            className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1 min-h-[32px]"
          >
            <X className="w-4 h-4" />
            Clear All
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="mb-6 md:mb-8">
        <h4 className="font-semibold text-gray-900 mb-3 md:mb-4">Tour Categories</h4>
        <div className="space-y-1 md:space-y-2">
          {['All Tours', ...mainCategories.map(c => c.name)].map((category) => {
            const isSelected = category === 'All Tours' 
              ? !filters.category 
              : filters.category === category;
            
            return (
              <label 
                key={category} 
                className={`flex items-center justify-between cursor-pointer p-2.5 md:p-2 rounded-lg transition-colors min-h-[40px] ${
                  isSelected ? 'bg-primary-50 border border-primary-100' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="category"
                    checked={isSelected}
                    onChange={() => handleFilterChange('category', category === 'All Tours' ? '' : category)}
                    className="w-4 h-4 text-primary-500 focus:ring-primary-500"
                  />
                  <span className={`text-sm md:text-base text-gray-700 ${isSelected ? 'font-medium' : ''}`}>
                    {category}
                  </span>
                </div>
                <span className="text-gray-500 text-xs md:text-sm bg-gray-100 px-2 py-0.5 md:py-1 rounded">
                  {calculatedCategoryCounts[category] || 0}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Regions */}
      <div className="mb-6 md:mb-8">
        <h4 className="font-semibold text-gray-900 mb-3 md:mb-4 flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          Regions
        </h4>
        <div className="space-y-1 md:space-y-2">
          {regions.map((region) => (
            <label 
              key={region} 
              className={`flex items-center gap-3 cursor-pointer p-2.5 md:p-2 rounded-lg transition-colors min-h-[40px] ${
                filters.region === region ? 'bg-primary-50 border border-primary-100' : 'hover:bg-gray-50'
              }`}
            >
              <input
                type="radio"
                name="region"
                checked={filters.region === region}
                onChange={() => handleFilterChange('region', filters.region === region ? '' : region)}
                className="w-4 h-4 text-primary-500 focus:ring-primary-500"
              />
              <span className={`text-sm md:text-base text-gray-700 ${filters.region === region ? 'font-medium' : ''}`}>
                {region}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Duration */}
      <div className="mb-6 md:mb-8">
        <h4 className="font-semibold text-gray-900 mb-3 md:mb-4 flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          Duration
        </h4>
        <div className="space-y-1 md:space-y-2">
          {['', '1-3 days', '4-7 days', '8-14 days', '15+ days'].map((duration) => {
            const displayText = duration === '' ? 'Any Duration' : duration;
            const isSelected = filters.duration === duration;
            
            return (
              <label 
                key={duration || 'any'} 
                className={`flex items-center gap-3 cursor-pointer p-2.5 md:p-2 rounded-lg transition-colors min-h-[40px] ${
                  isSelected ? 'bg-primary-50 border border-primary-100' : 'hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name="duration"
                  checked={isSelected}
                  onChange={() => handleFilterChange('duration', duration)}
                  className="w-4 h-4 text-primary-500 focus:ring-primary-500"
                />
                <span className={`text-sm md:text-base text-gray-700 ${isSelected ? 'font-medium' : ''}`}>
                  {displayText}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Difficulty */}
      <div className="mb-2">
        <h4 className="font-semibold text-gray-900 mb-3 md:mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          Difficulty
        </h4>
        <div className="space-y-1 md:space-y-2">
          {['', ...difficulties].map((difficulty) => {
            const displayText = difficulty === '' ? 'Any Difficulty' : difficulty;
            const isSelected = filters.difficulty === difficulty;
            
            return (
              <label 
                key={difficulty || 'any'} 
                className={`flex items-center gap-3 cursor-pointer p-2.5 md:p-2 rounded-lg transition-colors min-h-[40px] ${
                  isSelected ? 'bg-primary-50 border border-primary-100' : 'hover:bg-gray-50'
                }`}
              >
                <input
                  type="radio"
                  name="difficulty"
                  checked={isSelected}
                  onChange={() => handleFilterChange('difficulty', difficulty)}
                  className="w-4 h-4 text-primary-500 focus:ring-primary-500"
                />
                <span className={`text-sm md:text-base text-gray-700 ${isSelected ? 'font-medium' : ''}`}>
                  {displayText}
                </span>
              </label>
            );
          })}
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 overflow-x-hidden max-w-[100vw]">
      {/* Hero Section */}
      <div className="relative py-12 md:py-20 bg-gradient-to-r from-primary-600 to-orange-600 text-white">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-6xl font-heading font-bold mb-4 md:mb-6 leading-tight">
              Ethiopian Tour Packages
            </h1>
            <p className="text-base md:text-xl text-white/90 mb-6 md:mb-8 max-w-2xl mx-auto px-2">
              Complete tour packages with detailed itineraries, clear pricing, and professional photos
            </p>
            
            {/* Tour Features Highlight - Optimized scroll container for small screens */}
            <div className="mb-6 md:mb-8 flex flex-nowrap md:flex-wrap overflow-x-auto md:overflow-visible pb-3 md:pb-0 justify-start md:justify-center gap-3 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-none">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full flex-shrink-0 text-xs md:text-sm">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Day-by-day itineraries</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full flex-shrink-0 text-xs md:text-sm">
                <DollarSign className="w-3.5 h-3.5" />
                <span>Clear pricing & inclusions</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full flex-shrink-0 text-xs md:text-sm">
                <Camera className="w-3.5 h-3.5" />
                <span>Professional photos</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full flex-shrink-0 text-xs md:text-sm">
                <Users className="w-3.5 h-3.5" />
                <span>Local expert guides</span>
              </div>
            </div>
            
            {/* Search Bar Container */}
            <div className="max-w-2xl mx-auto px-1">
              <div className="flex flex-col sm:flex-row gap-2.5 bg-white/20 backdrop-blur-lg rounded-2xl p-2 md:p-2.5">
                <div className="flex-1 flex items-center relative">
                  <Search className="w-5 h-5 text-white/60 left-4 absolute pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search destinations, activities..."
                    className="w-full pl-11 pr-4 py-3 md:py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm md:text-base"
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                  />
                </div>
                <button 
                  onClick={() => handleFilterChange('search', filters.search)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 md:py-4 bg-white text-primary-600 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 min-h-[44px] text-sm md:text-base"
                >
                  <Filter className="w-4 h-4 md:w-5 h-5" />
                  Search Tours
                </button>
              </div>
            </div>
            
            {useFallback && (
              <div className="mt-4 md:mt-6 inline-flex items-center gap-2 bg-yellow-500/20 backdrop-blur-sm border border-yellow-400/30 text-yellow-100 px-3 py-1.5 rounded-lg text-xs md:text-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Showing sample tours. Live data will load when available.</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Floating Sticky Filter Button */}
      <div className="lg:hidden fixed bottom-4 right-4 z-40">
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="flex items-center gap-2 bg-primary-500 text-white px-5 py-3 rounded-full shadow-xl font-bold tracking-wide text-sm active:scale-95 transition-transform border border-primary-400/20"
        >
          <Filter className="w-4 h-4" />
          Filters ({getActiveFilterCount()})
        </button>
      </div>

      {/* Mobile Sidebar Filter Sheet Backing Canvas */}
      {isMobileFilterOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-xs z-50 transition-opacity"
          onClick={() => setIsMobileFilterOpen(false)}
        />
      )}

      {/* Mobile Filter Sheet Compartment Drawer */}
      <div className={`lg:hidden fixed inset-y-0 left-0 w-full max-w-xs bg-white z-50 p-6 shadow-2xl overflow-y-auto transform transition-transform duration-300 ease-in-out ${
        isMobileFilterOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex justify-end mb-4">
          <button 
            onClick={() => setIsMobileFilterOpen(false)}
            className="p-2 text-gray-500 hover:text-gray-700 bg-gray-100 rounded-full min-h-[40px] min-w-[40px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <FilterFormControls />
      </div>

      {/* Main Main Content Grid Layer */}
      <div className="container mx-auto px-4 py-6 md:py-12">
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          {/* Desktop Filters Sidebar Component View */}
          <div className="hidden lg:block lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6 border border-gray-100">
              <FilterFormControls />
            </div>

            <div className="mt-6 bg-gradient-to-r from-primary-50 to-yellow-50 rounded-2xl p-6 border border-primary-100">
              <h4 className="font-semibold text-gray-900 mb-4 text-sm md:text-base">Every Tour Includes:</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <BookOpen className="w-4 h-4 text-primary-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">Detailed day-by-day itinerary</span>
                </li>
                <li className="flex items-start gap-2">
                  <DollarSign className="w-4 h-4 text-primary-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">Clear pricing & what's included</span>
                </li>
                <li className="flex items-start gap-2">
                  <Camera className="w-4 h-4 text-primary-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">Professional destination photos</span>
                </li>
                <li className="flex items-start gap-2">
                  <Users className="w-4 h-4 text-primary-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">Local Ethiopian guide services</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Tours Cards Display Matrix Segment */}
          <div className="w-full lg:w-3/4">
            {/* Results Title Info Blocks */}
            <div className="mb-6 md:mb-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 flex flex-wrap items-center gap-2">
                    <span>{filters.category ? `${filters.category} Tours` : 'All Tour Packages'}</span>
                    {filters.category && (
                      <span className="text-xs font-normal text-primary-600 bg-primary-50 px-2.5 py-1 rounded-full whitespace-nowrap">
                        {filteredTours.length} {filteredTours.length === 1 ? 'tour' : 'tours'}
                      </span>
                    )}
                  </h2>
                  <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs md:text-sm text-gray-600">
                    <span>{loading ? 'Loading tours...' : `Showing ${paginatedTours.length} of ${filteredTours.length} tours`}</span>
                    {!loading && useFallback && (
                      <>
                        <span className="text-gray-300 hidden sm:inline">•</span>
                        <span className="text-primary-600 font-medium flex items-center gap-1">
                          <Sparkles className="w-3 h-3" /> Sample Tours
                        </span>
                      </>
                    )}
                    {!loading && getActiveFilterCount() > 0 && (
                      <>
                        <span className="text-gray-300 hidden sm:inline">•</span>
                        <span className="text-primary-600 font-medium">Filtered ({getActiveFilterCount()})</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Loading Grid Mask State */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl shadow p-5 animate-pulse border border-gray-100">
                    <div className="h-48 md:h-64 bg-gray-200 rounded-xl mb-4"></div>
                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {/* Micro-Pill Indicator Panels for Active Filtering Criteria */}
                {getActiveFilterCount() > 0 && (
                  <div className="mb-5 flex flex-wrap gap-1.5 md:gap-2">
                    {Object.entries(filters).map(([key, value]) => {
                      if (!value || value === '') return null;
                      
                      let displayValue = value;
                      let displayKey = key === 'search' ? 'Search' : key.charAt(0).toUpperCase() + key.slice(1);
                      
                      return (
                        <div 
                          key={key} 
                          className="inline-flex items-center gap-1.5 pl-3 pr-2 py-1 bg-primary-50 text-primary-800 rounded-full text-xs border border-primary-100/60"
                        >
                          <span className="font-semibold text-primary-600">{displayKey}:</span>
                          <span className="truncate max-w-[120px]">{displayValue}</span>
                          <button
                            onClick={() => handleFilterChange(key as keyof Filters, '')}
                            className="p-0.5 rounded-full hover:bg-primary-200 transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Main Cards Output Matrix */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                  {paginatedTours.map((tour) => (
                    <TourCard 
                      key={tour._id} 
                      tour={tour}
                      onExploreClick={() => handleExploreTour(tour)}
                    />
                  ))}
                </div>

                {/* Blank Dynamic Fallback Panel */}
                {paginatedTours.length === 0 && !loading && (
                  <div className="text-center py-12 px-4 bg-white rounded-2xl border border-gray-100 shadow-xs max-w-md mx-auto mt-6">
                    <div className="text-gray-400 text-sm md:text-base mb-4">No tours found matching your filter selection.</div>
                    <button
                      onClick={clearFilters}
                      className="px-5 py-2.5 bg-primary-500 text-white font-medium rounded-xl hover:bg-primary-600 text-sm min-h-[40px] shadow-sm transition-all"
                    >
                      Reset All Filters
                    </button>
                  </div>
                )}

                {/* Responsive Pagination Layout controls */}
                {pagination.pages > 1 && (
                  <div className="mt-10 md:mt-12 flex justify-center px-2">
                    <nav className="flex items-center gap-1 md:gap-2">
                      <button
                        onClick={() => handlePageChange(pagination.page - 1)}
                        disabled={!pagination.hasPrev}
                        className="px-3 py-2 md:px-4 text-xs md:text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed min-h-[38px]"
                      >
                        Prev
                      </button>
                      {[...Array(pagination.pages)].map((_, i) => {
                        // Display rules to hide excessive buttons on super compact mobile widths
                        if (pagination.pages > 4 && Math.abs(pagination.page - (i + 1)) > 1 && i !== 0 && i !== pagination.pages - 1) {
                          if (i === 1 || i === pagination.pages - 2) {
                            return <span key={i} className="px-1 text-gray-400 text-xs">...</span>;
                          }
                          return null;
                        }
                        return (
                          <button
                            key={i}
                            onClick={() => handlePageChange(i + 1)}
                            className={`px-3 py-2 md:px-4 text-xs md:text-sm border rounded-lg min-h-[38px] transition-colors ${
                              pagination.page === i + 1 
                                ? 'bg-primary-500 text-white border-primary-500 font-bold' 
                                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            {i + 1}
                          </button>
                        );
                      })}
                      <button
                        onClick={() => handlePageChange(pagination.page + 1)}
                        disabled={!pagination.hasNext}
                        className="px-3 py-2 md:px-4 text-xs md:text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed min-h-[38px]"
                      >
                        Next
                      </button>
                    </nav>
                  </div>
                )}
              </>
            )}

            {/* Bottom Custom Call-To-Action Element Wrapper */}
            <div className="mt-12 md:mt-16 text-center px-1">
              <div className="bg-gradient-to-r from-primary-50 to-yellow-50 rounded-2xl p-6 md:p-8 border border-primary-100 shadow-xs">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2.5 md:mb-4">Your Ethiopian Journey Awaits</h3>
                <p className="text-gray-600 text-xs md:text-sm mb-5 md:mb-6 max-w-2xl mx-auto leading-relaxed">
                  Each tour is carefully crafted with complete itineraries, clear pricing, and all necessary details 
                  to make your Ethiopian adventure seamless and memorable.
                </p>
                <button
                  onClick={handleCustomTourRequest}
                  className="inline-flex items-center gap-2 px-6 py-3.5 md:px-8 md:py-4 bg-primary-500 text-white font-bold rounded-xl hover:bg-primary-600 shadow-md transition-all text-xs md:text-sm min-h-[44px] active:scale-98"
                >
                  Get Custom Itinerary
                </button>
                
                {/* Horizontal Features Legend Footer - Hidden or converted nicely on small screen break widths */}
                <div className="mt-6 pt-4 border-t border-gray-200/60 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 text-xs text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-primary-500" />
                    Complete itineraries
                  </span>
                  <span className="flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-primary-500" />
                    Transparent pricing
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-primary-500" />
                    Professional photos
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      
      <ApplyTourModal
        isOpen={isApplyModalOpen}
        onClose={handleCloseModal}
        tour={selectedTour || undefined}
      />
    </div>
  );
}
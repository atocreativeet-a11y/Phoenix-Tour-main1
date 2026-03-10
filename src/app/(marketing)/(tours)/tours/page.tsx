// src/app/(marketing)/(tours)/tours/page.tsx
'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import TourCard from '@/components/tours/TourCard';
import { Filter, MapPin, Calendar, TrendingUp, Search, X, Sparkles, BookOpen, Camera, DollarSign, Users, Mountain, Castle, Compass, Zap, Clock, Star } from 'lucide-react';
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

// Updated fallback tours matching client's categories
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
    slug: 'lalibela-tigray-rock-churches',
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

// Client's main categories with icons
const mainCategories = [
  { name: 'Ethiopia Highlights', icon: Star, description: 'Classic routes covering major attractions' },
  { name: 'Historical Tours', icon: Castle, description: 'Lalibela, Gondar, Axum - Ancient kingdoms' },
  { name: 'Cultural Tours', icon: Users, description: 'Omo Valley tribes & traditional experiences' },
  { name: 'Nature & Trekking', icon: Mountain, description: 'Simien, Bale Mountains, wildlife' },
  { name: 'Adventure', icon: Zap, description: 'Rafting, biking, off-road experiences' },
  { name: 'Day Trips', icon: Clock, description: 'Addis, Debre Libanos, easy excursions' }
];

// Enhanced mock tours
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
  
  // Initialize filters with empty values first
  const [filters, setFilters] = useState<Filters>({
    category: '',
    region: '',
    difficulty: '',
    duration: '',
    search: ''
  });
  
  // Separate state to track if URL params have been read
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

  // Function to update URL with current filters
  const updateURL = useCallback((newFilters: Filters) => {
    const params = new URLSearchParams();
    
    if (newFilters.category) params.set('category', newFilters.category);
    if (newFilters.region) params.set('region', newFilters.region);
    if (newFilters.difficulty) params.set('difficulty', newFilters.difficulty);
    if (newFilters.duration) params.set('duration', newFilters.duration);
    if (newFilters.search) params.set('search', newFilters.search);
    
    const queryString = params.toString();
    const newUrl = queryString ? `/tours?${queryString}` : '/tours';
    
    // Update URL without refreshing the page
    router.push(newUrl, { scroll: false });
  }, [router]);

  // Read URL parameters on component mount
  useEffect(() => {
    const category = searchParams.get('category') || '';
    const region = searchParams.get('region') || '';
    const difficulty = searchParams.get('difficulty') || '';
    const duration = searchParams.get('duration') || '';
    const search = searchParams.get('search') || '';
    
    console.log('URL Parameters:', { category, region, difficulty, duration, search });
    
    // Only update filters if they're different from current
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

  // Fetch ALL tours on component mount with fallback
 const fetchAllTours = useCallback(async () => {
  setLoading(true);
  setUseFallback(false);
  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    console.log('Fetching ALL tours...');
    
    const response = await fetch('/api/tours?limit=100'
    //   , {
    //   signal: controller.signal
    // }
  
  );
    
    clearTimeout(timeoutId); // Clear timeout on success
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("All tours received:", data.tours?.length);
    
    if (data.success && data.tours && data.tours.length > 0) {
      setAllTours(data.tours);
    } else {
      setUseFallback(true);
      setAllTours(enhancedFallbackTours);
    }
  } catch (error) {
    clearTimeout(timeoutId); // Clear timeout on error too
    
    // Check if the error is an abort error
    if (error instanceof DOMException && error.name === 'AbortError') {
      console.log('Request timed out, using fallback tours');
    } else {
      console.error('Failed to fetch tours:', error);
    }
    
    setUseFallback(true);
    setAllTours(enhancedFallbackTours);
  } finally {
    setLoading(false);
  }
}, []);

  useEffect(() => {
    fetchAllTours();
  }, [fetchAllTours]);

  // Function to filter tours locally
  const filterToursLocally = useCallback((currentFilters: Filters) => {
    const toursToFilter = useFallback ? enhancedFallbackTours : allTours;
    
    if (toursToFilter.length === 0) return [];
    
    console.log('Filtering tours with:', currentFilters);
    
    return toursToFilter.filter(tour => {
      // Category filter
      if (currentFilters.category && currentFilters.category !== 'All Tours') {
        if (tour.category !== currentFilters.category) {
          return false;
        }
      }
      
      // Region filter
      if (currentFilters.region) {
        if (tour.region !== currentFilters.region) {
          return false;
        }
      }
      
      // Difficulty filter
      if (currentFilters.difficulty) {
        if (tour.difficulty !== currentFilters.difficulty) {
          return false;
        }
      }
      
      // Duration filter
      if (currentFilters.duration) {
        // Extract number of days from duration string (e.g., "3-7 days" -> get min days 3)
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
        
        if (!passesDurationFilter) {
          return false;
        }
      }
      
      // Search filter
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

  // Apply filters whenever filters change or when tours load
  useEffect(() => {
    if ((allTours.length > 0 || useFallback) && urlParamsRead) {
      console.log('Applying filters with:', filters);
      const filtered = filterToursLocally(filters);
      console.log(`Found ${filtered.length} tours after filtering`);
      
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

  // Update URL when filters change (but not on initial load)
  useEffect(() => {
    if (urlParamsRead) {
      updateURL(filters);
    }
  }, [filters, updateURL, urlParamsRead]);

  // Get paginated tours for current page
  const paginatedTours = useMemo(() => {
    const startIndex = (pagination.page - 1) * 6;
    return filteredTours.slice(startIndex, startIndex + 6);
  }, [filteredTours, pagination.page]);

  const handleFilterChange = (key: keyof Filters, value: string) => {
    console.log(`Filter changed: ${key} = ${value}`);
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    console.log('Clearing filters');
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
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle explore tour click
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

  // Close modal
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

  // Helper function to display active filters
  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.category && filters.category !== 'All Tours') count++;
    if (filters.region) count++;
    if (filters.difficulty) count++;
    if (filters.duration) count++;
    if (filters.search.trim()) count++;
    return count;
  };

  // Calculate category counts from current tours
  const calculatedCategoryCounts = useMemo(() => {
    const counts: {[key: string]: number} = {};
    const toursToCount = useFallback ? enhancedFallbackTours : allTours;
    
    // Initialize all categories with 0
    ['All Tours', ...mainCategories.map(c => c.name)].forEach(category => {
      counts[category] = 0;
    });
    
    // Count tours by category
    toursToCount.forEach(tour => {
      if (counts[tour.category] !== undefined) {
        counts[tour.category]++;
      }
      counts['All Tours']++; // Always increment "All Tours"
    });
    
    return counts;
  }, [allTours, useFallback]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section - Updated to highlight tour features */}
      <div className="relative py-20 bg-gradient-to-r from-primary-600 to-orange-600 text-white">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              Ethiopian Tour Packages
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Complete tour packages with detailed itineraries, clear pricing, and professional photos
            </p>
            
            {/* Tour Features Highlight */}
            <div className="mb-8 flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <BookOpen className="w-4 h-4" />
                <span>Day-by-day itineraries</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <DollarSign className="w-4 h-4" />
                <span>Clear pricing & inclusions</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Camera className="w-4 h-4" />
                <span>Professional photos</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Users className="w-4 h-4" />
                <span>Local expert guides</span>
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4 bg-white/20 backdrop-blur-lg rounded-2xl p-2">
                <div className="flex-1 flex items-center">
                  <Search className="w-5 h-5 text-white/60 ml-4 absolute" />
                  <input
                    type="text"
                    placeholder="Search tours by destination, activity, or category..."
                    className="w-full pl-12 pr-6 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                  />
                </div>
                <button 
                  onClick={() => handleFilterChange('search', filters.search)} // Just trigger re-filter
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300"
                >
                  <Filter className="w-5 h-5" />
                  Search Tours
                </button>
              </div>
            </div>
            
            {/* Fallback warning */}
            {useFallback && (
              <div className="mt-6 inline-flex items-center gap-2 bg-yellow-500/20 backdrop-blur-sm border border-yellow-400/30 text-yellow-100 px-4 py-2 rounded-lg">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm">Showing sample tours. Live data will load when available.</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
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
                    className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
                  >
                    <X className="w-4 h-4" />
                    Clear All
                  </button>
                )}
              </div>

              {/* Categories - Updated with main categories */}
              <div className="mb-8">
                <h4 className="font-semibold text-gray-900 mb-4">Tour Categories</h4>
                <div className="space-y-2">
                  {['All Tours', ...mainCategories.map(c => c.name)].map((category) => {
                    const isSelected = category === 'All Tours' 
                      ? !filters.category 
                      : filters.category === category;
                    
                    return (
                      <label 
                        key={category} 
                        className={`flex items-center justify-between cursor-pointer p-2 rounded-lg transition-colors ${
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
                          <span className={`text-gray-700 ${isSelected ? 'font-medium' : ''}`}>
                            {category}
                          </span>
                        </div>
                        <span className="text-gray-500 text-sm bg-gray-100 px-2 py-1 rounded">
                          {calculatedCategoryCounts[category] || 0}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Regions */}
              <div className="mb-8">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Regions
                </h4>
                <div className="space-y-2">
                  {regions.map((region) => (
                    <label 
                      key={region} 
                      className={`flex items-center gap-3 cursor-pointer p-2 rounded-lg transition-colors ${
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
                      <span className={`text-gray-700 ${filters.region === region ? 'font-medium' : ''}`}>
                        {region}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div className="mb-8">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Duration
                </h4>
                <div className="space-y-2">
                  {['', '1-3 days', '4-7 days', '8-14 days', '15+ days'].map((duration) => {
                    const displayText = duration === '' ? 'Any Duration' : duration;
                    const isSelected = filters.duration === duration;
                    
                    return (
                      <label 
                        key={duration || 'any'} 
                        className={`flex items-center gap-3 cursor-pointer p-2 rounded-lg transition-colors ${
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
                        <span className={`text-gray-700 ${isSelected ? 'font-medium' : ''}`}>
                          {displayText}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Difficulty */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Difficulty
                </h4>
                <div className="space-y-2">
                  {['', ...difficulties].map((difficulty) => {
                    const displayText = difficulty === '' ? 'Any Difficulty' : difficulty;
                    const isSelected = filters.difficulty === difficulty;
                    
                    return (
                      <label 
                        key={difficulty || 'any'} 
                        className={`flex items-center gap-3 cursor-pointer p-2 rounded-lg transition-colors ${
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
                        <span className={`text-gray-700 ${isSelected ? 'font-medium' : ''}`}>
                          {displayText}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* What's Included Section */}
            <div className="mt-6 bg-gradient-to-r from-primary-50 to-yellow-50 rounded-2xl p-6 border border-primary-100">
              <h4 className="font-semibold text-gray-900 mb-4">Every Tour Includes:</h4>
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

          {/* Tours Grid */}
          <div className="lg:w-3/4">
            {/* Results Header */}
            <div className="mb-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {filters.category ? `${filters.category} Tours` : 'All Tour Packages'}
                    {filters.category && (
                      <span className="ml-2 text-sm font-normal text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                        {filteredTours.length} {filteredTours.length === 1 ? 'tour' : 'tours'}
                      </span>
                    )}
                  </h2>
                  <div className="flex items-center gap-2 mt-2">
                    <p className="text-gray-600">
                      {loading ? 'Loading tours...' : `Showing ${paginatedTours.length} of ${filteredTours.length} tours`}
                    </p>
                    {!loading && useFallback && (
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400">•</span>
                        <span className="text-primary-600 text-sm font-medium flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          Sample Tours
                        </span>
                      </div>
                    )}
                    {!loading && getActiveFilterCount() > 0 && (
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400">•</span>
                        <span className="text-primary-600 text-sm font-medium">
                          Filtered ({getActiveFilterCount()})
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl shadow p-6 animate-pulse">
                    <div className="h-64 bg-gray-200 rounded-xl mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {/* Active Filters Display */}
                {getActiveFilterCount() > 0 && (
                  <div className="mb-6 flex flex-wrap gap-2">
                    {Object.entries(filters).map(([key, value]) => {
                      if (!value || value === '') return null;
                      
                      let displayValue = value;
                      let displayKey = key;
                      
                      // Format display names
                      if (key === 'search') {
                        displayKey = 'Search';
                      } else {
                        displayKey = key.charAt(0).toUpperCase() + key.slice(1);
                      }
                      
                      return (
                        <div 
                          key={key} 
                          className="inline-flex items-center gap-2 px-3 py-2 bg-primary-100 text-primary-800 rounded-full text-sm"
                        >
                          <span className="font-medium">{displayKey}:</span>
                          <span>{displayValue}</span>
                          <button
                            onClick={() => handleFilterChange(key as keyof Filters, '')}
                            className="ml-1 hover:text-primary-900"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Tours Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {paginatedTours.map((tour) => (
                    <TourCard 
                      key={tour._id} 
                      tour={tour}
                      onExploreClick={() => handleExploreTour(tour)}
                    />
                  ))}
                </div>

                {/* No Results */}
                {paginatedTours.length === 0 && !loading && (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">No tours found matching your filters</div>
                    <button
                      onClick={clearFilters}
                      className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}

                {/* Pagination */}
                {pagination.pages > 1 && (
                  <div className="mt-12 flex justify-center">
                    <nav className="flex items-center gap-2">
                      <button
                        onClick={() => handlePageChange(pagination.page - 1)}
                        disabled={!pagination.hasPrev}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      {[...Array(pagination.pages)].map((_, i) => (
                        <button
                          key={i}
                          onClick={() => handlePageChange(i + 1)}
                          className={`px-4 py-2 border rounded-lg ${pagination.page === i + 1 ? 'bg-primary-500 text-white border-primary-500' : 'border-gray-300 hover:bg-gray-50'}`}
                        >
                          {i + 1}
                        </button>
                      ))}
                      <button
                        onClick={() => handlePageChange(pagination.page + 1)}
                        disabled={!pagination.hasNext}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </nav>
                  </div>
                )}
              </>
            )}

            {/* Call to Action - Updated with client's perspective */}
            <div className="mt-16 text-center">
              <div className="bg-gradient-to-r from-primary-50 to-yellow-50 rounded-2xl p-8 border border-primary-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Your Ethiopian Journey Awaits</h3>
                <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                  Each tour is carefully crafted with complete itineraries, clear pricing, and all necessary details 
                  to make your Ethiopian adventure seamless and memorable.
                </p>
                <button
                  onClick={handleCustomTourRequest}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary-500 text-white font-semibold rounded-xl hover:bg-primary-600 transition-all duration-300"
                >
                  Get a Custom Itinerary
                </button>
                {useFallback && (
                  <p className="mt-4 text-sm text-gray-500">
                    Full tour details and booking available when connected
                  </p>
                )}
                <div className="mt-6 flex justify-center gap-6 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    Complete itineraries
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    Transparent pricing
                  </span>
                  <span className="flex items-center gap-1">
                    <Camera className="w-4 h-4" />
                    Professional photos
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Apply Tour Modal */}
      <ApplyTourModal
        isOpen={isApplyModalOpen}
        onClose={handleCloseModal}
        tour={selectedTour || undefined}
      />
    </div>
  );
}
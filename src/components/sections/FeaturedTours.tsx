'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import TourCard from '@/components/tours/TourCard';
import ApplyTourModal from '@/components/modals/ApplyTourModal';
import { ArrowRight, TrendingUp, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

interface Tour {
  _id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  duration: string;
  difficulty: string;
  price: number;
  discountPrice?: number;
  rating: number;
  category: string;
  region: string;
  image: string;
  tags: string[];
  iconName: string;
  highlight?: string;
  isFeatured?: boolean;
}

interface Category {
  name: string;
  count: number;
  active: boolean;
  description?: string;
  icon?: string;
}

// Fallback static tours data with comprehensive categories
const fallbackTours = [
  {
    _id: 'fallback-1',
    title: 'Simien Mountains Trek',
    slug: 'simien-mountains-trek',
    description: 'Hike through the "Roof of Africa" with endemic wildlife and breathtaking views. Experience one of Africa\'s most spectacular mountain ranges.',
    shortDescription: 'Hike through the "Roof of Africa"',
    duration: '3-7 days',
    difficulty: 'Challenging',
    price: 850,
    rating: 4.9,
    category: 'Mountain Trekking',
    region: 'Northern Ethiopia',
    image: 'https://images.unsplash.com/photo-1559561736-9e6dafa9e7b0?auto=format&fit=crop&w=800&q=80',
    tags: ['UNESCO', 'Wildlife', 'Photography', 'Hiking'],
    iconName: 'Mountain',
    highlight: 'See the Gelada monkeys and Ethiopian wolves',
    isFeatured: true
  },
  {
    _id: 'fallback-2',
    title: 'Lalibela & Northern Churches',
    slug: 'lalibela-northern-churches',
    description: 'Explore the incredible rock-hewn churches of Lalibela and the ancient kingdom sites of Ethiopia.',
    shortDescription: 'Explore ancient rock-hewn churches',
    duration: '4 days',
    difficulty: 'Easy',
    price: 680,
    rating: 4.8,
    category: 'Historical',
    region: 'Northern Ethiopia',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80',
    tags: ['UNESCO', 'Historical', 'Spiritual', 'Cultural'],
    iconName: 'Castle',
    highlight: 'Visit St. George\'s Church, the masterpiece',
    isFeatured: true
  },
  {
    _id: 'fallback-3',
    title: 'Omo Valley Cultural Journey',
    slug: 'omo-valley-cultural-journey',
    description: 'Cultural immersion with indigenous tribes of Southern Ethiopia. Learn about traditional lifestyles and customs.',
    shortDescription: 'Cultural immersion with indigenous tribes',
    duration: '6 days',
    difficulty: 'Moderate',
    price: 920,
    rating: 4.8,
    category: 'Cultural Heritage',
    region: 'Southern Ethiopia',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
    tags: ['Tribal', 'Cultural', 'Photography', 'Indigenous'],
    iconName: 'Compass',
    highlight: 'Meet the Mursi, Hamer, and Karo tribes',
    isFeatured: true
  },
  {
    _id: 'fallback-4',
    title: 'Danakil Depression Adventure',
    slug: 'danakil-depression-adventure',
    description: 'Witness one of Earth\'s most extreme environments with volcanic landscapes, colorful sulfur springs, and salt flats.',
    shortDescription: 'Witness extreme volcanic landscapes',
    duration: '4 days',
    difficulty: 'Moderate',
    price: 720,
    rating: 4.9,
    category: 'Adventure',
    region: 'Eastern Ethiopia',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
    tags: ['Volcano', 'Extreme', 'Unique', 'Geothermal'],
    iconName: 'Sun',
    highlight: 'See the colorful sulfur springs and Erta Ale lava lake',
    isFeatured: true
  },
  {
    _id: 'fallback-5',
    title: 'Addis Ababa Day Tour',
    slug: 'addis-ababa-day-tour',
    description: 'Explore Ethiopia\'s vibrant capital city, visit the National Museum, Merkato, and enjoy traditional coffee ceremony.',
    shortDescription: 'Explore Ethiopia\'s vibrant capital',
    duration: '1 day',
    difficulty: 'Easy',
    price: 65,
    rating: 4.7,
    category: 'Cultural Heritage',
    region: 'Central Ethiopia',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
    tags: ['City Tour', 'Cultural', 'Historical', 'Food'],
    iconName: 'City',
    highlight: 'See Lucy (Australopithecus) at the National Museum',
    isFeatured: true
  },
  {
    _id: 'fallback-6',
    title: 'Classic Ethiopia Highlights',
    slug: 'classic-ethiopia-highlights',
    description: 'The ultimate Ethiopian experience covering Lalibela, Gondar, Simien Mountains, and Axum.',
    shortDescription: 'The ultimate Ethiopian experience',
    duration: '12 days',
    difficulty: 'Moderate',
    price: 1850,
    rating: 4.9,
    category: 'Cultural Heritage',
    region: 'Northern Ethiopia',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
    tags: ['Classic', 'Comprehensive', 'Best Seller', 'UNESCO'],
    iconName: 'Star',
    highlight: 'All major historical and natural sites in one tour',
    isFeatured: true
  },
  {
    _id: 'fallback-7',
    title: 'Bale Mountains National Park',
    slug: 'bale-mountains-national-park',
    description: 'Discover the unique Afro-alpine ecosystem and spot rare Ethiopian wolves in their natural habitat.',
    shortDescription: 'Discover unique Afro-alpine ecosystem',
    duration: '4 days',
    difficulty: 'Moderate',
    price: 780,
    rating: 4.7,
    category: 'Wildlife',
    region: 'Southern Ethiopia',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80',
    tags: ['Wildlife', 'Trekking', 'National Park', 'Endemic Species'],
    iconName: 'Tree',
    highlight: 'Spot Ethiopian wolves and mountain nyala',
    isFeatured: true
  },
  {
    _id: 'fallback-8',
    title: 'Gondar Castles & Churches',
    slug: 'gondar-castles-churches',
    description: 'Visit the "Camelot of Africa" - the royal castles of Gondar and nearby mountain churches.',
    shortDescription: 'Visit the "Camelot of Africa"',
    duration: '2 days',
    difficulty: 'Easy',
    price: 350,
    rating: 4.6,
    category: 'Historical',
    region: 'Northern Ethiopia',
    image: 'https://images.unsplash.com/photo-1564507004663-b6dfb3e2ede5?auto=format&fit=crop&w=800&q=80',
    tags: ['Castles', 'UNESCO', 'Historical', 'Architecture'],
    iconName: 'Castle',
    highlight: 'Explore Fasil Ghebbi - the Royal Enclosure',
    isFeatured: true
  },
  {
    _id: 'fallback-9',
    title: 'Harar & Dire Dawa Discovery',
    slug: 'harar-dire-dawa-discovery',
    description: 'Explore the ancient walled city of Harar and experience hyena feeding traditions.',
    shortDescription: 'Explore ancient walled city',
    duration: '3 days',
    difficulty: 'Easy',
    price: 520,
    rating: 4.7,
    category: 'Cultural Heritage',
    region: 'Eastern Ethiopia',
    image: 'https://images.unsplash.com/photo-1511317559916-56d5ddb625e8?auto=format&fit=crop&w=800&q=80',
    tags: ['Walled City', 'Cultural', 'Islamic Heritage', 'Hyena Feeding'],
    iconName: 'City',
    highlight: 'Witness the unique hyena feeding ceremony',
    isFeatured: true
  }
];

// Updated categories based on your new structure
const newCategories = [
  'Mountain Trekking',
  'Cultural Heritage',
  'Adventure',
  'Wildlife',
  'Historical',
  'Spiritual',
  'Photography',
  'Luxury'
];

export default function FeaturedTours({ id }: { id?: string }) {
  const [featuredTours, setFeaturedTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [useFallback, setUseFallback] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All Tours');
  const [categories, setCategories] = useState<Category[]>([
    { name: 'All Tours', count: 0, active: true },
    ...newCategories.map(category => ({
      name: category,
      count: 0,
      active: false
    }))
  ]);

  // Carousel state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout>();
  const [isAnimating, setIsAnimating] = useState(false);

  // Modal state
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState<{
    id?: string;
    name: string;
    price?: number;
    duration?: string;
    difficulty?: string;
  } | null>(null);

  // Update category counts from tours
  const updateCategoryCounts = useCallback((tours: Tour[], activeCat: string) => {
    const categoryCounts: Record<string, number> = {
      'All Tours': tours.length
    };

    // Initialize all new categories with 0
    newCategories.forEach(category => {
      categoryCounts[category] = 0;
    });

    // Count tours for each category
    tours.forEach(tour => {
      const category = tour.category;
      if (categoryCounts.hasOwnProperty(category)) {
        categoryCounts[category]++;
      }
    });

    // Update categories state
    setCategories(prev => prev.map(cat => ({
      ...cat,
      count: categoryCounts[cat.name] || 0,
      active: cat.name === activeCat
    })));
  }, []);

  // Calculate visible cards based on screen size
  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth < 768) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };

    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);
    return () => window.removeEventListener('resize', updateVisibleCards);
  }, []);

  // Auto-play carousel
  useEffect(() => {
    if (isAutoPlaying && featuredTours.length > visibleCards) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prev) => {
          const nextIndex = prev + 1;
          return nextIndex >= featuredTours.length ? 0 : nextIndex;
        });
      }, 3000);

      return () => {
        if (autoPlayRef.current) {
          clearInterval(autoPlayRef.current);
        }
      };
    }
  }, [isAutoPlaying, featuredTours.length, visibleCards]);

  // Handle category click
  const handleCategoryClick = async (categoryName: string) => {
    setActiveCategory(categoryName);
    setCurrentIndex(0); // Reset carousel to start
    
    // Update category active state immediately
    setCategories(prev => prev.map(cat => ({
      ...cat,
      active: cat.name === categoryName
    })));

    // If using fallback, filter immediately
    if (useFallback) {
      const filteredTours = filterFallbackTours(categoryName);
      setFeaturedTours(filteredTours);
      updateCategoryCounts(filteredTours, categoryName);
    } else {
      // Otherwise fetch from backend
      await fetchFeaturedTours(categoryName);
    }
  };

  // Filter fallback tours by category
  const filterFallbackTours = (categoryName: string): Tour[] => {
    if (categoryName === 'All Tours') {
      return fallbackTours;
    }
    
    return fallbackTours.filter(tour => tour.category === categoryName);
  };

  // Fetch featured tours
  const fetchFeaturedTours = async (category?: string) => {
    setLoading(true);
    
    try {
      const params = new URLSearchParams();
      params.append('limit', '12');
      params.append('sort', '-rating');
      
      if (category && category !== 'All Tours') {
        params.append('category', category);
      }

      const response = await fetch(`/api/tours?${params}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success && data.tours && data.tours.length > 0) {
        const tours = data.tours;
        setFeaturedTours(tours);
        setUseFallback(false);
        
        // Update category counts based on fetched tours
        updateCategoryCounts(tours, category || 'All Tours');
      } else {
        throw new Error('No tours found in API');
      }
    } catch (error) {
      console.error('Failed to fetch featured tours:', error);
      
      // Fallback to static data
      setUseFallback(true);
      const filteredFallback = filterFallbackTours(category || 'All Tours');
      setFeaturedTours(filteredFallback);
      updateCategoryCounts(filteredFallback, category || 'All Tours');
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      try {
        await fetchFeaturedTours('All Tours');
      } catch (error) {
        console.error('Failed to load initial data:', error);
        // Already handled in fetchFeaturedTours
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

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

  // Carousel navigation
  const nextSlide = () => {
    if (isAnimating || featuredTours.length === 0) return;
    
    setIsAnimating(true);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    setIsAutoPlaying(false);
    
    setCurrentIndex((prev) => {
      const nextIndex = prev + 1;
      return nextIndex >= featuredTours.length ? 0 : nextIndex;
    });

    // Allow animation to complete
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);

    // Restart auto-play after manual navigation
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const prevSlide = () => {
    if (isAnimating || featuredTours.length === 0) return;
    
    setIsAnimating(true);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    setIsAutoPlaying(false);
    
    setCurrentIndex((prev) => {
      const prevIndex = prev - 1;
      return prevIndex < 0 ? featuredTours.length - 1 : prevIndex;
    });

    // Allow animation to complete
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);

    // Restart auto-play after manual navigation
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  // Get visible tours based on current index
  const getVisibleTours = () => {
    if (featuredTours.length === 0) return [];
    
    const tours = [];
    
    // Get the tours to display (current index and next ones)
    for (let i = 0; i < Math.min(visibleCards, featuredTours.length); i++) {
      const tourIndex = (currentIndex + i) % featuredTours.length;
      tours.push(featuredTours[tourIndex]);
    }
    
    return tours;
  };

  // Calculate total slides for indicators
  const totalSlides = featuredTours.length;

  // Pause auto-play on hover
  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  return (
    <>
      <section className="py-20 bg-gradient-to-b from-white to-gray-50" id={id}>
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-primary-500 font-semibold mb-4">
              <div className="w-4 h-4 bg-primary-500 rounded-full animate-pulse"></div>
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                ETHIOPIAN TOURS & ADVENTURES
                <Sparkles className="w-4 h-4" />
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              <span className="text-gray-900">Your Gateway to </span>
              <span className="text-primary-500">Authentic Ethiopia</span>
            </h2>
            
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Experience Ethiopia through expertly crafted tours that showcase our rich history, 
              diverse cultures, and breathtaking natural wonders.
            </p>
            

          </div>

<div className="flex sm:flex-wrap sm:overflow-visible justify-start sm:justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 px-2">
  {categories.map((category) => (
    <button
      key={category.name}
      onClick={() => handleCategoryClick(category.name)}
      disabled={category.count === 0 && category.name !== 'All Tours'}
      className={`whitespace-nowrap px-4 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-base rounded-full font-medium transition-all duration-300 border flex items-center gap-1.5 sm:gap-2 ${
        category.active 
          ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30 border-primary-500' 
          : category.count === 0 && category.name !== 'All Tours'
          ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
          : 'bg-white text-gray-700 hover:bg-primary-50 border-gray-300 hover:border-primary-300'
      }`}
    >
      {category.name}
      <span className={`text-xs px-2 py-0.5 rounded-full ${
        category.active 
          ? 'bg-primary-600/30 text-white' 
          : category.count === 0
          ? 'bg-gray-200 text-gray-500'
          : 'bg-gray-100 text-gray-600'
      }`}>
        {category.count}
      </span>
    </button>
  ))}
</div>

          {/* Carousel Container */}
          <div 
            className="relative mb-8"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Carousel Navigation Buttons */}
            {featuredTours.length > visibleCards && (
              <>
                <button
                  onClick={prevSlide}
                  disabled={isAnimating}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white/90 backdrop-blur-sm border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-700" />
                </button>
                <button
                  onClick={nextSlide}
                  disabled={isAnimating}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white/90 backdrop-blur-sm border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-5 h-5 text-gray-700" />
                </button>
              </>
            )}

            {/* Carousel Content */}
            <div ref={carouselRef} className="overflow-hidden">
              {loading ? (
                <div className="flex justify-center gap-8">
                  {[...Array(visibleCards)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`flex-shrink-0 ${visibleCards === 3 ? 'w-1/3' : visibleCards === 2 ? 'w-1/2' : 'w-full'}`}
                    >
                      <div className="bg-white rounded-2xl shadow p-6 animate-pulse">
                        <div className="h-64 bg-gray-200 rounded-xl mb-4"></div>
                        <div className="h-6 bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded mb-4"></div>
                        <div className="h-10 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : featuredTours.length > 0 ? (
                <div className="flex justify-center gap-8">
                  {getVisibleTours().map((tour, index) => (
                    <div 
                      key={`${tour._id}-${index}`}
                      className={`flex-shrink-0 transition-all duration-500 ease-out ${
                        visibleCards === 3 ? 'w-1/3' : 
                        visibleCards === 2 ? 'w-1/2' : 
                        'w-full'
                      }`}
                    >
                      <TourCard 
                        tour={tour}
                        onExploreClick={() => handleExploreTour(tour)}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-lg mb-4">
                    No tours found in this category
                  </div>
                  <button
                    onClick={() => handleCategoryClick('All Tours')}
                    className="px-6 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600"
                  >
                    View All Tours
                  </button>
                </div>
              )}
            </div>

            {/* Carousel Indicators */}
            {totalSlides > visibleCards && (
              <div className="flex justify-center gap-2 mt-8">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    disabled={isAnimating}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? 'bg-primary-500 w-8' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    } ${isAnimating ? 'opacity-50 cursor-not-allowed' : ''}`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Apply Tour Modal */}
      <ApplyTourModal
        isOpen={isApplyModalOpen}
        onClose={handleCloseModal}
        tour={selectedTour || undefined}
      />
    </>
  );
}
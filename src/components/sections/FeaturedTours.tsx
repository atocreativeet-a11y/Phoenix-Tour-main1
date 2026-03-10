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
}

/* ---------------- FALLBACK TOURS ---------------- */

const fallbackTours: Tour[] = [
  {
    _id: 'fallback-1',
    title: 'Simien Mountains Trek',
    slug: 'simien-mountains-trek',
    description: 'Hike through the "Roof of Africa" with endemic wildlife and breathtaking views.',
    shortDescription: 'Hike through the "Roof of Africa"',
    duration: '3-7 days',
    difficulty: 'Challenging',
    price: 850,
    rating: 4.9,
    category: 'Mountain Trekking',
    region: 'Northern Ethiopia',
    image: 'https://images.unsplash.com/photo-1559561736-9e6dafa9e7b0?auto=format&fit=crop&w=800&q=80',
    tags: ['UNESCO','Wildlife','Photography','Hiking'],
    iconName: 'Mountain',
    highlight: 'See the Gelada monkeys and Ethiopian wolves',
    isFeatured: true
  },
  {
    _id: 'fallback-2',
    title: 'Lalibela & Northern Churches',
    slug: 'lalibela-northern-churches',
    description: 'Explore the incredible rock-hewn churches of Lalibela.',
    shortDescription: 'Explore ancient rock-hewn churches',
    duration: '4 days',
    difficulty: 'Easy',
    price: 680,
    rating: 4.8,
    category: 'Historical',
    region: 'Northern Ethiopia',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=800&q=80',
    tags: ['UNESCO','Historical','Spiritual','Cultural'],
    iconName: 'Castle',
    highlight: "Visit St. George's Church",
    isFeatured: true
  },
  {
    _id: 'fallback-3',
    title: 'Omo Valley Cultural Journey',
    slug: 'omo-valley-cultural-journey',
    description: 'Cultural immersion with indigenous tribes of Southern Ethiopia.',
    shortDescription: 'Cultural immersion with indigenous tribes',
    duration: '6 days',
    difficulty: 'Moderate',
    price: 920,
    rating: 4.8,
    category: 'Cultural Heritage',
    region: 'Southern Ethiopia',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
    tags: ['Tribal','Cultural','Photography','Indigenous'],
    iconName: 'Compass',
    highlight: 'Meet the Mursi, Hamer, and Karo tribes',
    isFeatured: true
  },
  {
    _id: 'fallback-4',
    title: 'Danakil Depression Adventure',
    slug: 'danakil-depression-adventure',
    description: 'Witness one of Earth’s most extreme environments.',
    shortDescription: 'Witness extreme volcanic landscapes',
    duration: '4 days',
    difficulty: 'Moderate',
    price: 720,
    rating: 4.9,
    category: 'Adventure',
    region: 'Eastern Ethiopia',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
    tags: ['Volcano','Extreme','Unique','Geothermal'],
    iconName: 'Sun',
    highlight: 'See the colorful sulfur springs and Erta Ale lava lake',
    isFeatured: true
  },
  {
    _id: 'fallback-5',
    title: 'Addis Ababa Day Tour',
    slug: 'addis-ababa-day-tour',
    description: 'Explore Ethiopia’s vibrant capital city.',
    shortDescription: 'Explore Ethiopia’s vibrant capital',
    duration: '1 day',
    difficulty: 'Easy',
    price: 65,
    rating: 4.7,
    category: 'Cultural Heritage',
    region: 'Central Ethiopia',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
    tags: ['City Tour','Cultural','Historical','Food'],
    iconName: 'City',
    highlight: 'See Lucy at the National Museum',
    isFeatured: true
  },
  {
    _id: 'fallback-6',
    title: 'Classic Ethiopia Highlights',
    slug: 'classic-ethiopia-highlights',
    description: 'The ultimate Ethiopian experience.',
    shortDescription: 'The ultimate Ethiopian experience',
    duration: '12 days',
    difficulty: 'Moderate',
    price: 1850,
    rating: 4.9,
    category: 'Cultural Heritage',
    region: 'Northern Ethiopia',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
    tags: ['Classic','Comprehensive','Best Seller','UNESCO'],
    iconName: 'Star',
    highlight: 'All major historical and natural sites',
    isFeatured: true
  },
  {
    _id: 'fallback-7',
    title: 'Bale Mountains National Park',
    slug: 'bale-mountains-national-park',
    description: 'Discover the Afro-alpine ecosystem.',
    shortDescription: 'Discover unique Afro-alpine ecosystem',
    duration: '4 days',
    difficulty: 'Moderate',
    price: 780,
    rating: 4.7,
    category: 'Wildlife',
    region: 'Southern Ethiopia',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=800&q=80',
    tags: ['Wildlife','Trekking','National Park','Endemic'],
    iconName: 'Tree',
    highlight: 'Spot Ethiopian wolves',
    isFeatured: true
  },
  {
    _id: 'fallback-8',
    title: 'Gondar Castles & Churches',
    slug: 'gondar-castles-churches',
    description: 'Visit the Camelot of Africa.',
    shortDescription: 'Visit the Camelot of Africa',
    duration: '2 days',
    difficulty: 'Easy',
    price: 350,
    rating: 4.6,
    category: 'Historical',
    region: 'Northern Ethiopia',
    image: 'https://images.unsplash.com/photo-1564507004663-b6dfb3e2ede5?auto=format&fit=crop&w=800&q=80',
    tags: ['Castles','UNESCO','Architecture'],
    iconName: 'Castle',
    highlight: 'Explore Fasil Ghebbi',
    isFeatured: true
  },
  {
    _id: 'fallback-9',
    title: 'Harar & Dire Dawa Discovery',
    slug: 'harar-dire-dawa-discovery',
    description: 'Explore the ancient walled city of Harar.',
    shortDescription: 'Explore ancient walled city',
    duration: '3 days',
    difficulty: 'Easy',
    price: 520,
    rating: 4.7,
    category: 'Cultural Heritage',
    region: 'Eastern Ethiopia',
    image: 'https://images.unsplash.com/photo-1511317559916-56d5ddb625e8?auto=format&fit=crop&w=800&q=80',
    tags: ['Walled City','Cultural','Hyena Feeding'],
    iconName: 'City',
    highlight: 'Witness hyena feeding ceremony',
    isFeatured: true
  }
];

const newCategories = [
  'Mountain Trekking',
  'Cultural Heritage',
  'Adventure',
  'Wildlife',
  'Historical',
  'Spiritual',
  'Photography',
  'Luxury',
];

export default function FeaturedTours({ id }: { id?: string }) {

  const [featuredTours, setFeaturedTours] = useState<Tour[]>(fallbackTours);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth < 768) setVisibleCards(1);
      else if (window.innerWidth < 1024) setVisibleCards(2);
      else setVisibleCards(3);
    };

    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);
    return () => window.removeEventListener('resize', updateVisibleCards);
  }, []);

  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex(prev =>
        prev + 1 >= featuredTours.length - visibleCards + 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => {
      if (autoPlayRef.current !== null) clearInterval(autoPlayRef.current);
    };
  }, [featuredTours.length, visibleCards]);

  const nextSlide = () => {
    setCurrentIndex(prev =>
      prev + 1 >= featuredTours.length - visibleCards + 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex(prev =>
      prev === 0 ? featuredTours.length - visibleCards : prev - 1
    );
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50" id={id}>
      <div className="container mx-auto px-4">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold">
            Your Gateway to <span className="text-primary-500">Authentic Ethiopia</span>
          </h2>
        </div>

        <div className="relative">

          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white w-10 h-10 rounded-full flex items-center justify-center shadow"
          >
            <ChevronLeft className="w-5 h-5"/>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white w-10 h-10 rounded-full flex items-center justify-center shadow"
          >
            <ChevronRight className="w-5 h-5"/>
          </button>

          <div className="overflow-hidden">
            <div
              className="flex gap-8 transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`
              }}
            >
              {featuredTours.map(tour => (
                <div
                  key={tour._id}
                  className={`flex-shrink-0 ${
                    visibleCards === 3 ? 'w-1/3' :
                    visibleCards === 2 ? 'w-1/2' : 'w-full'
                  }`}
                >
                  <TourCard tour={tour} />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
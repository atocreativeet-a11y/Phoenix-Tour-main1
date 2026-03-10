// src/components/blog/BlogCategories.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Compass, 
  Coffee, 
  Camera, 
  Mountain, 
  BookOpen, 
  MapPin, 
  Users, 
  Calendar,
  TrendingUp,
  ChevronRight
} from 'lucide-react';

const categories = [
  { name: 'Ethiopian Culture', slug: 'ethiopian-culture', icon: <Users />, count: 24, color: 'bg-purple-500' },
  { name: 'Travel Tips', slug: 'travel-tips', icon: <Compass />, count: 18, color: 'bg-blue-500' },
  { name: 'Food & Coffee', slug: 'food-coffee', icon: <Coffee />, count: 15, color: 'bg-amber-600' },
  { name: 'Photography', slug: 'photography', icon: <Camera />, count: 12, color: 'bg-pink-500' },
  { name: 'History & Heritage', slug: 'history-heritage', icon: <BookOpen />, count: 21, color: 'bg-emerald-500' },
  { name: 'Nature & Wildlife', slug: 'nature-wildlife', icon: <Mountain />, count: 14, color: 'bg-green-500' },
  { name: 'Festivals & Events', slug: 'festivals-events', icon: <Calendar />, count: 8, color: 'bg-red-500' },
  { name: 'Local Stories', slug: 'local-stories', icon: <MapPin />, count: 16, color: 'bg-orange-500' },
];

export default function BlogCategories() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h3 className="text-lg font-heading font-bold text-gray-900 mb-4 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-primary-500" />
        Explore Categories
      </h3>
      
      <div className="space-y-2">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/blog/category/${category.slug}`}
            className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 group ${
              activeCategory === category.slug
                ? 'bg-primary-50 border border-primary-100'
                : 'hover:bg-gray-50'
            }`}
            onMouseEnter={() => setActiveCategory(category.slug)}
            onMouseLeave={() => setActiveCategory(null)}
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 ${category.color} rounded-lg flex items-center justify-center`}>
                <div className="text-white">
                  {category.icon}
                </div>
              </div>
              <div>
                <div className="font-medium text-gray-900">{category.name}</div>
                <div className="text-xs text-gray-500">{category.count} articles</div>
              </div>
            </div>
            
            <ChevronRight className={`w-4 h-4 text-gray-400 group-hover:text-primary-500 transition-colors ${
              activeCategory === category.slug ? 'text-primary-500' : ''
            }`} />
          </Link>
        ))}
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-100">
        <Link
          href="/blog/categories"
          className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center justify-center gap-1"
        >
          View all categories
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
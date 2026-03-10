// src/components/blog/BlogSidebar.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, TrendingUp, Calendar, Tag, User, Clock } from 'lucide-react';

interface BlogSidebarProps {
  popularPosts?: Array<{
    _id: string;
    title: string;
    slug: string;
    views: number;
    createdAt: string;
  }>;
  tags?: Array<{ _id: string; count: number }>;
}

export default function BlogSidebar({ popularPosts, tags }: BlogSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [recentPosts, setRecentPosts] = useState(popularPosts || []);

  // Example recent posts if not provided
  useEffect(() => {
    if (!popularPosts) {
      setRecentPosts([
        { _id: '1', title: 'Coffee Ceremony Guide', slug: 'coffee-ceremony', views: 2500, createdAt: '2024-01-15' },
        { _id: '2', title: 'Best Time to Visit Ethiopia', slug: 'best-time-visit', views: 1800, createdAt: '2024-01-10' },
        { _id: '3', title: 'Lalibela Photography Tips', slug: 'lalibela-photography', views: 1200, createdAt: '2024-01-05' },
        { _id: '4', title: 'Omo Valley Tribes', slug: 'omo-valley-tribes', views: 900, createdAt: '2024-01-01' },
      ]);
    }
  }, [popularPosts]);

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search blog articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      {/* Popular Posts */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-lg font-heading font-bold text-gray-900 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary-500" />
          Popular Articles
        </h3>
        
        <div className="space-y-4">
          {recentPosts.map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug}`}
              className="group flex items-start gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="flex-shrink-0 w-2 h-2 bg-primary-500 rounded-full mt-2" />
              <div className="flex-1">
                <div className="font-medium text-gray-900 text-sm group-hover:text-primary-600 transition-colors">
                  {post.title}
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {post.views.toLocaleString()} views
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <h3 className="text-lg font-heading font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Tag className="w-5 h-5 text-primary-500" />
          Popular Tags
        </h3>
        
        <div className="flex flex-wrap gap-2">
          {(tags || [
            { _id: 'coffee', count: 24 },
            { _id: 'culture', count: 32 },
            { _id: 'photography', count: 18 },
            { _id: 'travel-tips', count: 15 },
            { _id: 'lalibela', count: 12 },
            { _id: 'omo-valley', count: 9 },
            { _id: 'festivals', count: 7 },
            { _id: 'ethiopian-food', count: 11 },
          ]).map((tag) => (
            <Link
              key={tag._id}
              href={`/blog/tag/${tag._id}`}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 hover:bg-primary-100 hover:text-primary-700 rounded-full text-sm transition-colors"
            >
              <span>#{tag._id}</span>
              <span className="text-xs text-gray-500">({tag.count})</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-6 text-white">
        <h3 className="text-lg font-heading font-bold mb-3">Stay Updated</h3>
        <p className="text-white/90 text-sm mb-4">
          Get the latest travel stories, cultural insights, and exclusive offers.
        </p>
        
        <div className="space-y-3">
          <input
            type="email"
            placeholder="Your email address"
            className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
          <button className="w-full py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
            Subscribe
          </button>
        </div>
        
        <p className="text-white/70 text-xs mt-4">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
}
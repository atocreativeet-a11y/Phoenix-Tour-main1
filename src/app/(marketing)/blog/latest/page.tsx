// src/app/blog/latest/page.tsx - Latest Posts Page
import { Metadata } from 'next';
import BlogList from '@/components/blog/BlogList';
import { BookOpen, TrendingUp, Clock, Flame } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Latest Travel Articles | Phoenix Ethiopia Tour Blog',
  description: 'Browse our newest Ethiopia travel articles, cultural insights, and destination guides.',
};

export default function LatestBlogPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-primary-500/10 via-white to-yellow-500/5">
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary-500/20 to-yellow-500/20 backdrop-blur-sm rounded-full px-5 py-3 mb-6 border border-primary-500/30">
              <BookOpen className="w-4 h-4 text-primary-600" />
              <span className="text-primary-700 font-medium">FRESH CONTENT</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              <span className="text-gray-900">Latest </span>
              <span className="text-primary-500">Travel Stories</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              Stay updated with our newest articles about Ethiopia's hidden gems, travel tips, and cultural discoveries.
            </p>

            {/* Content Filters */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-primary-500 text-primary-500 rounded-full hover:bg-primary-50 transition-colors">
                <TrendingUp className="w-4 h-4" />
                Trending
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-orange-500 text-orange-500 rounded-full hover:bg-orange-50 transition-colors">
                <Flame className="w-4 h-4" />
                Popular
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-blue-500 text-blue-500 rounded-full hover:bg-blue-50 transition-colors">
                <Clock className="w-4 h-4" />
                Recent
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-green-500 text-green-500 rounded-full hover:bg-green-50 transition-colors">
                <BookOpen className="w-4 h-4" />
                All Posts
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Pass a prop to disable Google Maps if it's used in BlogList */}
          <BlogList  />
        </div>
      </section>
    </main>
  );
}
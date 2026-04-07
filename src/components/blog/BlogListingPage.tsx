// src/components/blog/BlogListingPage.tsx
'use client';

import { useState, useEffect } from 'react';
import BlogPostCard from './BlogPostCard';
import BlogCategories from './BlogCategories';
import BlogSidebar from './BlogSidebar';
import * as Icons from "lucide-react";

const Search = (Icons as any).Search;
const Filter = (Icons as any).Filter;
const Grid = (Icons as any).Grid;
const List = (Icons as any).List;
const ChevronLeft = (Icons as any).ChevronLeft;
const ChevronRight = (Icons as any).ChevronRight;

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string;
  categories: string[];
  readTime: number;
  views: number;
  likes: number;
  createdAt: string;
  author: {
    name: string;
  };
}

export default function BlogListingPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const featuredPosts: BlogPost[] = [
    {
      _id: '1',
      title: 'Coffee Ceremony: Ethiopia\'s Soul in a Cup',
      slug: 'coffee-ceremony-ethiopias-soul-cup',
      excerpt: 'Discover the spiritual journey of Ethiopian coffee ceremony - a tradition that connects generations.',
      featuredImage: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80',
      categories: ['Food & Coffee', 'Ethiopian Culture'],
      readTime: 8,
      views: 2500,
      likes: 156,
      createdAt: '2024-01-15',
      author: { name: 'Selam Mekonnen' }
    },
    {
      _id: '2',
      title: 'Lalibela: The 8th Wonder of the World',
      slug: 'lalibela-8th-wonder-world',
      excerpt: 'Explore the rock-hewn churches that have stood for 800 years as a testament to faith and engineering.',
      featuredImage: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1200&q=80',
      categories: ['History & Heritage', 'Photography'],
      readTime: 10,
      views: 3200,
      likes: 234,
      createdAt: '2024-01-10',
      author: { name: 'Michael Wolde' }
    }
  ];

  useEffect(() => {
    fetchPosts();
  }, [page, selectedCategory, searchQuery]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '9'
      });
      
      if (selectedCategory) {
        params.append('category', selectedCategory);
      }
      
      if (searchQuery) {
        params.append('search', searchQuery);
      }
      
      const response = await fetch(`/api/blog/posts?${params}`);
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setPosts(data.posts || []);
          setTotalPages(data.pagination?.pages || 1);
        }
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      // Fallback to mock data
      setPosts([
        {
          _id: '3',
          title: 'Omo Valley: Meeting Ethiopia\'s Ancient Tribes',
          slug: 'omo-valley-ancient-tribes',
          excerpt: 'A journey to meet the indigenous tribes who preserve traditions dating back thousands of years.',
          featuredImage: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
          categories: ['Ethiopian Culture', 'Local Stories'],
          readTime: 12,
          views: 1800,
          likes: 98,
          createdAt: '2024-01-05',
          author: { name: 'Amina Hassan' }
        },
        // Add more mock posts...
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="relative py-20 bg-gradient-to-r from-primary-600 to-orange-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container relative z-10 mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">ETHIOPIA TRAVEL INSIGHTS</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            <span className="text-white">Ethiopia Travel</span>
            <br />
            <span className="text-yellow-300">Blog & Stories</span>
          </h1>
          
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Authentic stories, cultural insights, and practical tips from our local experts.
            Discover the real Ethiopia through the eyes of those who know it best.
          </p>
          
          {/* Search */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles, destinations, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${
                  viewMode === 'grid' 
                    ? 'bg-primary-500 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${
                  viewMode === 'list' 
                    ? 'bg-primary-500 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
            </div>
            
            <div className="text-sm text-gray-600">
              Showing {posts.length} of 50+ articles
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <BlogCategories />
              <BlogSidebar />
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {/* Featured Posts */}
              <div className="mb-12">
                <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">Featured Stories</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {featuredPosts.map((post) => (
                    <BlogPostCard key={post._id} post={post} layout="featured" />
                  ))}
                </div>
              </div>

              {/* All Posts */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-heading font-bold text-gray-900">Latest Articles</h2>
                  {selectedCategory && (
                    <button 
                      onClick={() => setSelectedCategory(null)}
                      className="text-sm text-primary-600 hover:text-primary-700"
                    >
                      Clear filter
                    </button>
                  )}
                </div>

                {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="bg-white rounded-2xl border border-gray-200 p-4 animate-pulse">
                        <div className="h-48 bg-gray-200 rounded-xl mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
                        <div className="h-3 bg-gray-200 rounded mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    ))}
                  </div>
                ) : posts.length > 0 ? (
                  <div className={viewMode === 'grid' 
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
                    : 'space-y-4'
                  }>
                    {posts.map((post) => (
                      <BlogPostCard key={post._id} post={post} layout={viewMode} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-gray-400 text-lg mb-4">No articles found</div>
                    <button 
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory(null);
                      }}
                      className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
                    >
                      View All Articles
                    </button>
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-12">
                    <button 
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNum = i + 1;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setPage(pageNum)}
                          className={`w-10 h-10 rounded-lg ${
                            page === pageNum
                              ? 'bg-primary-500 text-white'
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    
                    {totalPages > 5 && (
                      <>
                        <span className="px-2">...</span>
                        <button
                          onClick={() => setPage(totalPages)}
                          className={`w-10 h-10 rounded-lg ${
                            page === totalPages
                              ? 'bg-primary-500 text-white'
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          {totalPages}
                        </button>
                      </>
                    )}
                    
                    <button 
                      onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
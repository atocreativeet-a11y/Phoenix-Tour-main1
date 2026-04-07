// src/components/blog/BlogSinglePage.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import * as Icons from "lucide-react";

const Calendar = (Icons as any).Calendar;
const Eye = (Icons as any).Eye;
const Heart = (Icons as any).Heart;
const Clock = (Icons as any).Clock;
const User = (Icons as any).User;
const Share2 = (Icons as any).Share2;
const Bookmark = (Icons as any).Bookmark;
const Tag = (Icons as any).Tag;
const ArrowLeft = (Icons as any).ArrowLeft;
const MessageCircle = (Icons as any).MessageCircle;
const Twitter = (Icons as any).Twitter;
const Facebook = (Icons as any).Facebook;
const Linkedin = (Icons as any).Linkedin;
const Mail = (Icons as any).Mail;
const ChevronLeft = (Icons as any).ChevronLeft;
const ChevronRight = (Icons as any).ChevronRight;
const Coffee = (Icons as any).Coffee;
const MapPin = (Icons as any).MapPin;
const Globe = (Icons as any).Globe;

import BlogSidebar from './BlogSidebar';
// import BblogC
import ApplyTourModal from '@/components/modals/ApplyTourModal';
import BlogComments from './BlogComments';

interface BlogSinglePageProps {
  post: {
    _id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featuredImage: string;
    images?: Array<{
      url: string;
      alt: string;
      caption: string;
    }>;
    categories: string[];
    tags: string[];
    readTime: number;
    views: number;
    likes: number;
    createdAt: string;
    author: {
      _id: string;
      name: string;
      email?: string;
      image?: string;
      bio?: string;
      role: string;
    };
    relatedTours?: Array<{
      _id: string;
      title: string;
      slug: string;
      price: number;
      duration: string;
      image: string;
    }>;
  };
  relatedPosts?: Array<{
    _id: string;
    title: string;
    slug: string;
    excerpt: string;
    featuredImage: string;
    readTime: number;
    createdAt: string;
  }>;
}

export default function BlogSinglePage({ post, relatedPosts = [] }: BlogSinglePageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleLike = async () => {
    try {
      const response = await fetch(`/api/blog/posts/${post.slug}/like`, {
        method: 'POST'
      });
      
      if (response.ok) {
        const data = await response.json();
        setLikes(data.likes);
        setIsLiked(true);
      }
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  
  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(post.title)}`,
    email: `mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(`Check out this article: ${shareUrl}`)}`
  };

  const tourDetails = {
    id: post.relatedTours?.[0]?._id || 'general',
    name: post.relatedTours?.[0]?.title || 'Ethiopian Cultural Tour',
    price: post.relatedTours?.[0]?.price || 99,
    duration: post.relatedTours?.[0]?.duration || 'Full day',
    difficulty: 'Easy',
  };

  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link 
                href="/blog" 
                className="flex items-center gap-2 text-gray-600 hover:text-primary-500 transition-colors group"
              >
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Blog
              </Link>
              
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  Book Related Tour
                </button>
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handleLike}
                    className={`p-2 rounded-lg transition-colors ${
                      isLiked 
                        ? 'bg-red-50 text-red-500' 
                        : 'hover:bg-gray-100 text-gray-600'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500' : ''}`} />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Bookmark className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Image */}
        <div className="relative h-[60vh] min-h-[500px] overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10" />
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          
          {/* Floating Badge */}
          <div className="absolute top-8 left-8 z-20">
            <div className="inline-flex items-center gap-2 bg-primary-500 text-white px-4 py-2 rounded-full">
              <Globe className="w-4 h-4" />
              <span className="text-sm font-semibold">ETHIOPIA TRAVEL BLOG</span>
            </div>
          </div>

          {/* Article Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 z-20 container mx-auto px-4 pb-12">
            <div className="max-w-4xl">
              {/* Categories */}
              <div className="flex flex-wrap gap-2 mb-6">
                {post.categories.map((category) => (
                  <Link
                    key={category}
                    href={`/blog/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold rounded-full hover:bg-white/30 transition-colors"
                  >
                    {category}
                  </Link>
                ))}
              </div>
              
              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight">
                {post.title}
              </h1>
              
              {/* Excerpt */}
              <p className="text-xl text-white/90 mb-8 max-w-3xl">
                {post.excerpt}
              </p>
              
              {/* Author & Metadata */}
              <div className="flex flex-wrap items-center gap-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 overflow-hidden">
                    {post.author.image ? (
                      <Image
                        src={post.author.image}
                        alt={post.author.name}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="font-bold text-white">{post.author.name}</div>
                    <div className="text-white/80 text-sm">{post.author.role || 'Travel Expert'}</div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-6 text-white/90">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(post.createdAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime} min read</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span>{post.views.toLocaleString()} views</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    <span>{likes.toLocaleString()} likes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <BlogSidebar />
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3">
                {/* Share Bar */}
                <div className="sticky top-24 mb-8 z-40">
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium text-gray-600">Share:</span>
                      <div className="flex items-center gap-2">
                        <a 
                          href={shareLinks.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Twitter className="w-4 h-4 text-blue-500" />
                        </a>
                        <a 
                          href={shareLinks.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Facebook className="w-4 h-4 text-blue-600" />
                        </a>
                        <a 
                          href={shareLinks.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Linkedin className="w-4 h-4 text-blue-700" />
                        </a>
                        <a 
                          href={shareLinks.email}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <Mail className="w-4 h-4 text-gray-600" />
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={handleLike}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                          isLiked 
                            ? 'bg-red-50 text-red-600 border border-red-200' 
                            : 'hover:bg-gray-100 text-gray-700 border border-gray-200'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-600' : ''}`} />
                        <span className="font-medium">{likes}</span>
                      </button>
                      
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Bookmark className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Blog Content */}
                <article className="prose prose-lg max-w-none mb-12">
                  {/* Content rendered from markdown or HTML */}
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                  
                  {/* Image Gallery if available */}
                  {post.images && post.images.length > 0 && (
                    <div className="my-8">
                      <div className="grid grid-cols-2 gap-4">
                        {post.images.map((image, index) => (
                          <div key={index} className="relative h-64 rounded-xl overflow-hidden">
                            <Image
                              src={image.url}
                              alt={image.alt || post.title}
                              fill
                              className="object-cover hover:scale-105 transition-transform duration-500 cursor-pointer"
                              onClick={() => setCurrentImageIndex(index)}
                            />
                            {image.caption && (
                              <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-3 text-sm">
                                {image.caption}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Tags */}
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Link
                          key={tag}
                          href={`/blog/tag/${tag}`}
                          className="inline-flex items-center gap-1 px-3 py-2 bg-gray-100 text-gray-700 hover:bg-primary-100 hover:text-primary-700 rounded-lg text-sm transition-colors"
                        >
                          <Tag className="w-3 h-3" />
                          {tag}
                        </Link>
                      ))}
                    </div>
                  </div>
                </article>

                {/* Related Tours */}
                {post.relatedTours && post.relatedTours.length > 0 && (
                  <div className="mb-12 bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl p-8">
                    <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6 flex items-center gap-3">
                      <MapPin className="w-6 h-6 text-primary-500" />
                      Related Tours
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      {post.relatedTours.map((tour) => (
                        <Link
                          key={tour._id}
                          href={`/tours/${tour.slug}`}
                          className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all duration-300"
                        >
                          <div className="relative h-48 overflow-hidden">
                            <Image
                              src={tour.image}
                              alt={tour.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-4 left-4 right-4">
                              <h3 className="text-lg font-bold text-white">{tour.title}</h3>
                              <div className="flex items-center gap-4 text-white/80 text-sm mt-1">
                                <span>{tour.duration}</span>
                                <span>•</span>
                                <span className="font-semibold">${tour.price}</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    
                    <div className="mt-6 text-center">
                      <button 
                        onClick={() => setIsModalOpen(true)}
                        className="px-8 py-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors"
                      >
                        Book This Experience
                      </button>
                    </div>
                  </div>
                )}

                {/* Comments Section */}
                <BlogComments postId={post._id} />

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                  <div className="mt-12">
                    <h2 className="text-2xl font-heading font-bold text-gray-900 mb-6">You Might Also Like</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {relatedPosts.map((relatedPost) => (
                        <Link
                          key={relatedPost._id}
                          href={`/blog/${relatedPost.slug}`}
                          className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all duration-300"
                        >
                          <div className="relative h-48 overflow-hidden">
                            <Image
                              src={relatedPost.featuredImage}
                              alt={relatedPost.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                              {relatedPost.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                              {relatedPost.excerpt}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {relatedPost.readTime} min
                              </span>
                              <span>
                                {new Date(relatedPost.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Newsletter CTA */}
                <div className="mt-12 bg-gradient-to-r from-primary-600 to-orange-600 rounded-2xl p-8 text-white text-center">
                  <h2 className="text-2xl font-heading font-bold mb-3">
                    Love Reading About Ethiopia?
                  </h2>
                  <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                    Subscribe to our newsletter for weekly stories, travel tips, and exclusive offers.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="flex-1 px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                    <button className="px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                      Subscribe
                    </button>
                  </div>
                  <p className="text-white/70 text-xs mt-4">
                    Join 10,000+ travel enthusiasts. No spam, unsubscribe anytime.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Booking Modal */}
      <ApplyTourModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tour={tourDetails}
      />
    </>
  );
}
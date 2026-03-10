// src/components/gallery/AdvancedGallery.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  Search, 
  Filter, 
  X, 
  MapPin, 
  Users, 
  Calendar,
  Heart,
  Share2,
  Download,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Play,
  Star
} from 'lucide-react';

interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  src: string;
  thumbnail: string;
  title: string;
  category: string;
  location: string;
  tags: string[];
  description?: string;
  featured: boolean;
  likes: number;
  views: number;
  date: string;
  photographer?: string;
  resolution?: string;
  duration?: string;
}

export default function AdvancedGallery() {
  const [items, setItems] = useState<GalleryItem[]>([
    {
      id: '1',
      type: 'image',
      src: 'https://images.unsplash.com/photo-1580655653885-65763b2597d0?auto=format&fit=crop&w=1200&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1580655653885-65763b2597d0?auto=format&fit=crop&w=400&q=80',
      title: 'Lalibela Rock-Hewn Churches',
      category: 'Historical',
      location: 'Lalibela, Amhara',
      tags: ['UNESCO', 'Architecture', 'Christianity'],
      description: 'The 11 medieval monolithic cave churches of this 13th-century "New Jerusalem" are situated in a mountainous region.',
      featured: true,
      likes: 1245,
      views: 15678,
      date: '2024-01-15',
      photographer: 'Alex Mekonnen',
      resolution: '4000x6000'
    },
    {
      id: '2',
      type: 'image',
      src: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=400&q=80',
      title: 'Erta Ale Lava Lake',
      category: 'Natural',
      location: 'Afar Depression',
      tags: ['Volcano', 'Adventure', 'Night'],
      description: 'One of the few permanent lava lakes in the world, offering a spectacular view of molten lava.',
      featured: true,
      likes: 987,
      views: 12456,
      date: '2024-02-20',
      photographer: 'Sarah Johnson',
      resolution: '6000x4000'
    },
    {
      id: '3',
      type: 'video',
      src: '/videos/coffee-ceremony.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=400&q=80',
      title: 'Traditional Coffee Ceremony',
      category: 'Cultural',
      location: 'Addis Ababa',
      tags: ['Coffee', 'Tradition', 'Hospitality'],
      description: 'Experience the authentic Ethiopian coffee ceremony, a ritual of hospitality and community.',
      featured: true,
      likes: 2103,
      views: 28901,
      date: '2024-03-10',
      photographer: 'Daniel Tesfaye',
      duration: '2:45'
    },
    {
      id: '4',
      type: 'image',
      src: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=1200&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=400&q=80',
      title: 'Omo Valley Tribes',
      category: 'Cultural',
      location: 'Omo Valley',
      tags: ['Tribes', 'Culture', 'Portrait'],
      description: 'The diverse ethnic groups of the Lower Omo Valley, known for their unique cultures and body art.',
      featured: false,
      likes: 876,
      views: 10345,
      date: '2024-01-28',
      photographer: 'Maria Rodriguez'
    },
    {
      id: '5',
      type: 'image',
      src: 'https://images.unsplash.com/photo-1552465011-b4e30bf7349d?auto=format&fit=crop&w=1200&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1552465011-b4e30bf7349d?auto=format&fit=crop&w=400&q=80',
      title: 'Simien Mountains Trekking',
      category: 'Adventure',
      location: 'Simien Mountains',
      tags: ['Hiking', 'Landscape', 'Wildlife'],
      description: 'Dramatic landscapes with deep gorges, jagged peaks, and endemic wildlife including the Gelada baboon.',
      featured: false,
      likes: 654,
      views: 9876,
      date: '2024-02-15',
      photographer: 'Thomas Wilson'
    },
    {
      id: '6',
      type: 'image',
      src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=1200&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&q=80',
      title: 'Blue Nile Falls',
      category: 'Natural',
      location: 'Bahir Dar',
      tags: ['Waterfall', 'Nature', 'Rainbow'],
      description: "Known as 'Tis Issat' (smoking water), these falls are a spectacular sight especially during the rainy season.",
      featured: true,
      likes: 543,
      views: 8765,
      date: '2024-03-05',
      photographer: 'Lisa Chen'
    },
    {
      id: '7',
      type: 'image',
      src: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=1200&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=400&q=80',
      title: 'Axum Obelisks',
      category: 'Historical',
      location: 'Axum, Tigray',
      tags: ['Ancient', 'Archaeology', 'Stelae'],
      description: 'The ancient obelisks of Axum, remnants of the powerful Aksumite Kingdom.',
      featured: false,
      likes: 432,
      views: 7654,
      date: '2024-01-10',
      photographer: 'Michael Brown'
    },
    {
      id: '8',
      type: 'video',
      src: '/videos/timkat-festival.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=400&q=80',
      title: 'Timkat Festival',
      category: 'Festival',
      location: 'Gondar',
      tags: ['Epiphany', 'Celebration', 'Religion'],
      description: 'The Ethiopian Orthodox celebration of Epiphany, featuring colorful processions and ceremonies.',
      featured: true,
      likes: 1876,
      views: 23456,
      date: '2024-01-19',
      photographer: 'Phoenix Ethiopia',
      duration: '3:20'
    }
  ]);

  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid');
  const [sortBy, setSortBy] = useState<'date' | 'likes' | 'views'>('date');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const categories = ['all', 'Historical', 'Natural', 'Cultural', 'Adventure', 'Festival'];
  const locations = ['All Regions', 'Lalibela', 'Afar', 'Addis Ababa', 'Omo Valley', 'Simien Mountains', 'Bahir Dar', 'Axum', 'Gondar'];

  const filteredItems = items.filter(item => {
    const matchesCategory = filter === 'all' || item.category === filter;
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === 'date') return new Date(b.date).getTime() - new Date(a.date).getTime();
    if (sortBy === 'likes') return b.likes - a.likes;
    if (sortBy === 'views') return b.views - a.views;
    return 0;
  });

  const handleItemClick = (item: GalleryItem, index: number) => {
    setSelectedItem(item);
    setCurrentIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    setIsFullscreen(false);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % sortedItems.length;
    setSelectedItem(sortedItems[nextIndex]);
    setCurrentIndex(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + sortedItems.length) % sortedItems.length;
    setSelectedItem(sortedItems[prevIndex]);
    setCurrentIndex(prevIndex);
  };

  const handleDownload = (item: GalleryItem) => {
    // In a real app, this would trigger download
    console.log('Downloading:', item.title);
    // Simulate download
    const link = document.createElement('a');
    link.href = item.src;
    link.download = `${item.title.replace(/\s+/g, '-').toLowerCase()}.${item.type === 'video' ? 'mp4' : 'jpg'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = (item: GalleryItem) => {
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: item.description,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(`${item.title} - ${window.location.href}`);
      alert('Link copied to clipboard!');
    }
  };

  const handleLike = (itemId: string) => {
    setItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, likes: item.likes + 1 } : item
    ));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedItem) return;
      
      switch(e.key) {
        case 'Escape':
          handleCloseModal();
          break;
        case 'ArrowRight':
          handleNext();
          break;
        case 'ArrowLeft':
          handlePrev();
          break;
        case 'f':
        case 'F':
          if (e.ctrlKey || e.metaKey) {
            setIsFullscreen(!isFullscreen);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItem, isFullscreen]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary-500/20 via-yellow-500/10 to-orange-500/20 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-500 to-orange-500 text-white px-4 py-2 rounded-full mb-6">
              <MapPin className="w-5 h-5" />
              <span className="font-semibold">ETHIOPIA'S WONDERS GALLERY</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-gray-900 mb-6">
              Discover <span className="text-primary-500">Ethiopia</span> in Every Frame
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Explore breathtaking landscapes, rich culture, and unforgettable moments captured by our team and travelers.
            </p>
          </div>
        </div>
      </div>

      {/* Gallery Controls */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200 py-4">
        {/* <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            

            {/* Filters */}
            
          {/* </div>  */}

          {/* Quick Filters */}
          {/* <div className="flex flex-wrap gap-2 mt-4">
            {locations.map(location => (
              <button
                key={location}
                onClick={() => setFilter(location === 'All Regions' ? 'all' : location)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${filter === location ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                <MapPin className="inline w-3 h-3 mr-1" />
                {location}
              </button>
            ))}
          </div> */}
        {/* </div> */}
      </div>

      {/* Gallery Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
            <div className="text-2xl font-bold text-primary-500">{items.length}</div>
            <div className="text-gray-600 text-sm">Total Media</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
            <div className="text-2xl font-bold text-primary-500">{formatNumber(items.reduce((acc, item) => acc + item.likes, 0))}</div>
            <div className="text-gray-600 text-sm">Total Likes</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
            <div className="text-2xl font-bold text-primary-500">{categories.length - 1}</div>
            <div className="text-gray-600 text-sm">Categories</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
            <div className="text-2xl font-bold text-primary-500">{locations.length - 1}</div>
            <div className="text-gray-600 text-sm">Regions</div>
          </div>
        </div>

        {/* Featured Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Star className="w-6 h-6 text-yellow-500" />
            Featured Highlights
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {items.filter(item => item.featured).slice(0, 2).map(item => (
              <div key={item.id} className="relative group cursor-pointer" onClick={() => handleItemClick(item, items.indexOf(item))}>
                <div className="relative h-64 lg:h-80 rounded-2xl overflow-hidden">
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 bg-primary-500 rounded-full text-xs font-semibold">
                        {item.category}
                      </span>
                      {item.type === 'video' && (
                        <span className="px-3 py-1 bg-orange-500 rounded-full text-xs font-semibold flex items-center gap-1">
                          <Play className="w-3 h-3" /> Video
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <div className="flex items-center gap-4 text-sm opacity-90">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" /> {item.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Heart className="w-4 h-4" /> {formatNumber(item.likes)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore Collection</h2>
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedItems.map((item, index) => (
              <div 
                key={item.id} 
                className="group relative bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-primary-300 hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => handleItemClick(item, index)}
              >
                {/* Thumbnail */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    unoptimized
                  />
                  {item.type === 'video' && (
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                        <Play className="w-6 h-6 text-primary-600" />
                      </div>
                    </div>
                  )}
                  {item.featured && (
                    <div className="absolute top-3 left-3">
                      <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs font-semibold rounded">
                      {item.category}
                    </span>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <Heart className="w-4 h-4" /> {formatNumber(item.likes)}
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-1">{item.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <MapPin className="w-4 h-4" />
                    <span>{item.location}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {item.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Masonry Layout */
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {sortedItems.map((item, index) => (
              <div 
                key={item.id} 
                className="break-inside-avoid group relative bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-primary-300 hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => handleItemClick(item, index)}
              >
                <div className="relative h-48">
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    unoptimized
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                    <span className="text-xs text-primary-600 font-medium">
                      View Details →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {sortedItems.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter to find what you are looking for.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setFilter('all');
              }}
              className="px-6 py-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div className={`fixed inset-0 z-50 ${isFullscreen ? '' : 'p-4'}`}>
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={handleCloseModal}
          />
          
          {/* Modal Content */}
          <div className={`relative h-full ${isFullscreen ? '' : 'max-w-7xl mx-auto'}`}>
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Fullscreen Toggle */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="absolute top-4 right-16 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              <Maximize2 className="w-6 h-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Media Display */}
            <div className="flex flex-col h-full">
              {/* Media Area */}
              <div className="flex-1 flex items-center justify-center p-4">
                {selectedItem.type === 'image' ? (
                  <div className="relative w-full h-full max-h-[70vh]">
                    <Image
                      src={selectedItem.src}
                      alt={selectedItem.title}
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                ) : (
                  <div className="w-full max-w-4xl">
                    <video
                      src={selectedItem.src}
                      controls
                      autoPlay
                      className="w-full h-auto rounded-lg"
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}
              </div>

              {/* Info Panel */}
              <div className="bg-gray-900/50 backdrop-blur-md text-white p-6">
                <div className="max-w-7xl mx-auto">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h2 className="text-2xl font-bold">{selectedItem.title}</h2>
                        {selectedItem.featured && (
                          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                        )}
                      </div>
                      <p className="text-gray-300 mb-4">{selectedItem.description}</p>
                      <div className="flex flex-wrap gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-5 h-5" />
                          <span>{selectedItem.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-5 h-5" />
                          <span>{selectedItem.photographer}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-5 h-5" />
                          <span>{new Date(selectedItem.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedItem.tags.map(tag => (
                          <span key={tag} className="px-3 py-1 bg-white/10 rounded-full text-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Stats & Actions */}
                    <div className="flex flex-col gap-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-white/10 rounded-xl">
                          <div className="text-2xl font-bold">{formatNumber(selectedItem.likes)}</div>
                          <div className="text-sm text-gray-300">Likes</div>
                        </div>
                        <div className="text-center p-3 bg-white/10 rounded-xl">
                          <div className="text-2xl font-bold">{formatNumber(selectedItem.views)}</div>
                          <div className="text-sm text-gray-300">Views</div>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleLike(selectedItem.id)}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary-500 hover:bg-primary-600 rounded-xl transition-colors"
                        >
                          <Heart className="w-5 h-5" />
                          Like
                        </button>
                        <button
                          onClick={() => handleShare(selectedItem)}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl transition-colors"
                        >
                          <Share2 className="w-5 h-5" />
                          Share
                        </button>
                        <button
                          onClick={() => handleDownload(selectedItem)}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-500 hover:bg-green-600 rounded-xl transition-colors"
                        >
                          <Download className="w-5 h-5" />
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Index Indicator */}
            <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
              {currentIndex + 1} / {sortedItems.length}
            </div>
          </div>
        </div>
      )}

      {/* Footer CTA */}
      {/* <div className="bg-gradient-to-r from-primary-500 to-orange-500 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Share Your Ethiopian Journey</h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Have amazing photos or videos from your Ethiopian adventure? Submit them to be featured in our gallery!
          </p>
          <button className="px-8 py-3 bg-white text-primary-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors">
            Submit Your Media
          </button>
        </div>
      </div> */}
    </div>
  );
}
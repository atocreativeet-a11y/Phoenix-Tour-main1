import * as Icons from "lucide-react";

const Clock = (Icons as any).Clock;
const MapPin = (Icons as any).MapPin;
const Star = (Icons as any).Star;
const Flag = (Icons as any).Flag;
const ArrowRight = (Icons as any).ArrowRight;
const Eye = (Icons as any).Eye;
import Link from 'next/link';
import { getIconComponent, difficultyColors } from '@/lib/utils/tour-icons';

interface TourCardProps {
  tour: {
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
  };
  onExploreClick?: () => void;
}

export default function TourCard({ tour, onExploreClick }: TourCardProps) {
  const Icon = getIconComponent(tour.iconName);
  
  return (
    <>
      <style jsx>{`
  @keyframes continuousMove {
    0% { transform: translateY(0%); }
    100% { transform: translateY(-100%); }
  }

  .animate-continuous {
    animation: continuousMove 10s linear infinite;
  }
`}</style>

      <div className="group relative animate-seamless-float bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-primary-500 transition-all duration-500 hover:shadow-2xl hover:shadow-primary-500/20">
        {/* Ethiopian Flag Badge */}
        <div className="absolute top-4 left-4 z-10">
          <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5">
            <div className="flex">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full mx-0.5"></div>
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            </div>
            <span className="text-xs font-semibold text-gray-700 ml-1">ETH</span>
          </div>
        </div>

        {/* Featured Badge */}
        {tour.isFeatured && (
          <div className="absolute top-4 right-4 z-10">
            <span className="px-3 py-1.5 bg-yellow-500/90 backdrop-blur-sm text-white text-sm font-semibold rounded-full">
              Featured
            </span>
          </div>
        )}

        {/* Image Container */}
        <div className="relative h-64 overflow-hidden">
          <Link href={`/tours/${tour.slug}`} className="absolute inset-0 z-0">
            <div 
              className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url(${tour.image})` }}
            />
          </Link>
          
          {/* Category Badge */}
          <div className="absolute bottom-4 left-4">
            <Link 
              href={`/tours?category=${encodeURIComponent(tour.category)}`}
              className="inline-block px-3 py-1.5 bg-primary-500/90 backdrop-blur-sm text-white text-sm font-semibold rounded-full hover:bg-primary-600 transition-colors"
            >
              {tour.category}
            </Link>
          </div>
          
          {/* Price Badge */}
          <div className="absolute bottom-4 right-4">
            <div className="px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full shadow-lg">
              {tour.discountPrice ? (
                <>
                  <span className="text-sm text-gray-500 line-through mr-2">${tour.price}</span>
                  <span className="text-2xl font-bold text-red-600">${tour.discountPrice}</span>
                </>
              ) : (
                <span className="text-2xl font-bold text-primary-600">${tour.price}</span>
              )}
              <span className="text-gray-600 text-sm">/person</span>
            </div>
          </div>
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <Link href={`/tours/${tour.slug}`}>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-1">
                  {tour.title}
                </h3>
              </Link>
              <div className="flex items-center gap-1 mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < Math.floor(tour.rating) ? 'fill-primary-500 text-primary-500' : 'fill-gray-300 text-gray-300'}`}
                    />
                  ))}
                  <span className="text-gray-600 text-sm ml-1">{tour.rating}</span>
                </div>
                <span className="text-gray-400 mx-2">•</span>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${difficultyColors[tour.difficulty]}`}>
                  {tour.difficulty}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary-500/10 rounded-lg">
                <Icon className="w-6 h-6 text-primary-500" />
              </div>
              <Link
                href={`/tours/${tour.slug}`}
                className="group/view flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-primary-100 rounded-lg transition-colors"
                title="View tour details"
              >
                <Eye className="w-5 h-5 text-gray-600 group-hover/view:text-primary-600 transition-colors" />
              </Link>
            </div>
          </div>

          {/* Description */}
          <Link href={`/tours/${tour.slug}`}>
            <p className="text-gray-600 mb-4 line-clamp-2 hover:text-gray-800 transition-colors">
              {tour.shortDescription || tour.description}
            </p>
          </Link>

          {/* Highlight */}
          {tour.highlight && (
            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-100 rounded-lg">
              <div className="flex items-start gap-2">
                <Flag className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                <Link href={`/tours/${tour.slug}`} className="hover:opacity-80 transition-opacity">
                  <span className="text-sm text-yellow-800 font-medium">{tour.highlight}</span>
                </Link>
              </div>
            </div>
          )}

          {/* Details */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2 text-gray-700">
              <Clock className="w-4 h-4 text-primary-500" />
              <span className="text-sm">{tour.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Link 
                href={`/tours?region=${encodeURIComponent(tour.region)}`}
                className="flex items-center gap-2 hover:text-primary-600 transition-colors"
              >
                <MapPin className="w-4 h-4 text-primary-500" />
                <span className="text-sm">{tour.region}</span>
              </Link>
            </div>
          </div>

          {/* Tags */}
          {tour.tags && tour.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {tour.tags.slice(0, 4).map((tag) => (
                <Link
                  key={tag}
                  href={`/tours?tag=${encodeURIComponent(tag)}`}
                  className="inline-block"
                >
                  <span 
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full hover:bg-primary-100 hover:text-primary-700 transition-colors"
                  >
                    {tag}
                  </span>
                </Link>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onExploreClick}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-primary-500 to-orange-500 text-white font-medium rounded-xl hover:from-primary-600 hover:to-orange-600 transition-all duration-300 flex items-center justify-center gap-2 group/explore"
            >
              <span>Apply For Visit</span>
              <ArrowRight className="w-4 h-4 group-hover/explore:translate-x-1 transition-transform" />
            </button>
            
            <Link
              href={`/tours/${tour.slug}`}
              className="inline-flex items-center justify-center w-12 px-4 py-3 bg-gray-100 hover:bg-primary-100 text-gray-700 hover:text-primary-700 font-medium rounded-xl transition-all duration-300 group/view-more"
              title="View full details"
            >
              <Eye className="w-5 h-5" />
              <span className="sr-only">View Details</span>
            </Link>
          </div>

          {/* Quick View Link */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <Link
              href={`/tours/${tour.slug}`}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium inline-flex items-center gap-1 group/link"
            >
              <span>View complete itinerary & details</span>
              <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
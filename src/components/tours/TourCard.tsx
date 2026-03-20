import { Clock, MapPin, Star, Eye } from 'lucide-react';
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
    <div className="group relative bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg flex flex-col h-full">

      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <Link href={`/tours/${tour.slug}`} className="absolute inset-0">
          <div
            className="w-full h-full bg-cover bg-center animate-zoom-loop will-change-transform"
            style={{ backgroundImage: `url(${tour.image})` }}
          />
        </Link>

        {/* Category */}
        <div className="absolute bottom-2 left-2">
          <Link
            href={`/tours?category=${encodeURIComponent(tour.category)}`}
            className="px-2 py-1 text-xs bg-primary-500/90 text-white rounded-full"
          >
            {tour.category}
          </Link>
        </div>

        {/* Price */}
        <div className="absolute bottom-2 right-2 bg-white/95 px-2 py-1 rounded-full text-sm font-semibold shadow">
          ${tour.discountPrice || tour.price}/person
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">

        {/* Title + Rating */}
        <Link href={`/tours/${tour.slug}`}>
          <h3 className="text-lg font-semibold line-clamp-1 group-hover:text-primary-600">
            {tour.title}
          </h3>
        </Link>

        <div className="flex items-center gap-2 mt-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(tour.rating)
                    ? 'fill-primary-500 text-primary-500'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>

          <span className="text-xs text-gray-500">{tour.rating}</span>

          <span className={`text-xs px-2 py-0.5 rounded-full ${difficultyColors[tour.difficulty]}`}>
            {tour.difficulty}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
          {tour.shortDescription || tour.description}
        </p>

        {/* Details */}
        <div className="flex justify-between text-xs text-gray-600 mt-3">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {tour.duration}
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {tour.region}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={onExploreClick}
            className="flex-1 py-2 text-sm bg-gradient-to-r from-primary-500 to-orange-500 text-white rounded-lg"
          >
            Apply For Visit
          </button>

          <Link
            href={`/tours/${tour.slug}`}
            className="w-10 flex items-center justify-center bg-gray-100 rounded-lg"
          >
            <Eye className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
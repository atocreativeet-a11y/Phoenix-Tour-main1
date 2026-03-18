// src/components/blog/BlogPostCard.tsx
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Eye, Heart, Clock, User } from 'lucide-react';

interface BlogPostCardProps {
  post: {
    _id: string;
    title: string;
    slug: string;
    excerpt: string;
    featuredImage?: string; // ✅ optional
    categories?: string[];  // ✅ optional
    readTime?: number;
    views?: number;
    likes?: number;
    createdAt?: string;     // ✅ optional
    author?: {
      name: string;
      image?: string;
    };
  };
  layout?: 'grid' | 'list' | 'featured';
}

export default function BlogPostCard({ post, layout = 'grid' }: BlogPostCardProps) {
  // ✅ Safe fallbacks
  const image = post.featuredImage || '/default.jpg';
  const category = post.categories?.[0] || 'General';
  const date = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString()
    : '';
  const readTime = post.readTime || 5;
  const views = post.views || 0;
  const likes = post.likes || 0;
  const authorName = post.author?.name || 'Admin';

  if (layout === 'featured') {
    return (
      <Link href={`/blog/${post.slug}`} className="group">
        <div className="relative h-[400px] rounded-2xl overflow-hidden">
          <Image
            src={image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-primary-500 text-white text-sm font-semibold rounded-full">
                {category}
              </span>
            </div>

            <h2 className="text-3xl font-heading font-bold text-white mb-3 group-hover:text-primary-300 transition-colors">
              {post.title}
            </h2>

            <p className="text-white/90 mb-6 line-clamp-2">
              {post.excerpt}
            </p>

            <div className="flex items-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{authorName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{readTime} min read</span>
              </div>
            </div>
          </div>

          <div className="absolute top-6 right-6 flex items-center gap-4">
            <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
              <Eye className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-medium">{views}</span>
            </div>
            <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
              <Heart className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-medium">{likes}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  if (layout === 'list') {
    return (
      <Link href={`/blog/${post.slug}`} className="group">
        <div className="flex gap-6 items-center p-4 hover:bg-gray-50 rounded-xl transition-colors">
          <div className="relative w-40 h-32 flex-shrink-0 rounded-lg overflow-hidden">
            <Image
              src={image}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2 py-1 bg-primary-100 text-primary-600 text-xs font-medium rounded">
                {category}
              </span>
              <span className="text-sm text-gray-500">{date}</span>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
              {post.title}
            </h3>

            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {post.excerpt}
            </p>

            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {readTime} min
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {views}
              </span>
              <span className="flex items-center gap-1">
                <Heart className="w-3 h-3" />
                {likes}
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Default grid
  return (
    <Link href={`/blog/${post.slug}`} className="group">
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-primary-300 hover:shadow-xl transition-all duration-300">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />

          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-primary-500 text-white text-sm font-semibold rounded-full">
              {category}
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {date}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {readTime} min
            </div>
          </div>

          <h3 className="text-xl font-heading font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
            {post.title}
          </h3>

          <p className="text-gray-600 mb-4 line-clamp-3">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="w-4 h-4 text-gray-600" />
              </div>
              <span className="text-sm text-gray-700 font-medium">
                {authorName}
              </span>
            </div>

            <div className="flex items-center gap-3 text-gray-500">
              <span className="flex items-center gap-1 text-sm">
                <Eye className="w-3 h-3" />
                {views}
              </span>
              <span className="flex items-center gap-1 text-sm">
                <Heart className="w-3 h-3" />
                {likes}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
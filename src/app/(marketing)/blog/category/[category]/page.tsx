// src/app/blog/category/[category]/page.tsx - Category Pages
import { Metadata } from 'next';
import BlogList from '@/components/blog/BlogList';
import { notFound } from 'next/navigation';
import connectDB  from '@/lib/mongodb';
import { BlogPost } from '@/lib/models/BlogPost';
import { BookOpen, Hash, Coffee, Mountain, Church, Camera } from 'lucide-react';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

const categoryIcons: Record<string, any> = {
  'cultural-insights': Coffee,
  'mountain-trekking': Mountain,
  'historical-sites': Church,
  'travel-photography': Camera,
};

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const categoryName = params.category.replace('-', ' ').toUpperCase();
  
  return {
    title: `${categoryName} | Phoenix Ethiopia Tour Blog`,
    description: `Explore ${categoryName} articles about Ethiopia travel, culture, and experiences.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  await connectDB();
  
  const categoryName = decodeURIComponent(params.category).replace('-', ' ');
  const Icon = categoryIcons[params.category] || Hash;
  
  // Check if category exists
  const categoryExists = await BlogPost.findOne({ 
    category: { $regex: new RegExp(`^${categoryName}$`, 'i') },
    published: true 
  });
  
  if (!categoryExists) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-primary-500/10 via-white to-yellow-500/5">
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-primary-500/20 to-yellow-500/20 backdrop-blur-sm rounded-full px-5 py-3 mb-6 border border-primary-500/30">
              <Icon className="w-4 h-4 text-primary-600" />
              <span className="text-primary-700 font-medium">CATEGORY</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              <span className="text-gray-900">{categoryName}</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              Discover our collection of articles about {categoryName.toLowerCase()} in Ethiopia.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <BlogList  />
        </div>
      </section>
    </main>
  );
}
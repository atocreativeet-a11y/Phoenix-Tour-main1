// src/app/blog/[slug]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogSinglePage from '@/components/blog/BlogSinglePage';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    // Fetch blog post data
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/posts/${slug}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      return {
        title: 'Blog Post | Phoenix Ethiopia Tours',
        description: 'Read travel stories and cultural insights from Ethiopia.',
      };
    }
    
    const data = await response.json();
    
    if (!data.success || !data.post) {
      return {
        title: 'Blog Post | Phoenix Ethiopia Tours',
        description: 'Read travel stories and cultural insights from Ethiopia.',
      };
    }
    
    const post = data.post;
    
    return {
      title: `${post.title} | Phoenix Ethiopia Tours Blog`,
      description: post.excerpt,
      keywords: post.seoKeywords || post.tags,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        images: [post.featuredImage],
        type: 'article',
        publishedTime: post.createdAt,
        authors: [post.author?.name || 'Phoenix Ethiopia Tours'],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt,
        images: [post.featuredImage],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Blog Post | Phoenix Ethiopia Tours',
      description: 'Read travel stories and cultural insights from Ethiopia.',
    };
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  
  let post = null;
  let relatedPosts = [];
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/posts/${slug}`, {
      cache: 'no-store',
      next: { revalidate: 3600 }
    });
    
    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        post = data.post;
        relatedPosts = data.relatedPosts || [];
      }
    }
  } catch (error) {
    console.error('Error fetching blog post:', error);
  }
  
  if (!post) {
    notFound();
  }
  
  return <BlogSinglePage post={post} relatedPosts={relatedPosts} />;
}
// src/app/blog/page.tsx
import type { Metadata } from 'next';
import BlogListingPage from '@/components/blog/BlogListingPage';

export const metadata: Metadata = {
  title: 'Ethiopia Travel Blog | Stories, Tips & Cultural Insights',
  description: 'Explore authentic travel stories, cultural insights, and practical tips for your Ethiopian adventure. From coffee ceremonies to mountain treks.',
  keywords: [
    'Ethiopia travel blog',
    'Ethiopian culture stories',
    'Africa travel tips',
    'Ethiopia tourism insights',
    'Cultural experiences Ethiopia',
    'Travel photography Ethiopia'
  ],
  openGraph: {
    title: 'Ethiopia Travel Blog | Stories, Tips & Cultural Insights',
    description: 'Explore authentic travel stories, cultural insights, and practical tips for your Ethiopian adventure.',
    type: 'website',
  },
};

export default function BlogPage() {
  return <BlogListingPage />;
}
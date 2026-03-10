// src/app/(marketing)/(tours)/tours/[slug]/detail/page.tsx
import TourDetailView from '@/components/tours/TourDetailView';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: PageProps) {
  // Await the params promise
  const { slug } = await params;
  
  // Try to fetch from API using the slug endpoint
  let tour = null;
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/tours/slug/${slug}`, {
      cache: 'no-store'
    });
    
    if (response.ok) {
      const data = await response.json();
      if (data.success && data.tour) {
        tour = data.tour;
      }
    }
  } catch (error) {
    console.error('Error fetching tour for metadata:', error);
  }

  if (!tour) {
    return {
      title: `${slug.split('-').join(' ').toUpperCase()} Tour | Phoenix Ethiopia Tours`,
      description: `Explore detailed information about ${slug.split('-').join(' ')} tour in Ethiopia with local experts.`,
      keywords: [
        `${slug.split('-').join(' ')} Ethiopia tour`,
        'Ethiopia tour operator',
        'Ethiopia travel agency',
        'Ethiopia cultural tours',
        'Ethiopia private tours',
      ],
    };
  }

  const keywords = [
    `${tour.title} Ethiopia`,
    'Ethiopia tour operator',
    'Ethiopia travel agency',
    'Ethiopia cultural tours',
    'Ethiopia private tours',
    `${tour.region} tours`,
    ...(tour.tags || [])
  ];

  return {
    title: `${tour.title} | Detailed Tour Package | Phoenix Ethiopia Tours`,
    description: tour.description || `Experience ${tour.title} in Ethiopia. ${tour.duration} tour package with detailed itinerary, inclusions, and pricing.`,
    keywords,
    openGraph: {
      title: `${tour.title} | Phoenix Ethiopia Tours`,
      description: tour.description || `Explore ${tour.title} with local Ethiopian experts.`,
      images: tour.image ? [tour.image] : [],
      type: 'website',
      url: `/tours/${slug}/detail`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tour.title} | Phoenix Ethiopia Tours`,
      description: tour.description || `Experience ${tour.title} in Ethiopia.`,
      images: tour.image ? [tour.image] : [],
    },
  };
}

export default async function TourDetailPage({ params }: PageProps) {
  // Await the params promise
  const { slug } = await params;
  
  // Try to fetch from API on server
  let tour = null;
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/tours/slug/${slug}`, {
      cache: 'no-store',
      // Add timeout for better UX
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (response.ok) {
      const data = await response.json();
      if (data.success && data.tour) {
        tour = data.tour;
      }
    }
  } catch (error) {
    console.error('Error fetching tour:', error);
  }

  return <TourDetailView initialTour={tour} tourId={slug} />;
}
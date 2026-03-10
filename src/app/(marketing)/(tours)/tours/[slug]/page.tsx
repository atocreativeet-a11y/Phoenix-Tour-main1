// src/app/(marketing)/(tours)/tours/[slug]/page.tsx
'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect } from 'react';
import { Loader } from 'lucide-react';

export default function TourRedirectPage() {
  const router = useRouter();
  const params = useParams();
  
  useEffect(() => {
    // Redirect to the detail page
    if (params.slug) {
      router.replace(`/tours/${params.slug}/detail`);
    }
  }, [params.slug, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <Loader className="w-8 h-8 animate-spin text-primary-600 mx-auto mb-4" />
        <p className="text-gray-600">Redirecting to tour details...</p>
      </div>
    </div>
  );
}
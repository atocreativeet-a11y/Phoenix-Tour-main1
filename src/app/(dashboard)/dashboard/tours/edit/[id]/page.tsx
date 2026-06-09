'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import * as Icons from "lucide-react";
import Link from 'next/link';
import { categories, regions, difficulties, iconMap } from '@/lib/utils/tour-icons';

export const dynamic = 'force-dynamic';

// Interfaces
interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: string[];
  accommodation: string;
  meals: string[];
}

interface FormData {
  title: string; slug: string; description: string; shortDescription: string;
  duration: string; difficulty: string; price: number; discountPrice: number;
  rating: number; region: string; category: string; tags: string[];
  highlight: string; image: string; images: string[]; iconName: string;
  isActive: boolean; isFeatured: boolean; maxParticipants: number;
  minParticipants: number; availableDates: string[]; included: string[];
  excluded: string[]; itinerary: ItineraryDay[]; country: string;
}

const defaultItineraryDay: ItineraryDay = {
  day: 1, title: '', description: '', activities: [''], accommodation: '', meals: []
};

// Component Logic
function EditTourPageContent() {
  const router = useRouter();
  const params = useParams();
  const tourId = params?.id as string;
  
  const [saving, setSaving] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [tagInput, setTagInput] = useState('');
  const [dateInput, setDateInput] = useState('');
  const [includedInput, setIncludedInput] = useState('');
  const [excludedInput, setExcludedInput] = useState('');
  const [imageUploading, setImageUploading] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    title: '', slug: '', description: '', shortDescription: '', duration: '',
    difficulty: 'Moderate', price: 0, discountPrice: 0, rating: 4.5,
    region: '', category: '', tags: [], highlight: '', image: '',
    images: [], iconName: 'Compass', isActive: true, isFeatured: false,
    maxParticipants: 12, minParticipants: 2, availableDates: [],
    included: [], excluded: [], itinerary: [{ ...defaultItineraryDay }], country: 'Ethiopia'
  });

  useEffect(() => {
    if (tourId) {
      const fetchTourData = async () => {
        try {
          const response = await fetch(`/api/tours/${tourId}`);
          const data = await response.json();
          if (data.success && data.tour) {
            setFormData(data.tour);
          }
        } catch (error) {
          console.error('Failed to fetch:', error);
        } finally {
          setFetching(false);
        }
      };
      fetchTourData();
    }
  }, [tourId]);

  const handleInputChange = (field: keyof FormData, value: any) => setFormData(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const response = await fetch(`/api/tours/${tourId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if ((await response.json()).success) {
        alert('Updated successfully!');
        router.push('/dashboard/tours');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const Icon = (iconMap as any)[formData.iconName] || Icons.Compass;

  if (fetching) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">
      <h1>Edit Tour: {formData.title}</h1>
      {/* Your form fields go here using formData and handleInputChange */}
      <button onClick={handleSubmit} disabled={saving}>
        {saving ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  );
}

// Single Export
export default function EditTourPage() {
  return <EditTourPageContent />;
}
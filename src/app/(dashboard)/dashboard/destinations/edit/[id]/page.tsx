'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import * as Icons from "lucide-react";

// helper
const Loader = (Icons as any).Loader || (() => null);
const fallback = () => null;
const getIcon = (name: string) => (Icons as any)[name] || fallback;

// icons
const Save = getIcon("Save"); // still fallback-safe
const Upload = getIcon("Upload");
const X = getIcon("X");
const Plus = getIcon("Plus");
const Trash2 = getIcon("Trash2");
const MapPin = getIcon("MapPin");

const Building = getIcon("Building");
const Mountain = getIcon("Mountain");
const Sun = getIcon("Sun");
const Trees = getIcon("Trees");
const Compass = getIcon("Compass");

const Globe = getIcon("Globe");
const Coffee = getIcon("Coffee");
const Castle = getIcon("Castle");
const Church = getIcon("Church");
const Shield = getIcon("Shield");

const Waves = getIcon("Waves");
const Palette = getIcon("Palette");
const MountainSnow = getIcon("MountainSnow");
const Tent = getIcon("Tent");
const Factory = getIcon("Factory");

const ArrowLeft = getIcon("ArrowLeft");
const Star = getIcon("Star");
const Image = getIcon("Image");
const Calendar = getIcon("Calendar");


export default function EditDestinationPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    region: '',
    description: '',
    shortDescription: '',
    mainImage: '',
    images: [] as string[],
    iconName: 'Building',
    features: [''],
    bestFor: [''],
    tourCount: 0,
    highlights: [''],
    quickFacts: [] as Array<{ label: string; value: string; icon: string }>,
    rating: 4.5,
    duration: '',
    isActive: true,
    isFeatured: false,
    attractions: [] as Array<{
      title: string;
      description: string;
      image: string;
      duration: string;
      type: string;
    }>,
    climate: '',
    gettingThere: '',
    accommodation: '',
    tips: [''],
  });

  useEffect(() => {
    fetchDestination();
  }, [params.id]);

  const fetchDestination = async () => {
    try {
      const response = await fetch(`/api/admin/destinations/${params.id}`);
      const data = await response.json();
      
      if (data.success) {
        setFormData(data.destination);
      } else {
        alert('Destination not found');
        router.push('/dashboard/destinations');
      }
    } catch (error) {
      console.error('Failed to fetch destination:', error);
      alert('Failed to load destination');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    
    try {
      const response = await fetch(`/api/admin/destinations/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (data.success) {
        alert('Destination updated successfully!');
        router.push('/dashboard/destinations');
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Failed to update destination:', error);
      alert('Failed to update destination');
    } finally {
      setUpdating(false);
    }
  };

  // ... (rest of the form handling functions similar to create page)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* ... similar structure to create page but with edit functionality */}
      </div>
    </div>
  );
}
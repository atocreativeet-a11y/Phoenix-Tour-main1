'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import * as Icons from "lucide-react";

const Save = (Icons as any).Save;
const Upload = (Icons as any).Upload;
const X = (Icons as any).X;
const Plus = (Icons as any).Plus;
const Trash2 = (Icons as any).Trash2;
const Calendar = (Icons as any).Calendar;
const Users = (Icons as any).Users;
const Tag = (Icons as any).Tag;
const MapPin = (Icons as any).MapPin;
const DollarSign = (Icons as any).DollarSign;
const Clock = (Icons as any).Clock;
const TrendingUp = (Icons as any).TrendingUp;
const Image = (Icons as any).Image;
const List = (Icons as any).List;
const Globe = (Icons as any).Globe;
const Star = (Icons as any).Star;
import { categories, regions, difficulties, iconMap } from '@/lib/utils/tour-icons';

interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: string[];
  accommodation: string;
  meals: string[];
}

interface FormData {
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  duration: string;
  difficulty: string;
  price: number;
  discountPrice: number;
  rating: number;
  region: string;
  category: string;
  tags: string[];
  highlight: string;
  image: string;
  images: string[];
  iconName: string;
  isActive: boolean;
  isFeatured: boolean;
  maxParticipants: number;
  minParticipants: number;
  availableDates: string[];
  included: string[];
  excluded: string[];
  itinerary: ItineraryDay[];
  country: string;
}

const defaultItineraryDay: ItineraryDay = {
  day: 1,
  title: '',
  description: '',
  activities: [''],
  accommodation: '',
  meals: []
};

export default function CreateTourPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [dateInput, setDateInput] = useState('');
  const [includedInput, setIncludedInput] = useState('');
  const [excludedInput, setExcludedInput] = useState('');
  const [imageUploading, setImageUploading] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    title: '',
    slug: '',
    description: '',
    shortDescription: '',
    duration: '',
    difficulty: 'Moderate',
    price: 0,
    discountPrice: 0,
    rating: 4.5,
    region: '',
    category: '',
    tags: [],
    highlight: '',
    image: '',
    images: [],
    iconName: 'Compass',
    isActive: true,
    isFeatured: false,
    maxParticipants: 12,
    minParticipants: 2,
    availableDates: [],
    included: [],
    excluded: [],
    itinerary: [{ ...defaultItineraryDay }],
    country: 'Ethiopia'
  });

  // Generate slug from title
  useEffect(() => {
    if (formData.title && !formData.slug) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '-');
      setFormData(prev => ({ ...prev, slug }));
    }
  }, [formData.title]);

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleItineraryChange = (index: number, field: keyof ItineraryDay, value: any) => {
    const updatedItinerary = [...formData.itinerary];
    updatedItinerary[index] = { ...updatedItinerary[index], [field]: value };
    setFormData(prev => ({ ...prev, itinerary: updatedItinerary }));
  };

  const addItineraryDay = () => {
    const lastDay = formData.itinerary[formData.itinerary.length - 1];
    setFormData(prev => ({
      ...prev,
      itinerary: [
        ...prev.itinerary,
        {
          ...defaultItineraryDay,
          day: lastDay ? lastDay.day + 1 : 1
        }
      ]
    }));
  };

  const removeItineraryDay = (index: number) => {
    if (formData.itinerary.length > 1) {
      const updatedItinerary = formData.itinerary.filter((_, i) => i !== index);
      // Re-number days
      const renumberedItinerary = updatedItinerary.map((day, idx) => ({
        ...day,
        day: idx + 1
      }));
      setFormData(prev => ({ ...prev, itinerary: renumberedItinerary }));
    }
  };

  const addActivity = (dayIndex: number) => {
    const updatedItinerary = [...formData.itinerary];
    updatedItinerary[dayIndex].activities.push('');
    setFormData(prev => ({ ...prev, itinerary: updatedItinerary }));
  };

  const updateActivity = (dayIndex: number, activityIndex: number, value: string) => {
    const updatedItinerary = [...formData.itinerary];
    updatedItinerary[dayIndex].activities[activityIndex] = value;
    setFormData(prev => ({ ...prev, itinerary: updatedItinerary }));
  };

  const removeActivity = (dayIndex: number, activityIndex: number) => {
    const updatedItinerary = [...formData.itinerary];
    updatedItinerary[dayIndex].activities = updatedItinerary[dayIndex].activities.filter(
      (_, idx) => idx !== activityIndex
    );
    setFormData(prev => ({ ...prev, itinerary: updatedItinerary }));
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addDate = () => {
    if (dateInput) {
      setFormData(prev => ({
        ...prev,
        availableDates: [...prev.availableDates, dateInput]
      }));
      setDateInput('');
    }
  };

  const removeDate = (dateToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      availableDates: prev.availableDates.filter(date => date !== dateToRemove)
    }));
  };

  const addIncluded = () => {
    if (includedInput.trim()) {
      setFormData(prev => ({ ...prev, included: [...prev.included, includedInput.trim()] }));
      setIncludedInput('');
    }
  };

  const removeIncluded = (itemToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      included: prev.included.filter(item => item !== itemToRemove)
    }));
  };

  const addExcluded = () => {
    if (excludedInput.trim()) {
      setFormData(prev => ({ ...prev, excluded: [...prev.excluded, excludedInput.trim()] }));
      setExcludedInput('');
    }
  };

  const removeExcluded = (itemToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      excluded: prev.excluded.filter(item => item !== itemToRemove)
    }));
  };

  const simulateImageUpload = useCallback(async (file: File): Promise<string> => {
    // In a real app, upload to cloud storage (Cloudinary, AWS S3, etc.)
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageUploading(true);
    try {
      const imageUrl = await simulateImageUpload(file);
      if (!formData.image) {
        setFormData(prev => ({ ...prev, image: imageUrl }));
      } else {
        setFormData(prev => ({ ...prev, images: [...prev.images, imageUrl] }));
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
    } finally {
      setImageUploading(false);
    }
  };

  const setMainImage = (imageUrl: string) => {
    const otherImages = formData.images.filter(img => img !== imageUrl);
    setFormData(prev => ({
      ...prev,
      image: imageUrl,
      images: [...otherImages, prev.image]
    }));
  };

  const removeImage = (imageUrl: string) => {
    if (formData.image === imageUrl) {
      setFormData(prev => ({ ...prev, image: prev.images[0] || '' }));
    }
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(img => img !== imageUrl)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/admin/tours', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          discountPrice: Number(formData.discountPrice),
          maxParticipants: Number(formData.maxParticipants),
          minParticipants: Number(formData.minParticipants)
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert('Tour created successfully!');
        router.push('/dashboard/tours');
        router.refresh();
      } else {
        throw new Error(data.error || 'Failed to create tour');
      }
    } catch (error: any) {
      console.error('Create tour error:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const Icon = iconMap[formData.iconName] || iconMap.Compass;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Create New Tour</h1>
              <p className="text-gray-600 mt-2">
                Add a new Ethiopian tour experience to your offerings
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/dashboard/tours')}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? 'Creating...' : (
                  <>
                    <Save className="w-4 h-4" />
                    Create Tour
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Ethiopian Flag Banner */}
          <div className="mt-4 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 text-white p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5" />
                <span className="font-semibold">Ethiopian Tour Experience</span>
              </div>
              <span className="bg-black/20 px-3 py-1 rounded-full text-sm">
                Land of Origins
              </span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Main Information Card */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Tag className="w-5 h-5 text-primary-500" />
              Basic Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tour Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., Simien Mountains Trek"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL Slug
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => handleInputChange('slug', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                  placeholder="auto-generated"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Will be used in the tour URL: /tours/{formData.slug || 'tour-slug'}
                </p>
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country
                </label>
                <div className="px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 flex items-center gap-2">
                  <div className="flex">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mx-1"></div>
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  </div>
                  <span className="font-medium">Ethiopia</span>
                </div>
              </div>

              {/* Short Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Short Description *
                </label>
                <textarea
                  required
                  value={formData.shortDescription}
                  onChange={(e) => handleInputChange('shortDescription', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  rows={2}
                  placeholder="Brief description shown in tour cards"
                  maxLength={200}
                />
                <p className="mt-1 text-sm text-gray-500">
                  {formData.shortDescription.length}/200 characters
                </p>
              </div>

              {/* Full Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Description *
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  rows={4}
                  placeholder="Detailed description of the tour experience"
                  maxLength={2000}
                />
                <p className="mt-1 text-sm text-gray-500">
                  {formData.description.length}/2000 characters
                </p>
              </div>

              {/* Highlight */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tour Highlight
                </label>
                <input
                  type="text"
                  value={formData.highlight}
                  onChange={(e) => handleInputChange('highlight', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., See the Gelada monkeys and Ethiopian wolves"
                  maxLength={150}
                />
              </div>
            </div>
          </div>

          {/* Tour Details Card */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <List className="w-5 h-5 text-primary-500" />
              Tour Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Duration *
                </label>
                <input
                  type="text"
                  required
                  value={formData.duration}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., 3-7 days"
                />
              </div>

              {/* Difficulty */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Difficulty *
                </label>
                <select
                  required
                  value={formData.difficulty}
                  onChange={(e) => handleInputChange('difficulty', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select difficulty</option>
                  {difficulties.map(diff => (
                    <option key={diff} value={diff}>{diff}</option>
                  ))}
                </select>
              </div>

              {/* Region */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Region *
                </label>
                <select
                  required
                  value={formData.region}
                  onChange={(e) => handleInputChange('region', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select region</option>
                  {regions.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>

              {/* Category */}
          {/* Category */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Category *
  </label>
  <div className="flex flex-wrap gap-2 mb-2">
    {[
      'Ethiopia Highlights',
      'Historical Tours', 
      'Cultural Tours',
      'Nature & Trekking',
      'Adventure',
      'Day Trips'
    ].map((category) => (
      <button
        key={category}
        type="button"
        onClick={() => handleInputChange('category', category)}
        className={`px-4 py-2 rounded-full font-medium transition-all duration-300 border text-sm ${
          formData.category === category
            ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30 border-primary-500' 
            : 'bg-white text-gray-700 hover:bg-primary-50 border-gray-300 hover:border-primary-300'
        }`}
      >
        {category}
      </button>
    ))}
  </div>
  {/* <select
    required
    value={formData.category}
    onChange={(e) => handleInputChange('category', e.target.value)}
    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent mt-2"
  >
    <option value="">Or select from dropdown</option>
    {categories.map(category => (
      <option key={category} value={category}>{category}</option>
    ))}
  </select> */}
</div>

              {/* Icon */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Icon
                </label>
                <div className="flex items-center gap-4">
                  <select
                    value={formData.iconName}
                    onChange={(e) => handleInputChange('iconName', e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg"
                  >
                    {Object.keys(iconMap).map(icon => (
                      <option key={icon} value={icon}>{icon}</option>
                    ))}
                  </select>
                  <div className="p-3 bg-primary-50 rounded-lg">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Rating
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={formData.rating}
                  onChange={(e) => handleInputChange('rating', parseFloat(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Max Participants */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Max Participants
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.maxParticipants}
                  onChange={(e) => handleInputChange('maxParticipants', parseInt(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Min Participants */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Min Participants
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.minParticipants}
                  onChange={(e) => handleInputChange('minParticipants', parseInt(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Pricing Card */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-primary-500" />
              Pricing
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Regular Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Regular Price (USD) *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', parseFloat(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Discount Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Discount Price (USD)
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.discountPrice}
                  onChange={(e) => handleInputChange('discountPrice', parseFloat(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                {formData.discountPrice > 0 && formData.price > 0 && (
                  <p className="mt-2 text-sm text-green-600">
                    Discount: {Math.round((1 - formData.discountPrice / formData.price) * 100)}%
                  </p>
                )}
              </div>
            </div>

            {/* Price Per Day */}
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Estimated price per day:</span>
                <span className="font-semibold">
                  {(() => {
                    const daysMatch = formData.duration.match(/(\d+)/);
                    if (daysMatch && formData.price > 0) {
                      const days = parseInt(daysMatch[1]);
                      return `$${Math.round(formData.price / days)}/day`;
                    }
                    return 'N/A';
                  })()}
                </span>
              </div>
            </div>
          </div>

          {/* Images Card */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Image className="w-5 h-5 text-primary-500" />
              Images
            </h2>
            
            {/* Main Image Upload */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Main Image *
              </label>
              <div className="flex items-center gap-4">
                {formData.image ? (
                  <div className="relative">
                    <img
                      src={formData.image}
                      alt="Main tour"
                      className="w-64 h-48 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(formData.image)}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="w-64 h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center">
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">No main image</span>
                  </div>
                )}
                <div>
                  <input
                    type="file"
                    id="mainImage"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="mainImage"
                    className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 cursor-pointer inline-flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    {imageUploading ? 'Uploading...' : 'Upload Main Image'}
                  </label>
                  <p className="mt-2 text-sm text-gray-500">
                    Recommended: 800x600px or larger
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Additional Images
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {formData.images.map((img, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={img}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => setMainImage(img)}
                        className="p-2 bg-white text-gray-800 rounded-full hover:bg-gray-100"
                        title="Set as main"
                      >
                        <Star className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeImage(img)}
                        className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
                <label className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary-500">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Upload className="w-6 h-6 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">Add Image</span>
                </label>
              </div>
              <p className="text-sm text-gray-500">
                You can upload up to 10 additional images
              </p>
            </div>
          </div>

          {/* Tags Card */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Tags</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="text-primary-600 hover:text-primary-800"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Add a tag (e.g., UNESCO, Wildlife, Photography)"
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Add Tag
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Tags help users discover your tour through search
            </p>
          </div>

          {/* Availability Card */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary-500" />
              Available Dates
            </h2>
            
            <div className="mb-4">
              <div className="flex gap-2 mb-4">
                <input
                  type="date"
                  value={dateInput}
                  onChange={(e) => setDateInput(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                />
                <button
                  type="button"
                  onClick={addDate}
                  className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
                >
                  Add Date
                </button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {formData.availableDates.map((date) => (
                  <div
                    key={date}
                    className="flex items-center justify-between px-3 py-2 bg-gray-100 rounded-lg"
                  >
                    <span>{new Date(date).toLocaleDateString()}</span>
                    <button
                      type="button"
                      onClick={() => removeDate(date)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Inclusions & Exclusions Card */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              What's Included & Excluded
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Included */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4 text-green-600">
                  What's Included
                </h3>
                <div className="space-y-2 mb-4">
                  {formData.included.map((item, index) => (
                    <div key={index} className="flex items-center justify-between group">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>{item}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeIncluded(item)}
                        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={includedInput}
                    onChange={(e) => setIncludedInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addIncluded())}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="Add inclusion"
                  />
                  <button
                    type="button"
                    onClick={addIncluded}
                    className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Excluded */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4 text-red-600">
                  What's Excluded
                </h3>
                <div className="space-y-2 mb-4">
                  {formData.excluded.map((item, index) => (
                    <div key={index} className="flex items-center justify-between group">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span>{item}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeExcluded(item)}
                        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={excludedInput}
                    onChange={(e) => setExcludedInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addExcluded())}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="Add exclusion"
                  />
                  <button
                    type="button"
                    onClick={addExcluded}
                    className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Itinerary Card */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Daily Itinerary</h2>
              <button
                type="button"
                onClick={addItineraryDay}
                className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Day
              </button>
            </div>
            
            <div className="space-y-6">
              {formData.itinerary.map((day, dayIndex) => (
                <div key={dayIndex} className="border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="px-3 py-1 bg-primary-500 text-white rounded-full">
                        Day {day.day}
                      </div>
                      {dayIndex > 0 && (
                        <button
                          type="button"
                          onClick={() => removeItineraryDay(dayIndex)}
                          className="p-1 text-gray-400 hover:text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Day Title */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Day Title
                      </label>
                      <input
                        type="text"
                        required
                        value={day.title}
                        onChange={(e) => handleItineraryChange(dayIndex, 'title', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                        placeholder="e.g., Arrival in Simien Mountains"
                      />
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                      </label>
                      <textarea
                        required
                        value={day.description}
                        onChange={(e) => handleItineraryChange(dayIndex, 'description', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                        rows={3}
                        placeholder="Detailed description of the day's activities"
                      />
                    </div>

                    {/* Accommodation */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Accommodation
                      </label>
                      <input
                        type="text"
                        value={day.accommodation}
                        onChange={(e) => handleItineraryChange(dayIndex, 'accommodation', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                        placeholder="e.g., Hotel/Lodge/Camping"
                      />
                    </div>

                    {/* Meals */}
                    {/* <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Meals Included
                      </label>
                      <select
                        multiple
                        value={day.meals}
                        onChange={(e) => handleItineraryChange(dayIndex, 'meals', Array.from(e.target.selectedOptions, option => option.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      >
                        <option value="Breakfast">Breakfast</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                        <option value="Snacks">Snacks</option>
                      </select>
                      <p className="mt-1 text-sm text-gray-500">
                        Hold Ctrl/Cmd to select multiple
                      </p>
                    </div> */}

                    {/* Activities */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Activities
                      </label>
                      <div className="space-y-2">
                        {day.activities.map((activity, activityIndex) => (
                          <div key={activityIndex} className="flex gap-2">
                            <input
                              type="text"
                              value={activity}
                              onChange={(e) => updateActivity(dayIndex, activityIndex, e.target.value)}
                              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                              placeholder="e.g., Morning hike to Jinbar Waterfall"
                            />
                            {activityIndex > 0 && (
                              <button
                                type="button"
                                onClick={() => removeActivity(dayIndex, activityIndex)}
                                className="px-3 py-2 text-red-600 hover:text-red-700"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => addActivity(dayIndex)}
                          className="text-primary-600 hover:text-primary-700 text-sm flex items-center gap-1"
                        >
                          <Plus className="w-4 h-4" />
                          Add Activity
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Status & Actions Card */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Status & Actions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Status */}
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => handleInputChange('isActive', e.target.checked)}
                    className="w-5 h-5 text-primary-500 rounded"
                  />
                  <span className="text-gray-700">Active (Visible to users)</span>
                </label>
                
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => handleInputChange('isFeatured', e.target.checked)}
                    className="w-5 h-5 text-primary-500 rounded"
                  />
                  <span className="text-gray-700">Featured (Show on homepage)</span>
                </label>
              </div>

              {/* Actions */}
              <div className="space-y-4">
                <button
                  type="button"
                  onClick={() => {
                    // Preview logic would go here
                    alert('Preview functionality would open in new tab');
                  }}
                  className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Preview Tour
                </button>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-4 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? 'Creating...' : (
                    <>
                      <Save className="w-4 h-4" />
                      Create Tour
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
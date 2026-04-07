'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import * as Icons from "lucide-react";

// helper
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

const iconOptions = [
  { value: "Building", label: "Building", icon: Building },
  { value: "MapPin", label: "Location", icon: MapPin },
  { value: "Mountain", label: "Mountain", icon: Mountain },
  { value: "Sun", label: "Sun", icon: Sun },
  { value: "Trees", label: "Forest", icon: Trees },
  { value: "Compass", label: "Compass", icon: Compass },
  { value: "Globe", label: "Globe", icon: Globe },
  { value: "Coffee", label: "Coffee", icon: Coffee },
  { value: "Shield", label: "Shield", icon: Shield },
  { value: "Waves", label: "Water", icon: Waves },
  { value: "Palette", label: "Art", icon: Palette },
  { value: "Tent", label: "Camping", icon: Tent },
];

// Region enum from the model
const REGIONS = [
  'Addis Ababa',
  'Afar ',
  'Amhara ',
  'Benishangul-Gumuz',
  'Dire Dawa',
  'Gambela',
  'Harari ',
  'Oromia',
  'Sidama',
  'Somali ',
  'Southern Nations, Nationalities, and Peoples\' ',
  'South West Ethiopia Peoples\' ',
  'Tigray'
];

interface QuickFact {
  label: string;
  value: string;
  icon: string;
}

interface Attraction {
  title: string;
  description: string;
  image: string;
  duration: string;
  type: string;
}

interface FormData {
  title: string;
  slug: string;
  region: string;
  description: string;
  shortDescription: string;
  mainImage: string;
  images: string[];
  iconName: string;
  features: string[];
  bestFor: string[];
  tourCount: number;
  highlights: string[];
  quickFacts: QuickFact[];
  rating: number;
  duration: string;
  isActive: boolean;
  isFeatured: boolean;
  attractions: Attraction[];
  climate: string;
  gettingThere: string;
  accommodation: string;
  tips: string[];
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

const defaultAttraction: Attraction = {
  title: '',
  description: '',
  image: '',
  duration: '',
  type: ''
};

const defaultQuickFact: QuickFact = {
  label: '',
  value: '',
  icon: 'MapPin'
};

export default function CreateDestinationPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [keywordInput, setKeywordInput] = useState('');
  const [featureInput, setFeatureInput] = useState('');
  const [bestForInput, setBestForInput] = useState('');
  const [highlightInput, setHighlightInput] = useState('');
  const [tipInput, setTipInput] = useState('');

  const [formData, setFormData] = useState<FormData>({
    title: '',
    slug: '',
    region: '',
    description: '',
    shortDescription: '',
    mainImage: '',
    images: [],
    iconName: 'Building',
    features: [],
    bestFor: [],
    tourCount: 0,
    highlights: [],
    quickFacts: [],
    rating: 4.5,
    duration: '',
    isActive: true,
    isFeatured: false,
    attractions: [],
    climate: '',
    gettingThere: '',
    accommodation: '',
    tips: [],
    metaTitle: '',
    metaDescription: '',
    keywords: []
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

  // Auto-generate meta fields
  useEffect(() => {
    if (formData.title && !formData.metaTitle) {
      setFormData(prev => ({ 
        ...prev, 
        metaTitle: `${prev.title} - Ethiopian Travel Destination`,
        metaDescription: prev.shortDescription || `Discover ${prev.title}, a beautiful destination in Ethiopia. ${prev.shortDescription}`
      }));
    }
  }, [formData.title, formData.shortDescription]);

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleQuickFactChange = (index: number, field: keyof QuickFact, value: string) => {
    const newQuickFacts = [...formData.quickFacts];
    newQuickFacts[index] = { ...newQuickFacts[index], [field]: value };
    setFormData(prev => ({ ...prev, quickFacts: newQuickFacts }));
  };

  const addQuickFact = () => {
    setFormData(prev => ({
      ...prev,
      quickFacts: [...prev.quickFacts, { ...defaultQuickFact }]
    }));
  };

  const removeQuickFact = (index: number) => {
    setFormData(prev => ({
      ...prev,
      quickFacts: prev.quickFacts.filter((_, i) => i !== index)
    }));
  };

  const handleAttractionChange = (index: number, field: keyof Attraction, value: string) => {
    const updatedAttractions = [...formData.attractions];
    updatedAttractions[index] = { ...updatedAttractions[index], [field]: value };
    setFormData(prev => ({ ...prev, attractions: updatedAttractions }));
  };

  const addAttraction = () => {
    setFormData(prev => ({
      ...prev,
      attractions: [...prev.attractions, { ...defaultAttraction }]
    }));
  };

  const removeAttraction = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attractions: prev.attractions.filter((_, i) => i !== index)
    }));
  };

  const addKeyword = () => {
    if (keywordInput.trim() && !formData.keywords.includes(keywordInput.trim())) {
      setFormData(prev => ({ ...prev, keywords: [...prev.keywords, keywordInput.trim()] }));
      setKeywordInput('');
    }
  };

  const removeKeyword = (keywordToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      keywords: prev.keywords.filter(keyword => keyword !== keywordToRemove)
    }));
  };

  const addFeature = () => {
    if (featureInput.trim()) {
      setFormData(prev => ({ ...prev, features: [...prev.features, featureInput.trim()] }));
      setFeatureInput('');
    }
  };

  const removeFeature = (featureToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter(feature => feature !== featureToRemove)
    }));
  };

  const addBestFor = () => {
    if (bestForInput.trim()) {
      setFormData(prev => ({ ...prev, bestFor: [...prev.bestFor, bestForInput.trim()] }));
      setBestForInput('');
    }
  };

  const removeBestFor = (itemToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      bestFor: prev.bestFor.filter(item => item !== itemToRemove)
    }));
  };

  const addHighlight = () => {
    if (highlightInput.trim()) {
      setFormData(prev => ({ ...prev, highlights: [...prev.highlights, highlightInput.trim()] }));
      setHighlightInput('');
    }
  };

  const removeHighlight = (itemToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      highlights: prev.highlights.filter(item => item !== itemToRemove)
    }));
  };

  const addTip = () => {
    if (tipInput.trim()) {
      setFormData(prev => ({ ...prev, tips: [...prev.tips, tipInput.trim()] }));
      setTipInput('');
    }
  };

  const removeTip = (itemToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tips: prev.tips.filter(item => item !== itemToRemove)
    }));
  };

  const simulateImageUpload = useCallback(async (file: File): Promise<string> => {
    // In a real app, upload to cloud storage
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'main' | 'gallery') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageUploading(true);
    try {
      const imageUrl = await simulateImageUpload(file);
      if (type === 'main') {
        setFormData(prev => ({ ...prev, mainImage: imageUrl }));
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
      mainImage: imageUrl,
      images: [...otherImages, prev.mainImage].filter(Boolean)
    }));
  };

  const removeImage = (imageUrl: string) => {
    if (formData.mainImage === imageUrl) {
      setFormData(prev => ({ ...prev, mainImage: prev.images[0] || '' }));
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
      const response = await fetch('/api/admin/destinations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
console.log('Create destination response:', data);
      if (data.success) {
        alert('Destination created successfully!');
        router.push('/dashboard/destinations');
        router.refresh();
      } else {
        throw new Error(data.error || 'Failed to create destination');
      }
    } catch (error: any) {
      console.error('Create destination error:', error);
      alert(`Error: ${error || 'Failed to create destination'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Create New Destination</h1>
              <p className="text-gray-600 mt-2">
                Add a new Ethiopian destination to showcase
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/dashboard/destinations')}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg hover:from-blue-600 hover:to-green-600 disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? 'Creating...' : (
                  <>
                    <Save className="w-4 h-4" />
                    Create Destination
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information Card */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              Basic Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Destination Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Addis Ababa, Lalibela, Simien Mountains"
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
                  Will be used in the URL: /destinations/{formData.slug || 'destination-slug'}
                </p>
              </div>

              {/* Region */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Region *
                </label>
                <select
                  required
                  value={formData.region}
                  onChange={(e) => handleInputChange('region', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select region</option>
                  {REGIONS.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recommended Duration
                </label>
                <input
                  type="text"
                  value={formData.duration}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 2-4 days, 1 week, Weekend trip"
                />
              </div>

              {/* Icon Selection */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Icon
                </label>
                <div className="flex items-center gap-4 mb-4">
                  <select
                    value={formData.iconName}
                    onChange={(e) => handleInputChange('iconName', e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg"
                  >
                    {iconOptions.map(icon => (
                      <option key={icon.value} value={icon.value}>{icon.label}</option>
                    ))}
                  </select>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    {(() => {
                      const Icon = iconOptions.find(i => i.value === formData.iconName)?.icon || Building;
                      return <Icon className="w-6 h-6 text-blue-600" />;
                    })()}
                  </div>
                </div>
                <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
                  {iconOptions.map((icon) => {
                    const Icon = icon.icon;
                    return (
                      <button
                        key={icon.value}
                        type="button"
                        onClick={() => handleInputChange('iconName', icon.value)}
                        className={`p-2 rounded-lg border flex flex-col items-center justify-center ${
                          formData.iconName === icon.value
                            ? 'border-blue-500 bg-blue-50 shadow-sm'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        title={icon.label}
                      >
                        <Icon className="w-4 h-4 text-gray-600" />
                        <span className="text-[10px] mt-1 truncate w-full text-center text-gray-700">
                          {icon.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Short Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Short Description *
                  <span className="text-sm font-normal text-gray-500 ml-2">(max 150 characters)</span>
                </label>
                <textarea
                  required
                  value={formData.shortDescription}
                  onChange={(e) => handleInputChange('shortDescription', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={2}
                  placeholder="Brief description shown in destination cards"
                  maxLength={150}
                />
                <p className="mt-1 text-sm text-gray-500">
                  {formData.shortDescription.length}/150 characters
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                  placeholder="Detailed description of the destination"
                  maxLength={2000}
                />
                <p className="mt-1 text-sm text-gray-500">
                  {formData.description.length}/2000 characters
                </p>
              </div>

              {/* Tour Count */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tour Count
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.tourCount}
                  onChange={(e) => handleInputChange('tourCount', parseInt(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating (0-5)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={formData.rating}
                  onChange={(e) => handleInputChange('rating', parseFloat(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Images Card */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Image className="w-5 h-5 text-purple-600" />
              Images
            </h2>
            
            {/* Main Image Upload */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Main Image *
              </label>
              <div className="flex items-center gap-4">
                {formData.mainImage ? (
                  <div className="relative">
                    <img
                      src={formData.mainImage}
                      alt="Main destination"
                      className="w-64 h-48 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleInputChange('mainImage', '')}
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
                    onChange={(e) => handleImageUpload(e, 'main')}
                    className="hidden"
                  />
                  <label
                    htmlFor="mainImage"
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer inline-flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    {imageUploading ? 'Uploading...' : 'Upload Main Image'}
                  </label>
                  <p className="mt-2 text-sm text-gray-500">
                    Recommended: 1200x800px or larger
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
                <label className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-purple-500">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'gallery')}
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

          {/* Features & Highlights Card */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              Features & Highlights
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Features */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Key Features</h3>
                <div className="space-y-2 mb-4">
                  {formData.features.map((feature, index) => (
                    <div key={index} className="flex items-center justify-between group">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>{feature}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFeature(feature)}
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
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="e.g., Rock-hewn churches, Coffee ceremony"
                  />
                  <button
                    type="button"
                    onClick={addFeature}
                    className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Best For */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Best For</h3>
                <div className="space-y-2 mb-4">
                  {formData.bestFor.map((item, index) => (
                    <div key={index} className="flex items-center justify-between group">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>{item}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeBestFor(item)}
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
                    value={bestForInput}
                    onChange={(e) => setBestForInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addBestFor())}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="e.g., History buffs, Adventure seekers"
                  />
                  <button
                    type="button"
                    onClick={addBestFor}
                    className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div className="mt-8">
              <h3 className="font-semibold text-gray-900 mb-4">Highlights</h3>
              <div className="space-y-2 mb-4">
                {formData.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center justify-between group">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span>{highlight}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeHighlight(highlight)}
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
                  value={highlightInput}
                  onChange={(e) => setHighlightInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addHighlight())}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="e.g., See the 3.2 million-year-old Lucy fossil"
                />
                <button
                  type="button"
                  onClick={addHighlight}
                  className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200"
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* Quick Facts Card */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Compass className="w-5 h-5 text-orange-500" />
                Quick Facts
              </h2>
              <button
                type="button"
                onClick={addQuickFact}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Quick Fact
              </button>
            </div>
            
            <div className="space-y-4">
              {formData.quickFacts.map((fact, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
                        Fact {index + 1}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeQuickFact(index)}
                        className="p-1 text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Label */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Label *
                      </label>
                      <input
                        type="text"
                        required
                        value={fact.label}
                        onChange={(e) => handleQuickFactChange(index, 'label', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        placeholder="e.g., Elevation, Population"
                      />
                    </div>

                    {/* Value */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Value *
                      </label>
                      <input
                        type="text"
                        required
                        value={fact.value}
                        onChange={(e) => handleQuickFactChange(index, 'value', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        placeholder="e.g., 2,355m, 4.8 million"
                      />
                    </div>

                    {/* Icon */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Icon
                      </label>
                      <select
                        value={fact.icon}
                        onChange={(e) => handleQuickFactChange(index, 'icon', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      >
                        {iconOptions.map(icon => (
                          <option key={icon.value} value={icon.value}>{icon.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Attractions Card */}
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Attractions</h2>
              <button
                type="button"
                onClick={addAttraction}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Attraction
              </button>
            </div>
            
            <div className="space-y-6">
              {formData.attractions.map((attraction, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full">
                        Attraction {index + 1}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeAttraction(index)}
                        className="p-1 text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Title */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={attraction.title}
                        onChange={(e) => handleAttractionChange(index, 'title', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                        placeholder="e.g., Rock-Hewn Churches of Lalibela"
                      />
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description *
                      </label>
                      <textarea
                        required
                        value={attraction.description}
                        onChange={(e) => handleAttractionChange(index, 'description', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                        rows={3}
                        placeholder="Detailed description of the attraction"
                      />
                    </div>

                    {/* Image */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Image URL
                      </label>
                      <input
                        type="text"
                        value={attraction.image}
                        onChange={(e) => handleAttractionChange(index, 'image', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>

                    {/* Duration */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Duration
                      </label>
                      <input
                        type="text"
                        value={attraction.duration}
                        onChange={(e) => handleAttractionChange(index, 'duration', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                        placeholder="e.g., 2-3 hours, Full day"
                      />
                    </div>

                    {/* Type */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Type
                      </label>
                      <select
                        value={attraction.type}
                        onChange={(e) => handleAttractionChange(index, 'type', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      >
                        <option value="">Select type</option>
                        <option value="Historical">Historical</option>
                        <option value="Natural">Natural</option>
                        <option value="Cultural">Cultural</option>
                        <option value="Religious">Religious</option>
                        <option value="Architectural">Architectural</option>
                        <option value="Entertainment">Entertainment</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Information Card */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-600" />
              Additional Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Climate */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Climate
                </label>
                <textarea
                  value={formData.climate}
                  onChange={(e) => handleInputChange('climate', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={2}
                  placeholder="e.g., Mild year-round, 16-20°C average"
                />
              </div>

              {/* Getting There */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Getting There
                </label>
                <textarea
                  value={formData.gettingThere}
                  onChange={(e) => handleInputChange('gettingThere', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={2}
                  placeholder="Transportation options and access information"
                />
              </div>

              {/* Accommodation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Accommodation
                </label>
                <textarea
                  value={formData.accommodation}
                  onChange={(e) => handleInputChange('accommodation', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={2}
                  placeholder="Types of available accommodations"
                />
              </div>
            </div>

            {/* Travel Tips */}
            <div className="mt-8">
              <h3 className="font-semibold text-gray-900 mb-4">Travel Tips</h3>
              <div className="space-y-2 mb-4">
                {formData.tips.map((tip, index) => (
                  <div key={index} className="flex items-center justify-between group">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                      <span>{tip}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeTip(tip)}
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
                  value={tipInput}
                  onChange={(e) => setTipInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTip())}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="e.g., Carry cash for small purchases"
                />
                <button
                  type="button"
                  onClick={addTip}
                  className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200"
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* SEO Card */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">SEO Settings</h2>
            
            <div className="space-y-6">
              {/* Meta Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Title
                </label>
                <input
                  type="text"
                  value={formData.metaTitle}
                  onChange={(e) => handleInputChange('metaTitle', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Visit Lalibela - UNESCO World Heritage Site in Ethiopia"
                  maxLength={60}
                />
                <p className="mt-1 text-sm text-gray-500">
                  {formData.metaTitle.length}/60 characters (recommended for search engines)
                </p>
              </div>

              {/* Meta Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Description
                </label>
                <textarea
                  value={formData.metaDescription}
                  onChange={(e) => handleInputChange('metaDescription', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Brief description for search engine results"
                  maxLength={160}
                />
                <p className="mt-1 text-sm text-gray-500">
                  {formData.metaDescription.length}/160 characters (recommended for search engines)
                </p>
              </div>

              {/* Keywords */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Keywords
                </label>
                <div className="flex flex-wrap gap-2 mb-4">
                  {formData.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                    >
                      {keyword}
                      <button
                        type="button"
                        onClick={() => removeKeyword(keyword)}
                        className="text-gray-600 hover:text-red-500"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="Add a keyword (e.g., Ethiopia travel, historical sites)"
                  />
                  <button
                    type="button"
                    onClick={addKeyword}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                  >
                    Add Keyword
                  </button>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Keywords help users discover your destination through search
                </p>
              </div>
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
                    className="w-5 h-5 text-blue-500 rounded"
                  />
                  <span className="text-gray-700">Active (Visible to users)</span>
                </label>
                
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => handleInputChange('isFeatured', e.target.checked)}
                    className="w-5 h-5 text-yellow-500 rounded"
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
                  Preview Destination
                </button>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg hover:from-blue-600 hover:to-green-600 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? 'Creating...' : (
                    <>
                      <Save className="w-4 h-4" />
                      Create Destination
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
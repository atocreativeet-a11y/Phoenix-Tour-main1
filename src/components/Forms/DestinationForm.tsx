// src/app/admin/destinations/components/DestinationForm.tsx
'use client';

import { useState, useEffect } from 'react';
import * as Icons from "lucide-react";

const X = (Icons as any).X;
const Upload = (Icons as any).Upload;
const ImageIcon = (Icons as any).Image;
const Plus = (Icons as any).Plus;
const Trash2 = (Icons as any).Trash2;

import { api } from '@/lib/utils/api';

interface DestinationFormProps {
  destination?: any;
  onSubmit: () => void;
  onCancel: () => void;
}

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

const ICON_OPTIONS = [
  { value: 'Building', label: 'Building (City/Urban)' },
  { value: 'Mountain', label: 'Mountain (Nature/Trekking)' },
  { value: 'Compass', label: 'Compass (Cultural)' },
  { value: 'Sun', label: 'Sun (Desert/Adventure)' },
  { value: 'Trees', label: 'Trees (Wildlife/Nature)' },
];

const REGION_OPTIONS = [
  'Addis Ababa',
  'Northern Circuit',
  'Southern Circuit',
  'Eastern (Harar)',
  'Western (Gambella)'
];

export default function DestinationForm({ destination, onSubmit, onCancel }: DestinationFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    region: 'Addis Ababa',
    description: '',
    shortDescription: '',
    mainImage: '',
    images: [] as string[],
    iconName: 'Building',
    features: [] as string[],
    bestFor: [] as string[],
    tourCount: 0,
    highlights: [] as string[],
    quickFacts: [] as QuickFact[],
    attractions: [] as Attraction[],
    metaTitle: '',
    metaDescription: '',
    isActive: true,
    order: 0
  });
  
  const [newFeature, setNewFeature] = useState('');
  const [newBestFor, setNewBestFor] = useState('');
  const [newHighlight, setNewHighlight] = useState('');
  const [newQuickFact, setNewQuickFact] = useState({ label: '', value: '', icon: 'Info' });
  const [newAttraction, setNewAttraction] = useState({
    title: '',
    description: '',
    image: '',
    duration: '',
    type: 'Historical'
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Initialize form with destination data if editing
  useEffect(() => {
    if (destination) {
      setFormData({
        title: destination.title || '',
        slug: destination.slug || '',
        region: destination.region || 'Addis Ababa',
        description: destination.description || '',
        shortDescription: destination.shortDescription || '',
        mainImage: destination.mainImage || '',
        images: destination.images || [],
        iconName: destination.iconName || 'Building',
        features: destination.features || [],
        bestFor: destination.bestFor || [],
        tourCount: destination.tourCount || 0,
        highlights: destination.highlights || [],
        quickFacts: destination.quickFacts || [],
        attractions: destination.attractions || [],
        metaTitle: destination.metaTitle || '',
        metaDescription: destination.metaDescription || '',
        isActive: destination.isActive !== undefined ? destination.isActive : true,
        order: destination.order || 0
      });
    }
  }, [destination]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
    } else if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImageFiles(prev => [...prev, ...files]);
    
    // Create preview URLs
    const previewUrls = files.map(file => URL.createObjectURL(file));
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...previewUrls]
    }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
    setImageFiles(prev => prev.filter((_, i) => i !== index));
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const addBestFor = () => {
    if (newBestFor.trim()) {
      setFormData(prev => ({
        ...prev,
        bestFor: [...prev.bestFor, newBestFor.trim()]
      }));
      setNewBestFor('');
    }
  };

  const removeBestFor = (index: number) => {
    setFormData(prev => ({
      ...prev,
      bestFor: prev.bestFor.filter((_, i) => i !== index)
    }));
  };

  const addHighlight = () => {
    if (newHighlight.trim()) {
      setFormData(prev => ({
        ...prev,
        highlights: [...prev.highlights, newHighlight.trim()]
      }));
      setNewHighlight('');
    }
  };

  const removeHighlight = (index: number) => {
    setFormData(prev => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index)
    }));
  };

  const addQuickFact = () => {
    if (newQuickFact.label.trim() && newQuickFact.value.trim()) {
      setFormData(prev => ({
        ...prev,
        quickFacts: [...prev.quickFacts, { ...newQuickFact }]
      }));
      setNewQuickFact({ label: '', value: '', icon: 'Info' });
    }
  };

  const removeQuickFact = (index: number) => {
    setFormData(prev => ({
      ...prev,
      quickFacts: prev.quickFacts.filter((_, i) => i !== index)
    }));
  };

  const addAttraction = () => {
    if (newAttraction.title.trim() && newAttraction.description.trim()) {
      setFormData(prev => ({
        ...prev,
        attractions: [...prev.attractions, { ...newAttraction }]
      }));
      setNewAttraction({
        title: '',
        description: '',
        image: '',
        duration: '',
        type: 'Historical'
      });
    }
  };

  const removeAttraction = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attractions: prev.attractions.filter((_, i) => i !== index)
    }));
  };

  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    setFormData(prev => ({ ...prev, slug }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formDataToSend = new FormData();
      
      // Add all form data except images
      const { images, ...restData } = formData;
      formDataToSend.append('data', JSON.stringify(restData));
      
      // Add image files
      imageFiles.forEach(file => {
        formDataToSend.append('images', file);
      });

      if (destination) {
        // Update existing destination
        await api.updateDestination(destination._id, formDataToSend);
      } else {
        // Create new destination
        await api.createDestination(formDataToSend);
      }

      onSubmit();
    } catch (err: any) {
      setError(err.message || 'Error saving destination');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          {destination ? 'Edit Destination' : 'Create New Destination'}
        </h2>
        <button
          onClick={onCancel}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Destination Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Slug *
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
              <button
                type="button"
                onClick={generateSlug}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Generate
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Region *
            </label>
            <select
              name="region"
              value={formData.region}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            >
              {REGION_OPTIONS.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Icon
            </label>
            <select
              name="iconName"
              value={formData.iconName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {ICON_OPTIONS.map(icon => (
                <option key={icon.value} value={icon.value}>{icon.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tour Count
            </label>
            <input
              type="number"
              name="tourCount"
              value={formData.tourCount}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Display Order
            </label>
            <input
              type="number"
              name="order"
              value={formData.order}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              min="0"
            />
          </div>
        </div>

        {/* Descriptions */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Short Description *
          </label>
          <textarea
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleInputChange}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          />
        </div>

        {/* Images */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Images
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="cursor-pointer flex flex-col items-center justify-center"
            >
              <Upload className="w-8 h-8 text-gray-400 mb-2" />
              <span className="text-sm text-gray-600">Click to upload images</span>
              <span className="text-xs text-gray-500 mt-1">Recommended: 1200x800px or similar</span>
            </label>
          </div>

          {/* Image Previews */}
          {formData.images.length > 0 && (
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              {formData.images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  {index === 0 && (
                    <div className="absolute bottom-2 left-2 px-2 py-1 bg-primary-500 text-white text-xs rounded">
                      Main
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Features */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Key Features
          </label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={newFeature}
              onChange={(e) => setNewFeature(e.target.value)}
              placeholder="Add a key feature"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={addFeature}
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-lg"
              >
                <span>{feature}</span>
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="text-gray-500 hover:text-red-500"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Best For */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Best For (Traveler Types)
          </label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={newBestFor}
              onChange={(e) => setNewBestFor(e.target.value)}
              placeholder="Add traveler type"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={addBestFor}
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.bestFor.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-lg"
              >
                <span>{item}</span>
                <button
                  type="button"
                  onClick={() => removeBestFor(index)}
                  className="text-gray-500 hover:text-red-500"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Highlights */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Highlights
          </label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={newHighlight}
              onChange={(e) => setNewHighlight(e.target.value)}
              placeholder="Add a highlight"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={addHighlight}
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-2">
            {formData.highlights.map((highlight, index) => (
              <div
                key={index}
                className="flex items-center justify-between px-3 py-2 bg-yellow-50 rounded-lg"
              >
                <span>{highlight}</span>
                <button
                  type="button"
                  onClick={() => removeHighlight(index)}
                  className="text-gray-500 hover:text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Facts */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quick Facts
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
            <input
              type="text"
              value={newQuickFact.label}
              onChange={(e) => setNewQuickFact(prev => ({ ...prev, label: e.target.value }))}
              placeholder="Fact label"
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <input
              type="text"
              value={newQuickFact.value}
              onChange={(e) => setNewQuickFact(prev => ({ ...prev, value: e.target.value }))}
              placeholder="Fact value"
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <div className="flex gap-2">
              <input
                type="text"
                value={newQuickFact.icon}
                onChange={(e) => setNewQuickFact(prev => ({ ...prev, icon: e.target.value }))}
                placeholder="Icon name"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={addQuickFact}
                className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="space-y-2">
            {formData.quickFacts.map((fact, index) => (
              <div
                key={index}
                className="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <span className="font-medium">{fact.label}:</span>
                  <span>{fact.value}</span>
                  <span className="text-xs text-gray-500">({fact.icon})</span>
                </div>
                <button
                  type="button"
                  onClick={() => removeQuickFact(index)}
                  className="text-gray-500 hover:text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Attractions */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Attractions
          </label>
          <div className="space-y-4 mb-4 p-4 border border-gray-200 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                type="text"
                value={newAttraction.title}
                onChange={(e) => setNewAttraction(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Attraction title"
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <select
                value={newAttraction.type}
                onChange={(e) => setNewAttraction(prev => ({ ...prev, type: e.target.value }))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="Historical">Historical</option>
                <option value="Cultural">Cultural</option>
                <option value="Nature">Nature</option>
                <option value="Religious">Religious</option>
                <option value="Adventure">Adventure</option>
              </select>
            </div>
            <textarea
              value={newAttraction.description}
              onChange={(e) => setNewAttraction(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Attraction description"
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                type="text"
                value={newAttraction.duration}
                onChange={(e) => setNewAttraction(prev => ({ ...prev, duration: e.target.value }))}
                placeholder="Duration (e.g., 2-3 hours)"
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <input
                type="text"
                value={newAttraction.image}
                onChange={(e) => setNewAttraction(prev => ({ ...prev, image: e.target.value }))}
                placeholder="Image URL"
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <button
              type="button"
              onClick={addAttraction}
              className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
            >
              <Plus className="w-4 h-4" />
              Add Attraction
            </button>
          </div>

          <div className="space-y-4">
            {formData.attractions.map((attraction, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-bold">{attraction.title}</h4>
                    <span className="text-sm text-gray-500">{attraction.type} • {attraction.duration}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeAttraction(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-gray-600 text-sm mb-2">{attraction.description}</p>
                {attraction.image && (
                  <div className="text-xs text-gray-500">Image: {attraction.image}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* SEO */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            SEO Meta Title
          </label>
          <input
            type="text"
            name="metaTitle"
            value={formData.metaTitle}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            SEO Meta Description
          </label>
          <textarea
            name="metaDescription"
            value={formData.metaDescription}
            onChange={handleInputChange}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Status */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isActive"
            name="isActive"
            checked={formData.isActive}
            onChange={handleInputChange}
            className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
          />
          <label htmlFor="isActive" className="text-sm text-gray-700">
            Active (Visible on website)
          </label>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end gap-3 pt-6 border-t">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Saving...' : destination ? 'Update Destination' : 'Create Destination'}
          </button>
        </div>
      </form>
    </div>
  );
}
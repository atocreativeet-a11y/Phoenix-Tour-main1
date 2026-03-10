'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Save, Trash2, Image as ImageIcon, Plus, X, ArrowLeft, Calendar, MapPin, Clock, Users, Star, Edit, Eye } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';

export default function TourDetailManager() {
  const params = useParams();
  const router = useRouter();
  const tourId = params.id as string;
  
  const [details, setDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [tourInfo, setTourInfo] = useState<any>(null);
  
  // Form states for each section
  const [highlights, setHighlights] = useState<string[]>([]);
  const [newHighlight, setNewHighlight] = useState('');
  const [itinerary, setItinerary] = useState<any[]>([{ 
    day: 1, 
    title: '', 
    description: '', 
    accommodation: '', 
    meals: [], 
    activities: [] 
  }]);
  const [inclusions, setInclusions] = useState<any[]>([{ 
    category: 'Included', 
    items: [''] 
  }]);
  const [exclusions, setExclusions] = useState<any[]>([{ 
    category: 'Not Included', 
    items: [''] 
  }]);
  const [faqs, setFaqs] = useState<any[]>([{ 
    question: '', 
    answer: '' 
  }]);
  const [fullDescription, setFullDescription] = useState('');
  const [images, setImages] = useState<any[]>([{ 
    url: '', 
    caption: '', 
    isMain: false, 
    order: 0 
  }]);
  
  // Create Axios instance with default config
  const api = axios.create({
    baseURL: '/api',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  // Add request interceptor for debugging
  api.interceptors.request.use(
    (config) => {
      console.log('Axios Request:', config.method?.toUpperCase(), config.url);
      return config;
    },
    (error) => {
      console.error('Axios Request Error:', error);
      return Promise.reject(error);
    }
  );
  
  // Add response interceptor for debugging
  api.interceptors.response.use(
    (response) => {
      console.log('Axios Response:', response.status, response.config.url);
      return response;
    },
    (error) => {
      console.error('Axios Response Error:', {
        status: error.response?.status,
        data: error.response?.data,
        url: error.config?.url
      });
      return Promise.reject(error);
    }
  );
  
  useEffect(() => {
    if (tourId) {
      fetchDetails();
      fetchTourInfo();
    }
  }, [tourId]);
  
  const fetchTourInfo = async () => {
    try {
      const response = await api.get(`/tours/${tourId}`);
      if (response.data.success) {
        setTourInfo(response.data.tour);
      }
    } catch (error) {
      console.error('Error fetching tour info:', error);
    }
  };
  
  const fetchDetails = async () => {
    try {
      setLoading(true);
      console.log('Fetching details for tour ID:', tourId);
      
      const response = await api.get(`/tours/${tourId}/details`);
      console.log('Details response:', response.data);
      
      if (response.data.success) {
        if (response.data.detail) {
          const detail = response.data.detail;
          setDetails(detail);
          setHighlights(detail.highlights || []);
          setItinerary(detail.itinerary?.length > 0 ? detail.itinerary : [{ 
            day: 1, 
            title: '', 
            description: '', 
            accommodation: '', 
            meals: [], 
            activities: [] 
          }]);
          setInclusions(detail.inclusions?.length > 0 ? detail.inclusions : [{ 
            category: 'Included', 
            items: [''] 
          }]);
          setExclusions(detail.exclusions?.length > 0 ? detail.exclusions : [{ 
            category: 'Not Included', 
            items: [''] 
          }]);
          setFaqs(detail.faqs?.length > 0 ? detail.faqs : [{ 
            question: '', 
            answer: '' 
          }]);
          setFullDescription(detail.fullDescription || '');
          setImages(detail.images?.length > 0 ? detail.images : [{ 
            url: '', 
            caption: '', 
            isMain: false, 
            order: 0 
          }]);
        } else if (response.data.basicInfo) {
          setFullDescription(response.data.basicInfo.description || '');
          setTourInfo(response.data.basicInfo);
        }
      }
    } catch (error: any) {
      console.error('Error fetching details:', error);
      const errorMessage = error.response?.data?.error || error.message;
      alert(`Failed to load tour details: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };
  
  const saveDetails = async () => {
    try {
      setSaving(true);
      
      // Prepare data
      const dataToSave = {
        highlights: highlights.filter(h => h.trim() !== ''),
        itinerary: itinerary
          .filter(day => day.title.trim() !== '' || day.description.trim() !== '')
          .map((day, index) => ({
            ...day,
            day: index + 1
          })),
        inclusions: inclusions
          .filter(cat => cat.items.some((item: string) => item.trim() !== ''))
          .map(cat => ({
            ...cat,
            items: cat.items.filter((item: string) => item.trim() !== '')
          })),
        exclusions: exclusions
          .filter(cat => cat.items.some((item: string) => item.trim() !== ''))
          .map(cat => ({
            ...cat,
            items: cat.items.filter((item: string) => item.trim() !== '')
          })),
        faqs: faqs
          .filter(faq => faq.question.trim() !== '' && faq.answer.trim() !== ''),
        fullDescription,
        images: images.filter(img => img.url.trim() !== '')
      };
      
      console.log('Saving data:', dataToSave);
      
      const response = await api.post(`/tours/${tourId}/details`, dataToSave);
      console.log('Save response:', response.data);
      
      if (response.data.success) {
        alert('Tour details saved successfully!');
        await fetchDetails();
        router.refresh();
      }
    } catch (error: any) {
      console.error('Error saving details:', error);
      
      let errorMessage = 'Failed to save tour details';
      if (error.response?.data) {
        if (error.response.data.validationErrors) {
          errorMessage = 'Validation errors:\n' + 
            Object.entries(error.response.data.validationErrors)
              .map(([key, value]) => `${key}: ${value}`)
              .join('\n');
        } else if (error.response.data.error) {
          errorMessage = error.response.data.error;
          if (error.response.data.details) {
            errorMessage += `\nDetails: ${error.response.data.details}`;
          }
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      alert(errorMessage);
    } finally {
      setSaving(false);
    }
  };
  
  const addHighlight = () => {
    if (newHighlight.trim()) {
      setHighlights([...highlights, newHighlight.trim()]);
      setNewHighlight('');
    }
  };
  
  const removeHighlight = (index: number) => {
    setHighlights(highlights.filter((_, i) => i !== index));
  };
  
  const addItineraryDay = () => {
    setItinerary([...itinerary, { 
      day: itinerary.length + 1, 
      title: '', 
      description: '', 
      accommodation: '', 
      meals: [], 
      activities: [] 
    }]);
  };
  
  const updateItinerary = (index: number, field: string, value: any) => {
    const updated = [...itinerary];
    updated[index] = { ...updated[index], [field]: value };
    setItinerary(updated);
  };
  
  const removeItineraryDay = (index: number) => {
    if (itinerary.length > 1) {
      setItinerary(itinerary.filter((_, i) => i !== index));
    }
  };
  
  const addInclusionItem = (categoryIndex: number) => {
    const updated = [...inclusions];
    if (!updated[categoryIndex].items) {
      updated[categoryIndex].items = [];
    }
    updated[categoryIndex].items.push('');
    setInclusions(updated);
  };
  
  const updateInclusionItem = (categoryIndex: number, itemIndex: number, value: string) => {
    const updated = [...inclusions];
    updated[categoryIndex].items[itemIndex] = value;
    setInclusions(updated);
  };
  
  // const removeInclusionItem = (categoryIndex: number, itemIndex: number) => {
  //   const updated = [...inclusions];
  //   updated[categoryIndex].items = updated[categoryIndex].items.filter((_, i) => i !== itemIndex);
  //   setInclusions(updated);
  // };
  
  const addExclusionItem = (categoryIndex: number) => {
    const updated = [...exclusions];
    if (!updated[categoryIndex].items) {
      updated[categoryIndex].items = [];
    }
    updated[categoryIndex].items.push('');
    setExclusions(updated);
  };
  
  const updateExclusionItem = (categoryIndex: number, itemIndex: number, value: string) => {
    const updated = [...exclusions];
    updated[categoryIndex].items[itemIndex] = value;
    setExclusions(updated);
  };
  
  // const removeExclusionItem = (categoryIndex: number, itemIndex: number) => {
  //   const updated = [...exclusions];
  //   updated[categoryIndex].items = updated[categoryIndex].items.filter((_, i) => i !== itemIndex);
  //   setExclusions(updated);
  // };
  
  const addFaq = () => {
    setFaqs([...faqs, { question: '', answer: '' }]);
  };
  
  const updateFaq = (index: number, field: string, value: string) => {
    const updated = [...faqs];
    updated[index] = { ...updated[index], [field]: value };
    setFaqs(updated);
  };
  
  const removeFaq = (index: number) => {
    if (faqs.length > 1) {
      setFaqs(faqs.filter((_, i) => i !== index));
    }
  };
  
  const addImage = () => {
    setImages([...images, { 
      url: '', 
      caption: '', 
      isMain: images.length === 0, // First image is main by default
      order: images.length 
    }]);
  };
  
  const updateImage = (index: number, field: string, value: any) => {
    const updated = [...images];
    updated[index] = { ...updated[index], [field]: value };
    
    // If setting isMain to true, unset others
    if (field === 'isMain' && value === true) {
      updated.forEach((img, i) => {
        if (i !== index) img.isMain = false;
      });
    }
    
    setImages(updated);
  };
  
  const removeImage = (index: number) => {
    if (images.length > 1) {
      const updated = images.filter((_, i) => i !== index);
      
      // If we removed the main image, set the first remaining as main
      if (images[index].isMain && updated.length > 0) {
        updated[0].isMain = true;
      }
      
      setImages(updated);
    }
  };
  
  const deleteDetails = async () => {
    if (!confirm('Are you sure you want to delete all tour details? This cannot be undone.')) {
      return;
    }
    
    try {
      const response = await api.delete(`/tours/${tourId}/details`);
      if (response.data.success) {
        alert('Tour details deleted successfully!');
        await fetchDetails();
      }
    } catch (error: any) {
      console.error('Error deleting details:', error);
      alert('Failed to delete tour details');
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading tour details...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Link
                  href="/dashboard/tours"
                  className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Tours
                </Link>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900">Tour Details Management</h1>
              <p className="text-gray-600 mt-2">
                Add detailed information, itinerary, FAQs, and more for this tour
              </p>
              
              {tourInfo && (
                <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-semibold text-gray-900">{tourInfo.title}</h2>
                      <div className="flex flex-wrap items-center gap-4 mt-2">
                        <span className="flex items-center gap-1 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          {tourInfo.region}
                        </span>
                        <span className="flex items-center gap-1 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          {tourInfo.duration}
                        </span>
                        <span className="flex items-center gap-1 text-sm text-gray-600">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          {tourInfo.rating}
                        </span>
                        <span className="text-lg font-bold text-primary-600">${tourInfo.price}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        href={`/dashboard/tours/edit/${tourId}`}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
                      >
                        <Edit className="w-4 h-4" />
                        Edit Tour
                      </Link>
                      <Link
                        href={`/tours/${tourInfo.slug}`}
                        target="_blank"
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        View Live
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Highlights Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Tour Highlights</h2>
              <div className="space-y-3">
                {highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <span className="text-gray-700">{highlight}</span>
                    <button
                      onClick={() => removeHighlight(index)}
                      className="p-1 text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newHighlight}
                    onChange={(e) => setNewHighlight(e.target.value)}
                    placeholder="Add a highlight..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                    onKeyPress={(e) => e.key === 'Enter' && addHighlight()}
                  />
                  <button
                    onClick={addHighlight}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                </div>
              </div>
            </div>

            {/* Full Description Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Full Description</h2>
              <textarea
                value={fullDescription}
                onChange={(e) => setFullDescription(e.target.value)}
                rows={10}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Write a detailed description of the tour..."
              />
              <p className="text-sm text-gray-500 mt-2">
                This will be displayed on the tour detail page. Use markdown or HTML for formatting.
              </p>
            </div>

            {/* Itinerary Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Itinerary</h2>
                <button
                  onClick={addItineraryDay}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Day
                </button>
              </div>
              
              <div className="space-y-6">
                {itinerary.map((day, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6 bg-gradient-to-r from-gray-50 to-white">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-900">Day {index + 1}</h3>
                      {itinerary.length > 1 && (
                        <button
                          onClick={() => removeItineraryDay(index)}
                          className="p-1 text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Title *
                        </label>
                        <input
                          type="text"
                          value={day.title}
                          onChange={(e) => updateItinerary(index, 'title', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="Day title"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description *
                        </label>
                        <textarea
                          value={day.description}
                          onChange={(e) => updateItinerary(index, 'description', e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="Describe the day's activities"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Accommodation
                        </label>
                        <input
                          type="text"
                          value={day.accommodation}
                          onChange={(e) => updateItinerary(index, 'accommodation', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="Hotel/lodge name"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Inclusions Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">What's Included</h2>
              {inclusions.map((category, catIndex) => (
                <div key={catIndex} className="mb-6 last:mb-0">
                  <div className="flex items-center gap-2 mb-3">
                    <input
                      type="text"
                      value={category.category}
                      onChange={(e) => {
                        const updated = [...inclusions];
                        updated[catIndex].category = e.target.value;
                        setInclusions(updated);
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg font-medium"
                      placeholder="Category name"
                    />
                  </div>
                  
                  {/* <div className="space-y-2 ml-4">
                    {(category.items || []).map((item: string, itemIndex: number) => (
                      <div key={itemIndex} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => updateInclusionItem(catIndex, itemIndex, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                          placeholder="Included item"
                        />
                        <button
                          onClick={() => removeInclusionItem(catIndex, itemIndex)}
                          className="p-2 text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    
                    <button
                      onClick={() => addInclusionItem(catIndex)}
                      className="mt-2 px-3 py-1 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded"
                    >
                      + Add Item
                    </button>
                  </div> */}
                </div>
              ))}
            </div>

            {/* Exclusions Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">What's Not Included</h2>
              {exclusions.map((category, catIndex) => (
                <div key={catIndex} className="mb-6 last:mb-0">
                  <div className="flex items-center gap-2 mb-3">
                    <input
                      type="text"
                      value={category.category}
                      onChange={(e) => {
                        const updated = [...exclusions];
                        updated[catIndex].category = e.target.value;
                        setExclusions(updated);
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg font-medium"
                      placeholder="Category name"
                    />
                  </div>
                  
                  {/* <div className="space-y-2 ml-4">
                    {(category.items || []).map((item: string, itemIndex: number) => (
                      <div key={itemIndex} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => updateExclusionItem(catIndex, itemIndex, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                          placeholder="Excluded item"
                        />
                        <button
                          onClick={() => removeExclusionItem(catIndex, itemIndex)}
                          className="p-2 text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    
                    <button
                      onClick={() => addExclusionItem(catIndex)}
                      className="mt-2 px-3 py-1 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded"
                    >
                      + Add Item
                    </button>
                  </div> */}
                </div>
              ))}
            </div>

            {/* FAQs Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Frequently Asked Questions</h2>
                <button
                  onClick={addFaq}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add FAQ
                </button>
              </div>
              
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-900">FAQ #{index + 1}</h3>
                      {faqs.length > 1 && (
                        <button
                          onClick={() => removeFaq(index)}
                          className="p-1 text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Question *
                        </label>
                        <input
                          type="text"
                          value={faq.question}
                          onChange={(e) => updateFaq(index, 'question', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="Common question..."
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Answer *
                        </label>
                        <textarea
                          value={faq.answer}
                          onChange={(e) => updateFaq(index, 'answer', e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                          placeholder="Detailed answer..."
                          required
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Actions & Preview */}
          <div className="lg:col-span-1 space-y-6">
            {/* Actions Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
              
              <div className="space-y-3">
                <button
                  onClick={saveDetails}
                  disabled={saving}
                  className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-lg hover:from-green-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  {saving ? 'Saving...' : 'Save All Changes'}
                </button>
                
                <button
                  onClick={fetchDetails}
                  className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2"
                >
                  Refresh Data
                </button>
                
                <button
                  onClick={deleteDetails}
                  className="w-full px-4 py-3 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 flex items-center justify-center gap-2"
                >
                  <Trash2 className="w-5 h-5" />
                  Delete Details
                </button>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-3">Quick Stats</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Highlights</span>
                    <span className="font-medium">{highlights.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Itinerary Days</span>
                    <span className="font-medium">{itinerary.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">FAQs</span>
                    <span className="font-medium">{faqs.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Description Length</span>
                    <span className="font-medium">{fullDescription.length} chars</span>
                  </div>
                </div>
              </div>
              
              {tourInfo && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-3">Live Preview</h4>
                  <Link
                    href={`/tours/${tourInfo.slug}/detail`}
                    target="_blank"
                    className="block w-full px-4 py-2 bg-gray-900 text-white text-center rounded-lg hover:bg-gray-800"
                  >
                    View Detail Page
                  </Link>
                </div>
              )}
            </div>

            {/* Status Card */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Status</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Details Saved</span>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${details ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {details ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    {details ? 'Details are saved to database' : 'No details saved yet'}
                  </p>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Last Updated</span>
                    <span className="text-sm text-gray-600">
                      {details?.updatedAt ? new Date(details.updatedAt).toLocaleDateString() : 'Never'}
                    </span>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Tour Status</span>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${tourInfo?.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {tourInfo?.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
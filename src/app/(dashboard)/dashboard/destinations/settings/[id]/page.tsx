// src/app/dashboard/destinations/settings/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import * as Icons from "lucide-react";

// helper
const MoreVertical = (Icons as any).MoreVertical || (() => null);
const ChevronLeft = (Icons as any).ChevronLeft || (() => null);
const Settings = (Icons as any).Settings || (() => null);
const Edit = (Icons as any).Edit || (() => null);
const Eye = (Icons as any).Eye || (() => null);
const XCircle = (Icons as any).XCircle || (() => null);
const ChevronRight = (Icons as any).ChevronRight || (() => null);
const Clock = (Icons as any).Clock || (() => null);
const ArrowUpDown = (Icons as any).ArrowUpDown || (() => null);
const CheckCircle = (Icons as any).CheckCircle || (() => null);
const Search = (Icons as any).Search || (() => null);
const Link = (Icons as any).Link || (() => null);
const Download = (Icons as any).Download || (() => null);
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

export default function DestinationSettingsPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [settings, setSettings] = useState({
    metaTitle: '',
    metaDescription: '',
    keywords: [] as string[],
    canonicalUrl: '',
    socialImage: '',
    schemaMarkup: '',
  });

  useEffect(() => {
    fetchSettings();
  }, [params.id]);

  const fetchSettings = async () => {
    try {
      const response = await fetch(`/api/admin/destinations/${params.id}/settings`);
      const data = await response.json();
      
      if (data.success) {
        setSettings(data.settings);
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch(`/api/admin/destinations/${params.id}/settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      const data = await response.json();
      
      if (data.success) {
        alert('Settings saved successfully!');
      } else {
        alert('Failed to save settings');
      }
    } catch (error) {
      console.error('Failed to save settings:', error);
      alert('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

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
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Destination
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mt-4">Destination Settings</h1>
          <p className="text-gray-600 mt-2">
            Configure SEO and advanced settings for this destination
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="space-y-6">
            {/* SEO Settings */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-600" />
                SEO Settings
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Title
                  </label>
                  <input
                    type="text"
                    value={settings.metaTitle}
                    onChange={(e) => setSettings(prev => ({ ...prev, metaTitle: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Optimized title for search engines"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Recommended: 50-60 characters
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Description
                  </label>
                  <textarea
                    value={settings.metaDescription}
                    onChange={(e) => setSettings(prev => ({ ...prev, metaDescription: e.target.value }))}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Brief description for search engine results"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Recommended: 150-160 characters
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Keywords
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {settings.keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder="Add keyword and press Enter"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                        setSettings(prev => ({
                          ...prev,
                          keywords: [...prev.keywords, e.currentTarget.value.trim()]
                        }));
                        e.currentTarget.value = '';
                      }
                    }}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Social Media
              </h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Social Sharing Image
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={settings.socialImage}
                    onChange={(e) => setSettings(prev => ({ ...prev, socialImage: e.target.value }))}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="URL for social media preview image"
                  />
                  <button
                    type="button"
                    onClick={() => window.open(settings.socialImage, '_blank')}
                    className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Recommended: 1200x630 pixels
                </p>
              </div>
            </div>

            {/* Advanced Settings */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Advanced Settings
              </h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Canonical URL
                </label>
                <input
                  type="text"
                  value={settings.canonicalUrl}
                  onChange={(e) => setSettings(prev => ({ ...prev, canonicalUrl: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Canonical URL for SEO"
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Schema Markup
                </label>
                <textarea
                  value={settings.schemaMarkup}
                  onChange={(e) => setSettings(prev => ({ ...prev, schemaMarkup: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                  placeholder="JSON-LD schema markup"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Optional: JSON-LD structured data for search engines
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4 pt-6 border-t">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 flex items-center gap-2"
              >
                {saving ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Settings
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
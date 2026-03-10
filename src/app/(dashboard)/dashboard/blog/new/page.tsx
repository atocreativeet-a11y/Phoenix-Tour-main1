// src/app/admin/blog/new/page.tsx - Fixed Blog Editor
'use client';

import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { 
  Save, 
  Eye, 
  Upload, 
  X, 
  Plus, 
  Trash2,
  Image as ImageIcon,
  Heading,
  Type
} from 'lucide-react';

// Use a lightweight inline editor as a fallback until a Tiptap integration file exists
function TiptapEditor({ content, onChange }: { content: string; onChange: Dispatch<SetStateAction<string>> }) {
  return (
    <textarea
      value={content}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Write your content..."
      className="w-full h-96 border-0 focus:outline-none focus:ring-0 resize-none placeholder:text-gray-400"
    />
  );
}

export default function BlogEditorPage() {
  const router = useRouter();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [isPublished, setIsPublished] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [readTime, setReadTime] = useState(5);
  const [newTag, setNewTag] = useState('');
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async () => {
    try {
      const blogData = {
        title,
        excerpt,
        content,
        featuredImage,
        categories,
        tags,
        isPublished,
        isFeatured,
        readTime,
        publishedAt: isPublished ? new Date().toISOString() : null,
      };
      
      console.log('Submitting blog post:', blogData);
      
      // TODO: Add your API call here
      // const response = await fetch('/api/admin/blog', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(blogData),
      // });
      
      router.push('/admin/blog');
    } catch (error) {
      console.error('Error submitting blog:', error);
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create New Blog Post</h1>
          <p className="text-gray-600 mt-2">Share your travel stories and insights with the world</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Editor */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Heading className="w-5 h-5 text-gray-600" />
                <label className="font-medium text-gray-700">Title</label>
              </div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter blog post title..."
                className="w-full text-2xl font-bold border-0 focus:outline-none focus:ring-0 placeholder:text-gray-400"
              />
            </div>

            {/* Excerpt */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Type className="w-5 h-5 text-gray-600" />
                <label className="font-medium text-gray-700">Excerpt</label>
              </div>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Brief summary of your article (appears in listings)..."
                className="w-full h-24 border-0 focus:outline-none focus:ring-0 resize-none placeholder:text-gray-400"
                maxLength={300}
              />
              <div className="text-right text-sm text-gray-500 mt-2">
                {excerpt.length}/300 characters
              </div>
            </div>

            {/* Content Editor */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="mb-4">
                <label className="font-medium text-gray-700">Content</label>
              </div>
              {mounted ? (
                <TiptapEditor content={content} onChange={setContent} />
              ) : (
                <div className="h-96 bg-gray-100 rounded-lg animate-pulse"></div>
              )}
            </div>
          </div>

          {/* Sidebar - Keep the same as before */}
          <div className="space-y-6">
            {/* Featured Image */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <ImageIcon className="w-5 h-5 text-gray-600" />
                <label className="font-medium text-gray-700">Featured Image</label>
              </div>
              
              {featuredImage ? (
                <div className="relative">
                  <img
                    src={featuredImage}
                    alt="Featured"
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <button
                    onClick={() => setFeaturedImage('')}
                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Upload featured image</p>
                  <button 
                    onClick={() => setFeaturedImage('/api/placeholder/400/300')}
                    className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                  >
                    Choose Image
                  </button>
                </div>
              )}
            </div>

            {/* Categories */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <label className="font-medium text-gray-700 mb-4 block">Categories</label>
              <div className="space-y-2">
                {[
                  'Ethiopian Culture',
                  'Travel Tips',
                  'History & Heritage',
                  'Food & Coffee',
                  'Nature & Wildlife',
                  'Festivals & Events'
                ].map((category) => (
                  <div key={category} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id={`category-${category}`}
                      checked={categories.includes(category)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setCategories([...categories, category]);
                        } else {
                          setCategories(categories.filter(c => c !== category));
                        }
                      }}
                      className="rounded text-primary-600 focus:ring-primary-500"
                    />
                    <label htmlFor={`category-${category}`} className="text-gray-700 cursor-pointer">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <label className="font-medium text-gray-700 mb-4 block">Tags</label>
              <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag, index) => (
                  <div key={index} className="inline-flex items-center gap-1 bg-gray-100 px-3 py-1.5 rounded-full">
                    <span className="text-sm text-gray-700">#{tag}</span>
                    <button
                      onClick={() => setTags(tags.filter((_, i) => i !== index))}
                      className="text-gray-500 hover:text-red-500 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={handleTagKeyDown}
                  placeholder="Add tag..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button 
                  onClick={handleAddTag}
                  className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Settings */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <label className="font-medium text-gray-700 mb-4 block">Settings</label>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Read Time (minutes)</span>
                  <input
                    type="number"
                    value={readTime}
                    onChange={(e) => setReadTime(Math.max(1, Math.min(60, parseInt(e.target.value) || 5)))}
                    min="1"
                    max="60"
                    className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Featured Post</span>
                  <button
                    onClick={() => setIsFeatured(!isFeatured)}
                    className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${
                      isFeatured ? 'bg-primary-500' : 'bg-gray-300'
                    }`}
                  >
                    <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                      isFeatured ? 'translate-x-7' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Publish Now</span>
                  <button
                    onClick={() => setIsPublished(!isPublished)}
                    className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${
                      isPublished ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                      isPublished ? 'translate-x-7' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-3">
              <button
                onClick={handleSubmit}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors"
              >
                <Save className="w-5 h-5" />
                {isPublished ? 'Save & Publish' : 'Save as Draft'}
              </button>
              
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors">
                <Eye className="w-5 h-5" />
                Preview
              </button>
              
              <button 
                onClick={() => router.push('/admin/blog')}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 text-red-600 font-medium rounded-lg hover:bg-red-100 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
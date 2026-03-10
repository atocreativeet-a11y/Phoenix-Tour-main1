'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Edit, Trash2, Eye, Filter, Search, 
  ChevronLeft, ChevronRight, MoreVertical,
  CheckCircle, XCircle, Star, Users,
  Clock, Plus, Settings, Download,
  ArrowUpDown,
  ImageIcon
} from 'lucide-react';

interface Tour {
  _id: string;
  title: string;
  slug: string;
  price: number;
  duration: string;
  category: string;
  region: string;
  rating: number;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
  bookings: number;
  description?: string;
  image?: string;
}

export default function AdminToursPage() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');

  const fetchTours = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/tours?page=${currentPage}&search=${search}&filter=${filter}&sortBy=${sortBy}&sortOrder=${sortOrder}`);
      const data = await response.json();
      
      if (data.success) {
        setTours(data.tours);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.error('Failed to fetch tours:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, [currentPage, search, filter, sortBy, sortOrder]);

  const deleteTour = async (id: string) => {
    if (!confirm('Are you sure you want to delete this tour? This action cannot be undone.')) return;
    
    try {
      const response = await fetch(`/api/tours/${id}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (data.success) {
        alert('Tour deleted successfully');
        fetchTours();
      }
    } catch (error) {
      console.error('Failed to delete tour:', error);
      alert('Failed to delete tour');
    }
  };

  const toggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/tours/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive: !currentStatus }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        fetchTours();
      }
    } catch (error) {
      console.error('Failed to update tour status:', error);
    }
  };

  const toggleFeatured = async (id: string, currentFeatured: boolean) => {
    try {
      const response = await fetch(`/api/tours/${id}/featured`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isFeatured: !currentFeatured }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        fetchTours();
      }
    } catch (error) {
      console.error('Failed to update featured status:', error);
    }
  };

  const exportTours = async () => {
    try {
      const response = await fetch('/api/tours/export');
      const data = await response.json();
      
      if (data.success) {
        // Create and download CSV
        const csv = convertToCSV(data.tours);
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ethiopia-tours-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
      }
    } catch (error) {
      console.error('Failed to export tours:', error);
    }
  };

  const convertToCSV = (tours: Tour[]) => {
    const headers = ['Title', 'Category', 'Region', 'Duration', 'Price', 'Rating', 'Status', 'Featured'];
    const rows = tours.map(tour => [
      tour.title,
      tour.category,
      tour.region,
      tour.duration,
      `$${tour.price}`,
      tour.rating.toString(),
      tour.isActive ? 'Active' : 'Inactive',
      tour.isFeatured ? 'Yes' : 'No'
    ]);
    
    return [headers, ...rows].map(row => row.join(',')).join('\n');
  };

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tour Management</h1>
            <p className="text-gray-600 mt-2">
              Manage all Ethiopian tours and experiences
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={exportTours}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
            <Link
              href="/dashboard/tours/create"
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-yellow-500 text-white rounded-lg hover:from-green-600 hover:to-yellow-600 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Create New Tour
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Tours</p>
              <p className="text-2xl font-bold text-gray-900">{tours.length}</p>
            </div>
            <div className="p-3 bg-gradient-to-r from-blue-100 to-blue-50 rounded-xl">
              <Filter className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Tours</p>
              <p className="text-2xl font-bold text-gray-900">
                {tours.filter(t => t.isActive).length}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-r from-green-100 to-green-50 rounded-xl">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Featured</p>
              <p className="text-2xl font-bold text-gray-900">
                {tours.filter(t => t.isFeatured).length}
              </p>
            </div>
            <div className="p-3 bg-gradient-to-r from-yellow-100 to-yellow-50 rounded-xl">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg. Rating</p>
              <p className="text-2xl font-bold text-gray-900">
                {tours.length > 0 
                  ? (tours.reduce((acc, t) => acc + t.rating, 0) / tours.length).toFixed(1)
                  : '0.0'
                }
              </p>
            </div>
            <div className="p-3 bg-gradient-to-r from-purple-100 to-purple-50 rounded-xl">
              <Star className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search tours by title, category, or region..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && fetchTours()}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
          
          {/* Filter and Sort */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex gap-3">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                <option value="all">All Tours</option>
                <option value="active">Active Only</option>
                <option value="inactive">Inactive</option>
                <option value="featured">Featured</option>
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => handleSort(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                <option value="createdAt">Sort by: Date</option>
                <option value="title">Name A-Z</option>
                <option value="price">Price</option>
                <option value="rating">Rating</option>
                <option value="duration">Duration</option>
              </select>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={fetchTours}
                className="px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Apply
              </button>
              
              <button
                onClick={() => {
                  setSearch('');
                  setFilter('all');
                  setSortBy('createdAt');
                  setSortOrder('desc');
                }}
                className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tours Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading tours...</p>
          </div>
        ) : tours.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No tours found</h3>
            <p className="text-gray-600 mb-6">
              {search || filter !== 'all' 
                ? 'Try adjusting your search or filter criteria' 
                : 'Get started by creating your first tour'
              }
            </p>
            <Link
              href="/dashboard/tours/create"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-yellow-500 text-white rounded-lg hover:from-green-600 hover:to-yellow-600"
            >
              <Plus className="w-4 h-4" />
              Create Your First Tour
            </Link>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      <button 
                        onClick={() => handleSort('title')}
                        className="flex items-center gap-1 hover:text-gray-900"
                      >
                        Tour
                        <ArrowUpDown className="w-3 h-3" />
                      </button>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Details
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      <button 
                        onClick={() => handleSort('price')}
                        className="flex items-center gap-1 hover:text-gray-900"
                      >
                        Price
                        <ArrowUpDown className="w-3 h-3" />
                      </button>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {tours.map((tour) => (
                    <tr 
                      key={tour._id} 
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-start gap-4">
                          {tour.image ? (
                            <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                              <img 
                                src={tour.image} 
                                alt={tour.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              <span className="text-lg font-bold text-green-600">ET</span>
                            </div>
                          )}
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-semibold text-gray-900">{tour.title}</h4>
                              {tour.isFeatured && (
                                <span className="px-2 py-1 bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 text-xs font-semibold rounded">
                                  Featured
                                </span>
                              )}
                            </div>
                            <div className="flex flex-wrap gap-1 mt-2">
                              <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded">
                                {tour.category}
                              </span>
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded">
                                {tour.region}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">
                              Created: {new Date(tour.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-700">{tour.duration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className="text-sm font-medium text-gray-700">{tour.rating}</span>
                            <span className="text-xs text-gray-500">/ 5.0</span>
                          </div>
                          {tour.bookings > 0 && (
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-700">{tour.bookings} bookings</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="space-y-1">
                          <div className="font-bold text-2xl text-gray-900">${tour.price}</div>
                          <div className="text-sm text-gray-500">per person</div>
                          {tour.description && (
                            <p className="text-xs text-gray-600 line-clamp-2 max-w-xs">
                              {tour.description}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="space-y-3">
                          <button
                            onClick={() => toggleStatus(tour._id, tour.isActive)}
                            className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                              tour.isActive
                                ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                : 'bg-red-100 text-red-800 hover:bg-red-200'
                            }`}
                          >
                            {tour.isActive ? (
                              <>
                                <CheckCircle className="w-4 h-4" />
                                Active
                              </>
                            ) : (
                              <>
                                <XCircle className="w-4 h-4" />
                                Inactive
                              </>
                            )}
                          </button>
                          
                          <button
                            onClick={() => toggleFeatured(tour._id, tour.isFeatured)}
                            className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                              tour.isFeatured
                                ? 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 hover:from-yellow-200 hover:to-orange-200'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            <Star className="w-4 h-4" />
                            {tour.isFeatured ? 'Featured' : 'Make Featured'}
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/tours/${tour.slug}`}
                            target="_blank"
                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            title="View Live"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <Link
                            href={`/dashboard/tours/edit/${tour._id}`}
                            className="p-2 text-blue-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <Link
                            href={`/dashboard/tours/settings/${tour._id}`}
                            className="p-2 text-purple-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                            title="Settings"
                          >
                            <Settings className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => deleteTour(tour._id)}
                            className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                          {/* // In the actions column of your table, add: */}
<Link
  href={`/dashboard/tours/${tour._id}/details`}
  className="p-2 text-green-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
  title="Manage Details"
>
  <ImageIcon className="w-4 h-4" />
</Link>
                        </div>
                        <div className="mt-4">
                          <Link
                            href={`/dashboard/tours/clone/${tour._id}`}
                            className="text-xs text-gray-500 hover:text-gray-700 hover:underline"
                          >
                            Clone this tour
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-6 py-5 border-t border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="text-sm text-gray-700">
                    Showing <span className="font-semibold">{tours.length}</span> tours
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <div className="flex items-center gap-1">
                      {[...Array(totalPages)].map((_, i) => {
                        const pageNum = i + 1;
                        const isCurrent = currentPage === pageNum;
                        const showPage = 
                          pageNum === 1 || 
                          pageNum === totalPages || 
                          Math.abs(currentPage - pageNum) <= 1;
                        
                        if (!showPage && pageNum === 2) return <span key="ellipsis1" className="px-2">...</span>;
                        if (!showPage && pageNum === totalPages - 1) return <span key="ellipsis2" className="px-2">...</span>;
                        
                        if (!showPage) return null;
                        
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`px-3 py-2 rounded-lg transition-colors ${
                              isCurrent
                                ? 'bg-gradient-to-r from-green-500 to-yellow-500 text-white'
                                : 'border border-gray-300 hover:bg-white'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                    </div>
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Quick Actions Footer */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200">
          <h4 className="font-semibold text-gray-900 mb-3">Need Help?</h4>
          <p className="text-sm text-gray-600 mb-4">
            Check our documentation for managing tours effectively.
          </p>
          <Link
            href="/dashboard/help/tours"
            className="text-green-600 hover:text-green-700 text-sm font-medium"
          >
            View Help Guide →
          </Link>
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-200">
          <h4 className="font-semibold text-gray-900 mb-3">Analytics</h4>
          <p className="text-sm text-gray-600 mb-4">
            View detailed analytics for your tours and bookings.
          </p>
          <Link
            href="/dashboard/analytics/tours"
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            View Analytics →
          </Link>
        </div>
        
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-200">
          <h4 className="font-semibold text-gray-900 mb-3">Bulk Actions</h4>
          <p className="text-sm text-gray-600 mb-4">
            Perform bulk operations on multiple tours at once.
          </p>
          <Link
            href="/dashboard/tours/bulk"
            className="text-purple-600 hover:text-purple-700 text-sm font-medium"
          >
            Bulk Actions →
          </Link>
        </div>
      </div>
    </div>
  );
}
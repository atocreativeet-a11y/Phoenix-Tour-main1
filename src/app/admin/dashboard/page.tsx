'use client';

import { useEffect, useState } from 'react';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  MapPin,
  BarChart3,
  Download,
  RefreshCw
} from 'lucide-react';

import RecentBookings from '@/components/admin/RecentBookings';


import DashboardStats from '@/components/admin/DashboardStats';
import RevenueChart from '@/components/admin/RevenueChart';
import PopularTours from '@/components/admin/PopularTours';

interface DashboardData {
  overview: {
    totalBookings: number;
    recentBookings: number;
    totalRevenue: number;
    completedBookings: number;
    activeTours: number;
  };
  monthlyRevenue: Array<{
    _id: { year: number; month: number; day: number };
    revenue: number;
    bookings: number;
  }>;
  popularTours: Array<{
    _id: string;
    bookings: number;
    revenue: number;
  }>;
  statusDistribution: Array<{
    _id: string;
    count: number;
  }>;
  recentBookings: Array<any>;
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/dashboard');
      const result = await response.json();
      
      if (response.ok) {
        setData(result.dashboard);
      } else {
        setError(result.error || 'Failed to load dashboard data');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-green-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-red-800">Error Loading Dashboard</h3>
            <p className="text-red-600 mt-1">{error}</p>
          </div>
          <button
            onClick={fetchDashboardData}
            className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600">
            Welcome back! Here's what's happening with your tours today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium">Export</span>
          </button>
          <button
            onClick={fetchDashboardData}
            className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-xl hover:bg-green-100 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="text-sm font-medium">Refresh</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardStats
          title="Total Bookings"
          value={data?.overview.totalBookings || 0}
          change="+12%"
          icon={<Calendar className="w-6 h-6" />}
          color="blue"
        />
        <DashboardStats
          title="Total Revenue"
          value={`$${data?.overview.totalRevenue.toLocaleString() || '0'}`}
          change="+18%"
          icon={<DollarSign className="w-6 h-6" />}
          color="green"
        />
        <DashboardStats
          title="Active Tours"
          value={data?.overview.activeTours || 0}
          change="+5%"
          icon={<MapPin className="w-6 h-6" />}
          color="yellow"
        />
        <DashboardStats
          title="Completed"
          value={data?.overview.completedBookings || 0}
          change="+8%"
          icon={<TrendingUp className="w-6 h-6" />}
          color="purple"
        />
      </div>

      {/* Charts and Recent Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart data={data?.monthlyRevenue || []} />
        </div>
        <div>
          <PopularTours data={data?.popularTours || []} />
        </div>
      </div>

      {/* Recent Bookings Table */}
      <div>
        <RecentBookings bookings={data?.recentBookings || []} />
      </div>
    </div>
  );
}
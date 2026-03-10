// src/app/(dashboard)/dashboard/page.tsx
import { TrendingUp, Users, MapPin, DollarSign } from 'lucide-react';

export default function DashboardPage() {
  const stats = [
    { label: 'Total Tours', value: '24', change: '+12%', icon: MapPin, color: 'bg-blue-500' },
    { label: 'Active Bookings', value: '156', change: '+8%', icon: Users, color: 'bg-green-500' },
    { label: 'Monthly Revenue', value: '$12,450', change: '+23%', icon: DollarSign, color: 'bg-yellow-500' },
    { label: 'Satisfaction', value: '98%', change: '+2%', icon: TrendingUp, color: 'bg-purple-500' },
  ];

  const recentBookings = [
    { id: 'BK001', customer: 'Defar G...', tour: 'Simien Mountains', date: '2024-03-15', status: 'confirmed' },
    { id: 'BK002', customer: 'Sarah Smith', tour: 'Lalibela Churches', date: '2024-03-14', status: 'pending' },
    { id: 'BK003', customer: 'Mike Chen', tour: 'Danakil Depression', date: '2024-03-13', status: 'confirmed' },
    { id: 'BK004', customer: 'Emma Wilson', tour: 'Omo Valley', date: '2024-03-12', status: 'cancelled' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your tours.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-green-600 text-sm font-medium">{stat.change}</span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-xl shadow">
        <div className="p-6 border-b">
          <h2 className="text-xl font-bold text-gray-900">Recent Bookings</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Booking ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tour</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentBookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{booking.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{booking.customer}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{booking.tour}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{booking.date}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
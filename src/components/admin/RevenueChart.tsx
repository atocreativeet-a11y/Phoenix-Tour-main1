'use client';

import { TrendingUp } from 'lucide-react';
import { useState } from 'react';

interface RevenueChartProps {
  data: Array<{
    _id: { year: number; month: number; day: number };
    revenue: number;
    bookings: number;
  }>;
}

export default function RevenueChart({ data }: RevenueChartProps) {
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'year'>('month');

  // Process data for chart display
  const chartData = data.slice(-7); // Show last 7 days if available

  // Calculate max revenue for scaling
  const maxRevenue = Math.max(...chartData.map(d => d.revenue), 1);
  
  // Format date for display
  const formatDate = (item: any) => {
    if (!item?._id) return '';
    const { year, month, day } = item._id;
    return `${month}/${day}`;
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Revenue Overview</h3>
          <p className="text-sm text-gray-600">Monthly revenue from completed bookings</p>
        </div>
        <div className="flex items-center gap-2">
          {(['week', 'month', 'year'] as const).map((period) => (
            <button
              key={period}
              onClick={() => setTimeframe(period)}
              className={`px-3 py-1 text-sm font-medium rounded-lg capitalize ${
                timeframe === period
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="space-y-4">
        {chartData.length > 0 ? (
          <>
            {/* Bars */}
            <div className="flex items-end justify-between h-64 pt-8">
              {chartData.map((item, index) => {
                const height = (item.revenue / maxRevenue) * 100;
                return (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div className="relative w-full">
                      <div
                        className="w-10 mx-auto bg-gradient-to-t from-green-500 to-green-300 rounded-t-lg transition-all duration-300 hover:opacity-80"
                        style={{ height: `${height}%` }}
                      >
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs font-medium text-gray-700">
                          ${item.revenue.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      {formatDate(item)}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600">Revenue</span>
              </div>
              <div className="flex items-center gap-2 text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">+18% from last month</span>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <TrendingUp className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500">No revenue data available</p>
            <p className="text-sm text-gray-400 mt-1">Complete bookings will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}
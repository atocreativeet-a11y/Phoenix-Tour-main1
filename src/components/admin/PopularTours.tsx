'use client';

import { MapPin, Users, DollarSign } from 'lucide-react';

interface PopularToursProps {
  data: Array<{
    _id: string;
    bookings: number;
    revenue: number;
  }>;
}

export default function PopularTours({ data }: PopularToursProps) {
  // Sort by bookings if data exists
  const sortedData = [...data].sort((a, b) => b.bookings - a.bookings).slice(0, 5);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Popular Tours</h3>
          <p className="text-sm text-gray-600">Most booked tours</p>
        </div>
        <div className="text-xs font-medium px-3 py-1 bg-green-100 text-green-700 rounded-full">
          Top 5
        </div>
      </div>

      <div className="space-y-4">
        {sortedData.length > 0 ? (
          sortedData.map((tour, index) => (
            <div
              key={tour._id}
              className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-100 to-orange-100 text-yellow-700 font-bold">
                  {index + 1}
                </div>
                <div>
                  <div className="font-medium text-gray-900 line-clamp-1">
                    {tour._id}
                  </div>
                  <div className="flex items-center gap-4 mt-1">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Users className="w-3 h-3" />
                      <span>{tour.bookings} bookings</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <DollarSign className="w-3 h-3" />
                      <span>${tour.revenue.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
              <MapPin className="w-5 h-5 text-gray-400" />
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
              <MapPin className="w-6 h-6 text-gray-400" />
            </div>
            <p className="text-gray-500">No tour data available</p>
            <p className="text-sm text-gray-400 mt-1">Bookings will appear here</p>
          </div>
        )}
      </div>

      {/* Summary */}
      {sortedData.length > 0 && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-xl p-3">
              <div className="text-xs text-blue-600 font-medium mb-1">Total Bookings</div>
              <div className="text-xl font-bold text-gray-900">
                {sortedData.reduce((sum, tour) => sum + tour.bookings, 0)}
              </div>
            </div>
            <div className="bg-green-50 rounded-xl p-3">
              <div className="text-xs text-green-600 font-medium mb-1">Total Revenue</div>
              <div className="text-xl font-bold text-gray-900">
                ${sortedData.reduce((sum, tour) => sum + tour.revenue, 0).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
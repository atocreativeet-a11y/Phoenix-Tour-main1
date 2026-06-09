'use client';

import { useState, useEffect } from 'react';

export const dynamic = 'force-dynamic';

function BookingsManagementContent() {
  // Add any hooks (useRouter, useSession, etc.) here
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Bookings Management</h1>
      <div className="bg-white rounded-xl shadow p-6">
        <p className="text-gray-600">Manage all bookings here</p>
      </div>
    </div>
  );
}

export default function BookingsManagementPage() {
  return <BookingsManagementContent />;
}
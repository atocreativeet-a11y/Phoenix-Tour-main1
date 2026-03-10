// lib/api.js
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const api = {
  // Destinations
  getDestinations: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE_URL}/destinations?${queryString}`);
    return response.json();
  },
  
  getDestinationBySlug: async (slug: any) => {
    const response = await fetch(`${API_BASE_URL}/destinations/${slug}`);
    return response.json();
  },
  
  getRegionStats: async () => {
    const response = await fetch(`${API_BASE_URL}/destinations/regions/stats`);
    return response.json();
  },
   createDestination: async (formData: any) => {
    const token = localStorage.getItem('token'); // Assuming you have auth
    const response = await fetch(`${API_BASE_URL}/destinations`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });
    return response.json();
  },
  
  // Update destination with FormData
  updateDestination: async (id: any, formData: any) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/destinations/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });
    return response.json();
  },
  
  // Delete destination
  deleteDestination: async (id: any) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/destinations/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.json();
  }
};
// Add this near the top of your component file or in a separate config file
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '', // Use environment variable or empty for relative
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// // Then use 'api' instead of 'axios' in your onSubmit function
// const response = await api.post('/api/send-email', {
//   ...data,
//   tourName: tour?.name || 'Selected Tour',
//   tourId: tour?.id,
// });
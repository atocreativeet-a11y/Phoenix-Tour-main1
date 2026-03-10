// src/lib/actions/tour.actions.ts
import connectDB from '@/lib/mongodb';
import Tour from '@/lib/models/Tour';

export async function getTourBySlug(slug: string) {
  try {
    await connectDB();
    const tour = await Tour.findOne({ slug }).lean();
    return tour ? JSON.parse(JSON.stringify(tour)) : null;
  } catch (error) {
    console.error('Error fetching tour:', error);
    return null;
  }
}

export async function getTourById(id: string) {
  try {
    await connectDB();
    const tour = await Tour.findById(id).lean();
    return tour ? JSON.parse(JSON.stringify(tour)) : null;
  } catch (error) {
    console.error('Error fetching tour by ID:', error);
    return null;
  }
}

export async function getAllTours() {
  try {
    await connectDB();
    const tours = await Tour.find({ published: true }).lean();
    return JSON.parse(JSON.stringify(tours));
  } catch (error) {
    console.error('Error fetching tours:', error);
    return [];
  }
}

export async function getFeaturedTours() {
  try {
    await connectDB();
    const tours = await Tour.find({ 
      published: true,
      featured: true 
    }).limit(6).lean();
    return JSON.parse(JSON.stringify(tours));
  } catch (error) {
    console.error('Error fetching featured tours:', error);
    return [];
  }
}

export async function searchTours(query: {
  category?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  difficulty?: string;
  duration?: number;
}) {
  try {
    await connectDB();
    
    const filter: any = { published: true };
    
    if (query.category) filter.category = query.category;
    if (query.location) filter.locations = { $in: [query.location] };
    if (query.difficulty) filter.difficulty = query.difficulty;
    
    if (query.minPrice || query.maxPrice) {
      filter.price = {};
      if (query.minPrice) filter.price.$gte = query.minPrice;
      if (query.maxPrice) filter.price.$lte = query.maxPrice;
    }
    
    if (query.duration) {
      filter.duration = { $lte: query.duration };
    }
    
    const tours = await Tour.find(filter).lean();
    return JSON.parse(JSON.stringify(tours));
  } catch (error) {
    console.error('Error searching tours:', error);
    return [];
  }
}
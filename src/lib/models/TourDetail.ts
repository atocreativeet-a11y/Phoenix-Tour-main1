import mongoose, { Schema, Document } from 'mongoose';

export interface ITourDetail extends Document {
  tourId: mongoose.Types.ObjectId;
  images: {
    url: string;
    caption?: string;
    isMain: boolean;
    order: number;
  }[];
  highlights: string[];
  fullDescription: string;
  itinerary: {
    day: number;
    title: string;
    description: string;
    accommodation: string;
    meals: string[];
    activities: string[];
  }[];
  inclusions: {
    category: string;
    items: string[];
  }[];
  exclusions: {
    category: string;
    items: string[];
  }[];
  practicalInfo: {
    title: string;
    content: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  videoUrl?: string;
  mapEmbedUrl?: string;
  gallery: {
    title: string;
    images: string[];
  }[];
  reviews: {
    userId: mongoose.Types.ObjectId;
    rating: number;
    comment: string;
    name: string;
    date: Date;
    helpful: number;
  }[];
  averageRating: number;
  reviewCount: number;
  lastUpdated: Date;
}

const tourDetailSchema = new Schema<ITourDetail>(
  {
    tourId: {
      type: Schema.Types.ObjectId,
      ref: 'Tour',
      required: true,
      unique: true
    },
    images: [{
      url: { type: String, default: '' },
      caption: { type: String, default: '' },
      isMain: { type: Boolean, default: false },
      order: { type: Number, default: 0 }
    }],
    highlights: [{ 
      type: String, 
      default: [] 
    }],
    fullDescription: { 
      type: String, 
      required: false, // Make it not required initially
      default: '' 
    },
    itinerary: [{
      day: { type: Number, default: 1 },
      title: { type: String, default: '' },
      description: { type: String, default: '' },
      accommodation: { type: String, default: '' },
      meals: [{ type: String, default: [] }],
      activities: [{ type: String, default: [] }]
    }],
    inclusions: [{
      category: { type: String, default: 'Included' },
      items: [{ type: String, default: [] }]
    }],
    exclusions: [{
      category: { type: String, default: 'Not Included' },
      items: [{ type: String, default: [] }]
    }],
    practicalInfo: [{
      title: { type: String, default: '' },
      content: { type: String, default: '' }
    }],
    faqs: [{
      question: { type: String, default: '' },
      answer: { type: String, default: '' }
    }],
    videoUrl: { 
      type: String, 
      default: '' 
    },
    mapEmbedUrl: { 
      type: String, 
      default: '' 
    },
    gallery: [{
      title: { type: String, default: '' },
      images: [{ type: String, default: [] }]
    }],
    reviews: [{
      userId: { type: Schema.Types.ObjectId, ref: 'User' },
      rating: { type: Number, min: 1, max: 5, default: 5 },
      comment: { type: String, default: '' },
      name: { type: String, default: '' },
      date: { type: Date, default: Date.now },
      helpful: { type: Number, default: 0 }
    }],
    averageRating: { 
      type: Number, 
      default: 0 
    },

    
    reviewCount: { 
      type: Number, 
      default: 0 
    },
    lastUpdated: { 
      type: Date, 
      default: Date.now 
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Update average rating when reviews change - FIXED VERSION
tourDetailSchema.pre('save' as any, function(this: ITourDetail, next: (err?: any) => void) {
  try {
    // Ensure reviews array exists before processing
    if (this.reviews && Array.isArray(this.reviews) && this.reviews.length > 0) {
      const totalRating = this.reviews.reduce((acc, review) => {
        // Ensure review has a rating property
        if (review && typeof review.rating === 'number') {
          return acc + review.rating;
        }
        return acc;
      }, 0);
      
      this.averageRating = totalRating / this.reviews.length;
      this.reviewCount = this.reviews.length;
    } else {
      // If no reviews, set defaults
      this.averageRating = 0;
      this.reviewCount = 0;
    }
    
    this.lastUpdated = new Date();
    next(); // Call next here
  } catch (error) {
    console.error('Error in tourDetailSchema pre-save hook:', error);
    next(error); // Pass error to next
  }
});

// Alternative: Use async/await style if you need async operations


// Add indexes for better performance
tourDetailSchema.index({ tourId: 1 }, { unique: true });
tourDetailSchema.index({ lastUpdated: -1 });

// Create or get the model
const TourDetailModel = mongoose.models.TourDetail || mongoose.model<ITourDetail>('TourDetail', tourDetailSchema);

export default TourDetailModel;
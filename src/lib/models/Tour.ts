import mongoose from 'mongoose';

// Define an interface for TypeScript
export interface ITour extends mongoose.Document {
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  duration: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  price: number;
  rating: number;
  region: string;
  category: string;
  tags: string[];
  highlight: string;
  image: string;
  images: string[];
  iconName: string;
  isActive: boolean;
  isFeatured: boolean;
  maxParticipants: number;
  minParticipants: number;
  availableDates: Date[];
  included: string[];
  excluded: string[];
  itinerary: Array<{
    day: number;
    title: string;
    description: string;
    activities: string[];
    accommodation?: string;
    meals: string[];
  }>;
  country: string;
  createdAt: Date;
  updatedAt: Date;
}

const TourSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Tour title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  shortDescription: {
    type: String,
    maxlength: [200, 'Short description cannot exceed 200 characters']
  },
  duration: {
    type: String,
    required: [true, 'Duration is required']
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Moderate', 'Challenging'],
    default: 'Moderate'
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  discountPrice: {
    type: Number,
    min: [0, 'Discount price cannot be negative']
  },
  rating: {
    type: Number,
    default: 4.5,
    min: [0, 'Rating cannot be less than 0'],
    max: [5, 'Rating cannot exceed 5']
  },
  region: {
    type: String,
    required: [true, 'Region is required'],
    enum: [
      'Northern Ethiopia',
      'Southern Ethiopia',
      'Eastern Ethiopia',
      'Western Ethiopia',
      'Central Ethiopia',
      'Southeastern Ethiopia'
    ]
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'Mountain Trekking',
      'Cultural Heritage',
      'Adventure',
      'Wildlife',
      'Historical',
      'Spiritual',
      'Photography',
      'Luxury'
    ]
  },
  tags: [{
    type: String,
    trim: true
  }],
  highlight: {
    type: String,
    maxlength: [150, 'Highlight cannot exceed 150 characters']
  },
  image: {
    type: String,
    required: [true, 'Main image is required'],
    validate: {
      validator: function(v: string) {
        return /^(https?:\/\/|data:image)/.test(v);
      },
      message: 'Image must be a valid URL'
    }
  },
  images: [{
    type: String,
    validate: {
      validator: function(v: string) {
        return /^(https?:\/\/|data:image)/.test(v);
      },
      message: 'Image must be a valid URL'
    }
  }],
  iconName: {
    type: String,
    required: [true, 'Icon name is required'],
    enum: [
      'Mountain', 'Castle', 'Sun', 'Compass', 'Trees', 'Church',
      'Camera', 'Utensils', 'Bed', 'Map', 'Flag', 'Users', 'Star'
    ]
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  maxParticipants: {
    type: Number,
    default: 12,
    min: [1, 'Maximum participants must be at least 1']
  },
  minParticipants: {
    type: Number,
    default: 2,
    min: [1, 'Minimum participants must be at least 1']
  },
  availableDates: [{
    type: Date,
    validate: {
      validator: function(v: Date) {
        return v > new Date();
      },
      message: 'Available date must be in the future'
    }
  }],
  included: [{
    type: String,
    trim: true
  }],
  excluded: [{
    type: String,
    trim: true
  }],
  itinerary: [{
    day: {
      type: Number,
      required: true,
      min: [1, 'Day must be at least 1']
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    activities: [{
      type: String
    }],
    accommodation: String,
    meals: [{
      type: String,
      enum: ['Breakfast', 'Lunch', 'Dinner', 'Snacks']
    }]
  }],
  country: {
    type: String,
    default: 'Ethiopia'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for discount percentage
TourSchema.virtual('discountPercentage').get(function() {
  if (this.discountPrice && this.price) {
    return Math.round((1 - this.discountPrice / this.price) * 100);
  }
  return 0;
});

// Virtual for price per day
TourSchema.virtual('pricePerDay').get(function() {
  const daysMatch = this.duration?.match(/(\d+)/);
  if (daysMatch && this.price) {
    const days = parseInt(daysMatch[1]);
    return Math.round(this.price / days);
  }
  return this.price;
});

// Pre-save middleware to generate slug if not provided
(TourSchema as any).pre('save', function(this: ITour, next: (err?: any) => void) {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-');
  }
  
  if (this.isModified('title') || this.isModified('slug')) {
    // Ensure slug is unique
    const Tour = mongoose.model('Tour');
    const originalSlug = this.slug;
    let counter = 1;
    
    const checkSlug = async () => {
      let slug = originalSlug;
      if (counter > 1) {
        slug = `${originalSlug}-${counter}`;
      }
      
      const existingTour = await Tour.findOne({ slug, _id: { $ne: this._id } });
      if (!existingTour) {
        this.slug = slug;
        next();
      } else {
        counter++;
        checkSlug();
      }
    };
    
    checkSlug();
  } else {
    next();
  }
});

// Indexes for better performance
TourSchema.index({ slug: 1 });
TourSchema.index({ category: 1 });
TourSchema.index({ region: 1 });
TourSchema.index({ difficulty: 1 });
TourSchema.index({ price: 1 });
TourSchema.index({ rating: -1 });
TourSchema.index({ isActive: 1, isFeatured: 1 });

export default mongoose.models.Tour || mongoose.model<ITour>('Tour', TourSchema);
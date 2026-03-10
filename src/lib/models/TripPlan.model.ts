// lib/models/TripPlan.model.ts
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITripPlan extends Document {
  // Contact Information
  name: string;
  email: string;
  phone: string;
  country: string;
  
  // Budget Section
  budget: number;
  budgetRange: 'budget' | 'mid-range' | 'luxury' | 'custom';
  budgetBreakdown?: {
    accommodation: number;
    transportation: number;
    activities: number;
    food: number;
    other: number;
  };
  
  // Travel Dates
  travelMonths: string[];
  travelYear?: number;
  flexibleDates: boolean;
  
  // Interests & Preferences
  interests: string[];
  travelStyle: 'solo' | 'couple' | 'family' | 'friends' | 'group' | 'corporate';
  pace: 'relaxed' | 'moderate' | 'fast-paced' | 'custom';
  
  // Trip Details
  duration: number;
  travelersCount: {
    adults: number;
    children: number;
    infants?: number;
  };
  
  // Destination Preferences
  preferredDestinations: string[];
  avoidDestinations?: string[];
  mustSeeAttractions?: string[];
  
  // Accommodation Preferences
  accommodationType: 'hotel' | 'lodge' | 'guesthouse' | 'camping' | 'luxury' | 'any';
  accommodationRating: number; // 1-5
  
  // Transportation Preferences
  transportation: 'private' | 'shared' | 'public' | 'mixed';
  
  // Special Requirements
  specialRequirements?: string;
  dietaryRestrictions?: string[];
  mobilityRequirements?: string[];
  
  // Tour Recommendations
  recommendedTours?: Array<{
    tourId: mongoose.Types.ObjectId;
    title: string;
    price: number;
    duration: string;
    matchScore: number;
    reason: string;
  }>;
  
  // Status & Processing
  status: 'new' | 'in-progress' | 'quoted' | 'booked' | 'archived';
  assignedTo?: mongoose.Types.ObjectId;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  
  // Communication
  followUpDate?: Date;
  notes?: string[];
  
  // Analytics
  source: 'website' | 'social-media' | 'referral' | 'email' | 'other';
  campaign?: string;
  landingPage?: string;
  
  // Metadata
  ipAddress?: string;
  userAgent?: string;
  referrer?: string;
  
  createdAt: Date;
  updatedAt: Date;
}

const TripPlanSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone is required'],
    trim: true
  },
  country: {
    type: String,
    required: [true, 'Country is required'],
    trim: true
  },
  
  // Budget
  budget: {
    type: Number,
    required: [true, 'Budget is required'],
    min: [100, 'Minimum budget is $100'],
    max: [50000, 'Maximum budget is $50,000']
  },
  budgetRange: {
    type: String,
    enum: ['budget', 'mid-range', 'luxury', 'custom'],
    default: 'mid-range'
  },
  budgetBreakdown: {
    accommodation: { type: Number, default: 40 },
    transportation: { type: Number, default: 30 },
    activities: { type: Number, default: 20 },
    food: { type: Number, default: 10 },
    other: { type: Number, default: 0 }
  },
  
  // Travel Dates
  travelMonths: [{
    type: String,
    enum: ['January', 'February', 'March', 'April', 'May', 'June', 
           'July', 'August', 'September', 'October', 'November', 'December']
  }],
  travelYear: {
    type: Number,
    default: new Date().getFullYear() + 1
  },
  flexibleDates: {
    type: Boolean,
    default: false
  },
  
  // Interests
  interests: [{
    type: String,
    enum: ['history-culture', 'nature-wildlife', 'adventure-sports', 'photography',
           'food-culinary', 'spiritual-religious', 'festivals-events', 'beach-relaxation',
           'family-friendly', 'luxury-travel', 'off-beat', 'volunteering', 'wildlife-safari',
           'mountain-trekking', 'cultural-immersion', 'archaeology', 'bird-watching']
  }],
  travelStyle: {
    type: String,
    enum: ['solo', 'couple', 'family', 'friends', 'group', 'corporate'],
    required: true,
    default: 'couple'
  },
  pace: {
    type: String,
    enum: ['relaxed', 'moderate', 'fast-paced', 'custom'],
    default: 'moderate'
  },
  
  // Trip Details
  duration: {
    type: Number,
    required: [true, 'Duration is required'],
    min: [1, 'Minimum duration is 1 day'],
    max: [90, 'Maximum duration is 90 days'],
    default: 7
  },
  travelersCount: {
    adults: {
      type: Number,
      required: true,
      min: 1,
      default: 2
    },
    children: {
      type: Number,
      default: 0,
      min: 0
    },
    infants: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  
  // Destinations
  preferredDestinations: [{
    type: String,
    enum: ['addis-ababa', 'northern-circuit', 'southern-circuit', 'eastern-harar', 
           'western-gambella', 'simien-mountains', 'omo-valley', 'danakil-depression',
           'lalibela', 'gondar', 'axum', 'bale-mountains', 'rift-valley', 'lake-tana',
           'afar-region', 'tigray', 'gambella', 'dire-dawa', 'harar']
  }],
  avoidDestinations: [{
    type: String
  }],
  mustSeeAttractions: [{
    type: String
  }],
  
  // Accommodation
  accommodationType: {
    type: String,
    enum: ['hotel', 'lodge', 'guesthouse', 'camping', 'luxury', 'any'],
    default: 'hotel'
  },
  accommodationRating: {
    type: Number,
    min: 1,
    max: 5,
    default: 3
  },
  
  // Transportation
  transportation: {
    type: String,
    enum: ['private', 'shared', 'public', 'mixed'],
    default: 'private'
  },
  
  // Special Requirements
  specialRequirements: {
    type: String,
    trim: true,
    maxlength: [500, 'Special requirements cannot exceed 500 characters']
  },
  dietaryRestrictions: [{
    type: String
  }],
  mobilityRequirements: [{
    type: String
  }],
  
  // Recommendations
  recommendedTours: [{
    tourId: {
      type: Schema.Types.ObjectId,
      ref: 'Tour'
    },
    title: String,
    price: Number,
    duration: String,
    matchScore: Number,
    reason: String
  }],
  
  // Status
  status: {
    type: String,
    enum: ['new', 'in-progress', 'quoted', 'booked', 'archived'],
    default: 'new'
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  
  // Communication
  followUpDate: {
    type: Date
  },
  notes: [{
    note: String,
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Analytics
  source: {
    type: String,
    enum: ['website', 'social-media', 'referral', 'email', 'other'],
    default: 'website'
  },
  campaign: String,
  landingPage: String,
  
  // Metadata
  ipAddress: String,
  userAgent: String,
  referrer: String,
  
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

// Indexes for better query performance
TripPlanSchema.index({ email: 1 });
TripPlanSchema.index({ status: 1 });
TripPlanSchema.index({ createdAt: -1 });
TripPlanSchema.index({ budget: 1 });
TripPlanSchema.index({ 'travelMonths': 1 });
TripPlanSchema.index({ priority: 1 });
TripPlanSchema.index({ assignedTo: 1 });

// Virtual for total travelers
TripPlanSchema.virtual('totalTravelers').get(function(this: ITripPlan) {
  return this.travelersCount.adults + this.travelersCount.children + (this.travelersCount.infants || 0);
});

// Virtual for per person budget
TripPlanSchema.virtual('budgetPerPerson').get(function(this: ITripPlan) {
  const totalTravelers = this.travelersCount.adults + this.travelersCount.children;
  return totalTravelers > 0 ? Math.round(this.budget / totalTravelers) : this.budget;
});

// Pre-save middleware
// TripPlanSchema.pre('save', function(next) {
//   // Auto-calculate budget range based on budget
//   if (this.budget < 1000) {
//     this.budgetRange = 'budget';
//   } else if (this.budget < 5000) {
//     this.budgetRange = 'mid-range';
//   } else {
//     this.budgetRange = 'luxury';
//   }
  
//   // Set priority based on budget and timeline
//   if (this.budget > 10000 || this.duration > 21) {
//     this.priority = 'high';
//   }
  
//   next();
// });

const TripPlan: Model<ITripPlan> = mongoose.models.TripPlan || mongoose.model<ITripPlan>('TripPlan', TripPlanSchema);

export default TripPlan;
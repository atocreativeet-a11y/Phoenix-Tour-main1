// src/models/Destination.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IDestination extends Document {
  title: string;
  slug: string;
  region: string;
  description: string;
  shortDescription: string;
  mainImage: string;
  images: string[];
  iconName: string;
  features: string[];
  bestFor: string[];
  tourCount: number;
  highlights: string[];
  quickFacts: Array<{
    label: string;
    value: string;
    icon: string;
  }>;
  rating: number;
  duration: string;
  isActive: boolean;
  isFeatured: boolean;
  
  // Additional details for destination page
  attractions?: Array<{
    title: string;
    description: string;
    image: string;
    duration: string;
    type: string;
  }>;
  climate?: string;
  gettingThere?: string;
  accommodation?: string;
  tips?: string[];
  
  // SEO
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  
  // System fields
  createdAt: Date;
  updatedAt: Date;
  createdBy?: mongoose.Types.ObjectId;
  updatedBy?: mongoose.Types.ObjectId;
}

const QuickFactSchema = new Schema({
  label: { type: String, required: true },
  value: { type: String, required: true },
  icon: { type: String, required: true },
}, { _id: false });

const AttractionSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  duration: { type: String, required: true },
  type: { type: String, required: true },
}, { _id: false });

const DestinationSchema = new Schema({
  title: { 
    type: String, 
    required: true, 
    trim: true,
    index: true 
  },
  slug: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true,
    index: true 
  },
  region: { 
    type: String, 
    required: true,
    enum: ['Capital Region', 'Historical Route', 'Cultural Heartland', 'Islamic Heritage', 'Wild Frontier', 'Other'],
    index: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  shortDescription: { 
    type: String, 
    required: true,
    maxlength: 150 
  },
  mainImage: { 
    type: String, 
    required: true 
  },
  images: [{ 
    type: String 
  }],
  iconName: { 
    type: String, 
    required: true,
    default: 'Building' 
  },
  features: [{ 
    type: String 
  }],
  bestFor: [{ 
    type: String 
  }],
  tourCount: { 
    type: Number, 
    default: 0,
    min: 0 
  },
  highlights: [{ 
    type: String 
  }],
  quickFacts: [QuickFactSchema],
  rating: { 
    type: Number, 
    default: 4.5,
    min: 0,
    max: 5 
  },
  duration: { 
    type: String 
  },
  isActive: { 
    type: Boolean, 
    default: true,
    index: true 
  },
  isFeatured: { 
    type: Boolean, 
    default: false,
    index: true 
  },
  
  // Additional details
  attractions: [AttractionSchema],
  climate: { type: String },
  gettingThere: { type: String },
  accommodation: { type: String },
  tips: [{ type: String }],
  
  // SEO
  metaTitle: { type: String },
  metaDescription: { type: String },
  keywords: [{ type: String }],
  
  // System fields
  createdBy: { 
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  },
  updatedBy: { 
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
DestinationSchema.index({ title: 'text', description: 'text', region: 'text' });
DestinationSchema.index({ isFeatured: 1, isActive: 1 });
DestinationSchema.index({ rating: -1 });
DestinationSchema.index({ tourCount: -1 });

export default mongoose.models.Destination || mongoose.model<IDestination>('Destination', DestinationSchema);
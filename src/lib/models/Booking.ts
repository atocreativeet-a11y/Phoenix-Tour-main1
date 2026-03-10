import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  // Customer Information
  customerName: {
    type: String,
    required: [true, 'Customer name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required']
  },
  nationality: {
    type: String,
    required: [true, 'Nationality is required']
  },
  passportNumber: {
    type: String,
    required: false
  },
  
  // Tour Information
  tourId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tour',
    required: false
  },
  tourName: {
    type: String,
    required: [true, 'Tour name is required']
  },
  tourDate: {
    type: Date,
    required: [true, 'Tour date is required']
  },
  duration: {
    type: String,
    required: [true, 'Tour duration is required']
  },
  groupSize: {
    type: Number,
    required: [true, 'Group size is required'],
    min: 1
  },
  
  // Participants Information
  participants: [{
    name: String,
    age: Number,
    gender: String,
    specialRequirements: String
  }],
  
  // Accommodation Preferences
  accommodationType: {
    type: String,
    enum: ['standard', 'comfort', 'luxury', 'camping'],
    default: 'standard'
  },
  
  // Special Requirements
  dietaryRequirements: [String],
  medicalConditions: String,
  specialRequests: String,
  
  // Payment Information
  totalAmount: {
    type: Number,
    required: [true, 'Total amount is required']
  },
  currency: {
    type: String,
    default: 'USD'
  },
  depositPaid: {
    type: Boolean,
    default: false
  },
  paymentMethod: {
    type: String,
    enum: ['credit_card', 'bank_transfer', 'paypal', 'on_arrival'],
    default: 'credit_card'
  },
  
  // Booking Status
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  
  // Metadata
  bookingNumber: {
    type: String,
    unique: true
  },
  bookingSource: {
    type: String,
    enum: ['website', 'whatsapp', 'email', 'phone', 'agent'],
    default: 'website'
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// // Generate booking number before saving
// BookingSchema.pre('save', function(next) {
//   if (!this.bookingNumber) {
//     const year = new Date().getFullYear();
//     const random = Math.floor(10000 + Math.random() * 90000);
//     this.bookingNumber = `ETH-${year}-${random}`;
//   }
  
//   // Update timestamp
//   this.updatedAt = new Date();
  
//   next();
// });

// Alternative: Async version without next parameter
BookingSchema.pre('save', async function() {
  if (!this.bookingNumber) {
    const year = new Date().getFullYear();
    const random = Math.floor(10000 + Math.random() * 90000);
    this.bookingNumber = `ETH-${year}-${random}`;
  }
  
  this.updatedAt = new Date();
});

// Add index for better query performance
BookingSchema.index({ email: 1, createdAt: -1 });
BookingSchema.index({ bookingNumber: 1 });
BookingSchema.index({ status: 1 });

// Add a method to get formatted booking details
BookingSchema.methods.getFormattedDetails = function() {
  return {
    bookingNumber: this.bookingNumber,
    customerName: this.customerName,
    tourName: this.tourName,
    tourDate: this.tourDate?.toLocaleDateString?.() || this.tourDate,
    groupSize: this.groupSize,
    totalAmount: this.totalAmount,
    currency: this.currency,
    status: this.status
  };
};

// Type definitions
interface IBooking extends mongoose.Document {
  customerName: string;
  email: string;
  phone: string;
  nationality: string;
  passportNumber?: string;
  tourId?: mongoose.Types.ObjectId;
  tourName: string;
  tourDate: Date;
  duration: string;
  groupSize: number;
  participants: Array<{
    name: string;
    age: number;
    gender: string;
    specialRequirements?: string;
  }>;
  accommodationType: 'standard' | 'comfort' | 'luxury' | 'camping';
  dietaryRequirements: string[];
  medicalConditions?: string;
  specialRequests?: string;
  totalAmount: number;
  currency: string;
  depositPaid: boolean;
  paymentMethod: 'credit_card' | 'bank_transfer' | 'paypal' | 'on_arrival';
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  bookingNumber: string;
  bookingSource: 'website' | 'whatsapp' | 'email' | 'phone' | 'agent';
  createdAt: Date;
  updatedAt: Date;
  getFormattedDetails: () => any;
}

// Check if model exists and export
const Booking = mongoose.models.Booking as mongoose.Model<IBooking> || 
  mongoose.model<IBooking>('Booking', BookingSchema);

export default Booking;
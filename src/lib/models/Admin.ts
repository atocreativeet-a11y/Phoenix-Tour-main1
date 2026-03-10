// src/lib/models/Admin.ts - Clean Modern Version
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6
  },
  role: {
    type: String,
    enum: ['admin', 'super_admin', 'agent'],
    default: 'admin'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date
  },
  permissions: [{
    type: String,
    enum: [
      'view_bookings',
      'edit_bookings',
      'delete_bookings',
      'view_tours',
      'edit_tours',
      'delete_tours',
      'view_users',
      'edit_users',
      'view_reports',
      'manage_settings'
    ]
  }]
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function(doc, ret) {
      // Remove sensitive fields using object destructuring
      const { password, __v, ...rest } = ret as Record<string, any>;
      return rest;
    }
  },
  toObject: {
    virtuals: true,
    transform: function(doc, ret) {
      // Remove sensitive fields using object destructuring
      const { password, __v, ...rest } = ret as Record<string, any>;
      return rest;
    }
  }
});

// Indexes
AdminSchema.index({ role: 1 });
AdminSchema.index({ isActive: 1 });

// Hash password before saving - Modern approach
AdminSchema.pre('save', async function() {
  if (!this.isModified('password')) {
    return;
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error: any) {
    throw error;
  }
});

// Method to compare password
AdminSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    console.error('Password comparison error:', error);
    return false;
  }
};

// Create and export model
const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

export default Admin;
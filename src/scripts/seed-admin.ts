// scripts/seed-admin.ts
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

async function seedAdmin() {
  try {
    // Connect to MongoDB
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ethiopia-tours';
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Define Admin schema if not exists
    const AdminSchema = new mongoose.Schema({
      name: String,
      email: { type: String, unique: true },
      password: String,
      role: String,
      isActive: Boolean,
      permissions: [String],
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now }
    });

    const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'admin@phoenixtourethiopia.et' });
    
    if (existingAdmin) {
      console.log('⚠️ Admin user already exists');
      await mongoose.disconnect();
      return;
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const admin = new Admin({
      name: 'System Administrator',
      email: 'admin@phoenixtourethiopia.et',
      password: hashedPassword,
      role: 'super_admin',
      isActive: true,
      permissions: [
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
    });

    await admin.save();
    console.log('✅ Admin user created successfully');
    console.log('📧 Email: admin@phoenixtourethiopia.et');
    console.log('🔑 Password: admin123');
    console.log('⚠️ Please change the password after first login!');

    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');

  } catch (error) {
    console.error('❌ Error seeding admin:', error);
    process.exit(1);
  }
}

seedAdmin();
console.log('Script started');
import mongoose from 'mongoose';
console.log('Mongoose imported');
import dotenv from 'dotenv';
console.log('Dotenv imported');
import User from './models/User.js';
console.log('User model imported');

// Load environment variables
dotenv.config({ path: './config.env' });
console.log('Environment variables loaded');

const setupAdmin = async () => {
  try {
    console.log('Connecting to MongoDB...');
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ role: 'admin' });
    console.log('Checked for existing admin');
    
    if (existingAdmin) {
      console.log('Admin user already exists:', existingAdmin.username);
      process.exit(0);
    }

    // Create admin user
    const adminUser = new User({
      username: process.env.ADMIN_USERNAME || 'admin',
      password: process.env.ADMIN_PASSWORD || 'admin123',
      role: 'admin'
    });
    console.log('Admin user object created');

    await adminUser.save();
    console.log('Admin user created successfully!');
    console.log('Username:', adminUser.username);
    console.log('Password:', process.env.ADMIN_PASSWORD || 'admin123');
    console.log('\nYou can now login to the admin panel at /admin');

  } catch (error) {
    console.error('Error setting up admin:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

setupAdmin(); 
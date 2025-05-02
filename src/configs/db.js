import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  // Nuclear-proof connection settings
  const options = {
    serverSelectionTimeoutMS: 50000,
    socketTimeoutMS: 50000,
    connectTimeoutMS: 50000,
    family: 4, // Force IPv4
    maxPoolSize: 1, // Reduce connection attempts
    retryWrites: true,
    w: 'majority'
  };

  console.log('🚀 Attempting MongoDB connection...');

  try {
    await mongoose.connect(uri, options);
    console.log('🎉 SUCCESS! MongoDB Connected');
    
    // Verify connection
    const db = mongoose.connection.db;
    await db.command({ ping: 1 });
    console.log('💡 Database ping successful');
  } catch (error) {
    console.error('💥 CRITICAL FAILURE:', error.message);
    console.log('\n🔥 REQUIRED ACTIONS:');
    console.log('1. GO TO: https://cloud.mongodb.com → Network Access → Add 0.0.0.0/0');
    console.log('2. RESTART your computer AND router');
    console.log('3. TRY with mobile hotspot');
    console.log('4. CONTACT MongoDB Support if still failing');
    process.exit(1);
  }
};

export default connectDB;
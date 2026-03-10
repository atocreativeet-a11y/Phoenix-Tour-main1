import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  console.log('⚠️  MONGODB_URI not set - running without database');
  // Don't throw error, just return
  throw new Error('Please define MONGODB_URI environment variable');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
  isConnected: boolean;
  connectionAttempts: number;
}

// Extend global type
declare global {
  var mongoose: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongoose || { 
  conn: null, 
  promise: null,
  isConnected: false,
  connectionAttempts: 0
};

if (!global.mongoose) {
  global.mongoose = cached;
}

async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn && cached.isConnected) {
    console.log('✅ Using existing MongoDB connection');
    return cached.conn;
  }

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      serverSelectionTimeoutMS: 15000,    // Reduced from 30000
      socketTimeoutMS: 20000,             // Reduced from 45000
      connectTimeoutMS: 10000,            // Added
      maxPoolSize: 10,
      minPoolSize: 2,
      maxIdleTimeMS: 10000,
      waitQueueTimeoutMS: 5000,
      retryWrites: true,
      retryReads: true,
      w: 'majority',
      // Remove family: 4 - let MongoDB driver decide
      bufferCommands: false,
    };

    console.log('🔗 Connecting to MongoDB Atlas...');

    const maxRetries = 3;
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`Attempt ${attempt}/${maxRetries}...`);
        
        // Create connection promise
        cached.promise = mongoose.connect(MONGODB_URI, opts)
          .then((mongooseInstance: typeof mongoose) => {
            console.log(`✅ MongoDB Atlas connected to: ${mongooseInstance.connection.db?.databaseName || 'unknown'}`);
            cached.isConnected = true;
            cached.connectionAttempts = 0;
            return mongooseInstance;
          })
          .catch((error: Error) => {
            console.error('❌ Connection promise rejected:', error.message);
            cached.promise = null;
            cached.isConnected = false;
            throw error;
          });

        // Wait for connection
        cached.conn = await cached.promise;
        break; // Exit retry loop on success
        
      } catch (error: any) {
        cached.connectionAttempts++;
        lastError = error;
        console.error(`❌ MongoDB connection failed (attempt ${cached.connectionAttempts}):`, error.message);
        
        // Clean up failed attempt
        cached.promise = null;
        cached.conn = null;
        
        if (attempt < maxRetries) {
          const delay = Math.min(5000 * attempt, 15000);
          console.log(`🔄 Retrying in ${delay/1000} seconds...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }

    if (!cached.promise && lastError) {
      console.log('⚠️  MongoDB not connected - some features may not work');
      console.log('💡 Possible issues:');
      console.log('1. Check if your IP is whitelisted in MongoDB Atlas');
      console.log('2. Verify username/password in MONGODB_URI');
      console.log('3. Check internet connection');
      throw new Error(`Failed to connect after ${maxRetries} attempts: ${lastError.message}`);
    }
  }

  if (!cached.conn) {
    throw new Error('Failed to establish MongoDB connection');
  }
  
  return cached.conn;
}



// Add health check function
export async function checkDBHealth() {
  if (!cached.isConnected || !cached.conn) {
    return { 
      status: 'disconnected', 
      connected: false,
      message: 'MongoDB not connected'
    };
  }
  
  try {
    const db = cached.conn.connection.db;
    if (!db) {
      return { 
        status: 'disconnected', 
        connected: false,
        message: 'No database instance'
      };
    }
    
    // Quick ping
    await db.admin().ping();
    
    return { 
      status: 'healthy', 
      connected: true,
      database: db.databaseName,
      readyState: cached.conn.connection.readyState
    };
  } catch (error: any) {
    cached.isConnected = false;
    cached.conn = null;
    cached.promise = null;
    
    return { 
      status: 'unhealthy', 
      connected: false, 
      error: error.message 
    };
  }
}

export default connectDB;
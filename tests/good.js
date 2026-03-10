require('dotenv').config();
const mongoose = require('mongoose');

// Test both connection strings
const connectionStrings = {
  srv: 'mongodb+srv://David:David@cluster0.eip9z.mongodb.net/ethiopia-tours?retryWrites=true&w=majority',
  direct: 'mongodb://David:David@cluster0-shard-00-00.eip9z.mongodb.net:27017,cluster0-shard-00-01.eip9z.mongodb.net:27017,cluster0-shard-00-02.eip9z.mongodb.net:27017/ethiopia-tours?ssl=true&replicaSet=atlas-eip9z-shard-0&authSource=admin&retryWrites=true&w=majority'
};

async function testConnection(uri, name) {
  console.log(`\n🔗 Testing ${name.toUpperCase()} connection...`);
  console.log(`URI: ${uri.replace(/:[^:]*@/, ':****@')}`);
  
  try {
    // Clear any existing connection
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
    
    // Set connection timeout
    const startTime = Date.now();
    
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 30000,
      connectTimeoutMS: 10000
    });
    
    const connectionTime = Date.now() - startTime;
    
    console.log(`✅ SUCCESS! Connected in ${connectionTime}ms`);
    console.log(`📊 Database: ${mongoose.connection.db?.databaseName || 'unknown'}`);
    console.log(`🌐 Host: ${mongoose.connection.host}`);
    console.log(`🔌 State: ${getConnectionState(mongoose.connection.readyState)}`);
    
    // Test a query
    console.log('\n📝 Testing database operations...');
    
    // List collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log(`📁 Collections found: ${collections.length}`);
    collections.forEach(col => console.log(`  - ${col.name}`));
    
    // Create a test document
    const TestSchema = new mongoose.Schema({
      name: String,
      timestamp: { type: Date, default: Date.now }
    });
    
    const TestModel = mongoose.model('TestConnection', TestSchema);
    
    // Insert test document
    const testDoc = await TestModel.create({ name: 'Connection Test' });
    console.log(`📄 Test document created: ${testDoc._id}`);
    
    // Find test document
    const foundDoc = await TestModel.findById(testDoc._id);
    console.log(`🔍 Test document retrieved: ${foundDoc ? 'Yes' : 'No'}`);
    
    // Clean up
    await TestModel.deleteMany({});
    console.log('🧹 Test documents cleaned up');
    
    await mongoose.disconnect();
    console.log('🔌 Disconnected');
    
    return { success: true, time: connectionTime };
    
  } catch (error) {
    console.error(`❌ FAILED: ${error.message}`);
    console.error(`📌 Error name: ${error.name}`);
    console.error(`📌 Error code: ${error.code || 'N/A'}`);
    
    if (error.code === 'ENOTFOUND' || error.message.includes('queryTxt')) {
      console.log('💡 DNS resolution failed. Try:');
      console.log('   1. Check internet connection');
      console.log('   2. Try using Google DNS (8.8.8.8)');
      console.log('   3. Use a VPN if DNS is blocked');
    } else if (error.code === 'ETIMEOUT' || error.message.includes('timed out')) {
      console.log('💡 Connection timeout. Try:');
      console.log('   1. Check MongoDB Atlas IP whitelist (add 0.0.0.0/0)');
      console.log('   2. Check if cluster is paused in Atlas');
      console.log('   3. Try the other connection method');
    } else if (error.code === 13 || error.message.includes('Authentication')) {
      console.log('💡 Authentication failed. Check:');
      console.log('   1. Username/password');
      console.log('   2. Database user permissions in Atlas');
      console.log('   3. Database name is correct');
    }
    
    // Clean up
    try { await mongoose.disconnect(); } catch {}
    
    return { success: false, error: error.message };
  }
}

function getConnectionState(state) {
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };
  return states[state] || state;
}

async function runAllTests() {
  console.log('🚀 MongoDB Connection Tester');
  console.log('='.repeat(50));
  
  const results = [];
  
  // Test SRV connection
  results.push(await testConnection(connectionStrings.srv, 'SRV'));
  
  // Test direct connection
  results.push(await testConnection(connectionStrings.direct, 'Direct'));
  
  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 TEST SUMMARY:');
  console.log('='.repeat(50));
  
  results.forEach((result, index) => {
    const type = index === 0 ? 'SRV' : 'Direct';
    if (result.success) {
      console.log(`✅ ${type}: SUCCESS (${result.time}ms)`);
    } else {
      console.log(`❌ ${type}: FAILED (${result.error})`);
    }
  });
  
  // Recommendations
  console.log('\n💡 RECOMMENDATIONS:');
  if (results[0].success) {
    console.log('   Use SRV connection: mongodb+srv://...');
  } else if (results[1].success) {
    console.log('   Use Direct connection (from .env file)');
  } else {
    console.log('   Check your MongoDB Atlas configuration');
    console.log('   1. Go to Network Access → Add IP 0.0.0.0/0');
    console.log('   2. Check cluster status (should be Active)');
    console.log('   3. Verify username/password in Database Access');
  }
}

runAllTests().catch(console.error);
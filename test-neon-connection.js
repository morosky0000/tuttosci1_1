require('dotenv').config();
const { neon } = require('@netlify/neon');

async function testConnection() {
  try {
    console.log('🔍 Testing Neon database connection...');
    
    if (!process.env.NETLIFY_DATABASE_URL) {
      console.error('❌ NETLIFY_DATABASE_URL not found in environment variables');
      console.log('Please update the .env file with your actual database URL');
      return;
    }
    
    const sql = neon(process.env.NETLIFY_DATABASE_URL);
    
    // Test basic connection
    console.log('📡 Testing basic connection...');
    const result = await sql`SELECT NOW() as current_time`;
    console.log('✅ Connection successful!');
    console.log('Current time:', result[0].current_time);
    
    // Test if tables exist
    console.log('\n📋 Checking if tables exist...');
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
    
    if (tables.length === 0) {
      console.log('⚠️  No tables found. Run migration first.');
    } else {
      console.log('✅ Found tables:', tables.map(t => t.table_name).join(', '));
      
      // Test atleti table if exists
      const atletiTable = tables.find(t => t.table_name === 'atleti');
      if (atletiTable) {
        const count = await sql`SELECT COUNT(*) as count FROM atleti`;
        console.log(`📊 Athletes in database: ${count[0].count}`);
      }
    }
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    
    if (error.message.includes('password authentication failed')) {
      console.log('\n💡 Troubleshooting:');
      console.log('1. Check that your database URL is correct');
      console.log('2. Verify the password in the connection string');
      console.log('3. Make sure the database is active in Netlify');
    }
  }
}

if (require.main === module) {
  testConnection();
}

module.exports = { testConnection };
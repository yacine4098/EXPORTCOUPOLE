import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const DB_NAME = process.env.DB_NAME || 'algiers_export_hub';

// Initialize database
const initDatabase = async () => {
  // Create connection without database
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || ''
  });

  try {
    // Create database if not exists
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS ${DB_NAME} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
    );
    console.log(`✓ Database '${DB_NAME}' ready`);

    // Check if tables exist
    await connection.query(`USE ${DB_NAME}`);
    const [tables] = await connection.query('SHOW TABLES');
    
    if ((tables as any[]).length === 0) {
      console.log('📊 No tables found, creating schema...');
      
      // Read and execute schema.sql
      const schemaPath = path.join(__dirname, 'schema.sql');
      const schema = fs.readFileSync(schemaPath, 'utf8');
      
      // Split by semicolon and execute each statement
      const statements = schema
        .split(';')
        .map(s => s.trim())
        .filter(s => s.length > 0);
      
      for (const statement of statements) {
        await connection.query(statement);
      }
      
      console.log('✓ Schema created successfully');
      
      // Run seed data
      console.log('🌱 Seeding initial data...');
      const { seedDatabase } = await import('./seed');
      await seedDatabase();
      console.log('✓ Seed data inserted');
    } else {
      console.log('✓ Tables exist, skipping schema creation');
    }
  } catch (error) {
    console.error('❌ Database initialization error:', error);
    throw error;
  } finally {
    await connection.end();
  }
};

// Initialize in production mode
let isInitialized = false;

const ensureInitialized = async () => {
  if (!isInitialized) {
    if (process.env.NODE_ENV !== 'production') {
      await initDatabase();
    } else {
      console.log('Production mode - skipping auto database initialization');
    }
    isInitialized = true;
  }
};

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

export const query = async (sql: string, params?: any[]) => {
  await ensureInitialized();
  const [results] = await pool.execute(sql, params);
  return results;
};

export const getConnection = async () => {
  await ensureInitialized();
  return await pool.getConnection();
};

export default pool;

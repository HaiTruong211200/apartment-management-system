const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const householdRoutes = require('../src/routes/householdRoutes');
const {errorHandler, notFound} = require('../src/middleware/errorHandler');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ?
      ['https://your-vercel-domain.vercel.app'] :
      ['http://localhost:3000'],
  credentials: true
}));

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// MongoDB connection
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      bufferCommands: false,
    });

    cachedDb = connection;
    console.log('Connected to MongoDB');
    return connection;
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    throw error;
  }
}

// API routes
app.use('/api/households', householdRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({status: 'OK', timestamp: new Date().toISOString()});
});

// Root API endpoint
app.get('/api', (req, res) => {
  res.json({
    message: 'Apartment Management System API',
    version: '1.0.0',
    endpoints: {households: '/api/households', health: '/api/health'}
  });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// For Vercel serverless functions
module.exports = async (req, res) => {
  await connectToDatabase();
  return app(req, res);
};

// For local development
if (require.main === module) {
  const PORT = process.env.PORT || 3000;

  connectToDatabase()
      .then(() => {
        app.listen(PORT, () => {
          console.log(`Server running on http://localhost:${PORT}`);
        });
      })
      .catch((error) => {
        console.error('Failed to start server:', error);
        process.exit(1);
      });
}

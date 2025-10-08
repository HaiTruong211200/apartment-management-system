const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const {connectDB} = require('./config/db');
const {router: authRoutes} = require('./routes/auth');
const {auth} = require('./middleware/auth');

const app = express();

const PORT = process.env.PORT || 4000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

(async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
  } catch (err) {
    console.error('MongoDB connection failed:', err);
    process.exit(1);
  }

  app.set('trust proxy', 1);
  app.use(helmet());
  app.use(cors({origin: CLIENT_URL, credentials: true}));
  app.use(express.json({limit: '10kb'}));
  app.use(morgan('dev'));

  const limiter = rateLimit({windowMs: 15 * 60 * 1000, max: 300});
  app.use('/api/', limiter);
  app.use('/auth', limiter);  // apply limiter to alias as well

  app.get('/api/health', (_req, res) => res.json({ok: true}));

  app.use('/api/auth', authRoutes);
  app.use('/auth', authRoutes);  // alias routes without /api prefix

  // Protected routes
  app.get('/api/me', auth, (req, res) => {
    res.json({user: req.user});
  });
  app.get('/me', auth, (req, res) => {  // alias without /api prefix
    res.json({user: req.user});
  });

  // 404
  app.use((req, res) => res.status(404).json({message: 'Not found'}));

  // Error handler
  app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(500).json({message: 'Server error'});
  });

  app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`);
  });
})();
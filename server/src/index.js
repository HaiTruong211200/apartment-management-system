import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import {initDb} from './config/db.js';
import {authenticate} from './middleware/auth.js';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();
app.use(cors({origin: process.env.CORS_ORIGIN?.split(',') || '*'}));
app.use(express.json());

app.get('/health', (req, res) => res.json({status: 'ok'}));

app.use('/api/auth', authRoutes);  // public /register, /login
app.use(
    '/api/auth/me', authenticate,
    authRoutes);  // protect /me by calling same router but behind middleware

const PORT = process.env.PORT || 4000;

(async () => {
  await initDb();
  app.listen(PORT, () => console.log(`API listening on :${PORT}`));
})();

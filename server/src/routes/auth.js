import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import express from 'express';
import jwt from 'jsonwebtoken';

import {pool} from '../config/db.js';
import {authenticate} from '../middleware/auth.js';

dotenv.config();

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';
const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10);

function signToken(user) {
  return jwt.sign(
      {id: user.id, email: user.email, role: user.role}, JWT_SECRET,
      {expiresIn: JWT_EXPIRES_IN});
}

router.post('/register', async (req, res) => {
  const {email, password, fullName} = req.body;
  if (!email || !password)
    return res.status(400).json({message: 'Email and password required'});
  try {
    const existing =
        await pool.query('SELECT id FROM users WHERE email=$1', [email]);
    if (existing.rows.length)
      return res.status(409).json({message: 'Email already registered'});
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    const result = await pool.query(
        'INSERT INTO users (email, password_hash, full_name) VALUES ($1,$2,$3) RETURNING id,email,role,full_name',
        [email, passwordHash, fullName || null]);
    const user = result.rows[0];
    const token = signToken(user);
    res.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        fullName: user.full_name
      },
      token
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({message: 'Server error'});
  }
});

router.post('/login', async (req, res) => {
  const {email, password} = req.body;
  if (!email || !password)
    return res.status(400).json({message: 'Email and password required'});
  try {
    const result = await pool.query(
        'SELECT id,email,password_hash,role,full_name FROM users WHERE email=$1',
        [email]);
    if (!result.rows.length)
      return res.status(401).json({message: 'Invalid credentials'});
    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({message: 'Invalid credentials'});
    const token = signToken(user);
    res.json({
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        fullName: user.full_name
      },
      token
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({message: 'Server error'});
  }
});

router.get('/me', authenticate, async (req, res) => {
  if (!req.user) {
    return res.status(401).json({error: 'Unauthorized'});
  }
  const {id} = req.user;
  try {
    const result = await pool.query(
        'SELECT id, email, full_name AS "fullName", created_at AS "createdAt" FROM users WHERE id = $1 LIMIT 1',
        [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({error: 'User not found'});
    }
    res.json({user: result.rows[0]});
  } catch (e) {
    res.status(500).json({error: 'Server error'});
  }
});

export default router;

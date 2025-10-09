import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export function authenticate(req, res, next) {
  const header = req.headers.authorization || '';
  const [scheme, token] = header.split(' ');
  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json(
        {error: 'Missing or invalid Authorization header'});
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // Attach user info for downstream handlers
    req.user = {id: payload.id, email: payload.email};
    next();
  } catch (err) {
    return res.status(401).json({error: 'Invalid or expired token'});
  }
}


export function authorize(roles = []) {
  if (typeof roles === 'string') roles = [roles];
  return (req, res, next) => {
    if (!roles.length || roles.includes(req.user.role)) return next();
    return res.status(403).json({message: 'Forbidden'});
  };
}

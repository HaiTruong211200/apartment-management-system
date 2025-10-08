const jwt = require('jsonwebtoken');
const {User} = require('../models/User');

async function auth(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    const [scheme, token] = header.split(' ');
    if (scheme !== 'Bearer' || !token)
      return res.status(401).json({message: 'Unauthorized'});

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.sub).select('-password');
    if (!user) return res.status(401).json({message: 'Unauthorized'});

    req.user = user;
    next();
  } catch {
    return res.status(401).json({message: 'Unauthorized'});
  }
}

module.exports = {auth};
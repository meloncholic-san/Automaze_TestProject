import jwt from 'jsonwebtoken';
import { getEnvVar } from '../utils/getEnvVar.js';

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, getEnvVar('JWT_SECRET'));
    req.user = decoded;
    console.log(req.user);
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
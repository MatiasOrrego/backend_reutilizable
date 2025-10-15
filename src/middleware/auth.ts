import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export default function auth(required = true) {
  return (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;

    if (!token) {
      return required ? res.status(401).json({ error: 'Missing token' }) : next();
    }
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET || 'supersecret') as any;
      req.user = { sub: payload.sub, role: payload.role, email: payload.email };
      next();
    } catch {
      return res.status(401).json({ error: 'Invalid token' });
    }
  };
}

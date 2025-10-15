import type { Request, Response, NextFunction } from 'express';
import * as authSvc from '../modules/auth/auth.service';

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await authSvc.registerUser(req.body);
    res.status(201).json(user);
  } catch (err) { next(err); }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await authSvc.loginUser(req.body);
    res.json(result);
  } catch (err) { next(err); }
}

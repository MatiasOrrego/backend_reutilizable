import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodTypeAny } from 'zod';

export default function validate(schema: ZodTypeAny, place: 'body'|'query'|'params' = 'body') {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = schema.parse((req as any)[place]);
      (req as any)[place] = data;
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({ error: 'Validation error', details: err.errors });
      }
      next(err);
    }
  };
}

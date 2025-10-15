import type { Request, Response, NextFunction } from 'express';
import * as svc from '../modules/items/item.service';

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const item = await svc.createItem(req.body, req.user?.sub);
    res.status(201).json(item);
  } catch (err) { next(err); }
}

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const { status, q } = req.query as { status?: string; q?: string };
    const items = await svc.listItems({ status: status ?? '', q: q ?? '' });
    res.json(items);
  } catch (err) { next(err); }
}

export async function getById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id ?? '';
    const item = await svc.getItem(id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (err) { next(err); }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id ?? '';
    const item = await svc.updateItem(id, req.body);
    res.json(item);
  } catch (err) { next(err); }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id ?? '';
    await svc.deleteItem(id);
    res.status(204).send();
  } catch (err) { next(err); }
}
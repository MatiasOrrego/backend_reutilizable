import { Router } from 'express';
import authRoutes from './auth.routes';
import itemRoutes from './items.routes';

const router = Router();
router.use('/auth', authRoutes);
router.use('/items', itemRoutes);

export default router;

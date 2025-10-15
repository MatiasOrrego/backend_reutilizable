import { Router } from 'express';
import auth from '../middleware/auth';
import validate from '../middleware/validate';
import { ItemCreateSchema, ItemUpdateSchema } from '../modules/items/item.schemas';
import * as ctrl from '../controllers/item.controller';

const router = Router();
router.get('/',     auth(), ctrl.list);
router.get('/:id',  auth(), ctrl.getById);
router.post('/',    auth(), validate(ItemCreateSchema), ctrl.create);
router.patch('/:id',auth(), validate(ItemUpdateSchema), ctrl.update);
router.delete('/:id', auth(), ctrl.remove);
export default router;

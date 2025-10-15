import { Router } from 'express';
import validate from '../middleware/validate';
import { AuthLoginSchema, AuthRegisterSchema } from '../modules/auth/auth.schemas';
import { register, login } from '../controllers/auth.controller';

const router = Router();
router.post('/register', validate(AuthRegisterSchema), register);
router.post('/login',    validate(AuthLoginSchema),    login);
export default router;

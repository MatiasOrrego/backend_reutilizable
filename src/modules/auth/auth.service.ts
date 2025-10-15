import prisma from '../../config/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import type { AuthRegisterInput, AuthLoginInput } from './auth.schemas';

export async function registerUser(data: AuthRegisterInput) {
  const exists = await prisma.user.findUnique({ where: { email: data.email } });
  if (exists) {
    const err: any = new Error('Email ya registrado');
    err.status = 409;
    throw err;
  }
  const hash = await bcrypt.hash(data.password, 10);
  const user = await prisma.user.create({
  data: { email: data.email, password: hash, name: data.name ?? null },
  select: { id: true, email: true, name: true, role: true, createdAt: true },
});
  return user;
}

export async function loginUser(data: AuthLoginInput) {

  const user = await prisma.user.findUnique({ where: { email: data.email } });
  if (!user) {
    const err: any = new Error('Credenciales inválidas');
    err.status = 401;
    throw err;
  }

  const ok = await bcrypt.compare(data.password, user.password);
  if (!ok) {
    const err: any = new Error('Credenciales inválidas');
    err.status = 401;
    throw err;
  }
  
  const token = jwt.sign(
    { sub: user.id, role: user.role, email: user.email },
    process.env.JWT_SECRET || 'supersecret',
    { expiresIn: '1d' }
  );
  const { password: _p, ...safe } = user as any;
  return { token, user: safe };
}

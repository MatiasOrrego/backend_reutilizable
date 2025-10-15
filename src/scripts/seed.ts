import '../config/env';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@example.com';
  let admin = await prisma.user.findUnique({ where: { email } });
  if (!admin) {
    const hash = await bcrypt.hash('admin123', 10);
    admin = await prisma.user.create({ data: { email, password: hash, role: 'admin', name: 'Admin' } });
    console.log('Seed -> admin@example.com / admin123');
  }
  await prisma.item.create({ data: { title: 'Primer item', content: 'Hola hackatón', ownerId: admin.id } });
  console.log('Seed OK');
  await prisma.$disconnect();
}

main().catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });

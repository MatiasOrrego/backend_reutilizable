import prisma from '../../config/prisma';
import type { ItemCreateInput, ItemUpdateInput } from './item.schemas';

export async function createItem(data: ItemCreateInput, ownerId?: string) {
  return prisma.item.create({
    data: {
      ...data,
      ownerId: ownerId ?? null,
      content: data.content ?? null, // <-- importante para evitar undefined
      status: data.status ?? 'ACTIVE', 
    }
  });
}

export async function listItems(params: { status?: string; q?: string }) {
  const { status, q } = params;
  const where: any = {};
  if (status) where.status = status;
  if (q) {
    where.OR = [
      { title: { contains: q, mode: 'insensitive' } },
      { content: { contains: q, mode: 'insensitive' } },
    ];
  }
  return prisma.item.findMany({ where, orderBy: { createdAt: 'desc' } });
}

export async function getItem(id: string) {
  return prisma.item.findUnique({ where: { id } });
}

export async function updateItem(id: string, data: ItemUpdateInput) {
  // Solo agrega los campos si existen
  const updateData: any = {};
  if (data.title !== undefined) updateData.title = data.title;
  if (data.status !== undefined) updateData.status = data.status;
  if (data.content !== undefined) updateData.content = data.content;

  return prisma.item.update({
    where: { id },
    data: updateData,
  });
}

export async function deleteItem(id: string) {
  await prisma.item.delete({ where: { id } });
}

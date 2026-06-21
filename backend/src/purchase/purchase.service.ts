import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePurchaseDto } from './dto';

@Injectable()
export class PurchaseService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createPurchaseDto: CreatePurchaseDto) {
    return this.prisma.$transaction(async (tx) => {
      const purchase = await tx.purchase.create({
        data: {
          userId,
          totalAmount: createPurchaseDto.totalAmount,
          items: {
            create: createPurchaseDto.items.map(item => ({
              productId: item.productId,
              quantity: item.quantity,
              cost: item.cost,
            })),
          },
        },
        include: {
          items: true,
        },
      });

      // Update stock for each product
      for (const item of createPurchaseDto.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              increment: item.quantity,
            },
            cost: item.cost, // Update last cost
          },
        });

        await tx.stockMovement.create({
          data: {
            productId: item.productId,
            type: 'IN',
            quantity: item.quantity,
            reason: 'PURCHASE',
          }
        });
      }

      return purchase;
    });
  }

  async findAll(userId: string) {
    return this.prisma.purchase.findMany({
      where: { userId },
      include: { items: true },
      orderBy: { createdAt: 'desc' }
    });
  }

  async findOne(id: string, userId: string) {
    const purchase = await this.prisma.purchase.findFirst({
      where: { id, userId },
      include: { items: true },
    });
    if (!purchase) {
      throw new NotFoundException(`Purchase with ID ${id} not found`);
    }
    return purchase;
  }
}

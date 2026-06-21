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
          companyId: createPurchaseDto.companyId,
          warehouseId: createPurchaseDto.warehouseId,
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
        // Upsert inventory
        await tx.inventory.upsert({
          where: {
            productId_warehouseId: {
              productId: item.productId,
              warehouseId: createPurchaseDto.warehouseId
            }
          },
          update: {
            currentStock: { increment: item.quantity },
            availableStock: { increment: item.quantity },
          },
          create: {
            productId: item.productId,
            warehouseId: createPurchaseDto.warehouseId,
            currentStock: item.quantity,
            availableStock: item.quantity,
          }
        });

        await tx.product.update({
          where: { id: item.productId },
          data: { lastCost: item.cost },
        });

        await tx.inventoryMovement.create({
          data: {
            productId: item.productId,
            warehouseId: createPurchaseDto.warehouseId,
            userId,
            type: 'PURCHASE',
            quantity: item.quantity,
            remarks: 'PURCHASE',
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

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSaleDto } from './dto';

@Injectable()
export class SaleService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createSaleDto: CreateSaleDto) {
    // A real implementation would handle transaction, stock updates, etc.
    // For MVP, we'll create the sale and items.
    return this.prisma.$transaction(async (tx) => {
      const sale = await tx.sale.create({
        data: {
          userId,
          totalAmount: createSaleDto.totalAmount,
          paymentType: createSaleDto.paymentType,
          items: {
            create: createSaleDto.items.map(item => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
            })),
          },
        },
        include: {
          items: true,
        },
      });

      // Update stock for each product
      for (const item of createSaleDto.items) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });

        await tx.stockMovement.create({
          data: {
            productId: item.productId,
            type: 'OUT',
            quantity: item.quantity,
            reason: 'SALE',
          }
        });
      }

      return sale;
    });
  }

  async findAll(userId: string) {
    return this.prisma.sale.findMany({
      where: { userId },
      include: { items: true },
      orderBy: { createdAt: 'desc' }
    });
  }

  async findOne(id: string, userId: string) {
    const sale = await this.prisma.sale.findFirst({
      where: { id, userId },
      include: { items: true },
    });
    if (!sale) {
      throw new NotFoundException(`Sale with ID ${id} not found`);
    }
    return sale;
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StockMovementService {
  constructor(private prisma: PrismaService) {}

  async findAllForUser(userId: string) {
    return this.prisma.stockMovement.findMany({
      where: {
        product: {
          userId: userId
        }
      },
      include: {
        product: {
          select: {
            name: true,
            barcode: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  async findAllForProduct(productId: string, userId: string) {
    // Validate product belongs to user
    const product = await this.prisma.product.findFirst({
      where: { id: productId, userId }
    });

    if (!product) {
      return [];
    }

    return this.prisma.stockMovement.findMany({
      where: { productId },
      orderBy: { createdAt: 'desc' }
    });
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getCriticalStock(companyId: string) {
    // In future this would involve AI, for now we just return standard threshold check logic
    return this.prisma.inventory.findMany({
      where: {
        warehouse: { companyId },
        currentStock: { lte: 5 } // Placeholder threshold
      },
      include: { product: true, warehouse: true },
      take: 10
    });
  }

  async getSlowMovingProducts(companyId: string) {
    // Placeholder query returning empty or a simple logic
    return [];
  }

  async getTopSellingProducts(companyId: string) {
    // Group sales or simply return placeholder
    return [];
  }

  async getRecentMovements(companyId: string) {
    return this.prisma.inventoryMovement.findMany({
      where: { warehouse: { companyId } },
      include: { product: true, warehouse: true },
      orderBy: { date: 'desc' },
      take: 10
    });
  }

  async getValuedInventory(companyId: string) {
    // Compute total inventory value across warehouses
    return {
      totalValue: 0,
      currency: 'USD'
    };
  }

  async getAlerts(companyId: string) {
    return this.prisma.notification.findMany({
      where: { companyId, isRead: false },
      orderBy: { createdAt: 'desc' },
      take: 5
    });
  }
}

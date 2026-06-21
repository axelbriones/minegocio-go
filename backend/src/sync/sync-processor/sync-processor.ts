import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ProductService } from '../../product/product.service';
import { SaleService } from '../../sale/sale.service';
import { PurchaseService } from '../../purchase/purchase.service';

@Processor('syncQueue')
export class SyncProcessor extends WorkerHost {
  private readonly logger = new Logger(SyncProcessor.name);

  constructor(
    private prisma: PrismaService,
    private productService: ProductService,
    private saleService: SaleService,
    private purchaseService: PurchaseService,
  ) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    const { syncEventId, userId, event } = job.data;
    this.logger.log(`Processing sync event ${syncEventId} for entity ${event.entity}`);

    try {
      // In a real application, you would handle each entity and action
      // For MVP, we'll demonstrate a simple switch case

      switch (event.entity) {
        case 'Product':
          if (event.action === 'CREATE') {
            await this.productService.create(userId, event.payload);
          } else if (event.action === 'UPDATE') {
            await this.productService.update(event.entityId, userId, event.payload);
          }
          break;
        case 'Sale':
          if (event.action === 'CREATE') {
            await this.saleService.create(userId, event.payload);
          }
          break;
        case 'Purchase':
          if (event.action === 'CREATE') {
            await this.purchaseService.create(userId, event.payload);
          }
          break;
        default:
          this.logger.warn(`Unknown entity type: ${event.entity}`);
      }

      // Mark event as processed
      await this.prisma.syncEvent.update({
        where: { id: syncEventId },
        data: { status: 'PROCESSED' }
      });

      this.logger.log(`Successfully processed sync event ${syncEventId}`);
    } catch (error: any) {
      this.logger.error(`Failed to process sync event ${syncEventId}`, error.stack);

      // Mark event as failed
      await this.prisma.syncEvent.update({
        where: { id: syncEventId },
        data: {
          status: 'FAILED',
          error: error.message || 'Unknown error'
        }
      });

      throw error;
    }
  }
}

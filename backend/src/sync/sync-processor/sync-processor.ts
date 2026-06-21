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
      // Offline Sync Engine expanded to support any module
      // Each entity case should map to its respective service logic
      switch (event.entity) {
        case 'Product':
          if (event.action === 'CREATE') {
            await this.productService.create(userId, event.payload);
          } else if (event.action === 'UPDATE') {
            // NOTE: Adjusted to expect companyId not userId for multi-tenant structure
            await this.productService.update(event.entityId, event.payload.companyId, event.payload);
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
        case 'Inventory':
        case 'InventoryMovement':
        case 'Warehouse':
        case 'Customer':
        case 'Supplier':
          this.logger.log(`Placeholder: Processing sync for ${event.entity} - Action: ${event.action}`);
          // Add respective service calls here
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

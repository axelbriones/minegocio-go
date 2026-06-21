import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { SyncController } from './sync.controller';
import { SyncService } from './sync.service';
import { SyncProcessor } from './sync-processor/sync-processor';
import { ProductModule } from '../product/product.module';
import { SaleModule } from '../sale/sale.module';
import { PurchaseModule } from '../purchase/purchase.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'syncQueue',
    }),
    ProductModule,
    SaleModule,
    PurchaseModule,
  ],
  controllers: [SyncController],
  providers: [SyncService, SyncProcessor],
})
export class SyncModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { SaleModule } from './sale/sale.module';
import { PurchaseModule } from './purchase/purchase.module';
import { SyncModule } from './sync/sync.module';
import { BullModule } from '@nestjs/bullmq';
import { CompanyModule } from './company/company.module';
import { InventoryModule } from './inventory/inventory.module';
import { WarehousesModule } from './warehouses/warehouses.module';
import { MovementsModule } from './movements/movements.module';
import { ScannerModule } from './scanner/scanner.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AiModule } from './ai/ai.module';
import { CustomersModule } from './customers/customers.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { ReportsModule } from './reports/reports.module';
import { SettingsModule } from './settings/settings.module';
import { AuditModule } from './audit/audit.module';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
      },
    }),
    PrismaModule,
    AuthModule,
    CompanyModule,
    InventoryModule,
    WarehousesModule,
    MovementsModule,
    ScannerModule,
    DashboardModule,
    AiModule,
    ProductModule,
    SaleModule,
    PurchaseModule,
    CustomersModule,
    SuppliersModule,
    ReportsModule,
    SettingsModule,
    AuditModule,
    SyncModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { StockMovementService } from './stock-movement.service';
import { StockMovementController } from './stock-movement.controller';

@Module({
  providers: [StockMovementService],
  controllers: [StockMovementController]
})
export class StockMovementModule {}

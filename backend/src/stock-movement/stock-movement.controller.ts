import { Controller, Get, Param, UseGuards, Request } from '@nestjs/common';
import { StockMovementService } from './stock-movement.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('stock-movements')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('stock-movements')
export class StockMovementController {
  constructor(private readonly stockMovementService: StockMovementService) {}

  @Get()
  @ApiOperation({ summary: 'Get all stock movements for user' })
  findAll(@Request() req: any) {
    return this.stockMovementService.findAllForUser(req.user.userId);
  }

  @Get('product/:productId')
  @ApiOperation({ summary: 'Get all stock movements for a specific product' })
  findAllForProduct(@Param('productId') productId: string, @Request() req: any) {
    return this.stockMovementService.findAllForProduct(productId, req.user.userId);
  }
}

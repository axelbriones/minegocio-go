import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { SaleService } from './sale.service';
import { CreateSaleDto } from './dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('sales')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('sales')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new sale' })
  create(@Request() req: any, @Body() createSaleDto: CreateSaleDto) {
    return this.saleService.create(req.user.userId, createSaleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all sales for user' })
  findAll(@Request() req: any) {
    return this.saleService.findAll(req.user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific sale' })
  findOne(@Param('id') id: string, @Request() req: any) {
    return this.saleService.findOne(id, req.user.userId);
  }
}

import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { CreatePurchaseDto } from './dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('purchases')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('purchases')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new purchase' })
  create(@Request() req: any, @Body() createPurchaseDto: CreatePurchaseDto) {
    return this.purchaseService.create(req.user.userId, createPurchaseDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all purchases for user' })
  findAll(@Request() req: any) {
    return this.purchaseService.findAll(req.user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific purchase' })
  findOne(@Param('id') id: string, @Request() req: any) {
    return this.purchaseService.findOne(id, req.user.userId);
  }
}
